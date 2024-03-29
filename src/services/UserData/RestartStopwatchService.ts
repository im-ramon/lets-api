import moment from 'moment'
import prismaClient from '../../prisma'

type RestartStopwatchProps = {
    user_id: string;
    last_consumption: string;
    record_no_consumption_formated: string;
    relapse_reasons: string;
}

class RestartStopwatchService {
    async execute({ user_id, last_consumption, relapse_reasons, record_no_consumption_formated }: RestartStopwatchProps) {
        const userInfo = await prismaClient.userData.findFirst({
            where: {
                user_id
            },
            select: {
                user_id: true,
                last_consumption: true,
                record_no_consumption: true,
                record_no_consumption_formated: true,
                total_relapse: true,
                relapse_dates: true,
                score: true
            }
        })

        // Definindo quantidade de segundos desde último consumo 
        const recordInSeconds = () => {
            const diff = moment(last_consumption).diff(userInfo.last_consumption, 'seconds')

            if (diff > userInfo.record_no_consumption) {
                return {
                    record_no_consumption: diff,
                    record_no_consumption_formated
                }
            } else {
                return {
                    record_no_consumption: userInfo.record_no_consumption,
                    record_no_consumption_formated: userInfo.record_no_consumption_formated
                }
            }
        }

        const totalRelapseCalc = () => {
            if (userInfo.total_relapse) {
                return userInfo.total_relapse + 1
            } else {
                return 1
            }
        }

        const relapseDates = () => {
            let relapse = JSON.parse(userInfo.relapse_dates)
            relapse.push(moment(last_consumption).format('YYYY-MM-DD'))

            const arrFiltered = [...new Set(relapse)]
            return JSON.stringify(arrFiltered)
        }

        const newScore = () => {
            if (userInfo.score <= 40) {
                return 0
            } else {
                return (userInfo.score - 40)
            }
        }

        const lastConsumptionUpdated = await prismaClient.userData.update({
            data: {
                last_consumption,
                total_relapse: totalRelapseCalc(),
                record_no_consumption: recordInSeconds().record_no_consumption,
                relapse_dates: relapseDates(),
                record_no_consumption_formated: recordInSeconds().record_no_consumption_formated,
                score: newScore()
            },
            where: {
                user_id
            },
            select: {
                last_consumption: true,
                record_no_consumption: true,
                total_relapse: true,
                relapse_dates: true,
                record_no_consumption_formated: true,
                score: true
            }
        })


        if (relapse_reasons) {
            await prismaClient.relapseReasons.create({
                data: {
                    user_id,
                    reason: relapse_reasons,
                    created_at: last_consumption
                }
            })
        }

        return { ...lastConsumptionUpdated }
    }
}

export { RestartStopwatchService };
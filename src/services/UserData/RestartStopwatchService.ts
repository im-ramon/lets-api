import moment from 'moment'
import prismaClient from '../../prisma'

type RestartStopwatchProps = {
    user_id: string;
    last_consumption: string;
    relapse_reasons: string;
}

class RestartStopwatchService {
    async execute({ user_id, last_consumption, relapse_reasons }: RestartStopwatchProps) {
        const userInfo = await prismaClient.userData.findFirst({
            where: {
                user_id
            },
            select: {
                user_id: true,
                last_consumption: true,
                record_no_consumption: true,
                total_relapse: true,
                relapse_dates: true,
            }
        })

        // Definindo quantidade de segundos desde último consumo 
        const recordInSeconds = () => {
            const diff = moment(last_consumption).diff(userInfo.last_consumption, 'seconds')
            return (diff > userInfo.record_no_consumption ? diff : userInfo.record_no_consumption)
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

            return JSON.stringify(relapse)
        }

        const lastConsumptionUpdated = await prismaClient.userData.update({
            data: {
                last_consumption,
                total_relapse: totalRelapseCalc(),
                record_no_consumption: recordInSeconds(),
                relapse_dates: relapseDates()
            },
            where: {
                user_id
            },
            select: {
                last_consumption: true,
                record_no_consumption: true,
                total_relapse: true,
                relapse_dates: true
            }
        })


        if (relapse_reasons) {
            await prismaClient.relapseReasons.create({
                data: {
                    user_id,
                    reason: relapse_reasons
                }
            })
        }

        return { ...lastConsumptionUpdated }
    }
}

export { RestartStopwatchService };
import moment from 'moment'
import prismaClient from '../../prisma'

type AlterScoreProps = {
    user_id: string,
    handleType: string,
}

class AlterScoreService {
    async execute({ user_id, handleType }: AlterScoreProps) {
        const scoreInfo = await prismaClient.userData.findFirst({
            where: {
                user_id: user_id
            },
            select: {
                score: true,
                last_score_update: true
            }
        })

        if (handleType === 'add') {
            const isThisRequestAfterToday = moment('2022-10-21').isAfter(scoreInfo.last_score_update, 'day');

            if (isThisRequestAfterToday) {
                const newScore = await prismaClient.userData.update({
                    data: {
                        score: scoreInfo.score + 5,
                        last_score_update: moment().format()
                    },
                    where: {
                        user_id
                    },
                    select: {
                        user_id: true,
                        score: true
                    }
                })
                return { newScore }
            } else {
                throw new Error(`Pontos já resgatados hoje!`)
            }
        }

        if (handleType === 'sub') {
            if (scoreInfo.score <= 40) {
                const newScore = await prismaClient.userData.update({
                    data: {
                        score: 0,
                    },
                    where: {
                        user_id
                    },
                    select: {
                        user_id: true,
                        score: true
                    }
                })
                return { newScore }
            } else {
                const newScore = await prismaClient.userData.update({
                    data: {
                        score: scoreInfo.score - 40,
                    },
                    where: {
                        user_id
                    },
                    select: {
                        user_id: true,
                        score: true
                    }
                })
                return { newScore }
            }


        }
    }
}

export { AlterScoreService };
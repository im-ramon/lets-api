import prismaClient from '../../prisma'

type SetUserDataProps = {
    user_id: string,
    last_consumption: string,
    record_no_consumption: number,
    total_relapse: number,
    score: number,
    relapse_reasons: string,
    relapse_dates: string,
}

class SetUserDataService {
    async execute({ user_id, last_consumption, record_no_consumption, total_relapse, score, relapse_reasons, relapse_dates }: SetUserDataProps) {

        const userData = await prismaClient.userData.create({
            data: {
                user_id,
                last_consumption,
                record_no_consumption,
                total_relapse,
                score,
                relapse_reasons,
                relapse_dates
            },
            select: {
                id: true
            }
        })

        return userData;
    }
}

export { SetUserDataService };
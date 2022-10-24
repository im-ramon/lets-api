import prismaClient from '../../prisma'

type SetUserDataProps = {
    user_id: string,
    last_consumption: string,
}

class SetUserDataService {
    async execute({ user_id, last_consumption }: SetUserDataProps) {

        const userData = await prismaClient.userData.create({
            data: {
                user_id,
                last_consumption,
                record_no_consumption: 0,
                record_no_consumption_formated: '{ anos: 0, meses: 0, dias: 0, horas: 0, minutos: 0, segundos: 0 }',
                total_relapse: 0,
                score: 5,
                last_score_update: last_consumption, // Configura a última atualização do score como último consumo inicial
                relapse_dates: '[]',
            },
            select: {
                last_consumption: true,
                last_score_update: true,
                record_no_consumption: true,
                relapse_dates: true,
                total_relapse: true,
                score: true,
                record_no_consumption_formated: true
            }
        })

        return userData;
    }
}

export { SetUserDataService };
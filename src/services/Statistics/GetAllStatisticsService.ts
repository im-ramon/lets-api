import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'

class GetAllStatisticsService {
    async execute(user_id: string) {
        if (user_id.length < 7) {
            try {
                const totalUsers = await prismaClient.user.count({})

                const totalRelapses = await prismaClient.userData.findMany({
                    select: {
                        total_relapse: true
                    }
                }).then(response => {
                    return response.reduce((prev, curr) => {
                        return prev + curr.total_relapse
                    }, 0)
                })

                const listReasons = await prismaClient.relapseReasons.findMany({
                    select: {
                        reason: true,
                        created_at: true
                    }
                })

                return {
                    totalUsers,
                    totalRelapses,
                    totalReasons: listReasons.length,
                    listReasons,
                }
            } catch (e) {
                throw new Error('GetAllStatisticsService: ' + e)
            }
        } else {
            throw new Error('Erro ao validade usuário, GetAllStatisticsService')
        }
    }
}

export { GetAllStatisticsService };
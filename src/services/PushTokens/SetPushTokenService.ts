import prismaClient from '../../prisma'


class SetPushTokenService {
    async execute(exponent_push_token: string) {
        try {
            const wasTokenStorage = await prismaClient.pushTokens.findFirst({
                where: {
                    token: exponent_push_token
                }, select: {
                    token: true
                }
            })

            if (wasTokenStorage) {
                return { ...wasTokenStorage }

            } else {
                const data = await prismaClient.pushTokens.create({
                    data: {
                        token: exponent_push_token
                    }, select: {
                        token: true
                    }
                })
                return { ...data };
            }

        } catch (e) {
            throw new Error('Falha ao salvar exponent_push_token')
        }
    }
}

export { SetPushTokenService };
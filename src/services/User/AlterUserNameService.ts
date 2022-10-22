import prismaClient from '../../prisma'

type SetUserDataProps = {
    user_id: string,
    new_name: string,
}

class AlterUserNameService {
    async execute({ user_id, new_name }: SetUserDataProps) {

        const userData = await prismaClient.user.update({
            data: {
                name: new_name
            },
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true
            }
        })

        return userData;
    }
}

export { AlterUserNameService };
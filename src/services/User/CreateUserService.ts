import express from 'express'
import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string
    password: string
}

class CreateUserService {
    async execute({ name, password }: UserRequest) {

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
            }
        })

        return user
    }
}

export { CreateUserService }
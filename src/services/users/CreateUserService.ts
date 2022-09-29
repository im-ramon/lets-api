import express from 'express'
import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        // Verifica se foi passado o email
        if (!email) {
            throw new Error('Email invalido, ou não enviado')
        }

        // Verifican se o email já existe no banco de dados
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (userAlreadyExists) {
            throw new Error('Usuário já está cadastrado!')
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })


        return user
    }
}

export { CreateUserService }
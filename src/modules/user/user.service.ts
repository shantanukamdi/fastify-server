import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {

    const { hash, salt } = hashPassword(input.password);

    const user = prisma.user.create({
        data: {
            ...input,
            salt,
            password: hash
        }
    });

    return user;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
}

export async function findUsers() {
    return prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    });
}
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

createCompany()

async function createCompany() {
    const company = {
        id: 1,
        name: "Instituto Xavier",
        fantasyName: "X-Men",
        cnpj: "1111111111",
        address: "rua top"
    }

    try {
        const result = await prismaClient.company.create({
            data: company
        })

        console.log('created: ', result)
    } catch (error) {
        console.log('error: ', error)
    }
}


import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            email: 'a@a.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Test User'
        },
    });

    await prisma.user.create({
        data: {
            email: 'b@b.com',
            password: await bcrypt.hash('123456', 10),
            name: 'Admin User',
        },
    });

    console.log('Seed data inserted');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

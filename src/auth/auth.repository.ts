import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthRepository {   

    constructor(private prisma: PrismaClient) {}

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

}
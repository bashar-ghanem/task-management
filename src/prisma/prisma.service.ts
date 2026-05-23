import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(private readonly configService: ConfigService) {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const adapter = new PrismaPg({ connectionString: databaseUrl });
        super({ adapter: adapter });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async createTask(userId: number, createTaskDto: CreateTaskDto) {
        const {title, description} = createTaskDto;
        return await this.prisma.task.create({
            data: {
                title,
                description,
                userId
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true
            }
        });
    }
}

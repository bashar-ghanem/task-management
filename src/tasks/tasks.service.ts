import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getTask(userId: number, taskId: number) {
        const task = await this.prisma.task.findFirst({
            where: {
                id: taskId,
                userId: userId
            }
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        const {userId: _, ...taskData} = task;
        return taskData;
    }

    async getAllTasks(userId: number) {
        const tasks = await this.prisma.task.findMany({
            where: {
                userId: userId
            }
        });
        return tasks.map(({userId: _, ...taskData}) => taskData);
    }
}

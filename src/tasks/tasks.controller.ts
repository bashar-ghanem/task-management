import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
        const userId = req.user.id;
        return this.tasksService.createTask(userId, createTaskDto);
    }
}

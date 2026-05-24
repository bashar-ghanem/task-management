import { Body, Controller, Get, Post, Req, UseGuards, Param } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
        const userId = req.user.id;
        return this.tasksService.createTask(userId, createTaskDto);
    }

    @Get(':id')
    getTask(@Param('id') id: string, @Req() req: any) {
        const userId = req.user.id;
        return this.tasksService.getTask(userId, Number(id));
    }

    @Get()
    getAllTasks(@Req() req: any) {
        const userId = req.user.id;
        return this.tasksService.getAllTasks(userId);
    }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dtos/updateTodo.dto';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiResponse({
    status: 201,
    description: '투두 생성',
    type: Todo,
  })
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodo(createTodoDto);
  }

  @ApiResponse({
    status: 200,
    description: '투두 가져오기',
    type: Todo,
  })
  @Get()
  async getTodo() {
    return await this.todoService.getTodos();
  }

  @ApiParam({
    name: 'todoId',
    required: true,
    description: '투두리스트 아이디',
  })
  @Put('/:todoId')
  async updatTodoDto(
    @Param() param: { todoId: string },
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(param, updateTodoDto);
  }

  @ApiParam({
    name: 'todoId',
    required: true,
    description: '투두리스트 삭제',
  })
  @Delete('/:todoId')
  async deleteTodo(@Param() param: { todoId: string }) {
    return await this.todoService.deleteTodo(param);
  }

  @ApiResponse({
    status: 200,
    description: '투두 완료 처리',
    type: Todo,
  })
  @ApiParam({
    name: 'todoId',
    required: true,
    description: '토글컴플리트 변경',
  })
  @Put('complete/:todoId')
  async toggleComplete(@Param() param: { todoId: string }) {
    return await this.todoService.toggleComplete(param);
  }
}

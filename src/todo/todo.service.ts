import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}
  async createTodo(CreateTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(CreateTodoDto);
  }
  async getTodos() {
    return await this.todoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async updateTodo(param, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: param.todoId,
      },
    });
    if (!updateTodoDto.title && !updateTodoDto.desc) {
      throw new HttpException('한 가지 값이 필요합니다.', HttpStatus.FORBIDDEN);
    }
    todo.title = updateTodoDto.title;
    todo.desc = updateTodoDto.desc;

    return this.todoRepository.save(todo);
  }

  async deleteTodo(param: { todoId: string }) {
    return await this.todoRepository.delete(param.todoId);
  }

  async toggleComplete(param: { todoId: string }) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: +param.todoId,
      },
    });
    todo.isComplete = !todo.isComplete;
    return await this.todoRepository.save(todo);
  }
}

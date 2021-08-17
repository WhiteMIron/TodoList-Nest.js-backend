import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Todo } from '../entities/todo.entity';

export class UpdateTodoDto extends PickType(Todo, ['title', 'desc'] as const) {
  @IsOptional()
  title: string;

  @IsOptional()
  desc: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Common } from 'src/common/entities/common.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({
    example: 'Eat',
    description: '투두리스트이 타이틀',
  })
  @Column('varchar')
  title: string;

  @IsString()
  @ApiProperty({
    example: 'Eat hamberger',
    description: '투두리스트이 설명',
  })
  @Column('varchar')
  desc: string;

  @Column('boolean', { default: false })
  isComplete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

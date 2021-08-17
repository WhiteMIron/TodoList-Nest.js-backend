import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Common{
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    creactedAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}
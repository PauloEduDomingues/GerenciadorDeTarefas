import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Task } from "./Task"

@Entity()
export class TaskDetail {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    expectedStartDate: Date

    @Column()
    expectedEndDate: Date

    @Column()
    description: string

    @OneToOne(()=>Task, (task)=> task.taskDetail)
    @JoinColumn()
    task: Task

}
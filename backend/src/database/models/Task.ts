import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm"
import { User } from "./User"
import { TaskDetail } from "./TaskDetail"

enum Stage {
    TODO = 0,
    INPRORESS = 1,
    COMPLETED = 2
}

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum: Stage,
        default: Stage.TODO
    })
    stage?: Stage

    @ManyToOne(()=>User, (user)=>user.tasks, {eager: true})
    user: User

    @OneToOne(()=>TaskDetail, (taskDetail)=>taskDetail.task, {eager: true, cascade: true})
    taskDetail: TaskDetail

    toJSON() {
        return {
            id: this.id,
            userId: this.user.id,
            name: this.name,
            stage: this.stage,
            taskDetail: this.taskDetail
        }
    }
}

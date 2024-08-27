import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    date: Date

    @Column({nullable: true})
    description: string

    @Column({default: false})
    isFinished?: boolean

    @ManyToOne(()=>User, (user)=>user.tasks)
    user: User
}

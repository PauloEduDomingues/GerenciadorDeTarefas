import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Task } from "./Task"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @OneToMany(()=>Task, (task)=> task.user)
    tasks: Task[]

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
        }
    }
}

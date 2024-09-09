import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

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
    
    @Column()
    description: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date


    @ManyToOne(()=>User, (user)=>user.tasks, {eager: true})
    user: User

    toJSON() {
        return {
            id: this.id,
            userId: this.user.id,
            name: this.name,
            stage: this.stage,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate
        }
    }
}

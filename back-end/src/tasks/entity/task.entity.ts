import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Project } from "../../project/entity/project.entity"

@Entity({name: "Tasks"})
export class Task {
    constructor(
        id: string,
        name: string,
        description: string,
        completed: boolean,
        deadline: string,
        createdAt: string, 
        updatedAt: string,
        projectId: string
    ){
        this.id = id
        this.name = name
        this.description = description
        this.completed = completed
        this.deadline = deadline
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.projectId = projectId
    }

    @PrimaryColumn({type: 'varchar'})
    id: string

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'boolean'})
    completed: boolean

    @Column({type: 'date'})
    deadline: string

    @Column({ type: "timestamp" })
    createdAt: string 

    @Column({ type: "datetime" })
    updatedAt: string

    @Column({ type: "varchar" })
    // @ManyToOne(() => Project, (project) => project.id)
    projectId?: string
}
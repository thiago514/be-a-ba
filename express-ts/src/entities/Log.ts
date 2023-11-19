import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @Column()
  userAgent: string

  @Column()
  origin: string

  @Column()
  method: string

  @Column({ nullable: true })
  body: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ManyToOne(() => User, user => user.logs,{
    onDelete: 'CASCADE'
  })
  user: User
}

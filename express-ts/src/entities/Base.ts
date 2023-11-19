import { Column, PrimaryGeneratedColumn } from 'typeorm'

export abstract class Base {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdat: Date
}

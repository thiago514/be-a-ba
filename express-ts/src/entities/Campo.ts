import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Tabela } from './Tabela'

@Entity()
export class Campo extends Base {
    @Column()
    nome: string

    @Column({
        type: 'enum',
        enum: ['int', 'float', 'datetime', 'bool', 'text']
    })
    tipo: string

    @Column()
    permite_nulo: boolean

    @ManyToOne(() => Tabela, tabela => tabela.campos, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    tabela: Tabela
}

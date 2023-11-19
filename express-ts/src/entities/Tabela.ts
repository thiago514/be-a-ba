import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Template } from './Template'
import { Campo } from './Campo'

@Entity()
export class Tabela extends Base {
    @Column()
    nome: string

    @ManyToOne(() => Template, template => template.tabelas, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    template: Template

    @OneToMany(() => Campo, campo => campo.tabela, {
        nullable: false,
    })
    campos: Campo[]
}

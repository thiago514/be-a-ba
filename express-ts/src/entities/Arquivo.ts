import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { User } from './User'
import { Template } from './Template'

@Entity()
export class Arquivo extends Base {
    @Column()
    nome: string

    @Column()
    caminho_arquivo: string

    @ManyToOne(() => User, user => user.arquivos, {
        nullable: false
    })
    user: User

    @ManyToOne(() => Template, template => template.arquivos, {
        nullable: false
    })
    template: Template

    @Column()
    categoria: string
}

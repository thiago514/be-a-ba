import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { User } from './User'
import { Tabela } from './Tabela'
import { Arquivo } from './Arquivo'

@Entity()
export class Template extends Base {
    @Column()
    nome: string

    @Column({
        type: 'enum',
        enum: ['ativo', 'inativo', 'excluido', 'pendente']
    })
    status: string

    @Column({ type: 'varchar', length: 4 })
    extencao_do_arquivo: string

    @ManyToOne(() => User, user => user.templates)
    user: User

    @OneToMany(() => Tabela, tabela => tabela.template,{
        onDelete: 'CASCADE'
    })
    tabelas: Tabela[]

    @OneToMany(() => Arquivo, arquivo => arquivo.template)
    arquivos: Arquivo[]
}

import { Entity, Column, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Template } from './Template'
import { Arquivo } from './Arquivo'
import { Log } from './Log'

@Entity()
export class User extends Base {
  @Column()
  nome: string

  @Column({
    unique: true
  })
  matricula: string

  @Column({
    type: 'enum',
    enum: ['admin', 'basic', 'desativado'],
    nullable: true
  })
  tipo: string

  @Column()
  email: string

  @Column()
  senha: string

  @OneToMany(() => Template, template => template.user, {
    nullable: false
  })
  templates: Template[]

  @OneToMany(() => Arquivo, arquivo => arquivo.user, {
    nullable: false
  })
  arquivos: Arquivo[]

  @OneToMany(() => Log, log => log.user, {
    nullable: true
    })
  logs: Log[]

  token: string
}

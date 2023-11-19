import { DataSource } from 'typeorm'
import { User } from '../entities/User'
import { Template } from '../entities/Template'
import { Tabela } from '../entities/Tabela'
import { Campo } from '../entities/Campo'
import { Arquivo } from '../entities/Arquivo'
import { Log } from '../entities/Log'

export const conn = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '5149',
  database: 'QQTech',
  schema: 'be-a-ba',
  logging: true,
  synchronize: true,
  entities: [User, Template, Tabela, Campo, Arquivo, Log]
})

export default conn

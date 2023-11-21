import conn from './src/configs/db'
import * as express from 'express'
import * as cors from 'cors'
import { User } from './src/entities/User'
import { IsNull, Not } from 'typeorm'
import userRouter from './src/routers/UserRouter'
import { hashSync } from 'bcrypt'
import templateRouter from './src/routers/TemplateRouter'
import { idUsuario } from './src/resource/auth'
import { Log } from './src/entities/Log'

const app = express()
app.use(async (req, res, next) => {
  const logRepository = conn.getRepository(Log)
  const log = new Log()
  log.url = req.url
  log.userAgent = req.headers['user-agent'] || ''
  log.origin = req.headers.origin || ''
  log.method = req.method
  log.body = JSON.stringify(req.body)
  if (req.headers.token != null && req.headers.token !== '') {
    console.log('tem token')
    const userId = idUsuario(String(req.headers.token))
    const user = await conn.getRepository(User).findOne({where: {id: userId}});
    log.user = user || new User();
  }
  if (log.method !== 'OPTIONS') {
    void logRepository.save(log)
  }
  console.log(log)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

console.log('iniciando o database')
conn.initialize().then(() => {
  console.log('Database connected...------\n\n\n\n\n\n ')
  conn
    .synchronize()
    .then(() => {
      console.log('Database synchronized... ')
      app.listen(3000)
    })
    .catch(err => {
      console.log('Error: ' + err)
    })
}).catch(err => {
  console.log('Error: ' + err)
})

// Routes
app.use('/user', userRouter)
app.use('/template', templateRouter)

app.get('/', (req, res) => {
  const senha = hashSync('1234', 8)
  conn.getRepository(User).save({
    nome: 'basic',
    email: 'basic@basic',
    senha,
    matricula: '3344',
    tipo: 'admin'
  }).then((e) => {
    console.log(e)
  }).catch((err) => {
    console.log(err)
  })

  conn
    .getRepository(User)
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      nome: 'admin',
      email: 'admin@admin',
      senha,
      matricula: '1234',
      tipo: 'admin'
    })
    .execute()
    .then((e) => {
      conn
        .getRepository(User)
        .findOne({ where: { email: 'admin@admin', tipo: Not(IsNull()) } })
        .then((e) => {
          console.log(e)
          res.status(201).json(e)
        })
        .catch((err) => {
          res.status(500).json(err)
        })
    })
    .catch((err) => {
      res.status(500).json(err)
    })
})

export default app

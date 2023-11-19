import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { User } from '../entities/User'
import conn from '../configs/db'
import { And, IsNull, Not } from 'typeorm'
import jwtDecode from 'jwt-decode'

const userRepository = conn.getRepository(User)

interface dataToken {
    id: number
    tipo: string
}

export async function gerarJWT (matricula: string, senha: string) {
    console.log('gerarJWT')
    console.log('matricula: ' + matricula + ' senha: ' + senha)
    return await userRepository.findOne({ where: { matricula, tipo: And(Not(IsNull()), Not('desativado')) } }).then((user) => {
        console.log(user)
        if (user == null) {
            throw Error('Usuário não encontrado')
        }
        if (bcrypt.compareSync(senha, user.senha)) {
            console.log('senha correta')
            user.token = jwt.sign({ id: user.id, tipo: user.tipo }, '1234', { expiresIn: '24h' })
            console.log(user)
            return user
        }
        throw Error('Senha incorreta')
    })
}

export function usuarioADM (req, res, next): void {
    console.log('usuarioADM')
    try {
        console.log(req.headers.token)
        const token: dataToken = jwtDecode(req.headers.token)
        const tipo = token.tipo
        console.log('tipo dentro da funcão usuarioADM: ' + tipo)
        if (tipo !== 'admin') {
            return res.status(401).json({ mensagem: 'Usuário não autorizado' })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export function idUsuario (token: string): number {
    const jsonToken: dataToken = jwtDecode(token)
    console.log(jsonToken)
    return jsonToken.id
}

export function usuarioAutorizado (req, res, next): void {
    try {
        const token = req.headers.token
        if (jwt.verify(token, '1234')) {
            console.log('token válido')
            next()
            return
        }
        res.status(401).json({ mensagem: 'Usuário não autorizado' })
    } catch (error) {
        console.log(error)
        res.status(401).json({ mensagem: 'jwt inválido' })
    }
}

import { idUsuario } from '../resource/auth'
import UserService from '../service/UserService'

class UserController {
    static async registar (req, res): Promise<any> {
        try {
            console.log(res)
            const { nome, senha, email, matricula } = req.body
            const user = await UserService.registar(nome, senha, email, matricula)
            return res.status(201).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async permitirUsuario (req, res): Promise<any> {
        try {
            console.log('Body da requisição permitir usuario: ' + req.body)
            const { id, tipo } = req.body
            const user = await UserService.permitirUsuario(id, tipo)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async login (req, res) {
        console.log('logando')
        try {
            const { matricula, senha } = req.body
            await UserService.login(matricula, senha).then((user) => {
            console.log(user)
            console.log('retornando o user')
            return res.status(200).json({ user: user, mensagem: 'Login realizado com sucesso' })
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletar (req, res): Promise<any> {
        try {
            const { id } = req.params
            await UserService.deletar(id).then(() => {
                return res.status(200).json({
                    mensagem: 'Usuário deletado com sucesso'
                })
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async listarUsuariosPendentes (req, res): Promise<any> {
        try {
            const users = await UserService.listarUsuariosPendentes()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async listarUsuarios (req, res): Promise<any> {
        try {
            const users = await UserService.listarUsuarios()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async alterarStatus (req, res): Promise<any> {
        try {
            const { id, tipo } = req.body
            if (tipo !== 'admin' && tipo !== 'basic' && tipo !== 'desativado') {
                return res.status(400).json({
                    mensagem: 'Tipo inválido'
                })
            }
            if (id === idUsuario(req.headers.token)) {
                return res.status(400).json({
                    mensagem: 'Não é possível alterar o status do próprio usuário'
                })
            }
            const user = await UserService.alterarStatus(id, tipo)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async alterarMeuUsuario (req, res): Promise<any> {
        try {
            console.log('alterando meu usuario')
            
            const id = idUsuario(req.headers.token)
            const { nome, email, matricula, senhaAntiga, senha } = req.body
            console.log(senhaAntiga)
            if (senhaAntiga === '' ||
                senhaAntiga === null ||
                senhaAntiga === undefined
                ) {
                const user = await UserService.alterarUsuario(id, nome, email, matricula, null)
                return res.status(200).json(user)
            }
            const user = await UserService.alterarMeuUsuario(id, nome, email, matricula, senhaAntiga, senha)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async alterarUsuario (req, res): Promise<any> {
        try {
            console.log('alterando usuario')
            const { id, nome, email, matricula, tipo } = req.body
            const user = await UserService.alterarUsuario(id, nome, email, matricula, tipo)
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async tokenValido (req, res): Promise<any> {
        try {
            return res.status(200).json({
                mensagem: 'Token válido'
            })
        } catch (error) {
            return res.status(401).json(error.message)
        }
    }

    static async usuarioADM (req, res): Promise<any> {
        try {
            return res.status(200).json({
                mensagem: 'Usuário autorizado'
            })
        } catch (error) {
            return res.status(401).json(error.message)
        }
    }
}

export default UserController

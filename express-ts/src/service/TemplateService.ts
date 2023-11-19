import { And, Equal, Not } from 'typeorm'
import conn from '../configs/db'
import { Campo } from '../entities/Campo'
import { Tabela } from '../entities/Tabela'
import { Template } from '../entities/Template'

class TemplateService {
  static criarTemplate (templateCompleto, id): any {
    const templateRespository = conn.getRepository(Template)
    const tabelaRepository = conn.getRepository(Tabela)
    const campoRepository = conn.getRepository(Campo)

    const template = new Template()
    template.nome = templateCompleto.nome
    template.extencao_do_arquivo = templateCompleto.extencao_do_arquivo
    template.status = 'pendente'
    template.user = id
    templateRespository.save(template).then((e) => {
      template.tabelas = templateCompleto.tabelas.map((tabela) => {
        const tabelaDoTemplate = new Tabela()
        tabelaDoTemplate.template = e
        tabelaDoTemplate.nome = tabela.nome
        console.log("salvando template")
        tabelaRepository.save(tabelaDoTemplate).then((e) => {
          tabelaDoTemplate.campos = tabela.campos.map(async (campo) => {
            const campoDaTabela = new Campo()
            campoDaTabela.tabela = e
            campoDaTabela.nome = campo.nome
            campoDaTabela.tipo = campo.tipo
            campoDaTabela.permite_nulo = campo.permite_nulo
            console.log(campoDaTabela)
            return await campoRepository.save(campoDaTabela).then((e) => {
              return e
            }
            )
          })
        }).catch((e) => {
          throw e
        })
        return tabelaDoTemplate
      })
    }).catch((e) => {
      throw e
    })
    return template
  }

  static async listarTemplates (id: any = null): Promise<any> {
    const templateRespository = conn.getRepository(Template)
    let templateFinal: Template[] = []
    if (id != null) {
      console.log('id_usuario: ' + id)
      templateFinal = await templateRespository.find({
        select: {
          user: {
            nome: true
          }
        },
        relations: {
          user: true,
          tabelas: {
            campos: {}
          }
        },
        where: {
          user: {
            id
          },
          status: Not(Equal('excluido'))
        }
      }).then(e => {
        console.log(e)
        return e
      })
      return templateFinal
    }
      templateFinal = await templateRespository.find({
        select: {
          user: {
            nome: true
          }
        },
        relations: {
          user: true,
          tabelas: {
            campos: {}
          }
        },
         where: {
          status: And(Not(Equal('excluido')), Not(Equal('pendente')))
        }
      }).then(e => {
        console.log(e)
        return e
      })
      return templateFinal
  }

  static async listarTemplatesPendentes (): Promise<any> {
    const templateRespository = conn.getRepository(Template)
      let templateFinal: Template[] = []

      templateFinal = await templateRespository.find({
        select: {
          user: {
            nome: true
          }
        },
        relations: {
          user: true,
          tabelas: true
        },
        where: {
          status: Equal('pendente')
        }
      }).then(e => {
        console.log(e)
        return e
      })
      return templateFinal
  }

  static async listarTemplatesAtivos (): Promise<any> {
    const templateRespository = conn.getRepository(Template)
      const userTemplate = await templateRespository.find({
        select: {
          nome: true,
          id: true
        },
        where: {
          status: 'ativo'
        }
      }).then(e => {
        console.log(e)
        return e
      })

      return userTemplate
  }

  static async alterarStatusTemplate (id, status): Promise<any> {
    const templateRespository = conn.getRepository(Template)
      if (status !== 'ativo' && status !== 'inativo' && status !== 'excluido' && status !== 'pendente') {
        throw new Error('Status inválido')
      }

      const template = await templateRespository.update(id, { status })
      return template
  }
}

export default TemplateService

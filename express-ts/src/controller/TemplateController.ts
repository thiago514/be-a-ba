import { idUsuario } from '../resource/auth.js'
import TemplateService from '../service/TemplateService.js'
class TemplateController {
  static async criarTemplate (req, res): Promise<any> {
    const id = idUsuario(req.headers.token)
    console.log(req.headers.token)

    console.log(req.body)
    const templateCompleto = req.body
    const tabelasDoTemplate = templateCompleto.tabelas

    if (
      !templateCompleto.nome||
      !templateCompleto.extencao_do_arquivo ||
      !tabelasDoTemplate
      ) {
      res.status(400).json({
        erro: 'Requisição mal formatada'
     })
      return
    }

    if (
      templateCompleto.extencao_do_arquivo === 'CSV' &&
      tabelasDoTemplate.length > 1
    ) {
      res.status(400).json({ erro: 'Arquivos CSV só podem ter uma tabela' })
      return
    }
    try {
    for (let i = 0; i < tabelasDoTemplate.length; i++) {
      const tabela = tabelasDoTemplate[i]
      console.log(tabela.campos)
      for (let j = 0; j < tabela.campos.length; j++) {
        const campo = tabela.campos[j]
        const verificacao = tabela.campos.filter((e) => {
          return e.nome === campo.nome
        })
        console.log(verificacao.length)
        if (verificacao.length > 1) {
          console.log('tem mais de uma coluna com o mesmo nome')
          throw Error('Não pode haver campos com o mesmo nome')
        }
      }
    }
    } catch (error) {
      res.status(400).json(error.message)
      return
    }

    try {
      await TemplateService.criarTemplate(templateCompleto, id)
    } catch (error) {
      res.status(400).json(error.message)
      return
    }

    res.status(201).json(templateCompleto)
  }

  static async listarTodosTemplates (req, res): Promise<any> {
    try {
      const templates = await TemplateService.listarTemplates()
      res.status(200).json(templates)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  static async visualizarTemplateUser (req, res): Promise<any> {
    const id = idUsuario(req.headers.token)
    try {
      const template = await TemplateService.listarTemplates(id)
      res.status(200).json(template)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async visualizarTemplatesAtivos (req, res): Promise<any> {
    try {
      const templates = await TemplateService.listarTemplatesAtivos()
      res.status(200).json(templates)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async listarTemplatesPendentes (req, res): Promise<any> {
    try {
      const templates = await TemplateService.listarTemplatesPendentes()
      res.status(200).json(templates)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

  static async alterarStatus (req, res): Promise<any> {
    try {
      const { id, status } = req.body
      const template = await TemplateService.alterarStatusTemplate(id, status)
      res.status(200).json(template)
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
}

export default TemplateController

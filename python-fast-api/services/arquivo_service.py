import datetime
import io
import os
import uuid
from numpy import dtype
import xlsxwriter
from sqlalchemy import delete, select
from models.models import *
import pandas as pd
from models.models import engine


def gerar_arquivo_template(id_template: int):
    with Session(engine) as session:
        print("gerando arquivo")
        template = session.execute(select(Template).where(
            Template.id == id_template).limit(1)).one()[0]
        print(template)
        buffer = io.BytesIO()
        buffer.name = template.nome + '.' + template.extencao_do_arquivo
        if (template.extencao_do_arquivo == 'XLSX' or template.extencao_do_arquivo == 'XLS'):
            workbook = xlsxwriter.Workbook(buffer)

            tabelas = session.query(Tabela).filter(
                Tabela.templateId == id_template).all()
            for tabela in tabelas:
                print("tabela " + tabela.nome)
                worksheet = workbook.add_worksheet(tabela.nome)
                campos = session.query(Campos).filter(
                    Campos.tabelaId == tabela.id).all()
                for i, campo in enumerate(campos):
                    print("campo " + campo.nome)
                    print("tipo " + campo.tipo)
                    worksheet.write(0, i, campo.nome)
                    for n in range(1, 100):
                        formato = workbook.add_format()
                        formato.set_num_format(formato_celula(campo.tipo))
                        worksheet.write(
                            n, i, formato_celula(campo.tipo), formato)
            workbook.close()
        else:
            print("csv")
            tabela = session.execute(select(Tabela).where(
                Tabela.templateId == template.id)).one()[0]
            print(tabela.id)
            campos = session.execute(select(Campos).where(
                Campos.tabelaId == tabela.id)).all()
            
            print("gerando dataFrame")
            df = pd.DataFrame(columns=[campo[0].nome for campo in campos])
            df.to_csv(buffer, index=False)
            print(buffer.getvalue().decode('utf-8'))
        print("arquivo gerado")

        return buffer


def formato_celula(formato: str):
    if formato == 'datetime':
        return 'yyyy-mm-dd'
    elif formato == 'bool':
        return 'BOOLEAN'
    elif formato == 'int':
        return '0'
    elif formato == 'float':
        return '0.00'
    else:
        return '@'


def formato_celula_to_dtype(formato: str):
    if formato == 'datetime':
        return 'datetime64[ns]'
    elif formato == 'bool':
        return 'bool'
    elif formato == 'int':
        return 'int64'
    elif formato == 'float':
        return 'float64'
    else:
        return 'object'


def validar_arquivo(id_template: int, caminho_arquivo):
    print("validando arquivo service")
    with Session(engine) as session:
        template = session.execute(select(Template).where(
            Template.id == id_template).where(Template.status == "ativo").limit(1)).one()[0]
        if (template.extencao_do_arquivo == 'XLSX' or template.extencao_do_arquivo == 'XLS'):
            if(".CSV" in caminho_arquivo.upper()):
                raise Exception("Arquivo não é um excel")
            validadando_arquivo_excel(template, caminho_arquivo)
        else:
            if( '.CSV' not in caminho_arquivo.upper()):
                raise Exception("Arquivo não é um CSV")
            validar_arquivo_csv(template, caminho_arquivo)
    return True


def validadando_arquivo_excel(template, caminho_arquivo):
    print("xlsx")
    try:
        with Session(engine) as session:
            tabelas = session.query(Tabela).filter(
                Tabela.templateId == template.id).all()
            df = []
            with open(caminho_arquivo, 'rb') as arquivo:
                # Salvando as tabelas em um DataFrame
                if (len(tabelas) == 1):
                    df.append(pd.read_excel(caminho_arquivo))
                else:
                    print("mais de uma tabela")
                    print(caminho_arquivo)
                    for tabela in tabelas:
                        df.append(pd.read_excel(arquivo, sheet_name=tabela.nome))

            if (len(tabelas) != len(df)):
                raise Exception("Quantidade de tabelas diferente")

            # Validação das tabelas
            for i, tabela in enumerate(tabelas):
                print("tabela " + tabela.nome)
                campos = session.query(Campos).filter(Campos.tabelaId == tabela.id).all()

                if (len(campos) != len(df[i].columns)):
                    raise Exception("Quantidade de campos diferente na tabela" + tabelas[i].nome)
                print(campos)
                for campo in campos:

                    # Verificando Nome do campo
                    if not campo.nome in df[i].columns:
                        raise Exception(
                            "Nome do campo diferente na tabela" + tabela.nome)

                    # Verificando se o campo permite null
                    if (not campo.permite_nulo):
                        if (df[i][campo.nome].isnull().sum() > 0 or df[i][campo.nome].isna().sum() > 0):
                            print("erro nulo")
                            raise Exception(str.format("Campo {nome} com valores nulos", nome = campo.nome))
                    elif (campo.tipo == 'bool'):
                        print("lidando com bool " + campo.nome)
                        # É necessario essa etapa já que caso tenha algum valor nulo
                        # o pandas deixa como object ao invés de bool
                        df[i][campo.nome] = df[i][campo.nome].astype('bool')
                        
                   
                    if(campo.tipo == 'bool' and df[i][campo.nome].dtype == 'int64'):
                        df[i][campo.nome] = df[i][campo.nome].astype('bool')

                    if(campo.tipo == 'datetime'):
                        df[i][campo.nome] = pd.to_datetime(df[i][campo.nome], errors='coerce')
                        print(df[i][campo.nome])
                    # Verificando tipo do campo
                    if (df[i].dtypes.to_dict()[campo.nome] != dtype(formato_celula_to_dtype(campo.tipo))):
                        print("erro tipo campo " + campo.nome)
                        print(df[i])
                        print(dtype(formato_celula_to_dtype(campo.tipo)))
                        raise Exception("Tipo de campo incorreto " + campo.nome)
                        

                    print("campo " + campo.nome)
                    print("tipo " + campo.tipo)
                print("tabela validada")
                
                
                
        print("arquivo validado")
        return True
    except Exception as e:
        print(e)
        raise Exception(e)


def validar_arquivo_csv(template, caminho_arquivo):
    try:
        with Session(engine) as session:
            print("csv")
            tabela = session.execute(select(Tabela).where(
                Tabela.templateId == template.id).limit(1)).one()[0]

            campos = session.query(Campos).filter(Campos.tabelaId == tabela.id).all()

            df = pd.read_csv(caminho_arquivo)
            print("mostrando tabela")
            print(tabela.nome)
            print("mostrando Campos")
            
            for campo in campos:
                print(campo.nome)
            
            for campo in campos:
                print("campo " + campo.nome)
                print("tipo " + campo.tipo)
                # Verificando Nome do campo
                if not campo.nome in df.columns:
                    print("erro nome campo")
                    raise Exception(
                        "Nome do campo diferente na tabela" + tabela.nome)
                
                # Verificando se o campo permite null
                if (not campo.permite_nulo):
                    print("Campo não permite nulo")
                    if (df[campo.nome].isnull().sum() > 0 or df[campo.nome].isna().sum() > 0):
                        print("erro nulo")
                        raise Exception(str.format("Campo {nome} com valores nulos", nome = campo.nome))
                elif (campo.tipo == 'bool'):
                    print("lidando com bool " + campo.nome)
                    # É necessario essa etapa já que caso tenha algum valor nulo
                    # o pandas deixa como object ao invés de bool
                    df[campo.nome] = df[campo.nome].astype('bool')
                    
                if(campo.tipo == 'text'):
                    return True
                if(campo.tipo == 'bool' and df[campo.nome].dtype == 'int64'):
                    
                    df[campo.nome] = df[campo.nome].astype('bool')

                if(campo.tipo == 'datetime'):
                    df[campo.nome] = pd.to_datetime(df[campo.nome], errors='coerce')
                    print(df[campo.nome])
                    
                # Verificando tipo do campo
                if (df.dtypes.to_dict()[campo.nome] != dtype(formato_celula_to_dtype(campo.tipo))):
                    print("erro tipo campo " + campo.nome)
                    print(dtype(formato_celula_to_dtype(campo.tipo)))
                    raise Exception("Tipo de campo incorreto " + campo.nome)
                    

                
            print("tabela validada")
            
            return True
    except Exception as e:
        print(e)
        raise Exception(e)
            

async def salvar_arquivo(id_template: int, arquivo: bytes, filename: str, id_usuario: int, categoria: str):
    id = str(uuid.uuid4())
    nome_arquivo = filename.split(".")
    print(id_template)
    print(filename)
    print(id_usuario)
    if not os.path.exists(f"arquivos/{categoria}"):
        os.makedirs(f"arquivos/{categoria}")
        
    with open(f"arquivos/{categoria}/{id}.{nome_arquivo[1]}", "wb") as f:
        f.write(arquivo)

    arquivo = Arquivo()
    arquivo.nome = nome_arquivo[0]+"."+nome_arquivo[1]
    arquivo.caminho_arquivo = "arquivos/"+ categoria +"/"+ id + "." + nome_arquivo[1]
    arquivo.createdat = datetime.datetime.now()
    arquivo.updatedat = datetime.datetime.now()
    arquivo.templateId = id_template
    arquivo.userId = id_usuario
    arquivo.categoria = categoria
    with Session(engine) as session:
        session.add(arquivo)
        session.commit()
    return True


def get_all_arquivos():
    query = select(Arquivo.id, Arquivo.nome, Arquivo.createdat, Template.nome,
                   User.nome,Arquivo.categoria).join(User, User.id == Arquivo.userId).join(Template, Template.id == Arquivo.templateId).order_by(Arquivo.createdat.desc())
    print(query)
    with Session(engine) as session:
        arquivos = session.execute(query).all()
    lista_arquivos = []
    for row in arquivos:
        arq = {
            "id": row[0],
            "nome_arquivo": row[1],
            "data_criacao": row[2].strftime("%d/%m/%Y"),
            "nome_template": row[3],
            "nome_usuario": row[4],
            "categoria": row[5]
        }
        lista_arquivos.append(arq)
    return lista_arquivos


def listar_arquivos_usuario(id_usuario: int):
    query = select(Arquivo.id, Arquivo.nome, Arquivo.createdat, Template.nome,
                User.nome, Arquivo.categoria).join(User, User.id == Arquivo.userId).join(Template, Template.id == Arquivo.templateId).order_by(Arquivo.createdat.desc()).where(Arquivo.userId == id_usuario)
    with Session(engine) as session:
        arquivos = session.execute(query).all()
    lista_arquivos = []
    for row in arquivos:
        arq = {
            "id": row[0],
            "nome_arquivo": row[1],
            "data_criacao": row[2].strftime("%d/%m/%Y"),
            "nome_template": row[3],
            "nome_usuario": row[4],
            "categoria": row[5]
        }
        lista_arquivos.append(arq)
    return lista_arquivos


def get_arquivo(id):
    query = select(Arquivo).where(Arquivo.id == id)
    with Session(engine) as session:
        arquivo = session.execute(query).first()[0]
    with open(arquivo.caminho_arquivo, 'rb') as f:
        buffer = io.BytesIO(f.read())
        buffer.name = arquivo.nome
        return buffer


def deletar_arquivo(id):
    with Session(engine) as session:
        print(id)
        try:
            data_arquivo = session.execute(
                select(Arquivo).where(Arquivo.id == id)).first()[0]
            print(data_arquivo)
            os.remove(data_arquivo.caminho_arquivo)

            query = delete(Arquivo).where(Arquivo.id == id)
            with Session(engine) as session:
                session.execute(query)
                session.commit()
        except Exception as e:
            print(e)
            raise Exception(e)
    return True

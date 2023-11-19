from datetime import datetime, timedelta
from models.Dashboard import Card, Dashboard, KeyValueChart
from models.models import Tabela, engine, User, Arquivo, Template, Campos, Log
from sqlalchemy.orm import Session
from sqlalchemy import func, select


def gerar_dashboard():
    dashboard = Dashboard()

    # Gerando analise de dados referente a usuarios
    with Session(engine) as session:
        # Total de usuarios
        query = select(User)
        users = session.execute(query).all()
        total_users = len(users)
        dashboard.addCard(Card("Total de usuários", "Total de usuários cadastrados no sistema", total_users))


        # Grafico tipos de usuario
        query = select(User.tipo, func.count(User.id)).group_by(User.tipo).where(User.tipo != None)
        users = session.execute(query).all()
        tipos = []
        for user in users:
                tipos.append({
                    "name": user[0],
                    "value" : user[1]})
        
        
        dashboard.addChart(KeyValueChart("Tipos de usuários", tipos))

    


        # Gerando analise de dados referente a Templates
        # Total de templates
        query = select(Template)
        templates = session.execute(query).all()
        total_templates = len(templates)
        dashboard.addCard(Card("Total de templates", "Total de templates cadastrados no sistema", total_templates))

        # Grafico tipos de templates
        query = select(Template.extencao_do_arquivo, func.count(Template.id)).group_by(Template.extencao_do_arquivo)
        templates = session.execute(query).all()
        tipos = []
        for template in templates:
            tipos.append({"name" : template[0],
                          "value" : template[1]})
          
        
        dashboard.addChart(KeyValueChart("Tipos de templates", tipos))


        # status dos templates
        query = select(Template.status, func.count(Template.id)).group_by(Template.status).where(Template.status != "excluido")
        templates = session.execute(query).all()
        tipos = []
        for template in templates:
            tipos.append({
                "name" : template[0],
                "value" : template[1]})
        
        dashboard.addChart(KeyValueChart("Status dos templates", tipos))


        # Top 5 Usuarios que mais criaram templates
        query = select(User.nome, func.count(Template.userId)).join_from(Template, User).group_by(User.nome).limit(5)
        templates = session.execute(query).all()
        usuarios = []
        for template in templates:
            usuarios.append({
                "name": template[0],
                "value" : template[1]})
        
        dashboard.addChart(KeyValueChart("Usuários que mais criaram templates", usuarios))

        # Gerando analise de dados referente a Arquivos
        # Total de arquivos
        query = select(Arquivo)
        arquivos = session.execute(query).all()
        total_arquivos = len(arquivos)
        dashboard.addCard(Card("Total de arquivos", "Total de arquivos cadastrados no sistema", total_arquivos))

        # Grafico do template mais usado
        query = select(Template.nome, func.count(Arquivo.id)).join_from(Arquivo, Template).group_by(Template.nome).limit(10)
        arquivos = session.execute(query).all()
        templates = []
        for arquivo in arquivos:
            templates.append({
                "name" : arquivo[0],
                "value" : arquivo[1]})

        dashboard.addChart(KeyValueChart("Templates mais usados", templates))
        # Top 5 Usuarios que mais criaram arquivos
        query = select(User.nome, func.count(Arquivo.userId)).join_from(Arquivo, User).group_by(User.nome).limit(5)
        arquivos = session.execute(query).all()
        usuarios = []
        for arquivo in arquivos:
            usuarios.append({
                "name" : arquivo[0],
                "value" : arquivo[1]})
        
        dashboard.addChart(KeyValueChart("Usuários que mais criaram arquivos", usuarios))
        print("linha 107")
        # Gerando analise de dados referente a campos
        # # Total de Tabelas
        # query = select(Tabela)
        # tabelas = session.execute(query).all()
        # total_tabelas = len(tabelas)
        # dashboard.addCard(Card("Total de tabelas", "Total de tabelas cadastradas no sistema", total_tabelas))

        # Total de campos
        query = select(Campos)
        campos = session.execute(query).all()
        total_campos = len(campos)
        dashboard.addCard(Card("Total de campos", "Total de campos cadastrados no sistema", total_campos))

        # Grafico do tipo de campo mais usado
        query = select(Campos.tipo, func.count(Campos.id)).group_by(Campos.tipo)
        campos = session.execute(query).all()
        tipos = []
        for campo in campos:
            tipos.append({
                "name" : campo[0],
                "value" : campo[1]})

        
        dashboard.addChart(KeyValueChart("Tipos de campos mais usados", tipos))

        # relação de quantidade de campos que permitem nulo ou não
        query = select(Campos.permite_nulo, func.count(Campos.id)).group_by(Campos.permite_nulo)
        campos = session.execute(query).all()
        dados = [{
            "name" : "nao_permite_nulo",
            "value" : campos[0][1]},{
            "name": "permite_nulo",
            "value" : campos[1][1]}]

        dashboard.addChart(KeyValueChart("Quantidade de campos que permitem nulo", dados))


        # Gerando analise de dados referente a requisições
    
        # Total de requisições nos ultimos 30 dias
        
        query = select(Log).where(Log.createdAt > (datetime.now() - timedelta(days=30)))
        log = session.execute(query).all()
        total_requisicoes = len(log)
        dashboard.addCard(Card("Total de requisições", "Total de requisições nos ultimos 30 dias", total_requisicoes))

        # Grafico da quantidade requisições por dia nos ultimos 7 dias
        query = select(Log.createdAt).where(Log.createdAt > (datetime.now() - timedelta(days=7)))
        logs = session.execute(query).all()
        dias = {}
        busca = []
        for log in logs:
            busca.append(str(log[0].strftime("%d/%m/%Y") + "\n"))
            if log[0].strftime("%d/%m/%Y") not in dias:
                dias.update({log[0].strftime("%d/%m/%Y"): 1})
            else:
                print(log[0].strftime("%d/%m/%Y"))
                dias[log[0].strftime("%d/%m/%Y")] += 1
        format_output = []
        print(len(busca))
        for dia in dias:
            format_output.append({
                "name" : dia,
                "value" : dias[dia]})
        open("teste.txt", "w").write(str(busca))
        dashboard.addChart(KeyValueChart("Requisições por dia nos ultimos 7 dias", format_output))

        # top 5 URLS mais utilizadas nos ultimos 30 dias
        query = select(Log.url, func.count(Log.id)).where(Log.createdAt > datetime.now() - timedelta(days=30)).group_by(Log.url).limit(5).order_by(func.count(Log.id).desc())
        logs = session.execute(query).all()
        urls = []
        for log in logs:
            urls.append({
                "name" : log[0],
                "value": log[1]})
        
        dashboard.addChart(KeyValueChart("URLS mais utilizadas nos ultimos 30 dias", urls))

        # top 5 usuarios que mais utilizaram o sistema nos ultimos 30 dias
        query = select(User.nome, func.count(Log.id)).join_from(Log, User).where(Log.createdAt > datetime.now() - timedelta(days=30)).where(Log.userId != None).group_by(User.nome).limit(5).order_by(func.sum(Log.id).desc())
        logs = session.execute(query).all()
        usuarios = []
        for log in logs:
            usuarios.append({
                "name" : log[0],
                "value" : log[1]})
            
        dashboard.addChart(KeyValueChart("Usuários que mais utilizaram o sistema nos ultimos 30 dias", usuarios))
        print(dashboard.getJSONParceable())
        return dashboard.getJSONParceable()

    


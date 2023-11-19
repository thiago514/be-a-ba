from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

# declarative base
Base = automap_base()

engine = create_engine("postgresql+psycopg2://postgres:5149@localhost/QQTech")
# engine = create_engine("postgresql+psycopg2://postgres:postgres@postgres-network/public")

# mapeando as tabelas
Base.prepare(autoload_with=engine, schema="be-a-ba")

User=Base.classes.user
Template = Base.classes.template
Tabela = Base.classes.tabela
Campos = Base.classes.campo
Arquivo = Base.classes.arquivo
Log = Base.classes.log


# transformar em dicionario
User.to_dict = lambda self: {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
Arquivo.to_dict = lambda self: {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
Template.to_dict = lambda self: {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
Tabela.to_dict = lambda self: {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
Campos.to_dict = lambda self: {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


session = Session(engine)

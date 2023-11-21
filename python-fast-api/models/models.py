from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

DB = "QQTech"
PASSWORD = "5149"
SCHEMA = "be-a-ba"

# declarative base
Base = automap_base()

engine = create_engine("postgresql+psycopg2://postgres:"+PASSWORD+"@localhost/"+DB)
# engine = create_engine("postgresql+psycopg2://postgres:postgres@postgres-network/public")

# mapeando as tabelas
Base.prepare(autoload_with=engine, schema=SCHEMA)

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

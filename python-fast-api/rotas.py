from copy import copy
import os
from fastapi import APIRouter, Request, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, StreamingResponse
from auth.auth import token_required
from services.arquivo_service import gerar_arquivo_template, get_all_arquivos, get_arquivo, listar_arquivos_usuario, salvar_arquivo, validar_arquivo, deletar_arquivo
from services.dashboard_service import gerar_dashboard

router = APIRouter()


@router.get("/template/{template_id}", response_description="Gerar arquivo")
def gerar_template(template_id: int, request: Request):
    try:
        print("gerando arquivo")
        print(request.headers.get("token"))
        auth = token_required(request.headers.get("token"))
        print(auth)
        arquivo = gerar_arquivo_template(template_id)
        res = StreamingResponse(iter([arquivo.getvalue()]), media_type="blob", headers={
            'Content-Disposition': 'attachment;',
            'filename': arquivo.name,
            'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        return res
    except Exception as e:
        print(e)
        return JSONResponse({"message": "Erro no servidor"}, status_code=500)
    


@router.post("/arquivo/testar", response_description="testar Arquivo")
async def testar_arquivo(request: Request):
    try:
        print("testando arquivo")
        auth = token_required(request.headers.get("token"))

        form = await request.form()
        arquivo_completo = copy(form.get("arquivo"))
        arquivo_conteudo = await arquivo_completo.read()
        # print(arquivo_conteudo)
        

        with open(arquivo_completo.filename, 'wb') as f:
            f.write(arquivo_conteudo)
        print("iniciando validador")
        validado = validar_arquivo(
            form.get("id_template"), arquivo_completo.filename)
        print("Resultado Validação" + str(validado))
        if (validado == True):
            print("arquivo está correto")
            res = Response(content="arquivo está correto", status_code=200)
        else:
            res = Response(content="não está correto", status_code=400)
        print(res)
        
        return res
    except Exception as e:
        print(e)
        return Response(content=str(e), status_code=400)
    finally:
        os.remove(arquivo_completo.filename)


@router.post("/arquivo", response_description="Salvar arquivo")
async def save_arquivo(request: Request):
    try:
        auth = token_required(request.headers.get("token"))

        id_usuario = auth.get("id")

        form = await request.form()
        arquivo_completo = copy(form.get("arquivo"))
        arquivo_conteudo = await arquivo_completo.read()

        with open(arquivo_completo.filename, 'wb') as f:
            f.write(arquivo_conteudo)

        validado = validar_arquivo(
            form.get("id_template"), arquivo_completo.filename)

        if (validado == True):
            await salvar_arquivo(id_template=form.get("id_template"), arquivo=arquivo_conteudo, filename=arquivo_completo.filename, id_usuario=id_usuario, categoria=form.get("categoria"))
            res = Response(content="salvo com sucesso", status_code=200)
        else:
            res = Response(content="não está correto", status_code=400)

        return res
    except Exception as e:
        os.remove(arquivo_completo.filename)
        return Response(content=str(e), status_code=400)


@router.get("/arquivo", description="Listar arquivos")
def listar_arquivos(request: Request):
    # try:
        token_data = token_required(request.headers.get("token"))
        lista_arquivos = []
        print(token_data)
        if (token_data.get("tipo") == "admin"):
            lista_arquivos = get_all_arquivos()
        else:
            lista_arquivos = listar_arquivos_usuario(token_data.get("id"))

        print(lista_arquivos)
        res =  JSONResponse(content=jsonable_encoder(lista_arquivos), status_code=200)
        return res
    # except Exception as e:
    #         print(e)
    #         return Response(content=str(e), status_code=400)


@router.get("/arquivo/{id}", description="download de arquivo")
def baixar_arquivo(request: Request, id: int):
    try:
        # Verificar se o arquivo é do mesmo usuario ou se o usuario é adm
        token_data = token_required(request.headers.get("token"))
        arquivo = get_arquivo(id)
        print(arquivo.name)
        res = StreamingResponse(iter([arquivo.getvalue()]), media_type="blob", headers={
            'Content-Disposition': 'attachment;',
            'filename': arquivo.name,
        })
        return res
    except Exception as e:
        print(e)
        return JSONResponse({"message": "Erro no servidor"}, status_code=500)


@router.delete("/arquivo/{id}", description="excluir de arquivo")
def del_arquivo(request: Request, id: int):
    print("deletando arquivo " + str(id))
    try:
        deletar_arquivo(id)
        return JSONResponse({"message": "Arquivo deletado"}, status_code=200)

    except Exception as e:
        return JSONResponse({"message": "Erro no servidor"}, status_code=500)


@router.get("/dashboard", description="dashboard")
def dashboard(request: Request):
    print("dashboard")
    try:
        token_required(request.headers.get("token"))
        dataDashboard = gerar_dashboard()
        print(dataDashboard)
        return JSONResponse(content=jsonable_encoder(dataDashboard), status_code=200)
    except Exception as e:
        print(e)
        return JSONResponse({"message": "Erro no servidor"}, status_code=500)

export = router

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from auth.auth import token_required
from models.models import Log, engine
from rotas import router
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse

app = FastAPI()


@app.get("/")
async def docs_redirect():
    return RedirectResponse(url='/docs')


@app.middleware("http")
async def log_requests(request: Request, call_next: callable):

    response = await call_next(request)
    print(response)
    print("fazendo log")
    
    log = Log()
    log.url = request.url.path,
    log.userAgent = request.headers.get("user-agent"),
    log.origin = request.headers.get("origin"),
    log.method = request.method,
    log.userId = None,
    log.body = None,
    if request.headers.get("token"):
        id = token_required(request.headers.get("token")).get("id")
        log.userId = id
    print("log")
    print(log)
    if(log.method != "OPTIONS"):
        with Session(engine) as session:
            session.add(log)
            session.commit()
    
    
    return response



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(router)

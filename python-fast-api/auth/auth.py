from functools import wraps
import jwt
from fastapi import Request


def token_required(token):

    if not token:
        raise Exception("Token não encontrado")
    try:
        data = jwt.decode(token, "1234", algorithms=["HS256"])
    except Exception as e:
        raise Exception("jwt inválido")
    if data is None:
        raise Exception("Invalid Authentication token!")

    return data

FROM python
COPY . .
RUN pip install --upgrade pip
RUN pip install pandas fastapi pyJWT uvicorn python-multipart sqlalchemy postgres psycopg2-binary xlsxwriter openpyxl
EXPOSE 3000
CMD uvicorn main:app
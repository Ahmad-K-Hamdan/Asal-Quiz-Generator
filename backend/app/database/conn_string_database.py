# app/database/conn_string_database.py
import os

from dotenv import load_dotenv

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_SERVER = os.getenv("DB_SERVER_NAME")

azure_sql_connection_string = (
    "Driver={ODBC Driver 18 for SQL Server};"
    f"Server=tcp:{DB_SERVER},1433;"
    f"Database={DB_NAME};"
    f"Uid={DB_USERNAME};"
    f"Pwd={DB_PASSWORD};"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
    "Connection Timeout=30;"
)

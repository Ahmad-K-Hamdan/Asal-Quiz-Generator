import os

from dotenv import load_dotenv


def get_azure_sql_string():
    # Load the enviromental variables
    load_dotenv()

    DB_USERNAME = os.getenv("DB_USERNAME")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
    DB_SERVER_NAME = os.getenv("DB_SERVER_NAME")

    # Create the Azure SQL database connection string
    AZURE_SQL_CONNECTION_STRING = (
        f"Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:{DB_SERVER_NAME},1433;"
        f"Database={DB_NAME};Uid={DB_USERNAME};Pwd={DB_PASSWORD};Encrypt=yes;"
        f"TrustServerCertificate=no;Connection Timeout=30;"
    )

    return AZURE_SQL_CONNECTION_STRING

from pydantic import BaseModel, field_validator


class ColumnOut(BaseModel):
    name: str
    type: str

    @field_validator("name")
    def validate_column_name(cls, column_name):
        if len(column_name.strip()) == 0:
            raise ValueError("Column name cannot be empty or whitespace.")
        return column_name

    @field_validator("type")
    def validate_column_type(cls, column_type):
        if len(column_type.strip()) == 0:
            raise ValueError("Column type cannot be empty.")
        return column_type

    class Config:
        orm_mode = True


class TableOut(BaseModel):
    name: str
    columns: list[ColumnOut]

    @field_validator("name")
    def validate_table_name(cls, table_name):
        if len(table_name.strip()) == 0:
            raise ValueError("Table name cannot be empty or whitespace.")
        return table_name

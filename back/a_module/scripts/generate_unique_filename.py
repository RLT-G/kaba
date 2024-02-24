import os
import uuid


# Генерация уникального имени файла
def generate_unique_filenameDef(filename):
    _, file_extension = os.path.splitext(filename)
    unique_filename = f"{uuid.uuid4().hex}{file_extension}"
    return unique_filename
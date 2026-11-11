import mysql.connector

def get_connection():

    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="student_db7"
    )

    return connection
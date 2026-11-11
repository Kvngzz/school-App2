#  pip install Flask mysql-connector-python Werkzeug

from flask import Flask, request, jsonify, session, send_from_directory
from database import get_connection
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

app.secret_key = "student_registration_secret_key"

# React build folder
FRONTEND_FOLDER = os.path.join(
    os.path.dirname(__file__),
    "frontend",
    "dist"
)


# --------------------------------
# HOME ROUTE
# --------------------------------

@app.route("/")
def home():

    return send_from_directory(FRONTEND_FOLDER, "index.html")


# --------------------------------
# STUDENT REGISTRATION
# --------------------------------

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    fullname = data.get("fullname")
    email = data.get("email")
    phone = data.get("phone")
    course = data.get("course")
    password = data.get("password")

    if not all([fullname, email, password]):
        return jsonify({
            "message": "Please fill in all required fields"
        }), 400

    hashed_password = generate_password_hash(password)

    connection = get_connection()
    cursor = connection.cursor()

    try:

        sql = """
        INSERT INTO students
        (fullname, email, phone, course, password)
        VALUES (%s, %s, %s, %s, %s)
        """

        values = (
            fullname,
            email,
            phone,
            course,
            hashed_password
        )

        cursor.execute(sql, values)

        connection.commit()

        return jsonify({
            "message": "Registration successful!"
        }), 201

    except Exception as error:

        if error.errno == 1062:
            return jsonify({
                "message": "Email already registered"
            }), 409

        return jsonify({
            "message": "Registration failed"
        }), 500

    finally:

        cursor.close()
        connection.close()


# --------------------------------
# STUDENT LOGIN
# --------------------------------

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT * FROM students
    WHERE email = %s
    """

    cursor.execute(sql, (email,))

    student = cursor.fetchone()

    cursor.close()
    connection.close()

    if student and check_password_hash(
        student["password"], password
    ):

        session["student_id"] = student["id"]

        return jsonify({
            "message": "Login successful"
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# --------------------------------
# STUDENT DASHBOARD
# --------------------------------

@app.route("/dashboard", methods=["GET"])
def dashboard():

    if "student_id" not in session:

        return jsonify({
            "message": "Please login first"
        }), 401

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    sql = """
    SELECT id, fullname, email, phone, course, created_at
    FROM students
    WHERE id = %s
    """

    cursor.execute(
        sql,
        (session["student_id"],)
    )

    student = cursor.fetchone()

    cursor.close()
    connection.close()

    if not student:
        return jsonify({
            "message": "Student not found"
        }), 404

    return jsonify(student)


# --------------------------------
# LOGOUT
# --------------------------------

@app.route("/logout", methods=["POST"])
def logout():

    session.clear()

    return jsonify({
        "message": "Logged out successfully"
    })


# --------------------------------
# SERVE REACT STATIC FILES
# --------------------------------

@app.route("/assets/<path:filename>")
def assets(filename):

    return send_from_directory(
        os.path.join(FRONTEND_FOLDER, "assets"),
        filename
    )


# React navigation fallback
@app.route("/<path:path>")
def react_routes(path):

    file_path = os.path.join(FRONTEND_FOLDER, path)

    if os.path.isfile(file_path):
        return send_from_directory(FRONTEND_FOLDER, path)

    return send_from_directory(FRONTEND_FOLDER, "index.html")


# --------------------------------
# START SERVER
# --------------------------------

if __name__ == "__main__":

    app.run(debug=True)
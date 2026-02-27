from flask import Flask
import psycopg2
import redis
import os

app = Flask(__name__)

DB_HOST = os.environ.get("DB_HOST", "db")
REDIS_HOST = os.environ.get("REDIS_HOST", "redis")

@app.route("/")
def home():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database="mydb",
            user="postgres",
            password="postgres"
        )
        conn.close()
        db_status = "Connected to Postgres "
    except:
        db_status = "Failed to connect Postgres "

    try:
        r = redis.Redis(host=REDIS_HOST, port=6379)
        r.ping()
        redis_status = "Connected to Redis "
    except:
        redis_status = "Failed to connect Redis "

    return f"<h1>Hello from Docker Compose Advanced </h1><p>{db_status}</p><p>{redis_status}</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

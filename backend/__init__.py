from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import sqlite3, re, os
from sqlite3 import Error
from gensim.summarization.summarizer import summarize

app = Flask(__name__)
CORS(app)

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)
    return conn

@app.route("/doclist", methods=['POST'])
def doclist():
    content = request.get_json()
    tags = str(content['msg']).strip().split(" ")
    print(tags)
    filenames = []
    conn = create_connection('backend/db/keywords.db')
    cur = conn.cursor()
    cur.execute("SELECT FILENAME, KEYWORDS FROM FILES")
    rows = cur.fetchall()
    for row in rows:
        keywords = row[1].split("_")
        matches = set(tags) & set(keywords)
        if len(matches) > 0:
            filenames.append(row[0])
    print(",".join(filenames))
    conn.close()
    return jsonify(",".join(filenames))

@app.route("/docsummary", methods=['GET', 'POST'])
def docsummary():
    filename = str(request.args.get('name'))
    # print(filename)
    with open(os.path.join('backend/db/articles', filename)) as f:
        summary = summarize(f.read())
    return jsonify({"summary": summary})
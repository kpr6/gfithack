from flask import Flask, render_template, jsonify, request
from flask_cors import cross_origin
import sqlite3, re
from sqlite3 import Error
app = Flask(__name__)

@app.route("/doclist", methods=['POST'])
@cross_origin()
def doclist():
    content = request.get_json()
    tags = str(content['msg']).strip().split(" ")
    print(tags)
    return jsonify("abc.txt,def.txt,ghi.txt,jkl.txt")

@app.route("/docsummary", methods=['GET'])
@cross_origin()
def docsummary():
    id = str(request.args.get('id'))

    return jsonify("This is a sample summary"+id)
from gensim.summarization import keywords
import spacy, os
from spacy.lang.en.stop_words import STOP_WORDS
import sqlite3, re
from sqlite3 import Error

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

def main ():
    conn = create_connection('backend/db/keywords.db')
    cur = conn.cursor()

    nlp = spacy.load('en_core_web_sm')
    stop_words = list(STOP_WORDS)

    for fname in os.listdir("backend/db/articles"):
        path = "backend/db/articles"
        with open(os.path.join(path, fname)) as f:
            text = f.read()
            tags = nlp(" ".join(keywords(text).split('\n')))
            l = set([word.lemma_ for word in tags if word.tag_ == 'NN' and word.lemma_ not in stop_words])
            cur.execute("INSERT INTO FILES (FILENAME, KEYWORDS) VALUES (?, ?);", (fname, "_".join(l)))
            conn.commit()
    conn.close()

if __name__ == '__main__':
    main()
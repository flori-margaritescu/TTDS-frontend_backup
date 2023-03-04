import sqlite3
import os
from enum import Enum

class DatabaseCaller:
    """ Send queries to the database: https://docs.python.org/2/library/sqlite3.html"""
    METADATA_DIR = os.path.join("database", "metadata.db")
    MIT_DIR = "MIT"
    KHAN_DIR = "KHAN_ACADEMY"

    def __init__(self):
        self.conn_meta = sqlite3.connect(self.METADATA_DIR, check_same_thread=False)
        self.c = self.conn_meta.cursor()
        
    def query(self, query, single_result=False, *args):
        self.c.execute(query, args)
        res = None
        if single_result:
            res = self.c.fetchone()
        else:
            res = self.c.fetchall()
    
        return res
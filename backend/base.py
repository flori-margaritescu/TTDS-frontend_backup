from flask import Flask, request
import query_processing
from database_handler import DatabaseCaller

api = Flask(__name__)

database_caller = DatabaseCaller()

@api.route('/profile', methods=["GET", "POST"])
def my_profile():
    userinput = request.json["userInput"]
    isAdvancedSearch = request.json["advancedSearch"]
    doc_ids = query_processing.process_query(userinput)

    # Query the database
    # for doc_id in doc_ids:
    doc_id = 0
    values = database_caller.query('SELECT * FROM lecture_metadata WHERE doc_id={}'.format(1))  # list of tuples

    response_body = {
        "userInputResult": str(values[0]),
        "acknowledgement" : userinput,
        "advancedSearch" : isAdvancedSearch
    }

    print(userinput)
    print(isAdvancedSearch)
    return response_body

@api.route('/check', methods=["GET", "POST"])
def check_backend_run():

    response_body = {
        "userInputResult": "default",
        "acknowledgement" :"Request has been received and processed by backend."
    }
    return response_body
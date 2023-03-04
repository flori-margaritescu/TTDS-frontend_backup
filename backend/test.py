from database_handler import DatabaseCaller

database_caller = DatabaseCaller()
doc_id = 0
values = database_caller.query('SELECT * FROM lecture_metadata WHERE doc_id={}'.format(doc_id))
print((values))
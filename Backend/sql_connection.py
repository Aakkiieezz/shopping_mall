import datetime
import mysql.connector
__cnx = None

def get_sql_connection():
  global __cnx
  if __cnx is None:
    __cnx = mysql.connector.connect(user='Akash', password='forever21MySQL', database='ShoppingMall')
  return __cnx
from sql_connection import get_sql_connection

def get_product(connection, product_id):
    cursor = connection.cursor()
    query = "SELECT * FROM Products WHERE prod_ID = "+str(product_id)
    cursor.execute(query)
    response = [{'prod_ID': a, 'prod_Name': b, 'prod_Unit': c, 'prod_PricePerUnit': d} for (a, b, c, d) in cursor]
    cursor.close()
    # connection.close()
    return response

def get_all_products(connection):
    cursor = connection.cursor()
    query = "SELECT * FROM Products"
    cursor.execute(query)
    response = [{'prod_ID': a, 'prod_Name': b, 'prod_Unit': c, 'prod_PricePerUnit': d} for (a,b,c,d) in cursor]
    cursor.close()
    # connection.close()
    return response

def insert_new_product(connection, product):
    cursor = connection.cursor()
    query = "INSERT INTO Products (prod_Name, prod_Unit, prod_PricePerUnit) VALUES (%s,%s,%s)"
    data = (product['prod_Name'], product['prod_Unit'], product['prod_PricePerUnit'])
    cursor.execute(query, data)
    connection.commit()
    cursor.close()
    # connection.close()
    return cursor.lastrowid

def edit_product(connection, product):
    cursor = connection.cursor()
    query = "UPDATE Products SET prod_Name = %s, prod_Unit = %s , prod_PricePerUnit = %s WHERE prod_ID = %s;"
    data = (product['prod_Name'], product['prod_Unit'], product['prod_PricePerUnit'], product['prod_ID'])
    cursor.execute(query, data)
    connection.commit()
    cursor.close()
    # connection.close()

def delete_product(connection, product_id):
    cursor = connection.cursor()
    query = "DELETE FROM Products WHERE prod_ID = "+str(product_id)
    cursor.execute(query)
    connection.commit()
    cursor.close()
    # connection.close()
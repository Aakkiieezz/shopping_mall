from datetime import datetime
from sql_connection import get_sql_connection

def insert_order(connection, order):
    cursor = connection.cursor()
    order_query = "INSERT INTO Orders (order_CustomerName, order_TotalPrice, order_DateTime) VALUES (%s,%s,%s)"
    order_data = (order['order_CustomerName'], order['total'], datetime.now())
    cursor.execute(order_query, order_data)
    order_id = cursor.lastrowid
    OrderDetails_query = "INSERT INTO OrderDetails (OrderID,ProductID,Quantity,TotalPrice) VALUES (%s,%s,%s,%s)"
    OrderDetails_data = [(order_id, x['ProductID'], x['Quantity'], x['TotalPrice']) for x in order['OrderDetails']]
    cursor.executemany(OrderDetails_query, OrderDetails_data)
    cursor.close()
    connection.commit()
    # connection.close()
    return cursor.lastrowid

def get_OrderDetails(connection, order_id):
    cursor = connection.cursor()
    query = "SELECT * FROM OrderDetails WHERE OrderID = "+str(order_id)
    cursor.execute(query)
    response = [{'OrderID': a, 'ProductID': b, 'Quantity': c, 'TotalPrice': d} for (a,b,c,d) in cursor]
    cursor.close()
    # connection.close()
    return response

def get_all_orders(connection):
    cursor = connection.cursor()
    query = "SELECT * FROM Orders"
    cursor.execute(query)
    response = [{'order_ID': a, 'order_CustomerName': b,'order_TotalPrice': c, 'order_DateTime': d} for (a,b,c,d) in cursor]
    cursor.close()
    for record in response:
        record['OrderDetails'] = get_OrderDetails(connection, record['order_ID'])
    # connection.close()
    return response
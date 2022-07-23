from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import mysql.connector
import json
import products_dao
import orders_dao

app = Flask(__name__)
connection = get_sql_connection()

@app.route('/getProducts', methods=['GET']) 
def get_products():
    # print("****************************************server -> get_products()")
    response = products_dao.get_all_products(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertProduct', methods=['POST'])
def insert_product():
    # print("****************************************server -> insert_product()")
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.insert_new_product(connection, request_payload)
    response = jsonify({'product_id': product_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/editProduct', methods=['POST'])
def edit_product():
    # print("****************************************server -> edit_product()")
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.edit_product(connection, request_payload)
    response = jsonify({'product_id': product_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    # print("****************************************server -> delete_product()")
    return_id = products_dao.delete_product(connection, request.form['prod_ID'])
    response = jsonify({'prod_ID': return_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getAllOrders', methods=['GET'])
def get_all_orders():
    # print("****************************************server -> get_all_orders()")
    response = orders_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/getOrderDetails/<int:id>', methods=['GET'])
def get_OrderDetails(id):
    # print("****************************************server -> get_OrderDetails()")
    response = orders_dao.get_order_details(connection, id)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/insertOrder', methods=['POST'])
def insert_order():
    # print("****************************************server -> insert_order()")
    request_payload = json.loads(request.form['data'])
    order_id = orders_dao.insert_order(connection, request_payload)
    response = jsonify({'order_id': order_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/deleteOrder', methods=['POST'])
def delete_order():
    # print("****************************************server -> delete_order()")
    return_id = orders_dao.delete_order(connection, request.form['orderID'])
    response = jsonify({'orderID': return_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/example') # endpoint
def example_function():
    # print("****************************************server -> example_function()")
    return "Hello, this is just to show how flask server works..."

if __name__ == "__main__":
    print("Starting Python Flask Server")
    app.run(port=5000)
from flask import Flask, request, jsonify
from sql_connection import get_sql_connection
import mysql.connector
import json
import products_dao
import orders_dao

app = Flask(__name__)
connection = get_sql_connection()

@app.route('/products', methods=['GET']) 
def getProducts():
    response = products_dao.getProducts(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/products', methods=['POST'])
def createProduct():
    request_payload = json.loads(request.form['data'])
    product_id = products_dao.createProduct(connection, request_payload)
    response = jsonify({'product_id': product_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# PUT method not used because AJAX jQuery has some issues with PUT/DELETE methods 
@app.route('/products/update', methods=['POST'])
def updateProduct():
    request_payload = json.loads(request.form['data'])
    products_dao.updateProduct(connection, request_payload)
    response = jsonify(request_payload)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/products/delete', methods=['POST'])
def deleteProduct():
    return_id = products_dao.deleteProduct(connection, request.form['prod_ID'])
    response = jsonify({'prod_ID': return_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/orders', methods=['GET'])
def getOrders():
    response = orders_dao.getOrders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/orders/<int:id>', methods=['GET'])
def getOrder(id):
    response = orders_dao.getOrder(connection, id)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/orders', methods=['POST'])
def createOrder():
    request_payload = json.loads(request.form['data'])
    print(request.form['data'])
    print(request_payload)
    order_id = orders_dao.createOrder(connection, request_payload)
    response = jsonify({'order_id': order_id})
    print(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# DELETE method not used because AJAX jQuery has some issues with PUT/DELETE methods
@app.route('/orders/delete', methods=['POST'])
def delete_order():
    return_id = orders_dao.deleteOrder(connection, request.form['orderID'])
    response = jsonify({'orderID': return_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(port=5000)
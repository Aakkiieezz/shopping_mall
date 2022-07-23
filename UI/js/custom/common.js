var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productEditApiUrl = 'http://127.0.0.1:5000/editProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProduct';
var orderListApiUrl = 'http://127.0.0.1:5000/getAllOrders';
var orderDetailsApiUrl = 'http://127.0.0.1:5000/getOrderDetails';
var orderSaveApiUrl = 'http://127.0.0.1:5000/insertOrder';
var orderDeleteApiUrl = 'http://127.0.0.1:5000/deleteOrder';

function callApi(method, url, data) {
    // console.log('****************************************common.js -> callApi()');
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function(msg) {
        window.location.reload();
    });
}

function calculateValue() {
    var total = 0;
    $(".product-item").each(function(index) {
        var qty = parseFloat($(this).find('.product-qty').val());
        var price = parseFloat($(this).find('#product_price').val());
        price = price * qty;
        $(this).find('#item_total').val(price.toFixed(2));
        total += price;
    });
    $("#product_grand_total").val(total.toFixed(2));
}
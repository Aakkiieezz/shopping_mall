var productListApiUrl = 'http://127.0.0.1:5000/products';
var productSaveApiUrl = 'http://127.0.0.1:5000/products';
var productEditApiUrl = 'http://127.0.0.1:5000/products/update';
var productDeleteApiUrl = 'http://127.0.0.1:5000/products/delete';
var orderListApiUrl = 'http://127.0.0.1:5000/orders';
var orderDetailsApiUrl = 'http://127.0.0.1:5000/orders';
var orderSaveApiUrl = 'http://127.0.0.1:5000/orders';
var orderDeleteApiUrl = 'http://127.0.0.1:5000/orders/delete';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function (msg) {
        window.location.reload();
    });
}

// function callDel(url, data, callback, type) {

//     if ($.isFunction(data)) {
//         type = type || callback,
//             callback = data,
//             data = {}
//     }

//     return $.ajax({
//         url: url,
//         type: 'DELETE',
//         success: callback,
//         data: data,
//         contentType: type
//     });
// }

function calculateValue() {
    var total = 0;
    $(".product-item").each(function (index) {
        var qty = parseFloat($(this).find('.product-qty').val());
        var price = parseFloat($(this).find('#product_price').val());
        price = price * qty;
        $(this).find('#item_total').val(price.toFixed(2));
        total += price;
    });
    $("#product_grand_total").val(total.toFixed(2));
}
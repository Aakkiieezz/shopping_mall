var productPrices = {};

$(function() {
    //Json data by api call for order table
    $.get(productListApiUrl, function(response) {
        productPrices = {}
        if (response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(index, product) {
                options += '<option value="' + product.prod_ID + '">' + product.prod_Name + '</option>';
                productPrices[product.prod_ID] = product.prod_PricePerUnit;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function() {
    var row = $(".product-box").html();
    $(".product-box-extra").append(row);
    $(".product-box-extra .remove-row").last().removeClass('hideit');
    $(".product-box-extra .product-qty").last().val('1');
    $(".product-box-extra .product-price").last().text('0.0');
    $(".product-box-extra .product-total").last().text('0.0');
});

$(document).on("click", ".remove-row", function() {
    $(this).closest('.row').remove();
    calculateValue();
});

$(document).on("change", ".cart-product", function() {
    var product_id = $(this).val();
    var price = productPrices[product_id];
    $(this).closest('.row').find('#product_price').val(price);
    calculateValue();
});

$(document).on("change", ".product-qty", function(e) {
    calculateValue();
});

$("#saveOrder").on("click", function() {
    var formData = $("form").serializeArray();
    var requestPayload = {
        order_CustomerName: null,
        total: null,
        OrderDetails: []
    };
    var orderDetails = [];
    for (var i = 0; i < formData.length; ++i) {
        var element = formData[i];
        var lastElement = null;

        switch (element.name) {
            case 'customerName':
                requestPayload.order_CustomerName = element.value;
                break;
            case 'product_grand_total':
                requestPayload.total = element.value;
                break;
            case 'product':
                requestPayload.OrderDetails.push({
                    ProductID: element.value,
                    Quantity: null,
                    TotalPrice: null
                });
                break;
            case 'qty':
                lastElement = requestPayload.OrderDetails[requestPayload.OrderDetails.length - 1];
                lastElement.Quantity = element.value
                break;
            case 'item_total':
                lastElement = requestPayload.OrderDetails[requestPayload.OrderDetails.length - 1];
                lastElement.TotalPrice = element.value
                break;
        }
    }
    console.log(requestPayload)
    callApi("POST", orderSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});
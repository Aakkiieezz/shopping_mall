$(function() {
    //Json data by api call for order table
    $.get(orderListApiUrl, function(response) {
        if (response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.order_TotalPrice);
                table += '<tr data-id="' + order.order_ID + '">' +
                    '<td>' + order.order_DateTime + '</td>' +
                    '<td>' + order.order_ID + '</td>' +
                    '<td>' + order.order_CustomerName + '</td>' +
                    '<td>' + order.order_TotalPrice.toFixed(2) + ' Rs</td>' +
                    '<td><button type="button" class="btn btn-sm btn-primary show-order-details" data-toggle="modal" data-target="#orderDetailsModal">View</button>' + '&nbsp;' +
                    '<button type="button" class="btn btn-sm btn-danger delete-order">Delete</button></td></tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td colspan="2"><b>' + totalCost.toFixed(2) + ' Rs</b></td></tr>';
            $("table:first > tbody").empty().html(table);
        }
    });
});

$(document).on("click", ".show-order-details", function() {
    var tr = $(this).closest('tr');
    $.get(orderDetailsApiUrl + '/' + tr.data('id'), function(response) {
        if (response) {
            var table = '';
            $.each(response, function(index, order) {
                table += '<tr>' +
                    '<td>' + order.ProductID + '</td>' +
                    '<td>' + order.Quantity + '</td>' +
                    '<td>' + order.TotalPrice + ' Rs</td></tr>';
            });
            $("table:last > tbody").empty().html(table);
        }
    });
});

$(document).on("click", ".delete-order", function() {
    var tr = $(this).closest('tr');
    var data = {
        orderID: tr.data('id')
    };
    var isDelete = confirm("Are you sure to delete " + tr.data('id') + " order?");
    if (isDelete)
        callApi("POST", orderDeleteApiUrl, data);
});
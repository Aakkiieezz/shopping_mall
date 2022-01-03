$(function() {
    //Json data by api call for order table
    $.get(orderListApiUrl, function(response) {
        if (response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.order_TotalPrice);
                table += '<tr>' +
                    '<td>' + order.order_DateTime + '</td>' +
                    '<td>' + order.order_ID + '</td>' +
                    '<td>' + order.order_CustomerName + '</td>' +
                    '<td>' + order.order_TotalPrice.toFixed(2) + ' Rs</td></tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>' + totalCost.toFixed(2) + ' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});
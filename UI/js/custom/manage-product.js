$(function() {
    //JSON data by API call
    $.get(productListApiUrl, function(response) {
        // console.log('****************************************manage-product.js -> 1st function()');
        if (response) {
            var table = '';
            $.each(response, function(index, product) {
                table += '<tr data-id="' + product.prod_ID + '" data-name="' + product.prod_Name + '" data-unit="' + product.prod_Unit + '" data-price="' + product.prod_PricePerUnit + '">' +
                    '<td>' + product.prod_Name + '</td>' +
                    '<td>' + product.prod_Unit + '</td>' +
                    '<td>' + product.prod_PricePerUnit + '</td>' +
                    '<td><button type="button" class="btn btn-sm btn-warning show-product-details" data-toggle="modal" data-target="#editProductModal">Edit</button>' + '&nbsp;' +
                    '<button type="button" class="btn btn-sm btn-danger delete-product">Delete</button></td></tr>';
            });
            $("table").find('tbody').empty().html(table);
        }
    });
});


$("#saveProduct").on("click", function() {
    // console.log('****************************************manage-product.js -> click #saveProduct');
    var data = $("#productForm").serializeArray();
    var requestPayload = {
        prod_Name: null,
        prod_Unit: null,
        prod_PricePerUnit: null
    };
    for (var i = 0; i < data.length; ++i) {
        var element = data[i];
        switch (element.name) {
            case 'prod_Name':
                requestPayload.prod_Name = element.value;
                break;
            case 'prod_Unit':
                requestPayload.prod_Unit = element.value;
                break;
            case 'prod_PricePerUnit':
                requestPayload.prod_PricePerUnit = element.value;
                break;
        }
    }
    callApi("POST", productSaveApiUrl, { 'data': JSON.stringify(requestPayload) });
});

$(document).on("click", ".show-product-details", function() {
    // console.log('****************************************manage-product.js -> click show-product-details');
    var tr = $(this).closest('tr');
    $("#editProductForm #id").val(tr.data('id'));
    $("#editProductForm #name").val(tr.data('name'));
    $("#editProductForm #unit").val(tr.data('unit'));
    $("#editProductForm #price").val(tr.data('price'));
});

$("#editProduct").on("click", function() {
    // console.log('****************************************manage-product.js -> click editProduct');
    var data = $("#editProductForm").serializeArray();
    var requestPayload = {
        prod_ID: null,
        prod_Name: null,
        prod_Unit: null,
        prod_PricePerUnit: null
    };
    for (var i = 0; i < data.length; ++i) {
        var element = data[i];
        switch (element.name) {
            case 'id':
                requestPayload.prod_ID = element.value;
                break;
            case 'prod_Name':
                requestPayload.prod_Name = element.value;
                break;
            case 'prod_Unit':
                requestPayload.prod_Unit = element.value;
                break;
            case 'prod_PricePerUnit':
                requestPayload.prod_PricePerUnit = element.value;
                break;
        }
    }
    callApi("POST", productEditApiUrl, { 'data': JSON.stringify(requestPayload) });
});

$(document).on("click", ".delete-product", function() {
    // console.log('****************************************manage-product.js -> click delete-Product');
    var tr = $(this).closest('tr');
    var data = {
        prod_ID: tr.data('id')
    };
    var isDelete = confirm("Are you sure to delete " + tr.data('name') + " item?");
    if (isDelete)
        callApi("POST", productDeleteApiUrl, data);
});

$("#addProductModal").on('hide.bs.modal', function() {
    $("#id").val('0');
    $("#name, #unit, #price").val('');
});
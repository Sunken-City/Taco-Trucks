$("#lastOrderYes").click(function() {
    var url = "/api/orders";
    var request = new XMLHttpRequest();

    request.open("GET", url, false);
    request.send();

    if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        var order = json.order;
        var taco;
        for (var i = 0; i <= order.length - 1; i++) {
            taco = new Taco();
            for (var j in order[i]) {
                console.log(order[i][j]);
                var fixin = order[i][j];
                if (fixin.quantity !== undefined) {
                    taco.quantity = fixin.quantity;
                } else {
                    var itemOrderDetail = new Ingredient();
                    if (fixin.type == "type")
                        fixin.type = "filling";
                    else if (fixin.type == "sauces")
                        fixin.type = "sauce";
                    else if (fixin.type == "beans")
                        fixin.type = "bean";
                    else if (fixin.type == "vegetables")
                        fixin.type = "veggie";
                    else if (fixin.type == "tortillas")
                        fixin.type = "tortilla";
                    itemOrderDetail.init(fixin.type, fixin.name, fixin.price, fixin.fixinId);
                    taco.add(itemOrderDetail);
                }
            }
            cart.add(taco);
        }
        $('#openLastOrderModal').hide();
    } else {
        console.log("Error " + request.status);
    }
});

$("#lastOrderNo").click(function() {
    $('#openLastOrderModal').hide();
});
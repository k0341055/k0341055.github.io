let mysql = require("../mysql");
let crypto = require("crypto");

handle_request = (data, callback) => {
    let response = { status: 400};

    try{
        var randId = crypto.randomBytes(32).toString("base64").substr(0, 8);

        orderQuery = 
            "insert into DATATABLE () values('" +
            data.accountNo + "','" +
            data.product + "','" +
            data.productNo + "','" +
            data.price + "','" +
            data.quantity + "','" +
            data.total_price + "','";

        console.log("order SQL query: " + orderQuery);

        mysql.insertData(orderQuery, function(err, result) {
            if(err) {
                console.log(err);
                callback(err);
            } else {
                console.log(result);
                if(result.affectedRows === 1){
                    response.status = 200;
                    response.message = "order success";
                    response.randId = randId;
                    callback(null, response);
                } else {
                    response.status = 400;
                    response.message = "order error";
                    callback(null, response);
                }
            }
        });
    } catch (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "order failure"
        callback(err, response);
    }
};

exports.handle_request = this.handle_request;
let mysql = require("../mysql");

handle_request = (data, callback) => {
    let response = { status: 400};

    try {
        let account = data.acc;
        let phone = data.fon;
        let email = data.eml;

        let userTaken = "select luid from UDT where schid = '" + data.acc + "'";

        let addUser = "insert into UDT (schid, fonnum, eml) values ('" + 
            data.acc + "','" +
            data.fon + "','" +
            data.eml + "');";
            
        console.log("signup SQL query: " + addUser);

        mysql.fetchData(userTaken, function(err, res){
            if (err){
                console.log(err);
                callback(err);
            } else {
                console.log(res);
                console.log(res.length);
                if(res.length === 1){
                    response.status = 401;
                    response.message = "user taken";
                    callback(null, response);
                } else{
                    mysql.insertData(addUser, function(error, result) {
                        if(error){
                            console.log(error);
                            callback(error);
                        } else {
                            console.log(result);
                            if(result.affectedRows === 1){
                                response.status = 200;
                                response.acc = data.acc;
                                response.message = "signup success";
                                callback(null, response);
                            } else {
                                response.status = 400;
                                response.message = "signup failure";
                                callback(null, response);
                            }
                        }
                    });
                }
            }
        });
    } catch (e) {
        console.log(e);
        err = e;
        response.status = 401;
        response.message = "signup failed";
        callback(err, response);
    }
};

exports.handle_request = handle_request;
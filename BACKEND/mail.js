const nodemailer = require('nodemailer');
const securePin = require('secure-pin');

let mysql = require("./mysql");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'scratch4ape@gmail.com',   // email
        pass: 'codeape201'    // password
    }
});



const sendMail = (receiver, callback) => {
    // receiver 放要收信的 email
    
    var send_code;

    securePin.generatePin(6, (pin) =>{
        console.log("pin: " + pin);
        send_code = pin;
    });

    
    var mailOptions = {
        from: 'scratch4ape@gmail.com',
        to: receiver,
        subject: 'sending mail using node.js',
        text: 'your verification code is ',
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
            callback(error);
        } else {
            console.log('email sent: ', info.response);

            let response = {status : 400};
            // send mail success, update DB
            let addVerCodeQuery = "update UDT set vercode = '" + send_code + 
                    "' where eml = '" + receiver + "';";
            mysql.insertData(addVerCodeQuery, function(err, result){
                if(err){
                    console.log(err);
                    callback(err);
                } else{
                    console.log(result);
                    if(result.affectedRows === 1){
                        console.log("add ver code success");
                        response.status = 200;
                        response.message = "update vercode and email";
                        callback(null, response);
                    } else {
                        console.log("add ver code failure");
                        response.status = 400;
                        response.message = "update vercode/mail failure"
                        callback(null, response);
                    }
                }
            });

        }
    });
    
};


const checkCode = (data, callback) => {
    // code: 使用者輸入的驗證碼, mail: 使用者的mail

    let response = {status : 400};
    
    let mail = data.email;
    let code = data.code;

    let checkCodeQuery = "select vercode from UDT where eml = '" + 
        mail + "' and vercode = '" + code + "';";
    mysql.fetchData(checkCodeQuery, function(err, result){
        if(err){
            console.log(err);
            //response.status = 400;
            callback(err);
        } else {
            console.log(result);
            console.log(result.length);
            if(result.length === 1){
                console.log("email and code match");
                response.status = 200;
                response.message = "code and mail match";
                callback(null, response);
                
            } else {
                console.log("email and code don't match");
                response.status = 201;
                response.message = "code and mail don't match";
                callback(null, response);
            }
        }
    })
}
module.exports = {sendMail, checkCode};
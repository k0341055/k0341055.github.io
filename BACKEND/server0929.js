var express = require('express');
var bodyParser = require('body-parser');
let cp = require('cookie-parser');
let cors = require("cors");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./db.js');
var db_data = require('./db_data.js');
var app = express();
var mysql = require('./mysql.js');

var mail = require('./mail.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cp());
//app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const { callbackPromise } = require('nodemailer/lib/shared');


app.get('/', function(req, res) {
    res.sendfile('./views/index.html');
});

app.get('/signupM1', function(req, res) {
    res.sendfile('./views/signupM1.html');
});

app.get('/signupM2', function(req, res) {
    res.sendfile('./views/signupM2.html');
});

app.get('/signupM3', function(req, res) {
    res.sendfile('./views/signupM3.html');
});

var sql = 'SELECT * FROM members';
var str = " ";

app.get('/login', function(req, res) {
    //res.sendfile('./views/login.html');
   db_data.query(sql,function (err,result) {
       if(err){
          console.log('[SELECT ERROR]:',err.message);
       }
       str = JSON.stringify(result);
       console.log(str);  //console印出來
   });
   //res.send(str);
   res.send('Hello! acc= ' + req.query.acc);
});


/*
var str = " ";
//POST 動作
app.post('/sendcomment',urlencodedParser, function(req, res) {
   console.log('name:' + req.body.name);
   console.log('email' + req.body.email);
   console.log('comment' + req.body.comment);
   res.send(req.body.name + '謝謝你的回覆');
   str = req.body.name;
   console.log('poki test' + str);
});
app.get('*', function(req, res) {
    res.send('404 not found');
});
*/

app.post('/authM1',urlencodedParser, function(req, res) {
  console.log('from web line_name:' + req.body.line_name);
  console.log('from web line_id:' + req.body.line_id);

  
  var line_name = req.body.line_name; //取得line上的名字
  var line_id = req.body.lind_id; //取得line上的id

//  db.query("insert into members (line_name,line_id) values(?,?)",[line_name,line_id],function(err, results) {
//     if(err) {
//         throw err;
//         res.status(400).send('System　Failed');
//     } else {
//       console.log('user '+ acc + ' is inserted into db now');
//        // res.redirect('/login?acc='+acc);//轉導get傳參數
//        res.status(200).send('user '+ acc + ' is inserted into db now');
//     }
//   })

  let M1Query = 
    "insert into members (line_name, line_id) values ('" + 
    line_name + "', '" + line_id + "');";
  mysql.insertData(M1Query, function(err, result){
    if(err){
      throw err;
      res.status(400).send('System　Failed');
    } else {
      if(result.affectedRows === 1){
        console.log('user '+ acc + ' is inserted into db now');
       res.status(200).send('user '+ acc + ' is inserted into db now');
      } else {
        res.status(400).send('insert failed');
      }
    }
  })
  
});

// payload : email
// app.post('/ver_email', function(req, res){
//  console.log('req.body: ');
//  console.log(req.body);

//  let mailQuery = "select * from UDT where eml = '" + req.body.email + "';";
//  mysql.fetchData(mailQuery, function(err, result){
//    if(err){
//      console.log(err);
//      res.sendStatus(400);
//    } else {
//      if(result.length === 0){
//        console.log("email has not been registered");

//        mail.sendMail(req.body.email, function(err, response){
//          if(err){
//            console.log(err);
//            res.sendStatus(400);
//          } else {
//            console.log(response);
//            if(response.status === 200){
//              res.sendStatus(200)
//              res.send({message: "update email/code success"});
//            } else if (response.status === 400){
//              res.sendStatus(400);
//              res.send({message: "update email/code failure"});
//            }
//          }
//        });

//      } else {
//        console.log("email has been used by other user");
//        res.sendStatus(401);
//      }
//    }
//  })

 

// });

// payload : email
app.post('/ver_email', function(req, res){
  console.log('req.body: ');
  console.log(req.body);

  let mailQuery = "select * from members where email = '" + req.body.email + "';";
  mysql.fetchData(mailQuery, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(400);
    } else {
      if(result.length === 0){
        console.log("email has not been registered");

        addMailQuery = 
          "insert into UDT (eml, schid, fonnum) values ('" + req.body.email + 
          "', '" + req.body.acc + "', '" + req.body.phone + "');";
        mysql.insertData(addMailQuery, function(errr, resultt){
          if(errr){
            console.log(errr);
            res.sendStatus(400);
          } else {
            console.log("result length: " + resultt.length);

            if(resultt.affectedRows === 1){
              console.log("email added to UDT");

              mail.sendMail(req.body.email, function(errrr, response){
                if(errrr){
                  console.log(errrr);
                  res.sendStatus(400);
                } else {
                  console.log(response);
                  if(response.status === 200){
                    res.status(200).send({message: "update email/code success"});
                  } else if (response.status === 400){
                    res.status(400).send({message: "update email/code failure"});
                  }
                }
              });
            }
          }
        });

      } else {
          console.log("email has been used by other user");
          res.status(300).send("您已註冊過合作社社員");
        
      }
    }
  })

});

app.post('/ver_email3', function(req, res){
  console.log('req.body: ');
  console.log(req.body);
  console.log('req.body.bluetooth: ');
  console.log(req.body.bluetooth);

  let mailQuery = "select * from members where email = '" + req.body.email + "';";
  mysql.fetchData(mailQuery, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(400);
    } else {
      if(result.length === 0){
        console.log("VIP email has not been registered");

        addMailQuery = 
          "insert into UDT (eml, schid, fonnum) values ('" + req.body.email + 
          "', '" + req.body.acc + "', '" + req.body.phone + "');";
        mysql.insertData(addMailQuery, function(errr, resultt){
          if(errr){
            console.log(errr);
            res.sendStatus(400);
          } else {
            console.log("result length: " + resultt.length);

            if(resultt.affectedRows === 1){
              console.log("email added to UDT");

              mail.sendMail(req.body.email, function(errrr, response){
                if(errrr){
                  console.log(errrr);
                  res.sendStatus(400);
                } else {
                  console.log(response);
                  if(response.status === 200){
                    res.status(200).send({message: "update email/code success"});
                  } else if (response.status === 400){
                    res.status(400).send({message: "update email/code failure"});
                  }
                }
              });
            }
          }
        });

      } else {
        console.log("email has been used by other user");
        res.status(300).send("您已註冊過VIP社員");
      }
    }
  })

});


app.post('/ver_code', function(req, res){
 console.log('req.body: ');
 console.log(req.body);

 mail.checkCode(req.body, function(err, response){
   if(err){
     console.log(err);
     res.sendStatus(400);
   } else {
     console.log(response);
     if(response.status === 200){
       res.status(200).send({message: "code and mail match"});
       return;
     } else if (response.status === 201){
       res.status(201).send({message: "code and mail don't match"});
       return;
     }
   }
 })

});

  app.post('/authM2',urlencodedParser, function(req, res){ 

    console.log('req.body: ');
 console.log(req.body);
  console.log('from web line_name:' + req.body.line_name);
  console.log('from web line_id:' + req.body.line_id);
  console.log('from web acc: ' + req.body.acc);
  console.log('from web phone: ' + req.body.phone);
  console.log('from web email: ' + req.body.email + '\n');
  
  var line_name = req.body.line_name; //取得line上的名字
  var line_id = req.body.line_id; //取得line上的id
  var acc = req.body.acc;  //取得輸入的帳號
  var phone = req.body.phone;  //取得輸入的電話號碼
  var email = req.body.email;  //取得輸入的信箱

   let M2Query = 
   "select * from members where acc='" + acc +
   "' and phone='" + phone + 
   "' and email='" + email + "';";
   mysql.fetchData(M2Query, function(err, results){
     if(err){
       throw err;
       res.status(400).send('system failed');
     } else if (results.length === 0) {
        console.log('db not found');

        let M2_insertQ = 
          "insert into members (acc,phone,email,line_name,line_id) values('" + acc + "', '"
          + phone + "', '" + email + "', '" + line_name + "', '" + line_id + "');";
        mysql.insertData(M2_insertQ, function(err, result){
          if (err){ throw err;}
          console.log('user '+ acc + ' is inserted into db now');
       res.status(200).send('user '+ acc + ' is inserted into db now');   

        })
     } else {
       let M2_updateQ = "update members SET line_name='"
        + line_name + "', line_id='" + line_id + "' where acc='" + acc + "';"
       mysql.insertData(M2_updateQ, function(err, result){
        if(err) throw err;      
            
        console.log('this user ' + acc +' is already registered');
        console.log('from db acc:'+ acc);
        console.log('from db phone:'+ phone);
        console.log('from db email:'+ email);
        //show在網頁測試用
        //res.redirect('/login?acc='+acc);//轉導get傳參數 
        res.status(300).send('this user ' + acc +' is already registered'); 
        });
       }
     });
   });
 




app.post('/authM3',urlencodedParser, function(req, res) {
  console.log('from web line_name:' + req.body.line_name);
  console.log('from web line_id:' + req.body.line_id);
  console.log('from web acc: ' + req.body.acc);
  console.log('from web phone: ' + req.body.phone);
  console.log('from web email: ' + req.body.email);
  console.log('from web bluetooth:' + req.body.bluetooth + '\n');
  
  var line_name = req.body.line_name; //取得line上的名字
  var line_id = req.body.line_id; //取得line上的id
  var acc = req.body.acc;  //取得輸入的帳號
  var phone = req.body.phone;  //取得輸入的電話號碼
  var email = req.body.email;  //取得輸入的信箱
  var bluetooth = req.body.bluetooth; // 取得輸入的藍芽
  
   let M3Query = 
   "select * from members where acc='" + acc +
   "' and phone='" + phone + 
   "' and email='" + email + 
   "' and bluetooth='" +bluetooth+"';";
   mysql.fetchData(M3Query, function(err, results){
     if(err){
       throw err;
       res.status(400).send('system failed');
     } else if (results.length === 0) {
        console.log('db not found');

        let M3_insertQ = 
          "insert into members (acc,phone,email,line_name,line_id,bluetooth) values('" + acc + "', '"
          + phone + "', '" + email + "', '" + line_name + "', '" + line_id + "','"+bluetooth+"');";
        mysql.insertData(M3_insertQ, function(err, result){
          if (err){ throw err;}
          console.log('user '+ acc + ' is inserted into db now');
       res.status(200).send('user '+ acc + ' is inserted into db now');   

        })
     } else {
       let M3_updateQ = "update members SET line_name='"
        + line_name + "', line_id='" + line_id + "' where acc='" + acc + "';"
       mysql.insertData(M3_updateQ, function(err, result){
        if(err) throw err;      
            
        console.log('this user ' + acc +' is already registered');
        console.log('from db acc:'+ acc);
        console.log('from db phone:'+ phone);
        console.log('from db email:'+ email);
        console.log('from db bluetooth:'+ bluetooth);
        //show在網頁測試用
        //res.redirect('/login?acc='+acc);//轉導get傳參數 
        res.status(300).send('this user ' + acc +' is already registered'); 
        });
       }
     });

});

var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});
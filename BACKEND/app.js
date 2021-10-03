let express = require("express");
let path = require("path");
let cp = require("cookie-parser");
let bp = require("body-parser");
let cors = require("cors");

let users = require("./routers/users");

let app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: false}));
app.use(cp());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.get("/", function(){
  console.log("this is blank homepage");
})

app.use("/users", users);

app.use(function (req, res, next) {
    let err = new Error("not found");
    err.status = 404;
    next(err);
  });
  
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
      });
  });
  
  app.listen(3033);

  console.log("listening on port 3033");
  
  module.exports = app;
  



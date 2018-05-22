var express = require('express')
var app = express()
var http = require('http')
fs = require('fs')
var port = 4000;
// var mysql = require('mysql');
const nodemailer = require('nodemailer');
const io = require('socket.io')(http);
const port_io = 8002;

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chemgio', function(msg){
        console.log('message: ' + msg);
        io.emit('chemgio',  msg);
    });

});
io.listen(port_io);
console.log('listening on port ', port_io);





// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'vnpet'
// });
var router = express.Router();
var counter = 0;

// connection.connect();

//  more than one callback funtion to handler a route

app.get("/one_route", function funtion1(req, res) {
    console.log("funtion 1")
    res.send("hello _one route ")
});
//an array of callback funtions
var f1 = function (req, res, next) { // next để khi success thì api sẽ gọi hàm kế tiếp trong stack
    console.log("funtion f1")
    next();
}
var f2 = function (req, res, next) {
    console.log("funtion f2")
    next();
}
var f3 = function (req, res, next) {
    console.log("funtion f3")
    next();

}
var f4 = function (req, res) {
    console.log("funtion f4")
    res.send("f4")

}

app.get("/array_route", [f1, f2, f3, f4]); // stack funtion
// ==> qua ví dụ trên ta có thể hiểu khi client gọi vào api /array_route --> thì api sẽ nhận data và trả về từ f1 ..
// Nhưng sau đó thì bắt đầu từ f2,f3,f4 data sẽ được server xử lý và không cần trả về cho client
/// bên cạnh đó ta có thể respon về cho client từ bất cứ funtion nào nhưng chỉ được respon 1 lần



//require
var dao = require('./dao.js') // cách import another file in js


var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}
//midleware su dung static cho phep truy cap folder public lay ra các file html, htm
app.use(express.static('public', options))
//http://localhost:3000/index  --> server sẽ tự dộng trả về page index.html cho client
//Ta có thể custom cho các api get như sau ;
app.use("/myhome", express.static('public', options), function (req, res, next) {
    counter++;
    console.log("counter" + counter);
    next();

});


//middleware trong express : thường ta sử dụng nó để gửi các data vào base request
/*
    vd: thêm tất cả tocken_session vào tất cả các response vd : middleware trackEveryRequest
*/
var trackEveryRequest = function (req, res, next) {
    counter++;
    res.tocken_session = "ssd6dr7ftg8yi";
    console.log("counter : " + counter);
    next();
}
// sủ dụg middleware trackEveryRequest cho tất cả các request;
router.use(trackEveryRequest)

//Su dung midleware cho request login
var middleLoginRoute = function (req, res, next) {
    counter = counter + 10;
    next();
}

// router.use("/login", middleLoginRoute);


app.get('/', function (req, res) {
    res.send('Hello World')
})


// app.post("/login", function (req, res) {
//     console.log("hello_im postting");
//
//     connection.query('SELECT * from user', function (err, rows, fields) {
//         if (!err)
//             res.send(rows);
//         else
//             res.send("not found user");
//     });
//
//     // connection.end();
// })


app.use(express.static('public'));
app.get("/home", function (req, res) {
    res.sendFile("index");

})

fs.readFile('./index.html', function (err, html) {
    http.createServer(function (req, res) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    }).listen(8000);
})
app.get("/myhome", function (req, res) {
    console.log("myhome");
})


///Mailler
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'vnpet.dev@gmail.com',
//         pass: 'BlogKLT123'
//     }
// });

// const mailOptions = {
//     from: 'vnpet.dev@gmail.com', // sender address
//     to: 'luyenninhvan.dev@gmail.com', // list of receivers
//     subject: 'Subject of your email', // Subject line
//     html: '<h1> pass word của mày nè :1232445 </h1><br><p>vậy cũng quên</p>'// plain text body
// };
// transporter.sendMail(mailOptions, function (err, info) {
//     if(err)
//         console.log(err)
//     else
//         console.log(info);
// });
// Nếu không gửi được có thể gmail chưa bật chế độ kém bảo mật ---https://myaccount.google.com/u/1/lesssecureapps?pageId=none


app.listen(port)
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("port :" + port);
    console.log("host :" + host);
});

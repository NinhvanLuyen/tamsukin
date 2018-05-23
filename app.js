var express = require('express')
var app = express()
var server = require('http').createServer(app)

const io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('a user connected');


    socket.on('chemgio', function(msg){
        console.log('message: ' + msg);
        io.emit('chemgio',  msg);
    });

});

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get("/home", function (req, res) {
    res.sendFile(__dirname+"/index.html");

})

app.get("/myhome", function (req, res) {
    console.log("myhome");
})




server.listen(8002);
























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

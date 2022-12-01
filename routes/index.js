var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  console.log(req.body) // estoy capturando datos?

  var nombre = req.body.nombre; //1
  var apellido = req.body.apellido; //2
  var email = req.body.email; //3
  var telefono = req.body.telefono; //4
  var comentarios = req.body.comentarios; //5

  var obj = {
    to: 'danielcodazzi95@gmail.com',
    subject: 'contacto desde la web',
    html: `${nombre} ${apellido} Se contacto a traves y quiere mas info a este correo: ${email}. <br> Ademas, hizo el siguiente comentario: ${comentarios}. <br> Su tel es ${telefono}`
}

var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

var info = await transporter.sendMail(obj);

res.render('index',{
  message:'Mensaje enviado correctamente',
});

});


module.exports = router;

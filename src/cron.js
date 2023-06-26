const schedule = require('node-schedule')

const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
const Productos = require('../src/model/productos')


schedule.scheduleJob('30 18 * * *', async () => {
  const productos = await Productos.find({ $expr: { $lt: ["$cantidad_Total", "$cantidad_minima"] }}).sort({ codigo_Articulo: 'ASC' }).lean();
  const transporter = nodemailer.createTransport({
    host: 'mail.hcontrolmedical.com',
    port: 465,
    secure: true,
    auth: {
      user: 'hclinicas@hcontrolmedical.com',
      pass: 'qk0)N*eyR@^C'
    }
  })
  let htmlCorreo = ` 
                     <html>
                      <head>
                        <style>
                          table {
                            border-collapse: collapse;
                            width: 100%;
                          }
                          
                          th, td {
                            padding: 8px;
                            text-align: left;
                            border-bottom: 1px solid #ddd;
                          }
                          
                          th {
                            background-color: #f2f2f2;
                          }
                        </style>
                      </head>
                      <body>
                      
                      <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">codigo</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Cantidad Minima</th>
                          <th scope="col">Costo</th>
                        </tr>
                      </thead>
                      <tbody>`
                for (const producto of productos) {
                  htmlCorreo+=`
                  <tr>
                  <td>${producto.codigo_Articulo}</td>
                  <td>${producto.nombre_Articulo}</td>
                  <td>${producto.cantidad_Total}</td>
                  <td>${producto.cantidad_minima}</td>
                  <td>${producto.costo}</td>
                </tr>`
                }
  htmlCorreo+=`</tbody></table></body></html>`
  const mailOptions = {
    from: 'hclinicas@hcontrolmedical.com',
    to: 'fontalvo2012@hotmail.com;jgmo519@hotmail.com;',
    subject: 'Informe de Cantidades Minimas INBEMETAL',
    html: htmlCorreo
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error', error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })


console.log('probando cron')
})
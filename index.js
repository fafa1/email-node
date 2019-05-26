// Necessário a presença de um form simples com a presença de um campo senha
// que dara início, depois de pressionado o botao enter, ao agendador
// usar criptografia - https://pt.stackoverflow.com/questions/295465/qual-a-criptografia-de-senha-devo-utilizar-com-node-js-qual-mais-segura

const nodeMailer = require('nodemailer')
const fs = require("fs")

let data = fs.readFileSync("config.json", 'utf8')

const email = 'bbfagner2222@gmail.com'

// template do email
const template = `
 <h2> Testando o envio pelo node</h2>
 <ul>
  <li>Nome: Node</li>
  <li>Sobrenome: Javascript</li>
 </ul>
 <p> Testando a Demo!!</p>
`

let transporter = nodeMailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: email,
    pass: JSON.parse(data).password
  },
  tls: {
    rejectUnauthorized: false
  }
})


let helperOptions = {
  from: '"Fagner Batista" <bbfagner2222@gmail.com>',
  to: 'bfagner@hotmail.com, jbatista27@hotmail.com',
  subject: 'NODE - password2',
  text: 'TESTANDO ENVIO DE EMAIL PELO NODE!',
  html: template
}

function envioMensagem () {
  transporter.sendMail(helperOptions, (error, info) => {
    if(error) {
      console.log(error)
    } else {
      console.log("Menssagem enviada!")
      console.log(info)
    }
  })
}

setInterval(envioMensagem, 5000)
// clearInterval(intervalo) // parar a execução quando atingir 24h - usar um contador para isso
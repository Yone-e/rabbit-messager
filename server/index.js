const amqp = require('amqplib');
const nodemailer = require('nodemailer');

const auth = {
  user: 'liam.ekaf.eerf@gmail.com',
  pass: 'freefakemail'
};
const email = {
  replyTo: 'yone.work@gmail.com',
  to: 'david.vonka@gmail.com',
  subject: 'Hi',
}

const queue = 'hello';

amqp.connect('amqp://localhost')
  .then(connection => connection.createChannel())
  .then(channel => (
    channel.assertQueue(queue)
      .then(status => (
        // console.log('status: ', status),
        console.log(`[*] Waiting for messages in \`${queue}\`. To exit press CTRL+C`),
        new Promise((resolve, reject) => (
          channel.consume(
            queue,
            (msg) => {
              if (msg) {
                console.log('[#] Received: ', msg.content.toString());
                return nodemailer.createTransport({
                  host: 'smtp.ethereal.email',
                  port: 587,
                  secure: false,
                  service: 'Gmail',
                  auth,
                  tls: {
                    rejectUnauthorized: false
                  }
                })
                  .sendMail({
                    to: email.to,
                    replyTo: email.replyTo,
                    subject: email.subject,
                    text:  msg.content.toString(),
                  })
                  .then(progress => (
                    console.log('[*] Email sent to ', progress.envelope.to),
                    null
                  ))
                  .then(() => resolve)
                  .catch(e => reject(e));
              }
              return reject(new Error('Empty message appiared!'));
            },
            { noAck: true }
          )
        ))
      ))
  ))
  .catch(error => (
    console.error(`SOMETHING WENT WRONG - ${error.toString()}`),
    process.exit(1)
  ));

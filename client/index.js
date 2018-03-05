const amqp = require('amqplib');

const queue = 'hello';
const msg = process.argv.slice(2).join(' ') || 'Hi';

amqp.connect('amqp://localhost')
  .then(connection => connection.createChannel()
    .then(channel => (
      channel.assertQueue(queue)
        .then(status => (
          // console.log('status: ', status),
          channel.sendToQueue(queue, Buffer.from(msg))
        ))
        .then(ok => (
          console.log('[+] Sent: ', msg),
          null
        ))
    ))
  )
  .then(() => (
    setTimeout(() => (process.exit(0)), 0)
  ))
  .catch(error => (
    console.error(`SOMETHING WENT WRONG - ${error.toString()}`),
    process.exit(1)
  ));

# RabbitMQ messager

### Instalation and Requirements

Application requires `node@8.7.0` and `RabbitMQ@3.7.3`.

Clone the repo - `git clone https://github.com/Yone-e/rabbit-messager.git`.

Go to app directory - `cd rabbit-messager`.

To pull the dependencies type `npm install`.

### Configuring and Running

Email-account credentials should be specified as *`auth`* variable of `./server/index.js`. It should be also signed in in the web-browser.

To run server (RabbitMQ-receiver) use `npm run start:server` or `node ./server/index.js`.

To run client (RabbitMQ-sender) user `npm run start:client -- <msg>` or `node ./client/index.js <msg>`, where *`<msg>`* is a message to be sent. *`'Hi'`* will be used if no parameters are provided.

Make sure you are located in the project directory.

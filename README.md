# Paybook Lite
A very simple and light web application to demonstrate how to take advantage of the Paybook Financial API (Sync) to pull information from Mexican Banks and Tax Authority.

## Requirements
1. [NodeJS](https://nodejs.org/en/) Stable version 5.10.1
2. [Bower](http://bower.io)
3. Paybook Sync API key

## Install (cli / terminal)
1. git clone https://github.com/Paybook/Lite/
2. cd paybook-lite
3. npm install

## Configure
1. Create config/pbsync.js file with the following content
```javascript
    module.exports = {
      pbsync : {
        api_key: "XXXXXX",
        options: {
          host: 'sync.paybook.com',
          port: 443,
          path: '/v1',
        },
        host_files : 'https://s.paybook.com',
      }
    };
```
> Replace XXXXXX with your API key

## Execute (cli / terminal)
1. In paybook-lite directory type **sails lift** command
2. Open a browser [http://localhost:1337/signup](http://localhost:1337/signup)
3. Create a new user
4. Login [http://localhost:1337/login](http://localhost:1337/login)
5. Add a site account


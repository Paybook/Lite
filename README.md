# paybook-lite

## Requirements
1. [NodeJS](https://nodejs.org/en/) Stable version 5.10.1
2. Paybook PBSYNC API key

## Installation (cli / terminal)
1. git clone https://github.com/gerardotrevino/paybook-lite
2. cd paybook-lite
3. npm install

## Configuration
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
2. Replace XXXXXX with your API key

## Execute (cli / terminal)
1. In paybook-lite directory type **sails lift** command
2. Open a browser [http://localhost:1337](http://localhost:1337/signup)
3. Create a new user
4. Login
5. Add a site account


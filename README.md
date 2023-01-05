You need setup your own backend environment. We recommend Heroku. 
You need setup your own no sql database environment. We recommend MongoDB. 


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Envs
```bash
# Private Key
PK=
# Database connection
MONGO_URL=
# Solana RPC
SOLANA_RPC=
# Raffle Publickey
RAFLLE_PUBKEY=
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database
```bash
# Create Customer
{"_id":{"$oid":"627449241ebec27f1b30f147"},"name":"secretspacesociety","admin":"4vFzBMVy8wenpcNH1F8AkCLcnDfnmzronpw4iDvJ7vAJ","tokens":[{"name":"SPST","tokenMint":"9THzNrZiF3XNsuuqb9T8gsCGaYnek2Lsg5YKdqMnf8TW","tokenAccount":"E4bVWT1aQaiVbq9YahD1DqCJGmevHsQwstDNAw5v283t","decimals":{"$numberInt":"9"}},{"name":"SOL","tokenMint":"11111111111111111111111111111111"},{"name":"Jelly","tokenMint":"9WMwGcY6TcbSfy9XPpQymY3qNEsvEaYL3wivdwPG2fpp","tokenAccount":"EKbXwvinBo9sj9wBhGTNJV6sNGrba7bycZrr1cmZKUTk","decimals":{"$numberInt":"6"}},{"name":"PLTMX","tokenMint":"pLtMXLgfyTsRfZyxnFkJpWqHBxMTvkr4tyMLgyj9wrY","tokenAccount":"5mBzXGZ75PqQe1kmYHkxZ9XQvKZaDmmPRwbQ8ngs6TRe","decimals":{"$numberInt":"9"}},{"name":"SUITES","tokenMint":"9HYUHuQPixPvRnWCaVWcwFX9o2GGDBJiPWTVveoPVViA","tokenAccount":"8ZtU47eaSq3AT5CKg7WBw78dhaEz8ERrys8EHo67JffS","decimals":{"$numberInt":"6"}}]}
```
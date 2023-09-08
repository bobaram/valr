# This project is a fee estimator for an ethereum blockchain

How to run the project

# 1.clone the repo

# 2. npm i

# 3. Create an iNFAURA Api key (follow guide at https://docs.infura.io/getting-started) then set projectId in fee-estimator file in Utils folder

# 4. set environment to test with ' $env:NODE_ENV = "test" '

# run tests with npm test

# set environment to development with ' $env:NODE_ENV = "development" '

# run project with 'npm start' or 'nodemon server.js'

URL ENDPOINTS

# Get average fee of latest block - http://localhost:3000/getfee

# Get average fee of last 5 blocks - http://localhost:3000/getfee/5-blocks

# Get average fee of last 30 blocks - http://localhost:3000/getfee/30-blocks

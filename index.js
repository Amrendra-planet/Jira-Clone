const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routerUser = require('./routes/user');
const routerChat = require('./routes/chat');
const routerGame = require('./routes/game');
const routerDashboard = require('./routes/dashboard');
// const routerDashboard = require('../node js login/dasboard');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const cluster = require('cluster');
const os = require('os');

// Load config
dotenv.config({ path: './config/config.env' });
connectDB();

const numCPUs = os.cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     // Optionally restart the worker
//     cluster.fork();
//   });
// } else {
  const app = express();
  const port = process.env.port || 5000;

  app.listen(port, () => console.log(`Worker ${process.pid} running on port ${port}`));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Routes middleware
  app.use('/api/user', routerUser);
  app.use('/api/chat', routerChat);
  // app.use('/api/dashboard', routerDashboard);
  app.use('/api/dashboard', routerDashboard);
  app.use('/api/game',routerGame);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



  console.log(`Worker ${process.pid} started`);
// }

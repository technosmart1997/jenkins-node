import express from 'express'
import cors from 'cors'
import cluster from 'cluster'
import os from 'os'
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);  
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
} else {
    const app = express()
    app.use(cors())

    app.get('/ping', (req, res) => res.status(200).json({ status: true, message: 'Pong'}))
    
    
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`Worker process ${process.pid} is listening on port ` + PORT);
    })
}



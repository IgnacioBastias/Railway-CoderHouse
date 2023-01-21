// import mainRouter from './router/index.js';
import cluster from 'cluster';
import os from 'os';
import express from 'express';
import minimist from 'minimist';


const optionalArgsObject = {
  alias: {
    m: 'modo',
    p: 'port'
  },
  default: {
    port: '8080',
    modo: 'fork'
  }
};

const args = minimist(process.argv.slice(2), optionalArgsObject);
const modo = args.modo

const CPUs = os.cpus().length;

const app = express();

if (modo === 'cluster' && cluster.isPrimary) {
  console.log(`cantidad de nucleos= ${CPUs}`);
  console.log(`PID MASTER= ${process.pid}`);
  for (let i = 0; i < CPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} with code ${code}`);
    cluster.fork();
  })
} else {

  app.get('/api/randoms', (req, res) => {

    res.json({
      pid: process.pid,
      puerto:args.port,
      msg: `/api/randoms`,
    });
  });

  app.get('/', (req, res) => {

    res.json({
      pid: process.pid,
      msg: `Hola desde puerto ${args.port} `,
    });
  });

  app.get('/info', (req, res) => {

    console.log(`PID= ${process.pid}`)
    console.log(CPUs);
    res.json({
      NumeroDeCPUs: CPUs,
      SistemaOperativo: process.platform,
      VersionNode: process.version,
      MemoriaTotalReservada: JSON.stringify(process.memoryUsage()),
      ProcessId: process.pid,
      Puerto: args.port,
      CarpetaProyecto: process.cwd()
    })

  });


  app.listen(args.port, () => console.log(`Servidor express escuchando en el puerto ${args.port} - PID WORKER ${process.pid}`));

};

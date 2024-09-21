import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cluster = require('cluster');  
const os = require('os');

async function bootstrap() {
  if (cluster.isMaster) {  
    const numCPUs = os.cpus().length;
    console.log(`Número de CPUs disponíveis: ${numCPUs}`);
    console.log(`Master ${process.pid} está rodando`);


    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }


    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} morreu. Iniciando novo worker...`);
      cluster.fork();
    });
  } else {

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Worker ${process.pid} está rodando na porta 3000`);
  }
}

bootstrap();
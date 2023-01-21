
                                                                   RUTAS Y CURL

 //////////////// RUTAS  /////////////////


http://localhost:80/info // Devuelve info de servidor

http://localhost:80/ // Devuelve pID y puerto utilizado

http://localhost:80/api/randoms // redirige a puerto 8082 8083 8084 8085, balanceador de carga y a cluster en puerto 8081 reverse proxy


////////////////  COMANDOS FOREVER  ///////////////


forever start src/index.js -m=fork // levanta en modo fork, si no pasamos parametro levanta igual

forever start src/index.js -m=cluster // levanta en modo cluster

forever stopall // frena todos los procesos


////////////////  COMANDOS PM2  ///////////////// 


pm2 start src/index.js --name='PruebaFork' --watch // levanta en modo fork

pm2 start src/index.js --name='PruebaCluster' --watch -i max // levanta en modo cluster 

pm2 stop "all" // frena todos los  procesos

pm2 delete all // elimina todos los procesos activos


/////////////// REVERSE PROXY //////////////////////


forever start src/index.js -m=fork -p=8080 // levanta servidor fork en puerto 8080

node src/index.js -p=8081 -m=cluster // levanta servidor cluster en puerto 8081


/////////////// BALANCEADOR DE CARGA ///////////////////


forever start src/index.js -m=fork -p=8080 // levanta servidor fork en puerto 8080

pm2 start ecosystem.config.cjs // levanta 4 servidores fork en puertos 8082 8083 8084 8085 

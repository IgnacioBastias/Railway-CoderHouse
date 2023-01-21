module.exports = {
  apps: [
    {
      name: "App1",
      script: "./src/index.js",
      watch: true,
      autorestart: true,
      args: "--port=8082",
    },
    {
      name: "App2",
      script: "./src/index.js",
      watch: true,
      autorestart: true,
      args: "--port=8083 ",
    },
    {
      name: "App3",
      script: "./src/index.js",
      watch: true,
      autorestart: true,
      args: "--port=8084",
    },
    {
      name: "App4",
      script: "./src/index.js",
      watch: true,
      autorestart: true,
      args: "--port=8085",
    },
  ],
};
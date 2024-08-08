module.exports = {
  apps: [
    {
      name: "linetracer-counter-backend-client",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};

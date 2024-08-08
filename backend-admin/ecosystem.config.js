module.exports = {
  apps: [
    {
      name: "linetracer-counter-backend-admin",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};

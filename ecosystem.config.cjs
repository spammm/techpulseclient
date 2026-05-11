module.exports = {
  apps: [
    {
      name: 'techpulseclient',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: '1',
        NODE_OPTIONS: '--max-old-space-size=256',
      },
    },
  ],
};

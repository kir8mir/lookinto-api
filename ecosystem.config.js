module.exports = {
  apps: [
    {
      name: 'lookinto-api',
      script: 'npm',
      args: 'run start:prod',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      post_update: ['npm run build'],
    },
  ],
};

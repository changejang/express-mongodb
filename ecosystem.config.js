module.exports = {
  apps: [{
    name: 'app',
    script: './index.js',
    // instances: 0,  // max
    instances: 1,
    exec_mode: 'cluster',
    listen_timeout: 5000,
    kill_timeout: 5000,
    env: {
      PORT: 3012,
    },
    env_web_production: {
      NODE_ENV: 'PRODUCTION',
    },
    env_web_local: {
      NODE_ENV: 'LOCAL',
    },
  }],
};

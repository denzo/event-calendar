/* eslint-env node */
'use strict';

const BUCKET = 'event-calendar';
const REGION = 'us-west-1';

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      environment: 'production'
    },
    s3: {
      profile: 'personal',
      bucket: BUCKET,
      region: REGION
    },
    's3-index': {
      profile: 'personal',
      bucket: BUCKET,
      region: REGION,
      allowOverwrite: true
    },
    pipeline: {
      activateOnDeploy: true
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};

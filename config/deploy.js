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
      // This setting runs the ember-cli-deploy activation hooks on every deploy
      // which is necessary in order to run ember-cli-deploy-cloudfront.
      // To disable CloudFront invalidation, remove this setting or change it to `false`.
      // To disable ember-cli-deploy-cloudfront for only a particular environment, add
      // `ENV.pipeline.activateOnDeploy = false` to an environment conditional below.
      activateOnDeploy: false
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

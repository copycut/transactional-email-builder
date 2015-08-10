'use strict';

var env = process.env;

module.exports = {
  s3: {
    key: env.S3_ACCESS_KEY,
    secret: env.S3_SECRET_KEY,
    region: env.S3_REGION,
    emails: {
      bucketname: env.S3_EMAILS_BUCKET_NAME,
      bucketdir: env.S3_EMAILS_BUCKET_DIR,
      bucketuri: env.S3_EMAILS_BUCKET_URI
    },
    translations: {
      bucketname: env.S3_TRANSLATIONS_BUCKET_NAME,
      bucketdir: env.S3_TRANSLATIONS_BUCKET_DIR
    }
  }
};

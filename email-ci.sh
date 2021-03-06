#!/bin/sh

docker run \
  -e "S3_ACCESS_KEY=$S3_ACCESS_KEY" \
  -e "S3_SECRET_KEY=$S3_SECRET_KEY" \
  -e "S3_REGION=$S3_REGION" \
  -e "S3_EMAILS_BUCKET_NAME=$S3_EMAILS_BUCKET_NAME" \
  -e "S3_EMAILS_BUCKET_DIR=$S3_EMAILS_BUCKET_DIR" \
  -e "S3_EMAILS_BUCKET_URI=$S3_EMAILS_BUCKET_URI" \
  -e "S3_TRANSLATIONS_BUCKET_NAME=$S3_TRANSLATIONS_BUCKET_NAME" \
  -e "S3_TRANSLATIONS_BUCKET_DIR=$S3_TRANSLATIONS_BUCKET_DIR" \
  email ci

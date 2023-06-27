const AWS = require("aws-sdk");

const s3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };
    let data = await s3Client.get(params).promise();

    if (!data) {
      throw Error(`Failed to get file ${fileName} from ${bucket}`);
    }

    return data;
  },

  async write(data, fileName, bucket) {
    const params = {
      Bucket: bucket,
      Body: data,
      Key: fileName,
    };

    const newData = await s3Client.upload(params).promise();

    if (!newData) {
      throw Error(`There was an error writing file`);
    }

    return newData.Key;
  },
};

module.exports = S3;

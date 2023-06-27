const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");

const bucket = process.env.bucketName;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    //failed without an ID
    return Responses._400({ message: "missing the filename in the path" });
  }

  let fileName = event.pathParameters.fileName;

  const image = await S3.get(fileName, bucket).catch((err) => {
    console.log("There was a error in s3 read", err);
    return null;
  });

  //failed as ID wasn't in the data
  if (!image) {
    Responses._400({ message: "Faile to write notice by ID" });
  }

  return Responses._200({ file });
};

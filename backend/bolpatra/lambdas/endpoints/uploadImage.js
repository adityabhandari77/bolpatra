const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");
const fs = require("fs");

const bucket = process.env.bucketName;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    //failed without an ID
    return Responses._400({ message: "missing the filename in the path" });
  }

  let fileName = event.pathParameters.fileName;

  const fileContent = fs.readFileSync(event.body);

  if (fileContent === null) {
    Responses._400({ message: "Faile to write notice by ID" });
  }

  const newData = await S3.write(fileContent, fileName, bucket).catch((err) => {
    console.log("There was a error in s3 write", err);
    return null;
  });

  /*if (data[ID]) {
    //return data
    return Responses._200(data[ID]);
  }*/

  //failed as ID wasn't in the data
  if (!newData) {
    Responses._400({ message: "Faile to write notice by ID" });
  }

  return Responses._200({ newData });
};

const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    //failed without an ID
    return Responses._400({ message: "missing the ID in the path" });
  }

  let ID = event.pathParameters.ID;

  const notice = JSON.parse(event.body);
  notice.ID = ID;

  const newNotice = await Dynamo.write(notice, tableName).catch((err) => {
    console.log("There was a error in write", err);
    return null;
  });

  /*if (data[ID]) {
    //return data
    return Responses._200(data[ID]);
  }*/

  //failed as ID wasn't in the data
  if (!newNotice) {
    Responses._400({ message: "Faile to write notice by ID" });
  }

  return Responses._200({ newNotice });
};

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

  let notice = await Dynamo.get(ID, tableName).catch((err) => {
    console.log("error in dynamo get", err);
    return null;
  });

  /*if (data[ID]) {
    //return data
    return Responses._200(data[ID]);
  }*/

  //failed as ID wasn't in the data
  if (!notice) {
    Responses._400({ message: "No ID Found in Data" });
  }

  return Responses._200({ notice });
};

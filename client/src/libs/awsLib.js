import { Storage } from "aws-amplify";
import * as uuid from "uuid";

export async function s3Upload(file) {
  const filename = uuid.v1();

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

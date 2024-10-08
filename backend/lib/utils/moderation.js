import {
  RekognitionClient,
  DetectModerationLabelsCommand,
} from "@aws-sdk/client-rekognition";

const client = new RekognitionClient({});

export const Reko = async (params) => {
  try {
    const command = new DetectModerationLabelsCommand({
      Image: {
        Bytes: params,
      },
      MinConfidence: 60,
    });
    const response = await client.send(command);
    console.log(response);

    return response;
  } catch (error) {
    throw error;
  }
};

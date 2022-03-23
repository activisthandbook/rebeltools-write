const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

let configuration = null;
let openai = null;

exports.testFunction = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    functions.logger.info("🔥 testFunction started", data);

    const envRef = db.collection("rebeltools-write").doc("env");
    const resultRef = db.collection("results").doc(data.id);

    return envRef
      .get()
      .then(async (doc) => {
        if (!doc.exists) {
          functions.logger.error("🔴 env not found");
          return "env not found";
        } else {
          functions.logger.info("🟢 env contents", doc.data());

          configuration = new Configuration({
            apiKey: doc.data().OPENAI_API_KEY,
          });

          openai = new OpenAIApi(configuration);

          const introduction = await writeTacticIntroduction(data);
          const impact = await writeTacticImpact(data);
          const resourcesNeeded = await writeTacticresourcesNeeded(data);
          const organise = await writeTacticOrganise(data);
          const example = await writeTacticExample(data);
          const improve = await writeTacticImprove(data);

          const fullResponse = {
            topic: data.topic,
            type: data.type,
            introduction: introduction,
            impact: impact,
            resourcesNeeded: resourcesNeeded,
            organise: organise,
            example: example,
            improve: improve,
          };

          resultRef
            .set(fullResponse)
            .then(() => {
              functions.logger.info("🟢 Response saved!", fullResponse);
              return fullResponse;
            })
            .catch((error) => {
              functions.logger.error("🔴 Error in setting result data", error);
              return error;
            });
        }
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in getting env", error);
        return error;
      });
  });

async function writeTacticIntroduction(data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "Write a short introduction for a guide for activists about '" +
        data.topic +
        " '.",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticImpact(data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "How effective are '" +
        data.topic +
        " ' and how can I make them more impactful?",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticResourcesNeeded(data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "What resources do activists need to organise a '" + data.topic + " '?",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticOrganise(data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt: "How do activists organise a'" + data.topic + " '?",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticExample(data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "Where can I find examples for activists of a successful " +
        data.topic +
        " '?",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticImprove(data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "List questions that activists may have about " + data.topic + " '.",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

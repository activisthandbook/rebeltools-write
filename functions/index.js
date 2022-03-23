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

          const fullResponse = {
            introduction: introduction,
            impact: impact,
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
        "Write a short introduction for a guide about '" + data.topic + " '.",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      functions.logger.info("🟢 Response OpenAI", response.data);
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
      prompt: "What is the potential impact of a '" + data.topic + " '?",
      temperature: 0.5,
      max_tokens: 120,
    })
    .then((response) => {
      functions.logger.info("🟢 Response OpenAI", response.data);
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

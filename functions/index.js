const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

let configuration = null;
let openai = null;

exports.testFunction = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    functions.logger.info("🔥 testFunction started", data);

    const envRef = db.collection("rebeltools-write").doc("env");
    const resultRef = db.collection("results").doc(data.id);

    return envRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          functions.logger.error("🔴 env not found");
          return "env not found";
        } else {
          functions.logger.info("🟢 env contents", doc.data());

          configuration = new Configuration({
            apiKey: doc.data().OPENAI_API_KEY,
          });

          openai = new OpenAIApi(configuration);

          resultRef
            .set({
              introduction: writeTacticIntroduction(data),
            })
            .catch((error) => {
              functions.logger.error("🔴 Error in setting result data", error);
            });
        }
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in getting env", error);
        return error;
      });
  });

async function writeTacticIntroduction(data) {
  openai
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

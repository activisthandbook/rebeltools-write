const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.testFunction = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    functions.logger.info("testfunction started", context.rawRequest.headers);

    const envRef = db.collection("rebeltools-write").doc("env");

    return envRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          functions.logger.error("env not found");
          return "env not found";
        } else {
          functions.logger.info("env contents", doc.data());

          const configuration = new Configuration({
            apiKey: doc.data().OPENAI_API_KEY,
          });

          const openai = new OpenAIApi(configuration);
          openai
            .createCompletion("text-davinci-002", {
              prompt: "Say this is a test",
              temperature: 0,
              max_tokens: 6,
            })
            .then((response) => {
              functions.logger.info("response", response);
              return response;
            })
            .catch((error) => {
              functions.logger.error("error", error);
              return error;
            });
        }
      })
      .catch((error) => {
        functions.logger.error("error", error);
        return error;
      });
  });

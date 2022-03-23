const functions = require("firebase-functions");
const { Configuration, OpenAIApi } = require("openai");

exports.testFunction = functions
  .region("europe-west1")
  .https.onCall((data, context) => {
    functions.logger.info("testfunction started", context.rawRequest.headers);

    const userProfileRef = db.collection("rebeltools-write").doc("env");

    envRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          functions.logger.info("env not found");
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
              functions.logger.info("error", error);
            });
        }
      })
      .catch((error) => {
        functions.logger.info("error", error);
      });
  });

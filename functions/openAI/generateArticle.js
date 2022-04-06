const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { Configuration, OpenAIApi } = require("openai");

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

let configuration = null;
let openai = null;

exports.generateArticle = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    functions.logger.info("🔥 testFunction started", data);
    functions.logger.info("🔥 auth data", context.auth);

    if (context.auth.token.email_verified) {
      functions.logger.info("🟢 email verified");
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

            const introduction = await writeTacticIntroduction(
              context.auth.uid,
              data
            );
            const impact = await writeTacticImpact(context.auth.uid, data);
            const resourcesNeeded = await writeTacticResourcesNeeded(
              context.auth.uid,
              data
            );
            const organise = await writeTacticOrganise(context.auth.uid, data);
            const example = await writeTacticExample(context.auth.uid, data);
            const improve = await writeTacticImprove(context.auth.uid, data);

            const fullResponse = {
              user: context.auth.uid,
              timestamp: FieldValue.serverTimestamp(),
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
                functions.logger.error(
                  "🔴 Error in setting result data",
                  error
                );
                return error;
              });
          }
        })
        .catch((error) => {
          functions.logger.error("🔴 Error in getting env", error);
          return error;
        });
    } else {
      // User not signed in
      functions.logger.error("🔴 not signed in");
      return "not signed in";
    }
  });

async function writeTacticIntroduction(userID, data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "Write a short introduction for a guide for activists about '" +
        data.topic +
        " '.",
      temperature: 0.5,
      max_tokens: 250,
      user: userID,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticImpact(userID, data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "How effective are '" +
        data.topic +
        " ' and how can I make them more impactful?",
      temperature: 0.5,
      max_tokens: 250,
      user: userID,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticResourcesNeeded(userID, data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "What resources do activists need to organise a '" + data.topic + " '?",
      temperature: 0.5,
      max_tokens: 200,
      user: userID,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticOrganise(userID, data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt: "How do activists organise a'" + data.topic + " '?",
      temperature: 0.5,
      max_tokens: 250,
      user: userID,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticExample(userID, data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "Where can I find examples for activists of a successful " +
        data.topic +
        " '?",
      temperature: 0.5,
      max_tokens: 120,
      user: userID,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

async function writeTacticImprove(userID, data) {
  return await openai
    .createCompletion("text-davinci-002", {
      prompt:
        "List 6 questions that activists may have about " + data.topic + " '.",
      temperature: 0.5,
      max_tokens: 250,
      user: userID,
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      functions.logger.error("🔴 Error in OpenAI", error);
      return error;
    });
}

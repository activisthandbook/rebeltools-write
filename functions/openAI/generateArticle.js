const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { Configuration, OpenAIApi } = require("openai");

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

let configuration = null;
let openai = null;

exports.generateArticle = functions
  .region("europe-west1")
  .runWith({ secrets: ["OPENAI_SECRET"] })
  .https.onCall(async (data, context) => {
    functions.logger.info("🔥 generateArticle started", data);
    functions.logger.info("🔥 auth data", context.auth);

    if (context.auth.token.email_verified) {
      functions.logger.info("🟢 email verified");
      const resultRef = db.collection("results").doc(data.id);

      configuration = new Configuration({
        apiKey: process.env.OPENAI_SECRET,
      });

      openai = new OpenAIApi(configuration);

      const fullResponse = await writeTacticArticle(context.auth.uid, data);

      return await resultRef
        .set(fullResponse)
        .then(() => {
          functions.logger.info("🟢 Response saved!", fullResponse);
          return fullResponse;
        })
        .catch((error) => {
          functions.logger.error("🔴 Error in setting result data", error);
          return error;
        });
    } else {
      // User not signed in
      functions.logger.error("🔴 not signed in");
      return "not signed in";
    }
  });

async function writeTacticArticle(userID, data) {
  // The write functions below will add additional data to the article object
  let article = {
    userID: userID,
    type: data.type,
    topic: data.topic,
    timestamp: FieldValue.serverTimestamp(),
  };

  return await Promise.all([
    writeIntroduction(),
    writeImpact(),
    writeResourcesNeeded(),
    writeOrganise(),
    writeExample(),
    writeImprove(),
  ])
    .then(() => {
      return article;
    })
    .catch((error) => {
      functions.logger.error("🔴 Promise rejected", error);
      return error;
    });

  function extractTextFromResponse(response) {
    // Returns the text from the response, removing new lines at beginning and end of text
    return response.data.choices[0].text.replace(/^\s+|\s+$/g, "");
  }

  async function writeIntroduction() {
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
        article.introduction = extractTextFromResponse(response);
        return article.introduction;
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in OpenAI", error);
        return error;
      });
  }

  async function writeImpact() {
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
        article.impact = extractTextFromResponse(response);
        return article.impact;
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in OpenAI", error);
        return error;
      });
  }

  async function writeResourcesNeeded() {
    return await openai
      .createCompletion("text-davinci-002", {
        prompt:
          "What resources do activists need to organise a '" +
          data.topic +
          " '?",
        temperature: 0.5,
        max_tokens: 200,
        user: userID,
      })
      .then((response) => {
        article.resourcesNeeded = extractTextFromResponse(response);
        return article.resourcesNeeded;
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in OpenAI", error);
        return error;
      });
  }

  async function writeOrganise() {
    return await openai
      .createCompletion("text-davinci-002", {
        prompt: "Explain how activists can organise a'" + data.topic + " '.",
        temperature: 0.5,
        max_tokens: 250,
        user: userID,
      })
      .then((response) => {
        article.organise = extractTextFromResponse(response);
        return article.organise;
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in OpenAI", error);
        return error;
      });
  }

  async function writeExample() {
    return await openai
      .createCompletion("text-davinci-002", {
        prompt:
          "Give examples for activists of a successful " + data.topic + " '.",
        temperature: 0.5,
        max_tokens: 120,
        user: userID,
      })
      .then((response) => {
        article.example = extractTextFromResponse(response);
        return article.example;
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in OpenAI", error);
        return error;
      });
  }

  async function writeImprove() {
    return await openai
      .createCompletion("text-davinci-002", {
        prompt:
          "List questions that activists may have about " + data.topic + " '.",
        temperature: 0.9,
        max_tokens: 250,
        user: userID,
      })
      .then((response) => {
        article.improve = extractTextFromResponse(response);
        return article.improve;
      })
      .catch((error) => {
        functions.logger.error("🔴 Error in OpenAI", error);
        return error;
      });
  }
}

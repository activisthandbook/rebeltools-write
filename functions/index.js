import admin from "firebase-admin";

// 🔄 INITIALISATIONS
admin.initializeApp();

import generateArticle from "./openAI/generateArticle";

exports.generateArticle = generateArticle;

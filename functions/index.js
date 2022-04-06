const admin = require("firebase-admin");

// 🔄 INITIALISATIONS
admin.initializeApp();

const generateArticle = require("./openAI/generateArticle");

exports.generateArticle = generateArticle.generateArticle;

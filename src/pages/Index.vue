<template>
  <div class="q-my-lg q-gutter-y-md">
    <h1 style="font-size: 64px">
      Write guides<br />
      for activists,<br />
      <span class="gradient-text">AI-powered</span>
    </h1>
    <p class="text-body1 text-bold" style="font-size: 24px; line-height: 1.5">
      Rebel Write helps you write guides for activists. Never start with an
      empty page. Having read over 350 billion words, this tool generates
      article outlines in seconds.
    </p>
    <q-btn
      v-show="!$store.state.auth.data.emailVerified"
      @click="signin"
      label="Sign in with Google"
      no-caps
      color="secondary"
    />
  </div>
  <article-input v-if="$store.state.auth.data.emailVerified" />
  <tactic-result v-if="$store.state.auth.data.emailVerified" />
  <about-explanation />
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

import ArticleInput from "components/ArticleInput";
import TacticResult from "components/TacticResult";
import AboutExplanation from "components/AboutExplanation";

export default {
  name: "PageIndex",
  components: { ArticleInput, TacticResult, AboutExplanation },
  methods: {
    signin() {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // The signed-in user info.
          this.$store.commit("auth/signin", result.user);
          this.$q.notify("Signin succesful");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          console.log(error);
          this.$q.notify("Something went wrong signin in");
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // The email of the user's account used.
          // const email = error.email;
          // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
  },
};
</script>
<style scoped>
.gradient-text {
  /* Fallback: Set a background color. */
  background-color: #d70057;

  background-image: linear-gradient(45deg, #d70057, #0431ea);
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
</style>

<template>
  <promo-material />
  <article-input v-if="$store.state.auth.data.emailVerified" />
  <tactic-result v-if="$store.state.auth.data.emailVerified" />
  <!-- <subscribe-options v-if="$store.state.auth.data.emailVerified" /> -->
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

import ArticleInput from "components/ArticleInput";
import TacticResult from "components/TacticResult";
// import SubscribeOptions from "components/SubscribeOptions";
import PromoMaterial from "components/PromoMaterial";

export default {
  name: "PageIndex",
  components: {
    ArticleInput,
    TacticResult,
    // SubscribeOptions,
    PromoMaterial,
  },
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
<style lang="scss" scoped>
@media (min-width: $breakpoint-xs) {
  .headline {
    font-size: 64px;
  }
  .text-body1 {
    font-size: 24px;
    line-height: 1.5;
  }
}
</style>

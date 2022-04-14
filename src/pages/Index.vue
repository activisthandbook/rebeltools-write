<template>
  <promo-material />
  <div v-if="$store.state.currentCustomer.dataLoaded">
    <div v-if="$store.state.auth.data.emailVerified">
      <article-input />
      <tactic-result />
    </div>

    <about-explanation />
  </div>
  <div v-else-if="$store.state.auth.dataLoaded"><q-spinner /></div>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

import ArticleInput from "components/ArticleInput";
import TacticResult from "components/TacticResult";
import AboutExplanation from "components/AboutExplanation";
import PromoMaterial from "components/PromoMaterial";

export default {
  name: "PageIndex",
  components: {
    ArticleInput,
    TacticResult,
    AboutExplanation,
    PromoMaterial,
  },
  computed: {
    // a computed getter
    creditCount: function () {
      // `this` points to the vm instance
      return this.$store.state.currentCustomer.data.timestamps.length;
    },
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

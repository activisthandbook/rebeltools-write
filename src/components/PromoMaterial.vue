<template>
  <div class="q-my-lg q-gutter-y-md">
    <h1 class="headline">
      Write guides<br />
      for change-makers,<br />
      <span class="gradient-text">AI-powered</span>
    </h1>
    <div class="text-body1 text-bold">
      Rebel Write helps you write educational guides for change-makers. Never
      start with an empty page. Having read over 350 billion words, this tool
      generates article outlines in seconds.
    </div>
    <div v-show="!$store.state.auth.data.emailVerified">
      <q-btn
        @click="signin"
        label="Sign in with Google"
        icon="mdi-account-circle"
        no-caps
        text-color="white"
        class="gradient shadow-9 q-mb-lg"
        padding="8px 24px"
        flat
      />
      <h2>Research & education</h2>
      <div>
        Humanity is facing major challanges. Rebel Write helps people explore
        ways to how to build a world that is more just. It generates article
        outlines that spark the creativity in change-making educators. The tool
        gives social researchers access to knowledge based on millions of
        webpages and books, being unprecedented in its size.
      </div>
      <h2>Safe & responsible AI</h2>
      <div>
        We believe artificial intelligence can help the public good, if used
        responsibly. These are the steps we take to ensure safe use of this
        tool:
        <ul>
          <li>
            We work with an invite-only system to build a relationship of trust
            with our users.
          </li>
          <li>
            All AI generated text is scanned using a content filter, to warn
            users about potentially sensitive or unsafe content.
          </li>
          <li>
            User input is limited to work within predefined article themes.
            Users are nudged toward acceptable queries, by providing input
            examples.
          </li>
          <li>
            Users are informed about the risks of using AI to generate text.
            They are regularly reminded not to copy & paste the output, and to
            conduct manual factchecks.
          </li>
          <li>
            Any text generated may only be shared outside the tool if the user
            clearly indicates it was created with the help of artificial
            intelligence. In addition, they must always refer back to Rebel
            Write, so readers can get more information about the workings of
            this tool.
          </li>
          <li>
            All generated texts are stored on our server, for regular human
            review. Users can give feedback on the produced output.
          </li>
          <li>
            To avoid abuse, we limit the number of articles produced per month
            and protect our backend resources using Firebase App Check.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

export default {
  name: "PromoMaterial",
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

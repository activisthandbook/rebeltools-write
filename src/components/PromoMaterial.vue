<template>
  <div class="q-my-lg q-gutter-y-md">
    <h1 class="headline">
      Write guides<br />
      for activists,<br />
      <span class="gradient-text">AI-powered</span>
    </h1>
    <div class="text-body1 text-bold">
      Rebel Write helps you write educational guides for activists. Never start
      with an empty page. Having read over 350 billion words, this tool
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
      <q-card bordered flat>
        <q-card-section>
          <div class="q-gutter-y-sm">
            <h2>About this tool</h2>
            <div>
              Rebel Write is a tool to
              <strong>help you write guides</strong> for activists. It is
              powered by <strong>artifical intelligence (AI)</strong>. In other
              words: a computer writes the text it produces.
            </div>
            <div>
              Our AI is quite smart, but not human. It will makes mistakes, so
              be careful when using it.
              <strong
                >Not everything our tool says it factually true or morally
                right.</strong
              >
              You need to do your own research.
            </div>
            <div>
              This tool is not meant to replace human writers. Do not copy &
              paste the text it produces.
              <strong>Use it to brainstorm and get inspiration</strong> about
              the topic you want to write about.
            </div>
            <div>
              Rebel Write is open source. If you are interested in learning more
              about how we built this tool, check our
              <a
                href="https://github.com/activisthandbook/rebeltools-write/"
                target="_blank"
                >GitHub repository</a
              >. This tool was developed by the people behind
              <a
                href="https://github.com/activisthandbook/rebeltools-write/"
                target="_blank"
                >Activist Handbook</a
              >, the Wikipedia for activists.
            </div>
            <div>
              Have feedback? Let us know:
              <a href="mailto:hey@rebel.tools">hey@rebel.tools</a>
            </div>
          </div>
        </q-card-section>
      </q-card>
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

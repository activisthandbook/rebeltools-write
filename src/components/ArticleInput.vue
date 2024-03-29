<template>
  <q-card v-show="!next" id="card" class="q-my-md">
    <q-card-section>
      <div class="q-gutter-y-sm">
        <h2 ref="scrollPosition">Important to know</h2>
        <div>You may use Rebel Write under the following terms:</div>
        <ul>
          <li>
            <strong>Artificial intelligence:</strong> The output is generated
            using AI. It makes mistakes, so do your own research. This tool is
            intented to help you get creative inspiration, not to replace human
            writers. In addition, you must adhere to the
            <a href="https://beta.openai.com/docs/usage-guidelines"
              >OpenAI content policy</a
            >.
          </li>
          <li>
            <strong>Content usage:</strong> When including generated text from
            this tool in a public article or other content format, you must
            always explain you made use of AI to help you write it. The text is
            available under a
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              >Creative Commons (BY-NC-SA 4.0)</a
            >
            licence. In short, this means you are free to share and adapt it, as
            long as you give appropriate credit, use it for non-commercial
            purposes, and share it under the same licence.
          </li>
          <li>
            <strong>Privacy: </strong>Your topic input and the generated
            articles will be stored on our servers and are publicly visible for
            others to see, being linked to your personal account. In addition,
            make use of some third party services (privacy policies:
            <a href="https://firebase.google.com/support/privacy">Firebase</a>,
            <a href="https://openai.com/api/policies/privacy/">OpenAI</a> and
            <a href="https://stripe.com/privacy">Stripe</a>).
          </li>
        </ul>
        <q-checkbox
          v-model="consent"
          color="secondary"
          class="text-bold"
          label="I understand and accept these terms"
        />
        <q-btn
          label="Start writing"
          @click="next = true"
          class="full-width"
          color="secondary"
          :disable="!consent"
          no-caps
        />
      </div>
    </q-card-section>
  </q-card>
  <q-card v-show="next" class="q-my-md">
    <q-card-section>
      <div>
        <h2>Article generator</h2>
        <q-input
          label="Topic"
          hint="Examples: petition, protest march, Scientists for Climate"
          v-model="topic"
          color="secondary"
          class="q-mt-md q-mb-sm"
          outlined
        />
        <div>
          <div class="text-caption text-bold">
            Article type (only tactics supported currently):
          </div>
          <q-chip
            v-model="type"
            val="tactic"
            label="Tactic 📣"
            selected
            class="text-bold"
          />
          <q-chip v-model="type" val="book" label="Book 📚" disable />
          <q-chip v-model="type" val="movie" label="Film 🎬" disable />
          <q-chip v-model="type" val="movement" label="Movement 🦋" disable />
          <q-chip
            v-model="type"
            val="communication"
            label="Communication 💬"
            disable
          />
          <q-chip v-model="type" val="tools" label="Tools 🛠" disable />
          <q-chip
            v-model="type"
            val="organising"
            label="Organising ⚡️"
            disable
          />
          <!-- <div class="text-caption">
            Only writing about tactics is currently supported.
          </div> -->
        </div>

        <q-btn
          label="Generate article"
          class="full-width gradient q-mt-md"
          icon="mdi-auto-fix"
          text-color="white"
          @click="generateText()"
          :disable="!topic || !consent"
          no-caps
          :loading="dataLoading"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Generating article...
          </template>
        </q-btn>
        <div class="text-body2" v-if="dataLoading" @click="progressLoading()">
          <q-linear-progress :value="loadingProgress" class="q-mt-md" stripe />
          <div class="q-mt-sm">
            {{ loadingMessage }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <div id="scrollPosition"></div>
  <q-dialog v-model="error" :maximized="$q.screen.lt.md" persistent>
    <subscribe-options />
  </q-dialog>
  <subscribe-options />
</template>
<script>
import SubscribeOptions from "components/SubscribeOptions";

import { httpsCallable } from "firebase/functions";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
const db = getFirestore();

import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

export default {
  components: { SubscribeOptions },
  data() {
    return {
      next: false,
      consent: false,
      dataLoading: false,
      error: false,
      loadingProgress: 0.01,
      loadingMessage: "Boosting AI power...",
      topic: "",
      type: true,
    };
  },
  methods: {
    scroll() {
      const target = getScrollTarget(
        document.getElementsByClassName("q-layout")[0]
      );
      const offset = document.getElementById("scrollPosition").offsetTop - 56;
      const duration = 1000;
      setVerticalScrollPosition(target, offset, duration);
    },
    generateText() {
      this.dataLoading = true;
      this.loadingProgress = 0.01;
      this.error = null;

      this.progressLoading();

      const generateArticle = httpsCallable(
        this.$store.state.firebase.functions,
        "generateArticle"
      );
      const id = this.makeid();
      generateArticle({ id: id, type: "tactic", topic: this.topic })
        .then((result) => {
          console.log(result);
          onSnapshot(doc(db, "results", id), (doc) => {
            this.$store.commit("result/addResult", doc.data());
            this.dataLoading = false;
            this.scroll();
            this.$q.notify({ message: "Article generated", icon: "mdi-check" });
          });
        })
        .catch((error) => {
          this.dataLoading = false;
          this.loadingProgress = 0.01;

          if (
            error ==
            "FirebaseError: You have reached the limit of articles per month"
          ) {
            this.error = true;
          } else {
            this.$q.notify({
              message: "Generating article failed",
              icon: "mdi-alert",
            });
            console.log(error);
          }
        });
    },
    makeid() {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 30; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    progressLoading() {
      const id = setInterval(() => {
        if (this.loadingProgress > 0.9) {
          this.loadingMessage = "Almost done...";
        } else if (this.loadingProgress > 0.8) {
          this.loadingMessage = "Removing spelling mistakes...";
        } else if (this.loadingProgress > 0.7) {
          this.loadingMessage = "Adding some relevant resources...";
        } else if (this.loadingProgress > 0.6) {
          this.loadingMessage = "Putting words on paper...";
        } else if (this.loadingProgress > 0.5) {
          this.loadingMessage = "Creating outline...";
        } else if (this.loadingProgress > 0.4) {
          this.loadingMessage = "Getting inspiration from Activist Handbook...";
        } else if (this.loadingProgress > 0.2) {
          this.loadingMessage = "Creative brainstorming...";
        } else if (this.loadingProgress > 0.2) {
          this.loadingMessage = "Scanning the entire web...";
        } else if (this.loadingProgress > 0.1) {
          this.loadingMessage = "Reading all the books...";
        }

        if (this.loadingProgress < 1) {
          this.loadingProgress = this.loadingProgress + 0.05;
        } else {
          clearInterval(id);
        }
      }, 750);
    },
  },
};
</script>

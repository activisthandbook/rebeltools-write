<template>
  <q-card v-show="!next">
    <q-card-section>
      <div class="q-gutter-y-sm">
        <h2>Terms of use</h2>
        <div>The following is important to know:</div>
        <ul>
          <li>The output is generated using artificial intelligence (AI).</li>
          <li>
            Make sure to proofread and check facts. Do not copy & paste the text
            it produces. Only use it to brainstorm and get inspiration about the
            topic you want to write about. In addition, you must adhere to the
            <a href="https://beta.openai.com/docs/usage-guidelines"
              >OpenAI usage guidelines</a
            >.
          </li>
          <li>
            The generated text is available under a
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              >Creative Commons (BY-NC-SA 4.0)</a
            >
            licence. In short, this means you are free to share and adapt it, as
            long as you give appropriate credit, use it for non-commercial
            purposes, and share it under the same licence. You must always say
            you made use of artificial intelligence.
          </li>
          <li>
            Your input and the generated articles will be stored on our servers
            and linked to your account. This data will be used to improve this
            tool.
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
  <q-card v-show="next">
    <q-card-section>
      <div>
        <h2>Article generator</h2>
        <q-input
          label="Topic"
          hint="Examples: petition, protest march, Extinction Rebellion"
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
          :loading="dataLoading || (!dataLoading && $store.state.result.data)"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Generating article...
          </template>
        </q-btn>
        <div
          class="text-body2"
          v-if="dataLoading || (!dataLoading && $store.state.result.data)"
        >
          Generating an article out of thin air takes a bit of time. Just wait &
          see this magic article generator do its work...
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { httpsCallable } from "firebase/functions";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
const db = getFirestore();

export default {
  data() {
    return {
      next: true,
      consent: false,
      dataLoading: false,
      topic: "",
      type: "tactic",
    };
  },
  methods: {
    generateText() {
      this.dataLoading = true;

      const generateArticle = httpsCallable(
        this.$store.state.firebase.functions,
        "generateArticle"
      );
      const id = this.makeid();
      generateArticle({ id: id, type: this.type, topic: this.topic })
        .then((result) => {
          onSnapshot(doc(db, "results", id), (doc) => {
            this.$store.commit("result/addResult", doc.data());
            this.dataLoading = false;
          });
        })
        .catch((error) => {
          console.log(error);
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
  },
};
</script>

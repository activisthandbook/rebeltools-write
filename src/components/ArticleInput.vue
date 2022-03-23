<template>
  <q-card>
    <q-card-section>
      <div class="q-gutter-y-md">
        <div class="text-bold">What do you want to write about?</div>
        <q-input
          label="Article topic"
          hint="Examples: petition, protest march, Extinction Rebellion"
          v-model="topic"
          color="secondary"
        />
        <div>
          <q-radio
            v-model="type"
            val="tactic"
            label="Tactic"
            color="secondary"
          />
          <q-radio
            v-model="type"
            val="book"
            label="Book"
            disable
            color="secondary"
          />
          <q-radio
            v-model="type"
            val="movie"
            label="Film"
            disable
            color="secondary"
          />
          <q-radio
            v-model="type"
            val="movement"
            label="Movement"
            disable
            color="secondary"
          />
          <div class="text-caption">
            Only writing about tactics is currently supported.
          </div>
        </div>

        <q-card bordered flat>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <div class="text-caption">Usage terms & privacy policy</div>
              <div class="text-bold">
                This text is generated using artificial intelligence (powered by
                OpenAI, Davinci model). You may not publish this text anywhere
                without proofreading and factchecking everything. Only use this
                tool to get inspiration for writing your articles. In addition,
                you must adhere to the
                <a href="https://beta.openai.com/docs/usage-guidelines"
                  >OpenAI usage guidelines</a
                >.
              </div>
              <div class="text-bold">
                Your input and the generated articles will be stored on our
                servers and linked to your account.
              </div>
              <q-checkbox
                v-model="consent"
                color="secondary"
                label="I accept the usage terms & privacy policy."
              />
            </div>
          </q-card-section>
        </q-card>
        <q-btn
          color="secondary"
          label="Generate article"
          class="full-width"
          @click="generateText()"
          :disable="!topic || !consent"
          no-caps
          :loading="dataLoading || (!dataLoading && !$store.state.result.data)"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Generating article...
          </template>
        </q-btn>
        <div
          class="text-body2"
          v-if="dataLoading || (!dataLoading && !$store.state.result.data)"
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
      consent: false,
      dataLoading: false,
      topic: "",
      type: "tactic",
    };
  },
  methods: {
    generateText() {
      this.dataLoading = true;

      const testFunction = httpsCallable(
        this.$store.state.firebase.functions,
        "testFunction"
      );
      const id = this.makeid();
      testFunction({ id: id, type: this.type, topic: this.topic })
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

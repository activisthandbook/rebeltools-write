<template>
  <q-page class="flex flex-center">
    <q-btn label="Test function" @click="testFunction()" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { httpsCallable } from "firebase/functions";

export default defineComponent({
  name: "PageIndex",
  mounted: function () {
    this.$nextTick(function () {
      // this.testFunction();
    });
  },
  methods: {
    testFunction() {
      const testFunction = httpsCallable(
        this.$store.state.firebase.functions,
        "testFunction"
      );
      testFunction({ id: this.makeid() })
        .then((result) => {
          console.log(result.data);
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
});
</script>

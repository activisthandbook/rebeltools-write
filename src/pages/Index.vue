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
      testFunction()
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

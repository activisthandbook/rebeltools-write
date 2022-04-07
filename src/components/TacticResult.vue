<template>
  <q-card v-if="$store.state.result.data" id="results">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-h1">{{ $store.state.result.data.topic }}</div>
        <q-btn icon="mdi-content-copy" @click="copy()" round flat>
          <q-tooltip>Copy text</q-tooltip>
        </q-btn>
      </div>
      <div class="q-gutter-y-sm q-my-sm" id="content">
        <p>
          <strong style="white-space: pre-wrap">
            {{ $store.state.result.data.introduction }}
          </strong>
        </p>
        <h1>Potential impact</h1>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.impact }}
        </p>
        <h1>Resources needed</h1>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.resourcesNeeded }}
        </p>
        <h1>How to organise</h1>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.organise }}
        </p>
        <h1>Examples</h1>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.example }}
        </p>
        <p>
          Also check out the
          <a
            :href="
              'https://nvdatabase.swarthmore.edu/index.php/search/node?keys=' +
              $store.state.result.data.topic
            "
            target="_blank"
            >Global Nonviolent Action Database</a
          >
          (opens in new tab).
        </p>
        <h1>Improve this page</h1>
        <p>These are some questions people may have:</p>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.improve }}
        </p>
        <h1>External resources</h1>
        <p>
          See relevant resources on
          <a
            :href="
              'https://beautifultrouble.org/toolbox/search/' +
              $store.state.result.data.topic
            "
            target="_blank"
            >Beautiful Trouble</a
          >,
          <a
            :href="
              'https://www.google.com/search?q=how+to+organise+' +
              $store.state.result.data.topic
            "
            target="_blank"
            >Google</a
          >
          and
          <a
            :href="
              'https://scholar.google.com/scholar?q=' +
              $store.state.result.data.topic +
              '+activist+tactic'
            "
            target="_blank"
            >Google Scholar</a
          >
          (both open in new tab). Also make sure to check out the
          <a href="https://activisthandbook.org/resources" target="_blank"
            >other sources for resources</a
          >
          on Activist Handbook.
        </p>
        <h1>Attribution</h1>
        <p>
          The <a href="https://write.rebel.tools/">Rebel Write</a> tool was used
          to help write this article using artificial intelligence. This content
          is available under a
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            >Creative Commons licence</a
          >.
        </p>
      </div>
      <q-card class="bg-grey-3 text-center q-mt-lg" flat>
        <q-card-section>
          <div class="q-gutter-y-sm">
            <!-- <div>Share feedback</div> -->
            <!-- <div class="q-gutter-x-sm">
              <q-btn
                round
                icon="mdi-thumb-down-outline"
                size="16px"
                color="white"
                text-color="black"
              />
              <q-btn
                round
                icon="mdi-thumb-up-outline"
                size="16px"
                color="white"
                text-color="black"
              />
            </div> -->

            <q-input
              outlined
              color="secondary"
              bg-color="white"
              label="What could we improve?"
              type="textarea"
              autogrow
              input-style="min-height: 3em"
            />
            <q-btn
              label="Share feedback"
              color="secondary"
              no-caps
              class="full-width"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  methods: {
    copy() {
      const element = document.getElementById("content");
      // var r = document.createRange();
      // r.selectNode(document.getElementById("content"));
      // window.getSelection().removeAllRanges();
      // window.getSelection().addRange(r);

      // if (!navigator.clipboard) {
      //   // use old commandExec() way
      // } else {
      //   navigator.clipboard
      //     .writeText(r)
      //     .then(function () {
      //       alert("yeah!"); // success
      //     })
      //     .catch(function () {
      //       alert("err"); // error
      //     });
      // }
      // var r = document.createRange();
      // r.selectNode(document.getElementById("content"));
      // window.getSelection().removeAllRanges();
      // window.getSelection().addRange(r);
      // document.execCommand("copy");
      // window.getSelection().removeAllRanges();

      if (!element) return Promise.reject(new Error("No element passed"));
      if (typeof window === "undefined")
        return Promise.reject(new Error("Not in a browser environment"));
      if (!(element instanceof HTMLElement)) {
        throw new Error("this is not an HTMLElement");
      }
      const isCopySupported = () => {
        return document.queryCommandSupported("copy");
      };
      if (!isCopySupported) {
        return Promise.reject(new Error("execCommand not supported"));
      }
      // By spec it has to be the selected text
      const selectElementContents = (el) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel && sel.removeAllRanges();
        sel && sel.addRange(range);
      };
      const removeWindowSelections = () => {
        const selection = window.getSelection();
        selection && selection.removeAllRanges();
        document.body.focus();
      };

      // execCommand is only available in designMode
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/designMode
      const oldContentEditable = element.contentEditable;
      // @ts-ignore
      const oldReadonly = element.readOnly;
      const makeElementEditable = () => {
        element.contentEditable = "true";
        // @ts-ignore
        element.readOnly = "false";
      };
      const turnElementBackToOldEditMode = () => {
        element.contentEditable = oldContentEditable;
        // @ts-ignore
        element.readOnly = oldReadonly;
      };

      const copy = () => {
        /**
         * @param {ClipboardEvent} event
         */
        function listener(event) {
          event.clipboardData &&
            event.clipboardData.setData(
              "text/plain",
              element.innerText ||
                /** @type {HTMLTextAreaElement} */ (element).value
            );
          console.log(element.innerHTML.replace(/(?:\r\n|\r|\n)/g, "<br />"));
          event.clipboardData &&
            event.clipboardData.setData(
              "text/html",
              element.innerHTML.replace(/(?:\r\n|\r|\n)/g, "<br />")
            );
          // https://w3c.github.io/clipboard-apis/#override-copy
          event.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
      };

      /**
       * @type {Promise<void>}
       */
      const promise = new Promise(() => {
        makeElementEditable();
        selectElementContents(element);
        copy();
        turnElementBackToOldEditMode();
        this.$q.notify({ message: "Text copied", icon: "mdi-check" });
        // removeWindowSelections();
      });
      return promise;
    },
  },
};
</script>
<style scoped>
.text-h1:first-letter {
  text-transform: uppercase;
}
h1 {
  font-size: 24px;
}
</style>

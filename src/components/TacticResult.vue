<template>
  <q-card v-if="$store.state.result.data">
    <q-card-section>
      <div class="q-gutter-sm">
        <h1>{{ $store.state.result.data.topic }}</h1>
        <p>
          <strong style="white-space: break-spaces">
            {{ $store.state.result.data.introduction.substring(2) }}
          </strong>
        </p>
        <h2>Potential impact</h2>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.impact.substring(2) }}
        </p>
        <h2>Resources needed</h2>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.resourcesNeeded.substring(2) }}
        </p>
        <h2>How to organise</h2>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.organise.substring(2) }}
        </p>
        <h2>Examples</h2>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.example.substring(2) }}
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
        <h2>Improve this page</h2>
        <p>These are some questions people may have:</p>
        <p style="white-space: break-spaces">
          {{ $store.state.result.data.improve.substring(2) }}
        </p>
        <h2>External resources</h2>
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
      </div>
    </q-card-section>
  </q-card>
</template>
<style scoped>
h1:first-letter {
  text-transform: uppercase;
}
</style>

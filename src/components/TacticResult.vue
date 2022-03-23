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
        <h2>Improve this page</h2>
        <p>Answer these questions:</p>
        <p>{{ $store.state.result.data.improve.substring(2) }}</p>
        <h2>External resources</h2>
        <p>
          See relevant
          <a
            :href="
              'https://www.google.com/search?q=how+to+organise+' +
              $store.state.result.data.topic
            "
            target="_blank"
            >resources on Google</a
          >
          (opens in new tab).
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

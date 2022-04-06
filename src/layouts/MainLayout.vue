<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>Rebel Write</q-toolbar-title>
        <q-btn
          v-show="$store.state.auth.data.emailVerified"
          @click="$store.dispatch('auth/signOut')"
          label="Sign out"
          outline
          no-caps
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding style="max-width: 700px; margin: auto">
        <div class="q-gutter-md">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

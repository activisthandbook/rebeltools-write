<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title>Rebel Write</q-toolbar-title>
        <!-- <q-btn
          v-show="$store.state.auth.data.emailVerified"
          @click="$store.dispatch('auth/signOut')"
          label="Sign out"
          flat
          no-caps
        /> -->
        <span class="text-body2" v-if="$store.state.auth.data.displayName">{{
          $store.state.auth.data.displayName
        }}</span>
        <q-avatar
          class="q-ml-sm"
          size="36px"
          v-if="$store.state.auth.data.photoURL"
        >
          <img :src="$store.state.auth.data.photoURL" />
        </q-avatar>
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

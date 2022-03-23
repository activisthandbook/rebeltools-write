<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Rebel Write</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <article-input />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import ArticleInput from "components/ArticleInput";

export default {
  name: "MainLayout",
  components: { ArticleInput },
};
</script>

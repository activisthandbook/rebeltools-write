<template>
  <article-input />
  <tactic-result />
</template>

<script>
import ArticleInput from "components/ArticleInput";
import TacticResult from "components/TacticResult";

export default {
  name: "PageIndex",
  components: { ArticleInput, TacticResult },
};
</script>

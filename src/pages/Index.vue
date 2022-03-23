<template>
  <article-input />
  <tactic-result />
  <about-explanation />
</template>

<script>
import ArticleInput from "components/ArticleInput";
import TacticResult from "components/TacticResult";
import AboutExplanation from "components/AboutExplanation";

export default {
  name: "PageIndex",
  components: { ArticleInput, TacticResult, AboutExplanation },
};
</script>

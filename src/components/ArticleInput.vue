<template>
  <q-card>
    <q-card-section>
      <div class="q-gutter-sm">
        <q-radio
          v-model="shape"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="tactic"
          label="Tactic"
        />
        <q-radio
          v-model="shape"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="rectangle"
          label="Rectangle"
        />
        <q-radio
          v-model="shape"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="ellipse"
          label="Ellipse"
        />
        <q-radio
          v-model="shape"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          val="polygon"
          label="Polygon"
        />
      </div>

      <q-input label="Topic" />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      shape: "tactic",
    };
  },
};
</script>

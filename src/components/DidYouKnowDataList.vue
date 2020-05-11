<template>
  <ul v-if="inputData">
    <li v-for="(el, i) in inputData.items"
        :key="i">
      <h5 v-if="el.link">
        <a>
          {{ linkUrl(el.link) }}
        </a>
      </h5>
      <p>
        {{ el.label }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class DidYouKnowDataList extends Vue {
    @Prop() inputData!: DidYouKnowData;
    @Prop() prefix!: string;

    linkUrl(path: string): string | null {
        return this.prefix ? this.prefix + path : path;
    }
}
</script>

<style scoped lang="scss">
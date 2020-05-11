<template>
  <ol v-if="inputData">
    <li v-for="(el, i) in inputData.items"
        :key="i">
      <h6>
        {{ el.label }}
        <!-- <div v-html="el"></div> -->
        <a v-if="el.link"
           :href="linkUrl(el.link)"
           target="_blank">
          <md-icon v-if="linkUrl">launch</md-icon>
        </a>
      </h6>
    </li>
  </ol>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class DidYouKnowDataList extends Vue {
    @Prop() inputData!: DidYouKnowData;
    @Prop() linkPrefix!: string;

    linkUrl(path: string): string | null {
        return this.linkPrefix ? this.linkPrefix + path : path;
    }

    parseLinks(str: string) {
        // return str.indexOf('://') > -1 ? str.split()
        return str;
    }
}
</script>

<style scoped lang="scss">
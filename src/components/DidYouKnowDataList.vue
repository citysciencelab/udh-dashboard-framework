<template>
  <ol v-if="inputData">
    <li v-for="(el, i) in inputData.items"
        :key="i">
      <h6>
        <div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="inline" v-html="utils.string.parseLinkFromString(el.label)" />
          <a v-if="el.link"
             :href="linkUrl(el.link)"
             target="_blank">
            <md-icon v-if="linkUrl">launch</md-icon>
          </a>
        </div>
      </h6>
    </li>
  </ol>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Utils from '@/utils/utils'

@Component({})
export default class DidYouKnowDataList extends Vue {
    @Prop() inputData!: DidYouKnowData;
    @Prop() linkPrefix!: string;
    @Prop({default: false}) date!: boolean;

    utils = new Utils();

    linkUrl(path: string): string | null {
        return this.linkPrefix ? this.linkPrefix + path : path;
    }
}
</script>

<style scoped lang="scss">
 .inline {
   display: inline-block;
   margin-right: 5px;
 }
</style>
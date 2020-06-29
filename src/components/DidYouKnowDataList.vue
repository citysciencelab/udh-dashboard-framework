<template>
  <div>
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
    <div v-if="date">
      <small>
        {{ dateString() }}
      </small>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Utils from '@/utils/utils'
import { messages } from '@/messages/messages.udpc.module';

@Component({})
export default class DidYouKnowDataList extends Vue {
    @Prop() inputData!: DidYouKnowData;
    @Prop() linkPrefix!: string;
    @Prop() date!: string;
    @Prop({default: () => ({year: 'numeric', month: 'long', when: 'last'})}) dateOpts!: {year: string, month: string, day?: string};
    @Prop({default: true}) lastMonth!: boolean;
    @Prop({default: 'de-DE'}) langCode!: string;

    utils = new Utils();

    linkUrl(path: string): string | null {
        return this.linkPrefix ? this.linkPrefix + path : path;
    }

    dateString(): string {
      if (this.lastMonth) {
        // console.log(this.$t('udpc.accessApps'));
        return this.date + new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString((this.langCode as string), this.dateOpts);
      }
      return this.date + new Date().toLocaleDateString((this.langCode as string), this.dateOpts)
    }
}
</script>

<style scoped lang="scss">
 .inline {
   display: inline-block;
   margin-right: 5px;
 }
</style>
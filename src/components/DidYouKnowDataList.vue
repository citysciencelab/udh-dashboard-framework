<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="getWrapper(0)" />
    <ol v-if="inputData">
      <li v-for="(el, i) in inputData.items"
          :key="i">
        <h6>
          <div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="inline" v-html="utils.string.parseLinkFromString(el.label)" />
            <a v-if="el.link"
               :id="el.link"
               class="link"
               :href="linkUrl(el.link)"
               target="_blank"
               @click="onClick($event, el)"
            >
              <md-icon v-if="linkUrl">launch</md-icon>
            </a>
          </div>
        </h6>
      </li>
    </ol>
    <div v-if="date">
      <small>
        {{ dateString }}
      </small>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="getWrapper(1)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Utils from '@/utils/utils'
import InfoOverlay from './InfoOverlay.vue';

@Component({
  components: {
    InfoOverlay
  }
})
export default class DidYouKnowDataList extends Vue {
    @Prop() inputData!: DidYouKnowData;
    @Prop() linkPrefix!: string;
    @Prop({default: ''}) wrapper!: string;
    @Prop() date!: string;
    @Prop({default: () => ({year: 'numeric', month: 'long', when: 'last'})}) dateOpts!: {year: string, month: string, day?: string};
    @Prop({default: true}) lastMonth!: boolean;
    @Prop({default: 'de-DE'}) langCode!: string;
    @Prop({default: 'FHHNET'}) internalNetwork!: string;

    utils = new Utils();

    linkUrl(path: string): string | null {
        return this.linkPrefix ? this.linkPrefix + path : path;
    }

    getWrapper(i: number) {
      return this.wrapper.split('PLATZHALTER')[i] || '';
    }

    get dateString(): string {
      if (this.lastMonth) {
        return this.date + new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString((this.langCode as string), this.dateOpts);
      }
      return this.date + new Date().toLocaleDateString((this.langCode as string), this.dateOpts)
    }

    onClick(evt: Event, el: { label: string, link: string }) {
      if (el.label.includes(this.internalNetwork)) {
        evt.preventDefault();
        this.$emit('tooltip-internal-network', {
          label: el.label,
          link: this.linkUrl(el.link)
        });
      }
    }
}
</script>

<style scoped lang="scss">
 .inline {
   display: inline-block;
   margin-right: 5px;
 }
</style>
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

@Component({})
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

    /**
     * @returns {string} - a link to an external source used as href in <a>
     */
    linkUrl(path: string): string | null {
        return this.linkPrefix ? this.linkPrefix + path : path;
    }

    /**
     * @param {number} i - the index of the wrapper text split by the PLATZHALTER tag
     * @returns {string} - the text to be used in the resp. position
     */
    getWrapper(i: number) {
      return this.wrapper.split('PLATZHALTER')[i] || '';
    }

    /**
     * getter for a locale date string based on the input props and set language
     * @returns {string} the date string
     */
    get dateString(): string {
      if (this.lastMonth) {
        return this.date + new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString((this.langCode as string), this.dateOpts);
      }
      return this.date + new Date().toLocaleDateString((this.langCode as string), this.dateOpts)
    }

    /**
     * click event handler on <a> element click and alerts the app if the link leads to an internal source
     * @fires tooltip-internal-network Event to the parent component
     * @returns {void}
     */
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
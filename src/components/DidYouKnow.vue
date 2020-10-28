<template v-if="data && data.items.length > 0">
  <span v-if="data.items[currentIndex]"
        class="list-item">
    <a v-if="data.items[currentIndex].link"
       :href="linkUrl"
       :title="linkTitle"
       target="_blank"
       @click="onClick($event)">
      {{ prefix ? $t(prefix, { fact: data.items[currentIndex].label }) : data.items[currentIndex].label }}
      <md-icon v-if="linkUrl">launch</md-icon>
    </a>
    <p v-if="!data.items[currentIndex].link">
      {{ data.items[currentIndex].label }}
    </p>
  </span>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import Utils from '@/utils/utils'
  // eslint-disable-next-line no-unused-vars
  import {LocaleMessage} from 'vue-i18n';

  @Component({})
  export default class DidYouKnow extends Vue {
    @Prop() data!: DidYouKnowData;
    @Prop({default: 5000}) interval!: number;
    @Prop() prefix!: string;
    @Prop() linkPrefix!: string;
    @Prop({default: 'FHHNET'}) internalNetwork!: string;
    timer!: number;
    currentIndex = 0;
    utils = new Utils();

    get linkTitle(): LocaleMessage | string {
      switch (this.data.action) {
        case 'md_id':
          return this.$t('udpc.tooltipHdmkLink');
        case 'link':
          return this.$t('general.link');
        default:
          return "";
      }
    }

    get linkUrl(): string | null {
      switch (this.data.action) {
        case 'md_id':
          return (this.linkPrefix || "") + this.data.items[this.currentIndex].link;
        case 'link':
          return this.data.items[this.currentIndex].link;
        default:
          return null;
      }
    }

    mounted() {
      this.updateInterval();
    }

    updateInterval() {
      if (this.data) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.currentIndex < this.data.items.length - 1) {
            this.currentIndex++;
          } else {
            this.currentIndex = 0;
          }
          this.onInterval();
        }, this.interval);
      }
    }

    onInterval() {
        switch (this.data.action) {
            case 'md_id':
                this.$emit('show-in-map', this.data.items[this.currentIndex]);
                break;
            default:
                // add more options
        }
    }

    onClick(evt: Event) {
      switch (this.data.action) {
        case 'md_id':
          if (this.data.items[this.currentIndex].label.includes(this.internalNetwork)) {
            evt.preventDefault();
            this.$emit('tooltip-internal-network', {
              label: this.data.items[this.currentIndex].label,
              link: this.data.items[this.currentIndex].link
            });
          }
          break;
        default:
          evt.preventDefault();
       // follow click
      }
    }

    @Watch('data') onDataChanged() {
      this.updateInterval();
    }
  }
</script>

<style scoped lang="scss">
    .list {
        position: relative;
    }

    .list-enter-active, .list-leave-active {
        transition: opacity .8s ease;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>

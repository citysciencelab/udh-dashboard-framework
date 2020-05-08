<template v-if="data">
  <span class="list-item">
    <template v-if="data.items.length > 0">
      <a :href="linkUrl"
         :title="linkTitle"
         target="_blank"
         @click="onClick($event)"
      >
        {{ prefix ? $t(prefix, { fact: data.items[currentIndex].label }) : data.items[currentIndex].label }}
        <md-icon v-if="linkUrl">launch</md-icon>
      </a>
      <span v-if="!data.items[currentIndex].link">
        {{ data.items[currentIndex].label }}
      </span>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { LocaleMessage } from 'vue-i18n';

@Component({})
export default class DidYouKnow extends Vue {
    @Prop() data!: DidYouKnowData;
    @Prop() interval!: number;
    @Prop() prefix!: string;
    @Prop() storeId!: string;
    timer!: number;
    currentIndex = 0;

    get hmdkUrl(): string | undefined {
        if (this.storeId) {
            return this.$store.state[this.storeId].hmdkUrl;
        }
        return this.$store.state.hmdkUrl
    }

    get linkTitle(): LocaleMessage | string {
        switch (this.data.action) {
            case 'md_id':
                return this.$t('udpc.tooltipHdmkLink');
            default:
                return "";
        }
    }

    get linkUrl(): string | null {
        switch (this.data.action) {
            case 'md_id':
                return this.hmdkUrl + this.data.items[this.currentIndex].link;
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
                this.$emit('show-in-map', this.data.items[this.currentIndex].link);
                break;
            default:
                // add more options
        }
    }

    onClick(evt: Event) {
        switch (this.data.action) {
            case 'md_id':
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

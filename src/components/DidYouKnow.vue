<template v-if="data">
  <span class="list-item">
    <template v-if="data.items.length > 0">
      <a
        @click="onClick($event)"
        :href="data.items[currentIndex].link"
      >
        {{ this.prefix ? $t(prefix, { fact: data.items[currentIndex].label }) : data.items[currentIndex].label }}
      </a>
    </template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class DidYouKnow extends Vue {
    @Prop() data!: DidYouKnowData;
    @Prop() interval!: number;
    @Prop() prefix!: string;
    timer!: number;
    currentIndex = 0;

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
            case 'map':
                this.$emit('show-in-map', this.data.items[this.currentIndex].link);
                break;
            default:
                // add more options
        }
    }

    onClick(evt: Event) {
        switch (this.data.action) {
            case 'link':
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

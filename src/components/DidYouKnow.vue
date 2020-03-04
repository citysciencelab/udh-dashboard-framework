<template>
    <span class="list-item">
        <a v-on:click="onClick($event)" :href="$data.$items[currentIndex].link">{{ this.prefix ? $t(prefix, { fact: $data.$items[currentIndex].label }) : $data.$items[currentIndex].label }}</a>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class DidYouKnow extends Vue {
    @Prop() inputData!: any;
    @Prop() interval!: number;
    @Prop() prefix!: string;
    timer: any;
    currentIndex = 0;
    action: string = 'none';
    $items: { label: string, link: string }[] = [{
        label: '',
        link: ''
    }];

    mounted() {
        this.updateItems();
    }

    @Watch('inputData') onItemsChanged() {
        this.updateItems();
    }

    updateItems() {
        if (this.inputData) {
            if (typeof this.inputData[0] === 'string') {
                this.$data.$items = this.inputData.map((item: any) => ({label: item, link: ''}));
                this.action = 'none'
            }
            else {
                this.$data.$items = this.inputData.items.length ? this.inputData.items : this.$data.$items
                this.action = this.inputData.action
            }
            this.setInterval();
        }
    }

    setInterval() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.currentIndex < this.$data.$items.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.onInterval();
        }, this.interval);
    }

    onInterval() {
        switch (this.action) {
            case 'map':
                this.$emit('show-in-map', this.$data.$items[this.currentIndex].link);
                break;
            default:
                // add more options
        }
    }

    onClick(evt: Event) {
        switch (this.action) {
            case 'link':
                break;
            default:
                evt.preventDefault();
                // follow click
        }
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
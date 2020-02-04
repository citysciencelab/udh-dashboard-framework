<template>
    <span class="list-item">
        {{ this.prefix ? $t(prefix, { fact: items[currentIndex] }) : items[currentIndex] }}
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class DidYouKnow extends Vue {
    @Prop() items!: string[];
    @Prop() interval!: number;
    @Prop() prefix!: string;
    currentIndex = 0;

    mounted() {
        setInterval(() => {
            if (this.currentIndex < this.items.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        }, this.interval);
    }
}
</script>

<style scoped>
    .list {
        position: relative;
    }

    .list-item {
        position: absolute;
        display: inline-block;
        margin-right: 10px;
    }

    .list-enter-active, .list-leave-active {
        transition: opacity .8s ease;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>
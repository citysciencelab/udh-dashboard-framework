<template>
    <md-dialog
        :md-active.sync="active"
        :md-click-outside-to-close="true">
        <div class="content" ref="content"></div>
    </md-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { messages } from '@/messages/messages.udpc.module';

@Component({})
export default class FullscreenContent extends Vue {
    @Prop() content!: Element;
    active: boolean = true;
    get $content () {
        return this.content;
    }

    mounted() {
        this.open()
    }

    @Watch('content') onContentChanged() {
        this.open();
    }

    open() {
        console.log(this.$content);
        (this.$refs.content as Element).append(this.$content);
    }
}
</script>

<style lang="scss" scoped>
    .content {
        height: 80vh;
        width: 80vw;
    }
</style>
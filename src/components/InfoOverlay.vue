<template>
    <md-dialog
        :md-active.sync="active"
        :md-click-outside-to-close="true">
        {{content}}
    </md-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class InfoOverlay extends Vue {
    @Prop() content!: string;
    active:boolean = false;

    showMe() {
        this.active = true;
    }
}
</script>

<style lang="scss">
    .md-dialog-container {
        padding: 20px;
    }
</style>

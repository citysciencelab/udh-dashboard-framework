<template>
    <md-card class="md-card-stats">
        <md-card-header :data-background-color="dataBackgroundColor">
            <slot name="header"></slot>
        </md-card-header>

        <md-card-content>
            <slot name="content"></slot>
        </md-card-content>

        <md-card-actions md-alignment="left">
            <slot name="footer"></slot>
        </md-card-actions>
    </md-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class StatsCard extends Vue {
    @Prop() dataBackgroundColor!: { type: string, default: string };
}
</script>

<style scoped lang="scss">
    .md-card-content {
        height: 100%;
    }
</style>

<template>
  <md-card>
    <md-card-header :data-background-color="dataBackgroundColor">
      <slot name="header" />
    </md-card-header>

    <md-card-content>
      <slot name="content" />
    </md-card-content>

    <md-card-actions>
      <slot name="footer" />
    </md-card-actions>
  </md-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({})
export default class DashboardTile extends Vue {
    @Prop() dataBackgroundColor!: { type: string, default: string };
}
</script>

<style scoped lang="scss">
.md-card /deep/ {
    padding: 15px 15px 10px 15px;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;

    .md-card-header {
        padding: 0 !important;
        z-index: 2;

        .card-header-text {
            font-size: 15px;
            text-align: left;
            font-weight: bold;
        }

        .info-icon-holder .md-icon {
            float: right;
            font-size: 19px !important;
            width: 15px;
            height: 15px;
            min-width: 15px;
            cursor: pointer;
        }
    }

    .md-card-content {
        padding: 0 !important;
        margin: 15px 0 0 0;
        // height: 100%;
    }

    .md-card-actions {
        margin: 0;
        width: 100%;
        padding: 8px 0;

        .notice {
            width: 100%;
            text-align: left;
        }
    }
}
</style>
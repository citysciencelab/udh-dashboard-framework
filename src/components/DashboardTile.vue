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
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({})
    export default class DashboardTile extends Vue {
        @Prop() dataBackgroundColor!: { type: string, default: string };
    }
</script>

<style lang="scss">
    .md-card {
        padding: 15px;
        margin: 0;
        height: 100%;
        position: relative;

        .md-card-header {
            position: relative;
            padding: 0 !important;
            z-index: 2;

            .tool-tip-header {
                font-size: 15pt;
                text-align: left;
            }

            .info-icon-holder {
                .md-icon {
                    width: 15px;
                    height: 15px;
                    min-width: 15px;
                    font-size: 19px !important;
                }
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
            }
        }

        .md-card-content {
            padding: 15px 0 0 0;
            height: auto;
            //height: 100%;
        }

        .md-card-actions {
            position: absolute;
            bottom: 0;
            left: 0;
            margin: 0;
            padding: 0 15px;
            width: 100%;

            .notice {
                width: 100%;
                text-align: left;
            }

        }
    }
</style>

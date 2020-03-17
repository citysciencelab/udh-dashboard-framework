<template>
  <md-dialog
    :md-active.sync="active"
    :md-click-outside-to-close="true"
  >
    <span
      class="close-button"
      @click="hide()"
    >
      <md-icon>close</md-icon>
    </span>

    <div class="heading">
      {{ header }}
    </div>
    <div class="content">
      {{ content }}
    </div>
    <div class="footer">
      {{ footer }}
    </div>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class InfoOverlay extends Vue {
    @Prop() content!: string;
    @Prop() header!: string;
    @Prop() footer!: string;
    active:boolean = false;

    show() {
        this.active = true;
    }

    hide() {
        this.active = false;
    }
}
</script>

<style lang="scss">
    .md-overlay {
        background: rgba(125, 125, 125, 1);
    }
</style>

<style scoped lang="scss">
    @import '../assets/scss/udpc-dashboard/_fonts_colors.scss';

    .md-dialog {
        color: black;
        padding: 45px 49px;

        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;

            .md-icon {
                cursor: pointer;
                color: $hamburg-blue-dark !important;
            }
        }
        .heading {
            font-size: 24px;
            padding-bottom: 20px;
        }
        .content {
            font-size: 18px;
        }
        .footer {
            padding-top: 20px;
        }
    }
</style>

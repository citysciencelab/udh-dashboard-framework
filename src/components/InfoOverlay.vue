<template>
  <md-dialog
    ref="dialog"
    :md-active.sync="active"
    :md-click-outside-to-close="true"
    @md-opened="renderHtmlContent">
    <span class="close-button" @click="hide()">
      <md-icon>close</md-icon>
    </span>

    <div class="heading">
      {{ header }}
    </div>
    <div v-if="html"
         ref="html"
         class="html" />
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
    @Prop() html!: Element;
    @Prop() content!: string;
    @Prop() header!: string;
    @Prop() footer!: string;
    active:boolean = false;

    show() {
        this.active = true;
    }

    hide() {
        this.active = false;
        this.$emit('closed');
    }

    renderHtmlContent() {
        if (this.html) {
            (this.$refs.html as Element).append(this.html);
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../assets/scss/udpc-dashboard/_fonts_colors.scss';

    .md-dialog {
        color: black;
        padding: 45px 49px;
        max-width: 90%;
        max-height: 90%;

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
        .html {
            height: 100%;
            width: 100%;
        }
        .footer {
            padding-top: 20px;
        }
    }
</style>

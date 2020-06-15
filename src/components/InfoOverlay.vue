<template>
  <md-dialog
    ref="dialog"
    :md-active.sync="active"
    :md-click-outside-to-close="true"
    @md-opened="renderHtml">
    <span class="close-button" @click="hide()">
      <md-icon>close</md-icon>
    </span>

    <div class="heading">
      {{ header }}
    </div>
    <div v-if="html"
         ref="html"
         class="html" />
    <p id="textElement" class="text" />
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
    @Prop() text!: string;
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

    renderHtml() {
        if (this.html) {
          (this.$refs.html as Element).append(this.html);
        } else if (this.text) {
          const htmlElement = document.getElementById("textElement");
          if (htmlElement)
            htmlElement.insertAdjacentHTML('afterbegin', this.text);
        }
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/scss/udpc-dashboard/_fonts_colors.scss';

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
        .text {
            font-size: 14px;
            white-space: pre-line;
        }
        .html {
            height: 100%;
            width: 100%;
            white-space: pre-line;
        }
        .footer {
            padding-top: 20px;
        }
    }
</style>

<template>
  <md-dialog-confirm :md-active="active"
                     :md-title="title"
                     :md-content="content"
                     :md-confirm-text="dConfirmText"
                     :md-cancel-text="dCancelText"
                     @md-cancel="onCancel"
                     @md-confirm="onConfirm" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/*
*   Component displays a text and two clickable options (e.g. yes and no)
*   It emits the results to the enclosing component
*/


@Component({})
export default class ConfirmDialog extends Vue {
    @Prop() active!: boolean;
    @Prop() title!: string;
    @Prop() content!: string;
    @Prop() confirmText!: string;
    @Prop() cancelText!: string;

    dConfirmText = this.confirmText == null ? 'ok' : this.confirmText;
    dCancelText = this.cancelText == null ? 'ok' : this.cancelText;

    onConfirm() {
        this.$emit('dialogResult', true);
    }

    onCancel() {
        this.$emit('dialogResult', false);
    }
}
</script>

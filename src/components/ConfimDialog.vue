<template>
    <md-dialog-confirm
        :md-active="active"
        :md-title="title"
        :md-content="content"
        :md-confirm-text="dConfirmText"
        :md-cancel-text="dCancelText"
        @md-cancel="onCancel"
        @md-confirm="onConfirm"/>
</template>

<script>
    export default {
        name: 'confirm-dialog',
        props: {
            active: Boolean,
            title: String,
            content: String,
            confirmText: String,
            cancelText: String
        },
        data: function() {
            return {
                dConfirmText: this.confirmText == null ? 'ok' : this.confirmText,
                dCancelText: this.cancelText == null ? 'ok' : this.cancelText
            }
        },
        methods: {
            onConfirm() {
                this.$emit('dialogResult', true);
            },
            onCancel() {
                this.$emit('dialogResult', false);
            }
        }
    }
</script>

<template>
    <div>
        <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="snackBar" md-persistent>
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script>
    export default {
        name: "snack-bar",
        data: () => ({
            snackBar: false,
        }),
        props: {
            message: String,
            position: String,
            duration: Number,
            showSnackbar: Boolean
        },
        mounted: function () {
            if (this.showSnackbar) {
                this.$data.snackBar = true;
            }
        }

    }
</script>

<style scoped>

</style>
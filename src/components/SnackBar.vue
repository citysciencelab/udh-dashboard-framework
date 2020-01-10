<template>
    <div>
        <md-snackbar :md-position="position" :md-duration="duration" :md-active.sync="snackBar" md-persistent>
            <span>{{message}}</span>
        </md-snackbar>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class SnackBar extends Vue {
    @Prop() message = '';
    @Prop() position = '';
    @Prop() duration = 0;
    @Prop() showSnackbar = false;
    snackBar = false;

    mounted() {
        if (this.showSnackbar) {
            this.snackBar = true;
        }
    }
}
</script>

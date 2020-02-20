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
    @Prop() message!: string;
    @Prop() position!: string;
    @Prop() duration!: number;
    @Prop() showSnackbar!: boolean;
    snackBar = false;

    mounted() {
        if (this.showSnackbar) {
            this.snackBar = true;
        }
    }
}
</script>

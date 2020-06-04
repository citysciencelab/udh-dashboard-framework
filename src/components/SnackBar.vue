<template>
  <div>
    <md-snackbar :md-position="position"
                 :md-duration="duration"
                 :md-active.sync="snackBar"
                 md-persistent>
      <span>{{ message }}</span>
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

    /**
       Example of usage below - e.g. can be copied to AbstractDasboard
      The snackBar html element is in the App.vue and can be reused by all component
     **/

    /**
    testSnackBar() {
      let options = {
        message: 'Important bottom message',
        position: 'center',
        duration: 10000,
        showSnackbar: true
      };

      const snack = document.getElementById('snack');
      if (!snack) {
        return;
      }
      new Vue({
        el: snack.querySelector('div') || undefined,
        render: h => h(SnackBar, { props: options })
      });
    }
     **/
}
</script>

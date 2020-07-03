<script lang="ts">
  import {Vue} from 'vue-property-decorator';

  export default abstract class AbstractDashboard extends Vue {

    /*
    *   This class includes methods, that are meant to be reused/inherited in more than one Dashboard
    */

    openToolTip(toolTipRef: string) {
      const component = <Vue>this.$refs[toolTipRef];
      if (!component) {
        return;
      }
      component.$emit('open');

      setInterval(() => {
        component.$emit('close');
      }, 5000);
    }

    changeLanguage(lang: string) {
      this.$i18n.locale = lang
    }
  }
</script>

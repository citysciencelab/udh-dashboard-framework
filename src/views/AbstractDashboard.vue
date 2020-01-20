<script lang="ts">

    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    export default abstract class AbstractDashboard extends Vue {

        openToolTip(toolTipRef: string) {
            const component = <Vue>this.$refs[toolTipRef];
            if (!component) {
                return;
            }
            component.$emit('open');

        }
    }
</script>

<script lang="ts">
  import {Prop, Vue, Watch} from 'vue-property-decorator';
  import $ from 'jquery';

  export default abstract class AbstractChartD3 extends Vue {
    @Prop() ds!: Dataset;
    @Prop() title!: string;
    @Prop() metric!: string;
    @Prop() descriptor!: string;
    @Prop() selector!: string;
    @Prop() toolTipKey!: string;
    @Prop() holderElement!: string;
    svg!: SVG;
    width = 100; // %
    height = 100; // %

    @Watch('ds') onDsChanged() {
      if (this.ds.length > 0 || Object.prototype.hasOwnProperty.call(this.ds, 'datasets')) {
        this.createChart();
      }
    }

    mounted() {
      // This double checks the setting of all $props variables
      // If the component gets initiated by

      //TODO: vielleicht in der componente vue-masterportal attrs gegen props austauschen und das callen ausprobieren!!!
      for (let obj of Object.keys(this.$props)) {
        if (this.$props[obj] === null) {
          if (this.$attrs[obj] !== null) {
            this.$props[obj] = this.$attrs[obj];
          }
        }
      }
    }

    get svgWidth() {
      const node = this.svg.node();
      if (!node) {
        throw new Error("Chart element is null")
      }
      const container = node.parentElement;
      if (!container) {
        throw new Error("Chart's parent element is null")
      }
      return container.clientWidth;
    }

    get svgHeight() {
      const node = this.svg.node();
      if (!node) {
        throw new Error("Chart element is null")
      }
      let container = node.parentElement;
      let heightOtherChildren = 0;
      if (this.holderElement) {
        container = this.parentHolder;
      }
      if (!container) {
        throw new Error("Chart's parent element is null")
      }
      return container.clientHeight - heightOtherChildren;
    }

    get parentHolder() {
      const svg = this.svgElement;
      let parent = svg.parentElement;
      while (parent && parent.className.indexOf(this.holderElement) < 0) {
        parent = parent.parentElement;
      }
      return parent;
    }

    get style() {
      return {
        width: `${this.width}%`,
        height: `${this.height}%`
      };
    }

    get svgElement() {
      // We assume it's an <svg>, so we can typecast from JQuery world to DOM world
      return <SVGSVGElement>($('#' + this.selector).get(0) as any);
    }

    abstract createChart(): void;
  }
</script>

<style scoped lang="scss">
    .chart {
        padding: 0 !important;
        height: 100%;
        width: 100%;
        display: inline-block;
    }

    rect.bar {
        fill: #004e79;
    }

    circle.point {
        fill: #9B59B6;
    }

    .tt {
        font-size: 10px;
        background-color: white;
    }
</style>

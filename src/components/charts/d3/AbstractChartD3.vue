<script lang="ts">
  import {Prop, Vue, Watch} from 'vue-property-decorator';
  import $ from 'jquery';

  export default abstract class AbstractChartD3 extends Vue {
    @Prop() ds!: Dataset;
    @Prop() options!: ChartOptions;
    @Prop() title!: string;
    @Prop() metric!: string;
    @Prop() descriptor!: string;
    @Prop() selector!: string;
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
      let heightOtherChildren = 0;
      if (this.holderElement) {
        let container = this.parentHolder ? this.parentHolder.parentElement : null;
        if (container !== null && container.childElementCount > 1) {
          for (let child of container.children) {
            if (child.className.indexOf(this.holderElement) < 0) {
              heightOtherChildren = heightOtherChildren + child.clientHeight;
            }
          }
        }
      }
      const container = node.parentElement;
      if (!container) {
        throw new Error("Chart's parent element is null")
      }
      return container.clientHeight - heightOtherChildren;
    }

    get parentHolder() {
      const svg = this.svgElement;
      let parent = svg.parentElement;
      while (parent && parent.className.indexOf(this.holderElement) < 0 && parent.parentElement != null) {
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

    /*
     Tooltip
    */

    .d3-tip, .md-tooltip, .md-snackbar, .udpc-tooltip .tooltip-inner {
        background: rgba(0, 0, 0, 0.65) !important;

        a:link, a:hover, a:visited, a:active {
            color: white;
            text-decoration: underline;
        }
    }

    /* Creates a small triangle extender for the tooltip */
    .d3-tip:after {
        box-sizing: border-box;
        display: inline;
        font-size: 8px;
        line-height: 1;
        color: rgba(0, 0, 0, 0.55);
        position: absolute;
        pointer-events: none;
    }

    /* Northward tooltips */
    .d3-tip.n:after {
        content: "\25BC";
        margin: 0 0 0 0;
        top: 100%;
        left: 50%;
        text-align: center;
    }

    /* Eastward tooltips */
    .d3-tip.e:after {
        content: "\25C0";
        margin: -4px 0 0 0;
        top: 50%;
        left: -8px;
    }

    /* Southward tooltips */
    .d3-tip.s:after {
        content: "\25B2";
        margin: 0 0 1px 0;
        top: -8px;
        left: 0;
        text-align: center;
    }

    /* Westward tooltips */
    .d3-tip.w:after {
        content: "\25B6";
        margin: -4px 0 0 -1px;
        top: 50%;
        left: 100%;
    }
</style>

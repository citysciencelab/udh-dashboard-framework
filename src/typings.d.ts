type Datum = { [key: string]: any };

interface TreeDatum extends Datum {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
}

type Dataset = Datum[];

declare class FeatureSet extends Array {
  getProperties(): Dataset
}

interface MapData {
  services: { [key: string]: any },
  portal: { [key: string]: any },
  features?: FeatureSet,
  geoJson?: GeoJSON.GeoJSON,
  md_id?: string
}

type ChartOptions = { dim: string, dim2: string };

type SVG = d3.Selection<SVGSVGElement, any, HTMLElement, any>;

type CTX = {
  chart?: Chart;
  dataIndex?: number;
  dataset?: Chart.ChartDataSets
  datasetIndex?: number;
}

interface DashboardState {
  dashboardData: { [key: string]: Dataset | FeatureSet};
  filteredData: { [key: string]: Chart.ChartData };
  filters: { [key: string]: any };
  loading: boolean;
}

interface UDPCState extends DashboardState {
  //Potential specific type definitions
}

interface ParticipationState extends DashboardState {
  //Potential specific type definitions
}

interface RootState {
  dashboard: DashboardState;
  udpc: UDPCState;
}

interface IUtils {
  chart: {
    ordinalScale: (ds: Dataset, dim: string, width: number) => d3.ScaleOrdinal<string, any>,
    timeScale: (ds: Dataset, dim: string, width: number) => d3.ScaleTime<number, number>,
    drawXAxis: (svg: SVG, xAxis: d3.Axis<any>, xTranslate?: number, yTranslate?: number) => number,
    drawYAxis: (svg: SVG, yAxis: d3.Axis<any>, xTranslate?: number, yTranslate?: number) => number,
    drawAxisMeasureExtent: (svg: SVG, axis: d3.Axis<any>, axisName: string) => number,
    addTooltip: (d: Datum, svg: SVG, x: number, y: number, v: string) => void,
    removeTooltip: (svg: SVG) => void,
    addTitle: (t: string, svg: SVG, w: number) => void,
    cleanSVGTag: (svg: SVG) => void,
    getXOffset: (svg: SVGSVGElement, chartHolderClass: string) => number,
    getYOffset: (title: string) => number,
    getHolderElement: (svg: JQuery<SVGSVGElement>, chartHolderClass: string) => JQuery<SVGSVGElement>
  },
  date: {
    getDateStringFromDate: (date: Date) => string,
    getDateStringFromMillis: (dateMillis: number) => string
  }
}

interface DateRangeSliderOptions {
  unit: string;
  min: string;
  max: string;
  isShowMarks: boolean;
}

interface DidYouKnowData {
  items: { label: string, link: string }[],
  action: string|null
}

interface RangeSliderMethods {
  getCurrentValues(): string[]
}

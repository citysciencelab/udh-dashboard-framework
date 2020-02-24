/* Compatibility definitions */

declare module "d3/types/d3" {
  type TooltipDirection = ("n" | "s" | "e" | "w" | "nw" | "ne" | "sw" | "se");
  interface Tooltip {
    (selection: d3.Selection<SVGSVGElement, any, HTMLElement, any>, ...args: any[]): void;
    hide(): Tooltip;
    show(): Tooltip;
    show<Datum>(data: Datum[]): Tooltip;
    show(target: SVGElement): Tooltip;
    show<Datum>(data: Datum[], target: SVGElement): Tooltip;
    attr(name: string): string;
    attr(name: string, value: d3.Primitive): Tooltip;
    attr<Datum>(name: string, value: (datum: Datum, index: number, outerIndex: number) => d3.Primitive): Tooltip;
    attr<Datum>(obj: { [key: string]: d3.Primitive | ((datum: Datum, index: number, outerIndex: number) => d3.Primitive) }): Tooltip;
    style(name: string): string;
    style(name: string, value: d3.Primitive, priority?: string): Tooltip;
    style<Datum>(name: string, value: (datum: Datum, index: number, outerIndex: number) => d3.Primitive, priority?: string): Tooltip;
    style<Datum>(obj: { [key: string]: d3.Primitive | ((datum: Datum, index: number, outerIndex: number) => d3.Primitive) }, priority?: string): Tooltip;
    offset(): [number, number];
    offset(tuple: [number, number]): Tooltip;
    offset<Datum>(func: (datum: Datum, index: number, outerIndex: number) => [number, number]): Tooltip;
    direction(): TooltipDirection;
    direction(direction: TooltipDirection): Tooltip;
    direction<Datum>(func: (datum: Datum, index: number, outerIndex: number) => TooltipDirection): Tooltip;
    html(): string;
    html(content: string): Tooltip;
    html<Datum>(func: (datum: Datum, index: number, outerIndex: number) => string): Tooltip;
    rootElement(): HTMLElement;
    rootElement(element: HTMLElement): Tooltip;
    rootElement<Datum>(func: (datum: Datum, index: number, outerIndex: number) => HTMLElement): Tooltip;
    destroy(): Tooltip;
  }
  export function tip(): Tooltip;
}

declare module 'vue-material' {
  export function install(): Vue.PluginFunction<never>;
}

declare module 'd1st-uisystem-base/public/dist/bundle.js' {
}

declare module 'masterportalAPI' {
  import { Map, Feature, View } from 'ol'
  import { Coordinate } from 'ol/coordinate';
  import { Layer } from 'ol/layer'
  import { Vector as VectorLayer } from 'ol/layer'
  import { Vector, TileWMS, ImageWMS } from 'ol/source'
  import { StyleLike } from 'ol/style/Style'

  const mpapi: {
    createMap(config?: object, params?: object): Map
    createMapView(config: object): View
    wms: {
      generateSessionId(): number
      makeParams(rawLayer: object): object
      createLayerSource(rawLayer: object): TileWMS | ImageWMS
      createLayer(rawLayer: object): Layer
      updateSource(layer: Layer): number
      getGfiURL(layer: Layer, map: Map, coordinate: Coordinate): string | undefined
    }
    geojson: {
      setCustomStyles(styles: object): void
      createLayerSource(rawLayer: object, map: Map): Vector
      createLayer(rawLayer: object, params?: object): VectorLayer
      updateSource(layer: VectorLayer): void
      setFeatureStyle(features: Feature[], featureStyle: StyleLike): void
      hideAllFeatures(layer: Layer): void
      showAllFeatures(layer: Layer): void
      showFeaturesById(layer: Layer, featureIdList: string[]): void
    }
    layerLib: {
      isLayerVisibleInResolution(layer: Layer, params: object): boolean
      getLegendURLs (rawLayer: object): string[]
    }
    setBackgroundImage(config?: object): void
    setGazetteerUrl(url: string): void
    rawLayerList: {
      initializeLayerList(layerConf?: object, callback?: unknown): void
      getLayerWhere(searchAttributes: object): object
      getLayerList(): object[] | null
      getDisplayNamesOfFeatureAttributes(layerId: string, featureAttribute: string): object | string | null
    }
    search(searchstring: string, params: object): Promise<object[]>
    crs: {
      registerProjections(namedProjections?: string[]): void
      getProjection(name: string): object | undefined
      getProjections(): object[]
      getMapProjection(map: Map): string
      getProj4Projection(projection: string | object): object | undefined
      transform(sourceProjection: string | object, targetProjection: string | object, point: number[]): number[] | undefined
      transformToMapProjection(map: Map, sourceProjection: string | object, point: number[]): number[] | undefined
      transformFromMapProjection(map: Map, targetProjection: string | object, point: number[]): number[] | undefined
    }
  }
  export = mpapi;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

/* Custom types */

type Datum = { [key: string]: any };

interface TreeDatum extends Datum {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
}

type Dataset = Datum[];

type ChartOptions = { dim: string, dim2: string };

type SVG = d3.Selection<SVGSVGElement, any, HTMLElement, any>;

interface DashboardState {
  dashboardData: { [key: string]: Dataset };
  filteredData: { [key: string]: Dataset };
  filters: { [key: string]: any };
  loading: boolean;
}

interface UDPCState extends DashboardState {
  //Potential specific type definitions
}

interface ParticipationState extends DashboardState {
  //Potential specific type definitions
}

interface UDPCState extends DashboardState {
  loading: boolean;
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

declare module 'masterportalAPI' {
  import { Map, Feature, View } from 'ol'
  import { Coordinate } from 'ol/coordinate';
  import { Layer } from 'ol/layer'
  import { Vector as VectorLayer } from 'ol/layer'
  import { Vector, TileWMS, ImageWMS } from 'ol/source'
  import { StyleLike } from 'ol/style/Style'

  export const mpapi: {
    createMap(config?: object, params?: object): Map
    createMapView(config: object): View
    wms: {
      generateSessionId(): number
      makeParams(rawLayer: object): object
      createLayerSource(rawLayer: object): TileWMS | ImageWMS
      createLayer(rawLayer: object): Layer
      updateSource(layer: Layer): number
      getGfiURL(layer: Layer, map: Map, coordinate: Coordinate): string | undefined
    }
    geojson: {
      setCustomStyles(styles: object): void
      createLayerSource(rawLayer: object, map: Map): Vector
      createLayer(rawLayer: object, params?: object): VectorLayer
      updateSource(layer: VectorLayer): void
      setFeatureStyle(features: Feature[], featureStyle: StyleLike): void
      hideAllFeatures(layer: Layer): void
      showAllFeatures(layer: Layer): void
      showFeaturesById(layer: Layer, featureIdList: string[]): void
    }
    layerLib: {
      isLayerVisibleInResolution(layer: Layer, params: object): boolean
      getLegendURLs (rawLayer: object): string[]
    }
    setBackgroundImage(config?: object): void
    setGazetteerUrl(url: string): void
    rawLayerList: {
      initializeLayerList(layerConf?: object, callback?: unknown): void
      getLayerWhere(searchAttributes: object): object
      getLayerList(): object[] | null
      getDisplayNamesOfFeatureAttributes(layerId: string, featureAttribute: string): object | string | null
    }
    search(searchstring: string, params: object): Promise<object[]>
    crs: {
      registerProjections(namedProjections?: string[]): void
      getProjection(name: string): object | undefined
      getProjections(): object[]
      getMapProjection(map: Map): string
      getProj4Projection(projection: string | object): object | undefined
      transform(sourceProjection: string | object, targetProjection: string | object, point: number[]): number[] | undefined
      transformToMapProjection(map: Map, sourceProjection: string | object, point: number[]): number[] | undefined
      transformFromMapProjection(map: Map, targetProjection: string | object, point: number[]): number[] | undefined
    }
  };
}

interface DateRangeSlider {
  defaultValue: number[];
  step: number;
  max: number;
  min: number;
  marks: { [key: number]: number };
}
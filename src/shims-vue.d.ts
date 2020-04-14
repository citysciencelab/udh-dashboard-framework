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

declare module 'masterportalAPI' {
  import { Map, Feature, View } from 'ol'
  import { Coordinate } from 'ol/coordinate';
  import { Layer } from 'ol/layer'
  import { Vector as VectorLayer } from 'ol/layer'
  import { Vector, TileWMS, ImageWMS } from 'ol/source'
  import { StyleLike } from 'ol/style/Style'
  import BaseLayer from 'ol/layer/Base';

  export class MPMap extends Map {
    addLayer(layer: BaseLayer|string, params?: object): void;
    createLayer(layerAttrs: object|string, limit?: number, url?: string): Promise<Layer[]>;
    removeLayer(layer: BaseLayer|string ): BaseLayer;
  }
  export function createMap(config?: object, params?: object): MPMap
  export function createMapView(config: object): View
  export const wms: {
    generateSessionId(): number
    makeParams(rawLayer: object): object
    createLayerSource(rawLayer: object): TileWMS | ImageWMS
    createLayer(rawLayer: object): Layer
    updateSource(layer: Layer): number
    getGfiURL(layer: Layer, map: Map, coordinate: Coordinate): string | undefined
  }
  export const wfs: {
    setCustomStyles(styles: object): void
    createLayerSource(rawLayer: object, options?: object): Vector
    createLayer(rawLayer: object, params?: object, options?: object, features?: Feature[]): VectorLayer
    updateSource(layer: VectorLayer): void
    setFeatureStyle(features: Feature[], featureStyle: StyleLike): void
    hideAllFeatures(layer: Layer): void
    showAllFeatures(layer: Layer): void
    showFeaturesById(layer: Layer, featureIdList: string[]): void
  }
  export const geojson: {
    setCustomStyles(styles: object): void
    createLayerSource(rawLayer: object, map: Map): Vector
    createLayer(rawLayer: object, params?: object): VectorLayer
    updateSource(layer: VectorLayer): void
    setFeatureStyle(features: Feature[], featureStyle: StyleLike): void
    hideAllFeatures(layer: Layer): void
    showAllFeatures(layer: Layer): void
    showFeaturesById(layer: Layer, featureIdList: string[]): void
  }
  export const layerLib: {
    isLayerVisibleInResolution(layer: Layer, params: object): boolean
    getLegendURLs (rawLayer: object): string[]
  }
  export function setBackgroundImage(config?: object): void
  export function setGazetteerUrl(url: string): void
  export const rawLayerList: {
    initializeLayerList(layerConf?: object, callback?: unknown): void
    getLayerWhere(searchAttributes: object): object
    getLayerList(): object[] | null
    getDisplayNamesOfFeatureAttributes(layerId: string, featureAttribute: string): object | string | null
  }
  export function search(searchstring: string, params: object): Promise<object[]>
  export const crs: {
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

declare module 'vue-material' {
  export function install(): Vue.PluginFunction<never>;
}

declare module 'd1st-uisystem-base/public/dist/bundle.js' {
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.json' {
  const value: { [key: string]: any }
  export default value
}

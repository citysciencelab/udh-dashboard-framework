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

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

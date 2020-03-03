import proj4, { ProjectionDefinition, TemplateCoordinates } from 'proj4';
import * as Proj from "ol/proj.js";
import {register} from "ol/proj/proj4.js";

const defaults = {
    namedProjections: [
        ["EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"]
    ]
}

export const registerProjections = (namedProjections: string[][] = defaults.namedProjections) => {
    proj4.defs(namedProjections);
    register(proj4);
    namedProjections.forEach(projection => {
        Proj.addProjection(Proj.get(projection[0]));
    });
};

/**
 * Returns all known projections.
 * @returns {object[]} array of projection objects with their name added
 */
export function getProjections() {
    const projections = Object
        .keys(proj4.defs)
        .map(name => Object.assign(proj4.defs(name), {name}));
    //return no duplicates and only the projections which are registred with masterportal=true
    return projections.filter(function(projection, index, self) {
        return index == self.indexOf(projection);
    });
}

/**
 * Resolves a string to a projection object;
 * If a string can not be resolved, returns undefined.
 * @param {(string)} projection - projection name or projection
 * @returns {(object|undefined)} proj4 projection or undefined or parameter
 */
export function getProj4Projection (projection: string): ProjectionDefinition {
    return proj4.defs(projection);
}

/**
 * Transforms a given point from a source to a target projection.
 * @param {(string|object)} sourceProjection - projection name or projection of point
 * @param {(string|object)} targetProjection - projection name or projection to project point to
 * @param {number[]} point - point to project
 * @returns {number[]|undefined} transformed point
 */
export function transform (sourceProjection: string, targetProjection: string, point: TemplateCoordinates) {
    const source: ProjectionDefinition = getProj4Projection(sourceProjection),
        target: ProjectionDefinition = getProj4Projection(targetProjection);

    if (source && target && point) {
        return proj4(source.projName as string, target.projName as string, point);
    }

    console.error(`Cancelled coordinate transformation with invalid parameters: ${sourceProjection}; ${targetProjection}; ${point}`);
    return undefined;
}
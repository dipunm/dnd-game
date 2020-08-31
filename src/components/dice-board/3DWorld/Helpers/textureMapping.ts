import { ConvexPolyhedron } from "cannon";
import { dieConfig } from "./DieConfig";
import { Vector2 } from "three";

export function calculatePolygonStats(shape: ConvexPolyhedron) {

    const nFaces = shape.faces.length;
    if (nFaces === dieConfig.d10.faces.length || nFaces === dieConfig.d100.faces.length) {
        return { nFaces, nSides: 3, nTriangles: 1 };
    }

    /**
     * Eulers Geometry Formulas:
     * https://www.mathsisfun.com/geometry/platonic-solids-why-five.html
     * 
     * @: F + V − E = 2
     * @: sF = 2E
     * @: mV = 2E
     */

    const totalEdges = nFaces + shape.vertices.length - 2;
    const nSides = totalEdges * 2 / nFaces;
    const nTriangles = nSides - 2;

    return { nFaces, nSides, nTriangles };
}

export function createTextureMaps(nFaces: number, nSides: number, nTriangles: number, rotate: number, scale: number | [number, number], offset: [number, number]) {
    // every vertex on a regular polygon will lie on a circle.
    // by default, we plot in the range (-1, -1) to (1, 1)
    // to fit a 1x1 texture, it must be scaled and repositioned
    // to fit in the u,v range (0, 0) to (1, 1)
    const transformToUV = (vector: Vector2) => vector
        .rotateAround(new Vector2(0, 0), rotate)
        .multiplyScalar(0.5)
        .multiplyScalar(typeof scale === 'number' ? 1 / scale : 1)
        .multiply(typeof scale !== 'number' ?
            new Vector2(...scale.map(s => 1 / s)) :
            new Vector2(1, 1))
        .addScalar(0.5)
        .add(new Vector2(...offset));


    const materialIndexes: number[] = [];
    const vertexUvs: Vector2[][] = [];
    for (let faceIndex = 0; faceIndex < nFaces; faceIndex++) {
        const firstVertexPosition = transformToUV(new Vector2(1, 0));
        const avgAngleBetweenVertices = 2 * Math.PI / nSides;

        const triangles = [...Array(nTriangles)].map((_, i) => i);
        triangles.forEach((i) => {
            materialIndexes.push(faceIndex + 1)
            vertexUvs.push([
                // first vertex is always the same
                firstVertexPosition,
                // next two verticies plot on a circle,
                // evenly distributed for a regular polygon
                transformToUV(new Vector2(
                    Math.cos(avgAngleBetweenVertices * (i + 1)),
                    Math.sin(avgAngleBetweenVertices * (i + 1))
                )),
                transformToUV(new Vector2(
                    Math.cos(avgAngleBetweenVertices * (i + 2)),
                    Math.sin(avgAngleBetweenVertices * (i + 2))
                )),
            ]);
        });
    }

    return { materialIndexes, vertexUvs };
}
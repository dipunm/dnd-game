import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh, Vector2 } from "three";
import { dieConfig } from "./Helpers/DieConfig";
import { createChamferredGeometry } from "./Helpers/createChamferedGeometry";
import { createDieMaterials } from "./Helpers/createDieMaterials";
export const DieMaterial = new Material("die");
export const DieFactory = new (class { // Singleton.

    private meshCache: {[faces: number]: Mesh} = {};

    buildDie(code: string): Body {
        const { vertices, faces, scale, mass } = dieConfig[code];
        const shape = new ConvexPolyhedron(
            vertices.map(v => new Vec3(...v).scale(scale)), 
            faces.map(f => [...f.slice(0, f.length-1)]) as any
        );

        shape.updateBoundingSphereRadius();
        return new Body({ shape, mass, material: DieMaterial });
    }

    createDieMesh(die: Body): Mesh {
        const shape = die.shapes[0] as ConvexPolyhedron;
        const nFaces = (shape.faces.length === dieConfig.d10.faces.length) ? 
            10 : 
            shape.faces.length;
        
        const code = `d${nFaces}`;
        
        if (!dieConfig[code]) throw new Error(`Unknown dice with ${nFaces} sides.`);
        const { offset, rotate, scale } = dieConfig[code].texture;


        if (this.meshCache[nFaces]) {
            const copy = this.meshCache[nFaces].clone();
            copy.position.setScalar(0);
            copy.quaternion.set(0, 0, 0, 0);
            return copy;
        }
 
        const geom = createChamferredGeometry(shape, 0.93);
        const materials = createDieMaterials(
            [...Array(nFaces)].map((_, i) => (i + 1).toString()).sort(() => Math.random() - 0.5), 
            shape.boundingSphereRadius / 2, 
            0.8
        );
        
        for (let faceIndex = 0; faceIndex < nFaces; faceIndex++) {

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

            // every vertex on a regular polygon will lie on a circle.
            // by default, we plot in the range (-1, -1) to (1, 1)
            // to fit a 1x1 texture, it must be scaled and repositioned
            // to fit in the u,v range (0, 0) to (1, 1)
            const transformToUV = (vector:Vector2) => vector
                .rotateAround(new Vector2(0,0), rotate)
                .multiplyScalar(0.5)
                .multiplyScalar(typeof scale === 'number' ? 1/scale : 1)
                .multiply(typeof scale !== 'number' ? 
                    new Vector2(...scale.map(s => 1/s)) : 
                    new Vector2(1,1))
                .addScalar(0.5)
                .add(new Vector2(...offset));
            
            
            const firstVertexPosition = transformToUV(new Vector2(1, 0));
            const avgAngleBetweenVertices = 2 * Math.PI / nSides;

            const triangles = [...Array(nTriangles)].map((_, i) => faceIndex * nTriangles + i);
            triangles.forEach((triangleIndex, i) => {
                geom.faces[triangleIndex].materialIndex = faceIndex;

                geom.faceVertexUvs[0].push([
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
        geom.computeFaceNormals();
        geom.computeBoundingSphere();
        return this.meshCache[nFaces] = new Mesh(geom, materials);
    }
})();
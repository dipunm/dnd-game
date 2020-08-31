import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh } from "three";
import { dieConfig, diceCode } from "./Helpers/DieConfig";
import { createChamferredGeometry } from "./Helpers/createChamferedGeometry";
import { createDieMaterials } from "./Helpers/createDieMaterials";
import { calculatePolygonStats, createTextureMaps } from "./Helpers/textureMapping";
export const DieMaterial = new Material("die");

export const DieFactory = new (class { // Singleton.

    private meshCache: {[code: string]: Mesh} = {};

    buildDie(code: diceCode): Body {
        const { vertices, faces, scale, mass } = dieConfig[code];
        console.log('making a d' + faces.length + ', ' + code);
        const shape = new ConvexPolyhedron(
            vertices.map(v => new Vec3(...v).scale(scale)), 
            faces.map(f => [...f]) as any
        );

        shape.updateBoundingSphereRadius();
        return new Body({ shape, mass, material: DieMaterial });
    }

    createDieMesh(die: Body): Mesh {
        const shape = die.shapes[0] as ConvexPolyhedron;

        const { nFaces, nSides, nTriangles } = calculatePolygonStats(shape);
        console.log('THEN FACE', nFaces)
        const code = `d${
            nFaces === dieConfig.d10.faces.length ? '10' : 
            nFaces === dieConfig.d100.faces.length ? '100' : 
            nFaces}` as diceCode;
        if (!dieConfig[code]) throw new Error(`Unknown dice with ${nFaces} sides.`);

        if (this.meshCache[code]) {
            const copy = this.meshCache[code].clone();
            copy.position.setScalar(0);
            copy.quaternion.set(0, 0, 0, 0);
            return copy;
        }

        const { offset, rotate, scale, markings } = dieConfig[code].texture;
         
        const geom = createChamferredGeometry(shape, 0.93);
        const materials = createDieMaterials(
            markings.sort(() => Math.random() - 0.5),
            shape.boundingSphereRadius / 2
        );
        const { materialIndexes, vertexUvs } = createTextureMaps(
            markings.length, nSides, nTriangles, 
            rotate, scale, offset
        );

        geom.faces.forEach((f, i) => f.materialIndex = materialIndexes[i] || 0)
        geom.faceVertexUvs[0].push(...vertexUvs);
        
        geom.computeFaceNormals();
        geom.computeBoundingSphere();
        return this.meshCache[code] = new Mesh(geom, materials);
    }
})();

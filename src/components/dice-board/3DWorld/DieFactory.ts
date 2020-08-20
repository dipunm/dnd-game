import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh } from "three";

export const DieMaterial = new Material("die");

// const meshCache: {[faces: number]: Mesh} = {};
type DieConfig = {[code: string]: { vertices: number[][], faces: number[][], scale: number, mass: number }};
const config: DieConfig  = {
    d6: {
         vertices: [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ],
        faces: [
            [0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
            [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]
        ],
        scale: 100,
        mass: 300,
    }
};

// Singleton.
export const DieFactory = new (class {

    buildDie(code: string): Body {
        const { vertices, faces, scale, mass } = config[code];
        const shape = new ConvexPolyhedron(
            vertices.map(v => new Vec3(...v).scale(scale)), 
            faces.map(f => [...f.slice(0, f.length-1)]) as any
        );
        shape.updateBoundingSphereRadius();
        return new Body({ shape, mass, material: DieMaterial });
    }

    createDieMesh(die: Body): Mesh {
        // const sides = (die.shapes[0] as ConvexPolyhedron)?.faces?.length || 0;
        return new Mesh();
    }

})();
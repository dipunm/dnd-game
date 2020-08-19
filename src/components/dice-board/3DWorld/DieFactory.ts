import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh } from "three";

export const DieMaterial = new Material("die");

// const meshCache: {[faces: number]: Mesh} = {};
const builders: {[code: string]: () => Body} = {
    d6: () => {
        let vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        let faces = [
            [0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
            [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]
        ];
        
        const shape = new ConvexPolyhedron(
            vertices.map(v => new Vec3(...v).scale(100)), 
            faces.map(f => [...f.slice(0, f.length-1)]) as any
        );
        shape.updateBoundingSphereRadius();
        return new Body({
            shape: shape,
            mass: 300,
            material: DieMaterial
        });
    },
};

// Singleton.
export const DieFactory = new (class {

    buildDie(code: string): Body {
        return builders[code]();
    }

    createDieMesh(die: Body): Mesh {
        // const sides = (die.shapes[0] as ConvexPolyhedron)?.faces?.length || 0;
        return new Mesh();
    }
})();
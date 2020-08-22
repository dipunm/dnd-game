import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh, MeshPhongMaterial } from "three";
import { dieConfig } from "./Helpers/DieConfig";
import { createChamferredGeometry } from "./Helpers/createChemferedGeometry";
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
        const sides = shape.faces.length;

        if (this.meshCache[sides]) {
            const copy = this.meshCache[sides].clone();
            copy.position.setScalar(0);
            copy.quaternion.set(0, 0, 0, 0);
            return copy;
        }
 
        switch(sides) {
            case 6:
                {
                    const material = new MeshPhongMaterial( { color: 0x2B1B2B } );
                    const geom = createChamferredGeometry(shape, 0.9);
                    geom.computeBoundingSphere();
                    geom.computeFaceNormals();
                    return new Mesh(geom, material);
                }
            default:
                throw new Error(`Unknown dice with ${sides} sides.`);
        }
    }
})();

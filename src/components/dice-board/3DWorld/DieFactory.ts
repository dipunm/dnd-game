import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh, Geometry, MeshPhongMaterial, Vector3, Face3 } from "three";

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
        const shape = die.shapes[0] as ConvexPolyhedron;
        const sides = shape.faces.length;

 
        switch(sides) {
            case 7:
                {
                    const geom = new Geometry();
                    const material = new MeshPhongMaterial( { color: 0x00ff00 } );
                    const { vertices, scale } = config.d6;
                    geom.vertices.push(...vertices.map(v => {
                        const vert = new Vector3(...v).multiplyScalar(scale);
                        // vert.index = i
                        return vert;
                    }));
                    return new Mesh(geom, material);
                }
            case 6:
                {
                    const geom = new Geometry();
                    const material = new MeshPhongMaterial( { color: 0x2B1B2B } );

                    // Add vertices
                    for (let i = 0; i < shape.vertices.length; i++) {
                        const v = shape.vertices[i];
                        geom.vertices.push(new Vector3(v.x, v.y, v.z));
                    }
            
                    for(let i=0; i < shape.faces.length; i++){
                        const face = shape.faces[i];
            
                        // add triangles
                        const a = face[0];
                        for (var j = 1; j < face.length - 1; j++) {
                            const b = face[j];
                            const c = face[j + 1];
                            geom.faces.push(new Face3(a, b, c));
                        }
                    }
                    geom.computeBoundingSphere();
                    geom.computeFaceNormals();
                    return new Mesh(geom, material);
                }
            default:
                throw new Error(`Unknown dice with ${sides} sides.`);
        }
     }

})();
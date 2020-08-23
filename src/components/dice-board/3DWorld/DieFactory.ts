import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh, Vector2 } from "three";
import { dieConfig } from "./Helpers/DieConfig";
import { createChamferredGeometry } from "./Helpers/createChemferedGeometry";
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
        const nsides = shape.faces.length;

        if (this.meshCache[nsides]) {
            const copy = this.meshCache[nsides].clone();
            copy.position.setScalar(0);
            copy.quaternion.set(0, 0, 0, 0);
            return copy;
        }
 
        switch(nsides) {
            case 6:
            case 8:
                {
                    const geom = createChamferredGeometry(shape, 0.9);
                    const materials = createDieMaterials(
                        [...Array(nsides)].map((_, i) => (i + 1).toString()), 
                        shape.boundingSphereRadius / 2, 
                        0.8
                    );

                    for (let i = 0; i < nsides; i++) {
                        // const ncorners = 4;
                        // const angleBetweenCorners = Math.PI * 2 / ncorners;
                        // const tab = 0;
                        // const rotateBy = Math.PI / 4;
                        
                        [i * 2, i * 2 + 1].forEach(j => {
                            geom.faces[j].materialIndex = i;
                            geom.faceVertexUvs[0].push([
                                new Vector2(0, 0),
                                new Vector2(1, j % 2 === 0? 0 : 1),
                                new Vector2(j % 2 === 0? 1 : 0, 1),
                            ])
                            // geom.faceVertexUvs[0].push([
                            //     new Vector2(
                            //         (Math.cos(rotateBy) + 1 + tab) / 2 / (1 + tab),
                            //         (Math.sin(rotateBy) + 1 + tab) / 2 / (1 + tab)
                            //     ),
                            //     new Vector2(
                            //         (Math.cos(angleBetweenCorners * (j + 1) + rotateBy) + 1 + tab) / 2 / (1 + tab),
                            //         (Math.sin(angleBetweenCorners * (j + 1) + rotateBy) + 1 + tab) / 2 / (1 + tab)
                            //     ),
                            //     new Vector2(
                            //         (Math.cos(angleBetweenCorners * (j + 2) + rotateBy) + 1 + tab) / 2 / (1 + tab),
                            //         (Math.sin(angleBetweenCorners * (j + 2) + rotateBy) + 1 + tab) / 2 / (1 + tab)
                            //     )
                            // ]);    
                        });
                    }
                    geom.computeFaceNormals();
                    geom.computeBoundingSphere();
                    return this.meshCache[nsides] = new Mesh(geom, materials);
                }
            default:
                throw new Error(`Unknown dice with ${nsides} sides.`);
        }
    }
})();

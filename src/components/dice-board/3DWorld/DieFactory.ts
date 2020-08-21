import { Body, ConvexPolyhedron, Material, Vec3 } from "cannon";
import { Mesh, Geometry, MeshPhongMaterial, Vector3, Face3, DoubleSide } from "three";

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
            case 6:
                {
                    // const geom = new Geometry();
                    const material = new MeshPhongMaterial( { color: 0x2B1B2B } );

                    // // Add vertices
                    // for (let i = 0; i < shape.vertices.length; i++) {
                    //     const v = shape.vertices[i];
                    //     geom.vertices.push(new Vector3(v.x, v.y, v.z));
                    // }
            
                    // for(let i=0; i < shape.faces.length; i++){
                    //     const face = shape.faces[i];
            
                    //     // add triangles
                    //     const a = face[0];
                    //     for (var j = 1; j < face.length - 1; j++) {
                    //         const b = face[j];
                    //         const c = face[j + 1];
                    //         geom.faces.push(new Face3(a, b, c));
                    //     }
                    // }

                    const geom = this.createChamferredGeometry(shape, 0.7);
                    material.side = DoubleSide;
                    geom.computeBoundingSphere();
                    geom.computeFaceNormals();
                    return new Mesh(geom, material);
                }
            default:
                throw new Error(`Unknown dice with ${sides} sides.`);
        }
    }

    createChamferredGeometry(shape: ConvexPolyhedron, scale: number) {
        // Faces hold a reference to an abridged set of vertices.
        // Faces need to be denormalised so that their respective vertices may be adjusted independently.
        // Faces are shrunk, and then new corner and edge faces are added to close the gaps.
        
        const faces = shape.faces
            .map(function denormalise(face) { 
                return face.map(point => new Vector3().copy(shape.vertices[point] as any));
            });
        
        const cornerFaces = Object.values(faces.flat()
            .reduce(function groupDuplicateVerticies(map, vertex) {
                const key = `${vertex.x}, ${vertex.y}, ${vertex.z}`;
                return {
                    ...map,
                    [key]: [...(map[key] || []), vertex]
                };
            }, {} as {[key: string]: Vector3[]}));

        const pairedEdges = Object.values(
            faces.map(face => face.reduce((agg, vertex, i) =>
                [...agg, (face.length > i + 1) ? [vertex, face[i + 1]]: [vertex, face[0]]], 
                [] as Vector3[][]))
            .flat()
            .reduce(function groupDuplicatePairs(map, edge) {
                const key = [...edge].sort((v1, v2) => {
                    const dx = v1.x - v2.x;
                    if (dx !== 0) return dx;

                    const dy = v1.y - v2.y;
                    if (dy !== 0) return dy;

                    return v1.z - v2.z;
                })
                .map(vertex => `${vertex.x}, ${vertex.y}, ${vertex.z}`)
                .join(', ');

                return {
                    ...map,
                    [key]: [...(map[key] || []), edge]
                };
            }, {} as {[key: string]: Vector3[][]}));

        faces.forEach(function shrink(face) {
            const center = face.reduce((center, vertex) => {
                return center.add(vertex)
            }, new Vector3()).divideScalar(face.length)
            
            face.forEach(vertex => vertex.copy(
                vertex.sub(center)
                .multiplyScalar(scale)
                .add(center)
            ));
        }, [] as Vector3[][])

        // Edge faces should be reversed because they are in anticlockwise order.
        const edgeFaces = pairedEdges.map(pair => [...pair[0], ...pair[1]].reverse());

        const allFaces = [
            // keep dice faces first to ensure 
            // dice labels are applied correctly.
            ...faces, 
            ...edgeFaces,
            ...cornerFaces,
        ];

        const geometry = new Geometry();
        geometry.vertices.push(...allFaces.flat()
            .filter(function onlyUnique(v, i, self) { 
                return self.indexOf(v) === i; 
            }));

        geometry.faces.push(...allFaces.map(face => new Face3(
            ...(face.map(vertex => geometry.vertices.indexOf(vertex)) as [number, number, number])
        )));

        return geometry;
    }

    /**
     * Chamfer: Cuts off the edges of a 3d shape without rounding 
     */
    chamferGeometry(vectors: Vector3[], faces: number[][], chamfer: number) {
        const newVectors = [], newFaces = [], cornerFaces = new Array(vectors.length).map<number[]>(() => []);


        


            for (let i = 0; i < faces.length; ++i) {
                // foreach face:
                let face = faces[i]; 
                // drop face identifier (see below)
                let nFacePoints = face.length - 1;
                let center_point = new Vector3();
                // create a duplicate new_face:
                let newFace = new Array(nFacePoints);
                for (let facePointIndex = 0; facePointIndex < nFacePoints; ++facePointIndex) {
                    // and each of its point
                    const point = face[facePointIndex];

                    // copy its points' vectors to newVectors
                    let vector = vectors[point].clone();
                    const vectorIndex = newVectors.push(vector) - 1;
                    // and record its index in the newFace
                    newFace[facePointIndex] = vectorIndex;
                    
                    // and every point will become a face, so store 
                    // that vector in a new cornerFaces collection
                    cornerFaces[point].push(vectorIndex);

                    center_point.add(vector);
                }

                // calculate avg. center of face
                center_point.divideScalar(nFacePoints);

                // shrink face anchored about its center (point by point).
                for (let j = 0; j < nFacePoints; ++j) {
                    let newFaceVector = newVectors[newFace[j]];
                    newFaceVector.subVectors(newFaceVector, center_point).multiplyScalar(chamfer).addVectors(newFaceVector, center_point);
                }

                // add back the face identifier (see above)
                newFace.push(face[nFacePoints]);
                // add to newFaces collection.
                newFaces.push(newFace);
            }

            // Add connecting faces between shrunk main faces.
            for (let i = 0; i < faces.length - 1; ++i) {
                for (let j = i + 1; j < faces.length; ++j) {
                    let pairs = [], lastm = -1;
                    for (let m = 0; m < faces[i].length - 1; ++m) {
                        let n = faces[j].indexOf(faces[i][m]);
                        if (n >= 0 && n < faces[j].length - 1) {
                            if (lastm >= 0 && m !== lastm + 1) pairs.unshift([i, m], [j, n]);
                            else pairs.push([i, m], [j, n]);
                            lastm = m;
                        }
                    }
                    if (pairs.length !== 4) continue;
                    newFaces.push([newFaces[pairs[0][0]][pairs[0][1]],
                        newFaces[pairs[1][0]][pairs[1][1]],
                        newFaces[pairs[3][0]][pairs[3][1]],
                        newFaces[pairs[2][0]][pairs[2][1]], 
                        
                        -1]); // add a non-face identifier to connecting face
                }
            }

            // create faces that connect the corners.
            for (let i = 0; i < cornerFaces.length; ++i) {
            let cf = cornerFaces[i], face = [cf[0]], count = cf.length - 1;
            while (count) {
                for (let m = faces.length; m < newFaces.length; ++m) {
                    let index = newFaces[m].indexOf(face[face.length - 1]);
                    if (index >= 0 && index < 4) {
                        if (--index === -1) index = 3;
                        let next_vertex = newFaces[m][index];
                        if (cf.indexOf(next_vertex) >= 0) {
                            face.push(next_vertex);
                            break;
                        }
                    }
                }
                --count;
            }

            // add a non-face identifier to corners
            face.push(-1);
            newFaces.push(face);
        }
        return { vectors: newVectors, faces: newFaces };
     }

})();
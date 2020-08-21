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
        const shape = die.shapes[0] as ConvexPolyhedron;
        const sides = shape.faces.length;

 
        switch(sides) {
            case 6:
                {
                    const material = new MeshPhongMaterial( { color: 0x2B1B2B } );
                    const geom = this.createChamferredGeometry(shape, 0.85);
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
        
        const corners = Object.values(faces.flat()
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
        
        // Corner faces are unpredictable so we make them double sided.
        const cornerFaces = [...corners, ...corners.map(face => [...face].reverse())];
        
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

        geometry.faces.push(
            ...allFaces.map(face => 
                face.map(vertex => geometry.vertices.indexOf(vertex))
            )
            .reduce(function toTriangles(faces, surface){
                return [...faces, ...surface.reduce((agg, _, i) => (
                    i + 2 < surface.length) ? 
                        [...agg, new Face3(surface[0], surface[i + 1], surface[i + 2])] :
                        agg, [] as Face3[])];
            }, [] as Face3[]));

        return geometry;
    }
})();
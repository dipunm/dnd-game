import { ConvexPolyhedron } from "cannon";
import { Geometry, Vector3, Face3 } from "three";

export function createChamferredGeometry(shape: ConvexPolyhedron, scale: number): Geometry {
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

    const edges = Object.values(
        faces.map(face => face.reduce((agg, vertex, i) =>
            [...agg, [vertex, face[(i + 1) % face.length]]], 
            [] as Vector3[][]))
        .flat()
        .reduce(function groupDuplicateEdges(map, edge) {
            const key = [...edge].sort((v1, v2) => {
                const dx = v1.x - v2.x;
                if (dx !== 0) return dx;

                const dy = v1.y - v2.y;
                if (dy !== 0) return dy;

                return v1.z - v2.z;
            })
            .map(vertex => `${vertex.x.toFixed(5)}, ${vertex.y.toFixed(5)}, ${vertex.z.toFixed(5)}`)
            .join(' -> ');

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
    const edgeFaces = edges.map(pair => [...pair[0], ...pair[1]].reverse());
    
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
            // convert references to weak references.
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
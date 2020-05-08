import { chamfer_geom, make_geom, create_dice_materials } from "./three-helper";
import { Vector3, Mesh, MeshBasicMaterial, MeshPhongMaterial, TextureLoader } from "three";
import { Vec3, Body, ConvexPolyhedron } from "cannon";
import { materials } from "./world";
import seedrandom from 'seedrandom';

const random = seedrandom();

function createThreeMesh({ vertices, faces, radius, tab, fontAngle, chamfer, material }) {
    const chamferred = chamfer_geom(vertices.map(v => new Vector3(v[0], v[1], v[2]).normalize()), faces, chamfer);
    const geom = make_geom(chamferred.vectors, chamferred.faces, radius, tab, fontAngle);
    return new Mesh(geom, material);
}

function createCannonShape({ vertices, faces, radius }) {
    const shape = new ConvexPolyhedron(
        vertices.map(v => v.map(u => u * radius)).map(v => new Vec3(...v)),
        faces.map(f => [...f.slice(0, f.length - 1)])
    );
    shape.updateBoundingSphereRadius();
    return shape;
}

const standard_position = [ -50, 50, 500 ];
const standard_size = 45;
const standard_dice_labels = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8',
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
// function buildDice({ geometry: { faces, vertices, radius }, font: { size,  }
//      
//     vertices, faces, scale, radius, pos, tab, fontAngle, chamfer, mass, material_margin, labels = standard_dice_labels }) {
function buildDice({ vertices, faces, scale, radius, pos, tab, fontAngle, chamfer, mass, material_margin, labels = standard_dice_labels }) {
    const [ xPos, yPos, zPos ] = pos;
    const die = {
        body: new Body({
            shape: createCannonShape({ vertices, faces, radius }),
            mass,
            position: new Vec3(xPos, yPos, zPos),
            material: materials.dice,
        }),
        mesh: createThreeMesh({ 
            vertices, faces, radius, 
            tab, fontAngle, chamfer, scale,
            material: create_dice_materials(labels, scale/2, material_margin)
        }),
    }
    die.mesh.castShadow = true;
    die.mesh.receiveShadow = false;
    die.mesh.position.set(xPos, yPos, zPos);
    // die.body.velocity.set(1000 + (random() * 500) - 700, 1000 + (random() * 500), -30);
    die.body.velocity.set(8000, 6000, 0)
    die.body.angularVelocity.set((random() * 10), (random() * 10), -30)
// //    die.body.quaternion.set(random() * 50, random() *1000, 0, random() * 89);
    const vec = [Math.round(random() * 2) - 1, Math.round(random() * 2) - 1];
    const mult = Math.round(random() * 2) - 1;
    die.body.quaternion.setFromAxisAngle(new Vec3(...vec, 0), mult * Math.PI / 2);

    die.body.linearDamping = 0.1;
    die.body.angularDamping = random() * 0.2;
    return die;
}

export function create_d4(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    const vertices = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
    const faces = [[1, 0, 2, 1], [0, 1, 3, 2], [0, 3, 2, 3], [1, 2, 3, 4]];
    const tab = -0.1;
    const fontAngle = Math.PI * 7 / 6;
    const chamfer = 0.9;
    const mass = 300;
    const labels = [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]];
    
    return buildDice({ 
        vertices, faces, scale: scale, radius: scale * 1.2, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: scale * 2.1, labels
    });
}

export function create_d6(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    let vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    let faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
                [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
    const tab = -0.1;
    const fontAngle = Math.PI / 4;
    const chamfer = 0.85;
    const mass = 300;

    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: 1.6
    });
}

export function create_d8(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    let vertices = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    let faces = [[0, 2, 4, 1], [0, 4, 3, 2], [0, 3, 5, 3], [0, 5, 2, 4], [1, 3, 4, 5],
                [1, 4, 2, 6], [1, 2, 5, 7], [1, 5, 3, 8]];
    
    const tab = -0.1;
    const fontAngle = Math.PI * 7 / 6;
    const chamfer = 0.86;
    const mass = 340;
    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: 1.5
    });
}

export function create_d10(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    let a = Math.PI * 2 / 10, h = 0.105, v = -1;
    let vertices = [];
    for (let i = 0, b = 0; i < 10; ++i, b += a)
        vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
    vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);
    let faces = [[5, 7, 11, 10], [4, 2, 10, 1], [1, 3, 11, 2], [0, 8, 10, 3], [7, 9, 11, 4],
            [8, 6, 10, 5], [9, 1, 11, 6], [2, 0, 10, 7], [3, 5, 11, 8], [6, 4, 10, 9],
            [1, 0, 2, v], [1, 2, 3, v], [3, 2, 4, v], [3, 4, 5, v], [5, 4, 6, v],
            [5, 6, 7, v], [7, 6, 8, v], [7, 8, 9, v], [9, 8, 0, v], [9, 0, 1, v]];
    
    const tab = -0.1;
    const fontAngle = Math.PI * 7 / 6;
    const chamfer = 0.89;
    const mass = 350;
    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: 1.3
    });
}

export function create_d12(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    let p = (1 + Math.sqrt(5)) / 2, q = 1 / p;
    let vertices = [[0, q, p], [0, q, -p], [0, -q, p], [0, -q, -p], [p, 0, q],
            [p, 0, -q], [-p, 0, q], [-p, 0, -q], [q, p, 0], [q, -p, 0], [-q, p, 0],
            [-q, -p, 0], [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1],
            [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
    let faces = [[2, 14, 4, 12, 0, 1], [15, 9, 11, 19, 3, 2], [16, 10, 17, 7, 6, 3], [6, 7, 19, 11, 18, 4],
            [6, 18, 2, 0, 16, 5], [18, 11, 9, 14, 2, 6], [1, 17, 10, 8, 13, 7], [1, 13, 5, 15, 3, 8],
            [13, 8, 12, 4, 5, 9], [5, 4, 14, 9, 15, 10], [0, 12, 8, 10, 16, 11], [3, 19, 7, 17, 1, 12]];
    
    const tab = -0.1;
    const fontAngle = Math.PI * 7 / 6;
    const chamfer = 0.89;
    const mass = 350;
    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: 1
    });;
}

export function create_d20(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    let t = (1 + Math.sqrt(5)) / 2;
    let vertices = [[-1, t, 0], [1, t, 0 ], [-1, -t, 0], [1, -t, 0],
            [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
            [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    let faces = [[0, 11, 5, 1], [0, 5, 1, 2], [0, 1, 7, 3], [0, 7, 10, 4], [0, 10, 11, 5],
            [1, 5, 9, 6], [5, 11, 4, 7], [11, 10, 2, 8], [10, 7, 6, 9], [7, 1, 8, 10],
            [3, 9, 4, 11], [3, 4, 2, 12], [3, 2, 6, 13], [3, 6, 8, 14], [3, 8, 9, 15],
            [4, 9, 5, 16], [2, 4, 11, 17], [6, 2, 10, 18], [8, 6, 7, 19], [9, 8, 1, 20]];
    const tab = 0.1;
    const fontAngle = Math.PI / 2;
    const chamfer = 0.94;
    const mass = 400;

    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: 1.7
    });
}

export function create_d100(scale = standard_size, [xPos, yPos, zPos] = standard_position) {
    const a = Math.PI * 2 / 10, h = 0.105, v = -1;
    const vertices = [];
    for (let i = 0, b = 0; i < 10; ++i, b += a)
        vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
    vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);
    const faces = [[5, 7, 11, 0], [4, 2, 10, 1], [1, 3, 11, 2], [0, 8, 10, 3], [7, 9, 11, 4],
            [8, 6, 10, 5], [9, 1, 11, 6], [2, 0, 10, 7], [3, 5, 11, 8], [6, 4, 10, 9],
            [1, 0, 2, v], [1, 2, 3, v], [3, 2, 4, v], [3, 4, 5, v], [5, 4, 6, v],
            [5, 6, 7, v], [7, 6, 8, v], [7, 8, 9, v], [9, 8, 0, v], [9, 0, 1, v]];
    const labels = [' ', '0', '10', '20', '30', '40', '50',
    '60', '70', '80', '90'];

    const tab = -0.1;
    const fontAngle = Math.PI * 7 / 6;
    const chamfer = 0.89;
    const mass = 350;
    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, fontAngle, chamfer, mass,
        material_margin: 1.5, labels
    });
}
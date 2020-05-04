import { chamfer_geom, make_geom, create_dice_materials } from "./three-helper";
import { Vector3, Mesh, MeshBasicMaterial, MeshPhongMaterial, TextureLoader } from "three";
import { Vec3, Body, ConvexPolyhedron } from "cannon";
import { materials } from "./world";

function createThreeMesh({ vertices, faces, radius, tab, af, chamfer, material }) {
    const chamferred = chamfer_geom(vertices.map(v => new Vector3(v[0], v[1], v[2]).normalize()), faces, chamfer);
    const geom = make_geom(chamferred.vectors, chamferred.faces, radius, tab, af);
    return new Mesh(geom, material);
}

function createCannonShape({ vertices, faces, radius }) {
    const shape = new ConvexPolyhedron(
        vertices.map(v => v.map(u => u * radius)).map(v => new Vec3(...v)),
        faces.map(f => [...f.slice(0, f.length - 1)])
    );
    return shape;
}

const standard_dice_labels = [' ', '0', '1', '2', '3', '4', '5', '6', '7', '8',
            '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
function buildDice({ vertices, faces, scale, radius, pos, tab, af, chamfer, mass, material_margin }) {
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
            tab, af, chamfer, scale,
            material: create_dice_materials(standard_dice_labels, scale/2, material_margin)
        }),
    }
    die.mesh.castShadow = true;
    die.mesh.receiveShadow = false;
    die.mesh.position.set(xPos, yPos, zPos);
    die.body.velocity.set(1000 + (Math.random() * 500) - 700, 1000 + (Math.random() * 500), -30);
    die.body.angularVelocity.set((Math.random() * 10), (Math.random() * 10), -30)
//    die.body.quaternion.set(Math.random() * 50, Math.random() *1000, 0, Math.random() * 89);
    const vec = [Math.round(Math.random() * 2) - 1, Math.round(Math.random() * 2) - 1];
    const mult = Math.round(Math.random() * 2) - 1;
    die.body.quaternion.setFromAxisAngle(new Vec3(...vec, 0), mult * Math.PI / 2);

    die.body.linearDamping = 0.1;
    die.body.angularDamping = 0.1;
    return die;
}

export function create_d4(scale, [xPos, yPos, zPos]) {
    const vertices = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
    const faces = [[1, 0, 2, 1], [0, 1, 3, 2], [0, 3, 2, 3], [1, 2, 3, 4]];
    const tab = -0.1;
    const af = Math.PI * 7 / 6;
    const chamfer = 0.96;
    const mass = 400;
    
    return buildDice({ 
        vertices, faces, scale, radius: scale * 1.1, 
        pos: [xPos, yPos, zPos], tab, af, chamfer, mass,
        material_margin: 1.0
    });
}

export function create_d6(scale, [xPos, yPos, zPos]) {
    let vertices = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    let faces = [[0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
                [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]];
    const tab = 0.1;
    const af = Math.PI / 4;
    const chamfer = 0.96;
    const mass = 5;

    return buildDice({ 
        vertices, faces, scale, radius: scale * 0.9, 
        pos: [xPos, yPos, zPos], tab, af, chamfer, mass,
        material_margin: 1.0
    });
}
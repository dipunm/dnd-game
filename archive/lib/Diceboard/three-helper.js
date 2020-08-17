import { Vector3, Geometry, Face3, Vector2, Sphere, Texture, MeshPhongMaterial } from "three";

const label_color = '#bbb';
const dice_color = '#302438';

const material_options = {
    specular: 0x172022,
    color: 0xf0f0f0,
    shininess: 40,
    flatShading: true,
}

function calc_texture_size(approx) {
    return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}

export function create_dice_materials(face_labels, size, margin) {
    if (face_labels.length && typeof face_labels[0] === 'object') {
        return create_d4_materials(size, margin, face_labels);
    }

    function create_text_texture(text, color, back_color) {
        if (text == undefined) return null;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var ts = calc_texture_size(size + size * 2 * margin) * 2;
        canvas.width = canvas.height = ts;
        context.font = ts / (1 + 2 * margin) + "pt Arial";
        context.fillStyle = back_color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        if (text == '6' || text == '9') {
            context.fillText('  .', canvas.width / 2, canvas.height / 2);
        }
        var texture = new Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    var materials = [];
    for (var i = 0; i < face_labels.length; ++i)
        materials.push(new MeshPhongMaterial(Object.assign({}, material_options,
                    { map: create_text_texture(face_labels[i], label_color, dice_color) })));
    return materials;
}

const create_d4_materials = function(size, margin, labels) {
    function create_d4_text(text, color, back_color) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var ts = calc_texture_size(size + margin) * 2;
        canvas.width = canvas.height = ts;
        context.font = (ts - margin) / 1.5 + "pt Arial";
        context.fillStyle = back_color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = color;
        for (var i in text) {
            context.fillText(text[i], canvas.width / 2,
                    canvas.height / 2 - ts * 0.3);
            context.translate(canvas.width / 2, canvas.height / 2);
            context.rotate(Math.PI * 2 / 3);
            context.translate(-canvas.width / 2, -canvas.height / 2);
        }
        var texture = new Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }
    var materials = [];
    for (var i = 0; i < labels.length; ++i)
        materials.push(new MeshPhongMaterial(Object.assign({}, material_options,
                    { map: create_d4_text(labels[i], label_color, dice_color) })));
    return materials;
}

export function make_geom(vertices, faces, radius, tab, fontAngle) {
    var geom = new Geometry();
    for (var i = 0; i < vertices.length; ++i) {
        var vertex = vertices[i].multiplyScalar(radius);
        vertex.index = geom.vertices.push(vertex) - 1;
    }
    for (var i = 0; i < faces.length; ++i) {
        var ii = faces[i], fl = ii.length - 1;
        var aa = Math.PI * 2 / fl;
        for (var j = 0; j < fl - 2; ++j) {
            geom.faces.push(new Face3(ii[0], ii[j + 1], ii[j + 2], [geom.vertices[ii[0]],
                        geom.vertices[ii[j + 1]], geom.vertices[ii[j + 2]]], 0, ii[fl] + 1));
            geom.faceVertexUvs[0].push([
                    new Vector2((Math.cos(fontAngle) + 1 + tab) / 2 / (1 + tab),
                        (Math.sin(fontAngle) + 1 + tab) / 2 / (1 + tab)),
                    new Vector2((Math.cos(aa * (j + 1) + fontAngle) + 1 + tab) / 2 / (1 + tab),
                        (Math.sin(aa * (j + 1) + fontAngle) + 1 + tab) / 2 / (1 + tab)),
                    new Vector2((Math.cos(aa * (j + 2) + fontAngle) + 1 + tab) / 2 / (1 + tab),
                        (Math.sin(aa * (j + 2) + fontAngle) + 1 + tab) / 2 / (1 + tab))]);
        }
    }
    geom.computeFaceNormals();
    geom.boundingSphere = new Sphere(new Vector3(), radius);
    return geom;
}

/**
 * Chamfer will cut across the edges of the die to give it a more natural look.
 * 
 * @param {Vector3[]} vectors 
 * @param {Number[][]} faces 
 * @param {Number} chamfer 
 */
export function chamfer_geom(vectors, faces, chamfer) {
    let chamfer_vectors = [], chamfer_faces = [], corner_faces = new Array(vectors.length);
    for (let i = 0; i < vectors.length; ++i) corner_faces[i] = [];
    for (let i = 0; i < faces.length; ++i) {
        let ii = faces[i], fl = ii.length - 1;
        let center_point = new Vector3();
        let face = new Array(fl);
        for (let j = 0; j < fl; ++j) {
            let vv = vectors[ii[j]].clone();
            center_point.add(vv);
            corner_faces[ii[j]].push(face[j] = chamfer_vectors.push(vv) - 1);
        }
        center_point.divideScalar(fl);
        for (let j = 0; j < fl; ++j) {
            let vv = chamfer_vectors[face[j]];
            vv.subVectors(vv, center_point).multiplyScalar(chamfer).addVectors(vv, center_point);
        }
        face.push(ii[fl]);
        chamfer_faces.push(face);
    }
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
            chamfer_faces.push([chamfer_faces[pairs[0][0]][pairs[0][1]],
                    chamfer_faces[pairs[1][0]][pairs[1][1]],
                    chamfer_faces[pairs[3][0]][pairs[3][1]],
                    chamfer_faces[pairs[2][0]][pairs[2][1]], -1]);
        }
    }
    for (let i = 0; i < corner_faces.length; ++i) {
        let cf = corner_faces[i], face = [cf[0]], count = cf.length - 1;
        while (count) {
            for (let m = faces.length; m < chamfer_faces.length; ++m) {
                let index = chamfer_faces[m].indexOf(face[face.length - 1]);
                if (index >= 0 && index < 4) {
                    if (--index === -1) index = 3;
                    let next_vertex = chamfer_faces[m][index];
                    if (cf.indexOf(next_vertex) >= 0) {
                        face.push(next_vertex);
                        break;
                    }
                }
            }
            --count;
        }
        face.push(-1);
        chamfer_faces.push(face);
    }
    return { vectors: chamfer_vectors, faces: chamfer_faces };
}


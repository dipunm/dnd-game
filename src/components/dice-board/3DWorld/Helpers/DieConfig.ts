type DieConfig = {
    vertices: number[][],
    faces: number[][],
    scale: number,
    mass: number,
    texture: {
        markings: string[],
        rotate: number,
        offset: [number, number],
        scale: number | [number, number]
    }
};

const d4: DieConfig = {
    vertices: [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]],
    faces: [[1, 0, 2], [0, 1, 3], [0, 3, 2], [1, 2, 3]],
    scale: 180,
    mass: 530,
    texture: {
        markings: [],
        rotate: 0,
        offset: [0, 0],
        scale: 1
    }
}

const d6: DieConfig = {
    vertices: [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ],
    faces: [
        [0, 3, 2, 1], [1, 2, 6, 5], [0, 1, 5, 4],
        [3, 7, 6, 2], [0, 4, 7, 3], [4, 5, 6, 7]
    ],
    scale: 170,
    mass: 500,
    texture: {
        markings: ['1', '2', '3', '4', '5', '6'],
        rotate: Math.PI * 0.25 - 0.05,
        offset: [0.01, 0.05],
        scale: 0.8,
    }
};

const d8: DieConfig = {
    vertices: [
        [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
    ],
    faces: [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 3, 4],
    [1, 4, 2], [1, 2, 5], [1, 5, 3]],
    scale: 320,
    mass: 550,
    texture: {
        markings: ['1', '2', '3', '4', '5', '6', '7', '8'],
        rotate: Math.PI * 0.5,
        offset: [-0.02, 0.04],
        scale: 0.7,
    }
};

const d10: DieConfig = {
    vertices: (() => {
        var ang_diff = Math.PI * 2 / 10, h = 0.105;
        var vertices = [];
        for (var i = 0, ang = 0; i < 10; ++i, ang += ang_diff)
            vertices.push([Math.cos(ang), Math.sin(ang), h * (i % 2 ? 1 : -1)]);
        vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);
        return vertices;
    })(),
    faces: [
        [10, 2, 0], [10, 4, 2], [10, 6, 4], [10, 8, 6], [10, 0, 8],
        [11, 1, 3], [11, 3, 5], [11, 5, 7], [11, 7, 9], [11, 9, 1],

        // The faces are split into 2, the triangles connecting at the peaks, and 
        // the triangles connected at the circumference, making 20 faces total.
        // This makes texture mapping easier to handle.
        [0, 2, 1], [2, 4, 3], [4, 6, 5], [6, 8, 7], [8, 0, 9],
        [1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9], [9, 0, 1],

        // We add a duplicate face to differenciate it from the d20.
        // By luck this has not affected the chamfering algorithm.
        [9, 0, 1]],
    scale: 275,
    mass: 550,
    texture: {
        markings: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        rotate: Math.PI * 0.5,
        offset: [0, 0.1],
        scale: 0.8,
    }
};

const d12: DieConfig = {
    vertices: (() => {
        var p = (1 + Math.sqrt(5)) / 2, q = 1 / p;
        var vertices = [[0, q, p], [0, q, -p], [0, -q, p], [0, -q, -p], [p, 0, q],
        [p, 0, -q], [-p, 0, q], [-p, 0, -q], [q, p, 0], [q, -p, 0], [-q, p, 0],
        [-q, -p, 0], [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1],
        [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
        return vertices;
    })(),
    faces: [[2, 14, 4, 12, 0], [15, 9, 11, 19, 3], [16, 10, 17, 7, 6], [6, 7, 19, 11, 18],
    [6, 18, 2, 0, 16], [18, 11, 9, 14, 2], [1, 17, 10, 8, 13], [1, 13, 5, 15, 3],
    [13, 8, 12, 4, 5], [5, 4, 14, 9, 15], [0, 12, 8, 10, 16], [3, 19, 7, 17, 1]],
    mass: 595,
    scale: 170,
    texture: {
        markings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        offset: [0, 0],
        rotate: 0,
        scale: 0.95,
    }
};

const d20: DieConfig = {
    vertices: (() => {
        var t = (1 + Math.sqrt(5)) / 2;
        return [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
    })(),
    faces: [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]],
    scale: 170,
    mass: 585,
    texture: {
        markings: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        rotate: Math.PI / 2 + Math.PI * 2 / 3,
        offset: [0.02, -0.03],
        scale: 0.70,
    }
};

const d100: DieConfig = {
    ...d10,
    faces: [...d10.faces, ...d10.faces.slice(-1)],
    texture: {
        ...d10.texture,
        markings: ['00', '10', '20', '30', '40', '50', '60', '70', '80', '90'],
        scale: 0.75,
    }
}

export type diceCode = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
export const dieConfig = {
    d4, d6, d8, d10, d12, d20, d100
};

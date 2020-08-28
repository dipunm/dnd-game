type DieConfig = {[code: string]: { 
    vertices: number[][], 
    faces: number[][], 
    scale: number, 
    mass: number,
    texture: {
        rotate: number,
        offset: [number, number],
        scale: number | [number, number]
    }
}};

export const dieConfig: DieConfig  = {
    d6: {
         vertices: [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ],
        faces: [
            [0, 3, 2, 1, 1], [1, 2, 6, 5, 2], [0, 1, 5, 4, 3],
            [3, 7, 6, 2, 4], [0, 4, 7, 3, 5], [4, 5, 6, 7, 6]
        ],
        scale: 150,
        mass: 500,
        texture: {
            rotate: Math.PI * 0.25 - 0.05,
            offset: [0.01, 0.05],
            scale: 0.9,
        }
    },
    d8: {
        vertices: [
            [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
        ],
        faces: [[0, 2, 4, 1], [0, 4, 3, 2], [0, 3, 5, 3], [0, 5, 2, 4], [1, 3, 4, 5],
        [1, 4, 2, 6], [1, 2, 5, 7], [1, 5, 3, 8]],
        scale: 320,
        mass: 550,
        texture: {
            rotate: Math.PI * 0.5,
            offset: [-0.02, 0.04],
            scale: 0.7,
        }
    },
    d10: {
        vertices: (() => {
            var a = Math.PI * 2 / 10, h = 0.105;
            var vertices = [];
            for (var i = 0, b = 0; i < 10; ++i, b += a)
                vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)]);
            vertices.push([0, 0, -1]); vertices.push([0, 0, 1]);
            return vertices;
        })(),
        faces: [[5, 7, 11, 0], [4, 2, 10, 1], [1, 3, 11, 2], [0, 8, 10, 3], [7, 9, 11, 4],
        [8, 6, 10, 5], [9, 1, 11, 6], [2, 0, 10, 7], [3, 5, 11, 8], [6, 4, 10, 9],
        // The faces are split into 2, the triangles connecting at the peaks, and 
        // the triangles connected at the circumference, making 20 faces total.
        [1, 0, 2, -1], [1, 2, 3, -1], [3, 2, 4, -1], [3, 4, 5, -1], [5, 4, 6, -1],
        [5, 6, 7, -1], [7, 6, 8, -1], [7, 8, 9, -1], [9, 8, 0, -1], [9, 0, 1, -1],
        // We add a duplicate face to differenciate it from the d20.
        // By luck this has not affected the chamfering algorithm.
        [9, 0, 1, -1]],
        scale: 265,
        mass: 550,
        texture: {
            rotate: Math.PI,
            offset: [0.05,-0.25],
            scale: [0.90, 0.50],
        }
    },
    d20: {
        vertices: (() => {
            var t = (1 + Math.sqrt(5)) / 2;
            return [[-1, t, 0], [1, t, 0 ], [-1, -t, 0], [1, -t, 0],
                [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
                [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
        })(),
        faces: [[0, 11, 5, 1], [0, 5, 1, 2], [0, 1, 7, 3], [0, 7, 10, 4], [0, 10, 11, 5],
        [1, 5, 9, 6], [5, 11, 4, 7], [11, 10, 2, 8], [10, 7, 6, 9], [7, 1, 8, 10],
        [3, 9, 4, 11], [3, 4, 2, 12], [3, 2, 6, 13], [3, 6, 8, 14], [3, 8, 9, 15],
        [4, 9, 5, 16], [2, 4, 11, 17], [6, 2, 10, 18], [8, 6, 7, 19], [9, 8, 1, 20]],
        scale: 170,
        mass: 440,
        texture: {
            rotate: Math.PI / 2 + Math.PI * 2 / 3,
            offset: [0, -0.03],
            scale: 0.75
        }
    }
};

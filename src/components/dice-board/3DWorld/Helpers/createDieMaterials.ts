import { MeshPhongMaterial, CanvasTexture } from "three";

const dieColor = '#123';
const labelColor = '#FFF';

function createCanvas(label: string, textSize: number, margin: number) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = textSize;

    const context2d = canvas.getContext('2d')!;
    context2d.font = textSize / (1 + 2 * margin) + "pt Arial";
    context2d.fillStyle = dieColor;
    context2d.fillRect(0, 0, canvas.width, canvas.height);
    context2d.textAlign = "center";
    context2d.textBaseline = "middle";
    context2d.fillStyle = labelColor;
    context2d.fillText(label, canvas.width / 2, canvas.height / 2);

    if (label === '6' || label === '9') {
        context2d.fillText('  .', canvas.width / 2, canvas.height / 2);
    }

    return canvas;
}

function createD4Canvas(labels: [number, number, number], textSize: number, margin: number) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = textSize;

    const context2d = canvas.getContext('2d')!;
    context2d.font = 'lighter ' + (textSize - margin) / 1.7 + "pt Arial";
    context2d.fillStyle = dieColor;
    context2d.fillRect(0, 0, canvas.width, canvas.height);
    context2d.textAlign = "center";
    context2d.textBaseline = "middle";
    context2d.fillStyle = labelColor;

    labels.forEach(label => {
        context2d.fillText(
            label.toString(), 
            canvas.width / 2, 
            canvas.height / 2 - textSize * 0.3
        );
        context2d.translate(canvas.width / 2, canvas.height / 2);
        context2d.rotate(Math.PI * 2 / 3);
        context2d.translate(-canvas.width / 2, -canvas.height / 2);
    });

    return canvas;
}

export function createD4Materials(size: number) {
    return [
            new MeshPhongMaterial({
                specular: 0x172022,
                color: 0x112233,
                shininess: 60,
                flatShading: true,
            }),
            ...[...new Array(4)].map((_, i) => {
                const margin = 200;
                // No idea what this formula is:
                const textSize = Math.pow(2, Math.floor(Math.log(size + margin) / Math.log(2))) / 5;
                const canvas = i < 4 ? createD4Canvas([
                    (i) % 4 + 1, 
                    (i + 1) % 4 + 1, 
                    (i + 2) % 4 + 1,
                ], textSize, margin) : createD4Canvas([
                    0,0,0,
                ], textSize, margin);
                const texture = new CanvasTexture(canvas);
                texture.anisotropy = 32;
                return texture;
            }).map(texture => new MeshPhongMaterial({
                specular: 0x172022,
                color: 0xfafafa,
                shininess: 60,
                flatShading: true,
                map: texture,
            }))
    ];
}

export function createDieMaterials(faceLabels: string[], size: number) {
    return [
        new MeshPhongMaterial({
            specular: 0x172022,
            color: 0x112233,
            shininess: 60,
            flatShading: true,
        }), 
        ...faceLabels
            .map(function createTexture(label) {
                if (label === undefined) return null;

                const margin = 0.8;
                // No idea what this formula is:
                const textSize = Math.pow(2, Math.floor(Math.log(3 * size * margin) / Math.log(2))) * 2;
                const canvas = createCanvas(label, textSize, margin);
                const texture = new CanvasTexture(canvas);
                return texture;
            })
            .map(texture => new MeshPhongMaterial({
                specular: 0x172022,
                color: 0xfafafa,
                shininess: 60,
                flatShading: true,
                map: texture,
            }))
    ];
}
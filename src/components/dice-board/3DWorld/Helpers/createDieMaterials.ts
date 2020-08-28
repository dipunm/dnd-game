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

export function createDieMaterials(faceLabels: string[], size: number, margin: number) {
    return faceLabels
        .map(function createTexture(label) {
            if (label === undefined) return null;

            // No idea what this formula is:
            const textSize = Math.pow(2, Math.floor(Math.log(3 * size * margin) / Math.log(2))) * 2;
            const canvas = createCanvas(label, textSize, margin);
            return new CanvasTexture(canvas);
        })
        .map(texture => new MeshPhongMaterial({
            specular: 0x172022,
            color: 0xfafafa,
            shininess: 60,
            flatShading: true,
            map: texture,
        }));
}
export function getCanvasGlContext(canvas, antialias, alpha) {
    const context = canvas.getContext('webgl2', {
        antialias: antialias,
        alpha: alpha,
    });
    console.log('webgl2 context:', context);
    return context;
}

export function getOffscreenCanvasGlContext(canvas, antialias, alpha) {
    const context = canvas.getContext('webgl2', {
        antialias: antialias,
        alpha: alpha,
        premultipliedAlpha: false,
    });
    console.log('webgl2 context:', context);
    return context;
}

export function downloadModelFile(model_string, filename, file_ending) {
    const blob = new Blob([model_string], { type: 'text/plain' });
    saveFile(blob, filename + "." + file_ending);
}

export function downloadBytes(bytes, filename, file_ending) {
    const blob = new Blob([bytes]);
    saveFile(blob, filename + "." + file_ending);
}

const saveFile = (blob, filename) => {
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.download = filename; // TODO: name as param

    document.body.appendChild(link);
    link.click();

    // apparently need setTimeout for firefox
    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
}

export function getCanvas2DContext(canvas) {
    const context = canvas.getContext('2d')
    console.log('2d context:', context);
    return context;
}

export function sleep_ms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function time_now() {
    return window.performance.now();
}

export function show_modal(el) {
    el.showModal()
}

export function close_dialog(el) {
    el.close()
}

export function formdata_entries(formdata) {
    return formdata.entries()
}

export function add_connection_cable(target, source, input) {
    try {
        const targetNode = document.querySelector(`ed-node[name="${target}"]`);
        const targetPin = targetNode.querySelector(`ed-node-pin[name="${input}"]`);

        const sourceNode = document.querySelector(`ed-node[name="${source}"]`);
        const sourcePin = sourceNode.querySelector(`ed-node-pin[name="out"]`);

        const cable = document.createElement('ed-node-cable');
        cable.startNode = targetNode;
        cable.startPin = targetPin;
        cable.endNode = sourceNode;
        cable.endPin = sourcePin;

        targetPin.appendChild(cable);
        targetPin.input_cable = cable;
        cable.updatePosition();
    } catch (error) {
        console.error(error);
    }
}


// Importación del dataSet
import { dataSet } from "./trainingData.js";

// Declaración de la red neuronal a entrenar
let trainedNeuralNetwork;

// Evento de click para realizar las respectivas predicciones a la red Neuronal
document.getElementById('buttonTraining').addEventListener("click", () => {
    let inputTwitter = document.getElementById("inputTw").value;
    
    document.getElementById("textResult").innerHTML = 'Según la predicción de la Red, la persona que publicó este Tweet es';
    document.getElementById("result").innerHTML = neuronExecution(inputTwitter);
});

// Procesamiento cadenas de texto, conversión de cada caracter a código ASCII
const codify = (inputTwitter) => {
    return inputTwitter.split('').map(char => (char.charCodeAt(0) / 255));
}

// Devuelve la matriz con los datos de entrenamiento, es decir, el dataset
const dataProcessing = (data) => {
    return data.map(element => {
        return {
            input: codify(element.input.slice(0, 100)),
            output: element.output
        };
    });
}

const trainingError = (callback) => {
    let tbody = document.getElementById("tbody");
    let newRow = document.createElement("tr");
    let iterations = newRow.appendChild(document.createElement("td"));
    let error = newRow.appendChild(document.createElement("td"));
    iterations.innerHTML = callback.iterations;
    error.innerHTML = callback.error;

    tbody.appendChild(newRow);
}

// Entrenamiento de la Red Neuronal con el respectivo dataSet ingresado
const neuralTraining = (dataSet) => {
    const neuron = new brain.NeuralNetwork();
    
    neuron.train(dataProcessing(dataSet), {
        activation: 'sigmoid',
        iterations: 20000,
        errorThresh: 0.005,
        log: trainingError,
        logPeriod: 5,
        leakyReluAlpha: 0.01,
        learningRate: 0.3,
        momentum: 0.1,
        callbackPeriod: 10,
        timeout: Infinity,
        beta1: 0.9,
        beta2: 0.999,
        epsilon: 1e-8,
    });

    trainedNeuralNetwork = neuron.toFunction();
}

// Ingresamos y ejecutamos el Tweet que queremos predecir
const neuronExecution = (tweet) => {
    let results = trainedNeuralNetwork(codify(tweet));
    let imgResult = document.getElementById("imageResult");
    let winResult;

    if (results.Petro > results.Quintero) {
        winResult = results.Petro;
        imgResult.src = '../img/Petro.jpg';
    } else {
        winResult = results.Quintero;
        imgResult.src = '../img/Quintero.jpg';
    }
    document.getElementById("porcentaje").innerHTML = (winResult*100).toFixed(3) + '%';
    
    return results.Petro > results.Quintero ? 'Petro' : 'Quintero';
}

neuralTraining(dataSet);
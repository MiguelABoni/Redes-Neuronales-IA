// Importación del dataSet
import { dataSet } from "./trainingData.js";

// Declaración de la red neuronal a entrenar
let trainedNeuralNetwork;

// Evento de click para realizar las respectivas predicciones a la red Neuronal
document.getElementById('buttonTraining').addEventListener("click", () => {
    let inputTwitter = document.getElementById("inputTw").value;
    console.log(inputTwitter);
    console.log(neuronExecution(inputTwitter));
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

// Entrenamiento de la Red Neuronal con el respectivo dataSet ingresado
const neuralTraining = (dataSet) => {
    const neuron = new brain.NeuralNetwork();
    
    neuron.train(dataProcessing(dataSet), {
        activation: 'sigmoid',
        iterations: 20000,
        errorThresh: 0.005,
        log: true,
        logPeriod: 1,
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

    console.log('...Finished training...');
}

// Ingresamos y ejecutamos el Tweet que queremos predecir
const neuronExecution = (tweet) => {
    let results = trainedNeuralNetwork(codify(tweet));
    
    return results.Petro > results.Quintero ? 'Petro' : 'Quintero';
}

neuralTraining(dataSet);
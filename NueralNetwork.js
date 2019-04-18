class NeuralNetwork{
//TODO Convert to use matrcies for that speed
  constructor(inputNodes,outputNodes,hiddenLayers,hiddenLayerSize){
    this.inputNodes = inputNodes;
    this.outputNodes = outputNodes;
    this.hiddenLayers = hiddenLayers;
    this.hiddenLayerSize = hiddenLayerSize;
    this.network = [[],[]];
    //First position is later, 2nd position is node

  }

  initNetwork(){

    //create all Neurons


    //Link all Neurons

    for(let i = 0;i < this.inputNodes;i++){
      this.network[0].push(new Neuron());
    }

    //Shift to the right one as we dont want to overright the input Neurons
    for(let i = 1;i < this.hiddenLayers + 1;i++){
      this.network.push([]);
      for(let j = 0;j < this.hiddenLayerSize;j++){
        this.network[i].push(new Neuron());
      }

    }

    for(let i = 0;i < this.outputNodes;i++){
      this.network[this.hiddenLayers + 1].push(new Neuron());
    }

    //Time for some O^3 time complexity T.T

    //Dont need to link up last layer
    for(let i = 0;i < this.network.length-1;i++){
      for(let j = 0;j < this.network[i].length;j++){
        this.network[i][j].bias = randomNumInRange(-10,10);
        //Shouldnt hit out of bounds since we stop at 2nd to last
        for(let k = 0;k < this.network[i + 1].length;k++){
          this.network[i][j].addForwardNueron(this.network[i+1][k],randomNumInRange(-10,10));
        }

      }
    }


  }

  runNetwork(inputs){

    //Saftey catch
    if(inputs.length != this.inputNodes){
      console.error("Incorrect Number of inputs to Nueral Network!")
      return null;
    }

    let outputs = [];

    //First reset all the values since its a passforwad system

    for(let i = 0;i < this.network.length;i++){
      for(let j = 0;j < this.network[i].length;j++){
        this.network[i][j].resetValue();
      }
    }

    //Set Inputs
    for(let i = 0;i < this.inputNodes;i++){
      this.network[0][i].updateValue(inputs[i]);
    }

    //Actually run the network, since my design is bad, I gotta run layer by layer manually
    for(let i = 0;i < this.network.length;i++){
      for(let j = 0;j < this.network[i].length;j++){
        this.network[i][j].propogate();
      }
    }

    //Grab Results
    for(let i = 0;i < this.outputNodes;i++){
        outputs.push(this.network[this.hiddenLayers+1][i].currentValue);
    }

    return outputs;
  }

  exportWeights(){
    //Return jagged array of floats corresposding to each weight

    let output = [];

    for(let i = 0;i < this.network.length;i++){
      output.push([]);
      for(let j = 0;j < this.network[i].length;j++){
        output[i].push(this.network[i][j].forwardWeights);
      }
    }

    return output;
  }

  //It is expected that the imported weights are in the same size as the create network
  importWeights(weights){


    if(weights.length != this.network.length){
      console.error("Incorrect outer array size of import weight matrix")
      return;
    }

    for(let i = 0;i < this.network.length;i++){
     if(this.network[i].length != weights[i].length){
       console.error("Incorrect inner array size of import weight matrix");
       return;
     } 
    }

    //Else we know sizes match up
    for(let i = 0;i < this.network.length;i++){
      for(let j = 0;j < this.network[i].length;j++){
        this.network[i][j].updateWeights(weights[i][j]);
      }
    }

  }

  //Returns a clone of the current nueral network 
  clone(){
    let copy = new NeuralNetwork(this.inputNodes,this.outputNodes,this.hiddenLayers,this.hiddenLayerSize);
    copy.network = Array.from(this.network);
    return copy;
  }

}

//Create into seperate as currently its only 0 to 1 when its best to be -1 to 1
function createRandom(){
  return Math.random();
}

function randomNumInRange(low,high){
  return Math.random() * (high - low) + low;
}
class NeuralNetwork{

  constructor(num_inputNode,num_outputNode,hiddenLayers,hidenLayerSize){
    this.num_inputNodes = num_inputNode;
    this.num_outputNodes = num_outputNode;
    this.hiddenLayers = hiddenLayers;
    this.hidenLayerSize = hidenLayerSize;
    this.network = [[],[]];
    //First position is later, 2nd position is node

  }

  initNetwork(){

    //create all Neurons


    //Link all Neurons

    for(let i = 0;i < this.num_inputNodes;i++){
      this.network[0].push(new Neuron());
    }

    //Shift to the right one as we dont want to overright the input Neurons
    for(let i = 1;i < this.hiddenLayers + 1;i++){
      this.network.push([]);
      for(let j = 0;j < this.hidenLayerSize;j++){
        this.network[i].push(new Neuron());
      }

    }

    for(let i = 0;i < this.num_outputNodes;i++){
      this.network[this.hiddenLayers + 1].push(new Neuron());
    }

    //Time for some O^3 time complexity T.T

    //Dont need to link up last layer
    for(let i = 0;i < this.network.length-1;i++){
      for(let j = 0;j < this.network[i].length;j++){

        //Shouldnt hit out of bounds since we stop at 2nd to last
        for(let k = 0;k < this.network[i + 1].length;k++){
          this.network[i][j].addForwardNueron(this.network[i+1][k],createRandom());
        }

      }
    }


  }

  runNetwork(inputs){

    //Saftey catch
    if(inputs.length != this.num_inputNodes){
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
    for(let i = 0;i < this.num_inputNodes;i++){
      this.network[0][i].updateValue(inputs[i]);
    }

    //Actually run the network, since my design is bad, I gotta run layer by layer manually
    for(let i = 0;i < this.network.length;i++){
      for(let j = 0;j < this.network[i].length;j++){
        this.network[i][j].propogate();
      }
    }

    //Grab Results
    for(let i = 0;i < this.num_outputNodes;i++){
        outputs.push(this.network[this.hiddenLayers+1][i].currentValue);
    }

    return outputs;
  }



}

//Create into seperate as currently its only 0 to 1 when its best to be -1 to 1
function createRandom(){
  return Math.random();
}
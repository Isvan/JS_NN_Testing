class GeneticEvoLearning{
//Method of training nueralNetworks using evolution
    constructor(populationSize,cullRate,randomSurvival,baseMutationAmount,NNOptions){
        
        this.populationSize = populationSize;
        this.cullRate = cullRate;
        this.randomSurvival = randomSurvival;
        this.baseMutationAmount = baseMutationAmount;
        this.NNOptions = NNOptions;
        if(this.cullRate > 1 || this.cullRate < 0){
            console.error("Invalid Cull Rate (Between 0 and 1) setting to 0.5");
            this.cullRate = 0.5;
        }

        if(NNOptions.hiddenLayers == undefined){
            NNOptions.hiddenLayers = 1;
        }

        if(NNOptions.hiddenLayerSize == undefined){
            NNOptions.hiddenLayerSize = 2;
        }


        this.population = [];
        this.populationFitness;
        this.populationAvgFitness;

        for(let i = 0;i < populationSize;i++){
            this.population.push(new NeuralNetwork(NNOptions.inputNodes,NNOptions.outputNodes,NNOptions.hiddenLayers,NNOptions.hiddenLayerSize))
            this.population[i].initNetwork();
        }

    }

    getPopulation(){
        //Return array of entire population
        return this.population;
    }


    updatePopulationFitness(fitnessArr){
        //Give me an array with the fitness for each of the given population

        if(fitnessArr.length != this.population.length){
            console.error("Fitness Array needs to be the same size as the population array");
        }


        //Give each obj a new property called fitness
        for(let i = 0;i < fitnessArr.length;i++){
            this.population[i].fitness = fitnessArr[i];
        }


        //Use built in sorting function

        this.population.sort((a,b)=> b.fitness - a.fitness);

        let cutOff = (1 - this.cullRate) * this.populationSize;
        
        //Everything past cutoff is not used for evolution

        let mutateAmount = 1;
        //Higher ranks mutate less, lower ranks mutate more
        for(let i = 0;i < cutOff;i++){
            mutateAmount = ((cutOff - (cutOff - i))/cutOff);
            //console.log("Mutate Amount for rank : " + i + " is : " + mutateAmount);
            this.mutateNN(this.population[i],mutateAmount * this.baseMutationAmount);
            
        }

        for(let i = cutOff;i < this.population.length;i++){
            this.population[i] = new NeuralNetwork(this.NNOptions.inputNodes,this.NNOptions.outputNodes,this.NNOptions.hiddenLayers,this.NNOptions.hiddenLayerSize);
            this.population[i].initNetwork()
        }   


    }

     mutateNN(NN,mutateAmount){
        //Mutate a NN with the given amount
        
        let randomAmount = 1;
        for(let i = 0;i  < NN.network.length;i++){
            for(let j = 0;j < NN.network[i].length;j++){
                randomAmount = randomNumInRange(-1 * mutateAmount + 1,mutateAmount + 1);
                //console.log("Mutate Random amount is " + randomAmount + " for rate : " + mutateAmount)
               // console.log("Updating by " + randomAmount + " with inputs : " + (-1 * mutateAmount) + " " + mutateAmount);
                NN.network[i][j].bias *= randomAmount;
                
                for(let k = 0;k < NN.network[i][j].forwardWeights.length;k++){
                    NN.network[i][j].forwardWeights[k] *= randomNumInRange(-1 * mutateAmount + 1,mutateAmount + 1);
                }
            }
        }
      
    }

}



function breedNN(NN1,NN2){
    //Breeds two neuralNetworks and returns a child


}

function randomNumInRange(low,high){
    return Math.random() * (high - low) + low;
}

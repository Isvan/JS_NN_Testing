function NNsetUp(){

    G = new GeneticEvoLearning(500,0.05,0.1,1,{inputNodes : 2, outputNodes : 1})
  

}

graphDataHigh = []
graphDataAvg = []

function NNrun(){
    

}


function NNStep(){

    let fitness = [];
    let NN = G.getPopulation();
    let res = 0;
    let bestHitRate = 0;
    

    let epochs = 100;

    let highestFitness = 0;
    
    for(let i = 0;i < NN.length;i++){
        
        let nnFitness = 0;
        let hitRate = 0;
        for(let k = 0;k < epochs;k++){
         
          let num1 = Math.random() * 5 - Math.random() * 5;
          let num2 = Math.random() * 5 - Math.random() * 5;
          
          res = NN[i].runNetwork([num1,num2]);

          
          if(num1 > num2 ){

            //Reward for correct awnser
            if(res > 0){
                nnFitness += res * 4;
                hitRate++;
            }else{ 
                //Punish for wrong
                nnFitness -= res * -4;
            }
          }


          if(num1 < num2 ){

            if(res < 0){
                hitRate++;
                nnFitness += res * -4;
            }else{
                nnFitness -= res * 4;
            }
          }
        
        }



        fitness[i] = nnFitness;
        if(nnFitness > highestFitness){
            highestFitness = nnFitness;
        }

        if(hitRate/epochs > bestHitRate){
            bestHitRate = hitRate/epochs;
        }


    }

    console.log("Best hit Rate  : " + bestHitRate);

    //console.log("Highest Fitness was : " + highestFitness)
    graphDataHigh.push(highestFitness);
    G.updatePopulationFitness(fitness);
    graphDataAvg.push(G.getPopulation()[Math.round(G.getPopulation().length/2)].fitness)

    
}

function plotResults(){
    var best = {
        x: [],
        y: [],
        type: 'scatter'
    };

    var avg = {
        x: [],
        y: [],
        type: 'scatter'
    };
    
    for(let i = 0;i < graphDataHigh.length;i++){
        best.x[i] = i+1;
        best.y[i] = graphDataHigh[i];

        avg.x[i] = i+1;
        avg.y[i] = graphDataAvg[i];

        
    }

    var data = [best,avg];
    
    Plotly.newPlot('graph', data, {}, );
}


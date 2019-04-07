class Nueron{

    constructor(){

        this.bias = 0.0;
        this.currentValue = 0;
        this.forwardNuerons = [];
        this.forwardWeights = [];

    }

    addForwardNueron(newNueron,weight){
        this.forwardNuerons.push(newNueron);
        this.forwardWeights.push(weight)
    }

    updateValue(amount){
        this.currentValue += amount;
    }


    updateWeights(newWeights){
        this.forwardWeights = newWeights;
    }

    resetValue(){

        this.currentValue = 0;

    }

    propogate(){

        this.currentValue = sigmoid(this.currentValue + this.bias);

        for(let i = 0;i < this.forwardNuerons.length;i++){
            this.forwardNuerons[i].updateValue(this.currentValue * this.forwardWeights[i])
        }

    }

}

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

function ReLu(t){
    if(t > 0){
        return t;
    }else{
        return 0;
    }
}
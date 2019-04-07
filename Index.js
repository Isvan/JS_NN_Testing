function NNsetUp(){

    N0 = new Neuron(); 
    N1 = new Neuron();

    N00 = new Neuron();
    N01 = new Neuron();
    
    N001 = new Neuron();
    
    N0.addForwardNueron(N00,Math.random()*2 - 1)
    N1.addForwardNueron(N00,Math.random()*2 - 1)
    
    N0.addForwardNueron(N01,Math.random()*2 - 1)
    N1.addForwardNueron(N01,Math.random()*2 - 1)
    
    N01.addForwardNueron(N001,Math.random()*2 - 1)
    N00.addForwardNueron(N001,Math.random()*2 - 1)

}

function NNrun(input1,input2){

    
    N1.resetValue()
    N0.resetValue()
    N00.resetValue()
    N01.resetValue()
    N001.resetValue()


    N0.updateValue(input1);
    N1.updateValue(input2);

    N0.propogate();
    N1.propogate();
    

    N00.propogate();
    N01.propogate();
    
    N001.propogate();

    console.log(N0.currentValue);
    console.log(N1.currentValue);
    console.log("")
    console.log(N00.currentValue);
    console.log(N01.currentValue);
    console.log("")
    console.log(N001.currentValue);

}
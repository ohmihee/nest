const Beverage = require('./decoratore') 
const {DarkRoast} = require('./cafe')


const Soy = (beverage) => {
    beverage.setDescription(beverage.getDescription() + ".Soy");
    beverage.setCost(beverage.getCost()+.15);
    return beverage;
}

const Milk = (beverage) => {
    beverage.setDescription(beverage.getDescription() + ".Mike");
    beverage.setCost(beverage.getCost()+.20);
    return beverage
}

const Mocha = (beverage) => {
    beverage.setDescription(beverage.getDescription()+'.Mocha');
    beverage.setCost(beverage.getCost()+.20)
    return beverage
}

const whip = () => {
    beverage.setDescription(beverage.getDescription()+'.whip')
    beverage.setCost(beverage.getCost()+0.3);
    return beverage
}

let beverage = Soy(DarkRoast());
beverage = Milk(beverage);
beverage = Mocha(beverage)
beverage = whip(beverage)


console.log(beverage)

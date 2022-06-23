const Beverage = require('./decoratore') 
const {DarkRoast} = require('./cafe')


const Soy = (beverage) => {
    beverage.setDescription(beverage.getDescription() + ".Soy");
    beverage.setCost(beverage.getCost()+.15);
    return beverage;
}

const beverage = Soy(DarkRoast());
console.log(beverage)

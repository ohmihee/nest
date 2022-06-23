const Beverage = require('./decoratore') 

const DarkRoast = () => {
    const beverage = new Beverage();
    beverage.setDescription('DarkRoast');
    beverage.setCost(.99);
    return beverage;
}
const beverage = DarkRoast();
console.log(beverage.getDescription()+ "$"+beverage.getCost())
const beverage2 = DarkRoast();
beverage2.setCost('0.5')
console.log(beverage2.getDescription()+ "$"+beverage2.getCost())

const HouseBlend = () => {
    const beverage = new Beverage();
    beverage.setDescription('HouseBlend');
    beverage.setCost(.89)
    return beverage
}

const Expresso = () => {
    const beverage = new Beverage()
    beverage.setDescription('Espresso');
    beverage.setCost(1.99);
    return beverage;
}

const Decaf = () => {
    const beverage = new Beverage()
    beverage.setDescription('Decaf Coffee');
    beverage.setCost(1.06)
    return beverage;
}

const make_menu = (title, price) => {
    const beverage = new Beverage();
    beverage.setDescription(title);
    beverage.setCost(price)
    return beverage;
}
const Expresso2 = make_menu('espresso', 1.99)

module.exports = {
    Expresso,
    DarkRoast
}
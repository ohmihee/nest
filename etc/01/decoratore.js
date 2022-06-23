// https://www.youtube.com/watch?v=23F_HpPmu1k&list=PL5aSjzJqCaPZkKykSDoiQhiarmdUWIjx0&index=2

function Beverage () {
    this.description = "Unknown Beverage";
    this.cost = 0;

    this.setDescription = (description) => {
        this.description = description;
    }
    this.setCost = (cost) => {
        this.cost = cost;
    }
    this.getDescription = () => {
        return this.description;
    }
    this.getCost = () => {
        return this.cost;
    }
}

module.exports = Beverage
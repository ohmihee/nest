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
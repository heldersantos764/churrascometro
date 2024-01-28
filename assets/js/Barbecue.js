class Barbecue {
  constructor(people) {
    this.people = people;
  }

  calculateMeat() {
    let value = 0;

    value += this.people.men * 0.4;
    (value += this.people.women * 0), 32;
    value += this.people.children * 0.2;

    return value;
  }

  calculateBread() {
    let value = 0;

    value += (this.people.men + this.people.women) * 2;
    value += this.people.children;

    return value;
  }

  calculateSoda() {
    let value = 0;

    let amoutPeople = this.people.men + this.people.women + this.people.children;

    let result = amoutPeople / 5;

    value = result < 1 ? 1 : parseInt(result);

    return value;
  }

  calculateWater() {
    let value = 0;

    let amoutPeople = this.people.men + this.people.women + this.people.children;

    let result = amoutPeople / 5;

    value = result < 1 ? 1 : parseInt(result);

    return value;
  }

  calculateBeer() {
    let value = 0;
    value = this.people.drink * 3;
    return value;
  }

  calculateCoal() {
    return this.people.men + this.people.women + this.people.children;
  }

  calculateSalt() {
    return (this.people.men + this.people.women + this.people.children) * 0.04;
  }

  caculateIce() {
    let value = 0;

    let amoutPeople = this.people.men + this.people.women + this.people.children;

    let result = amoutPeople / 10;

    value = result < 1 ? 5 : parseInt(result) * 5;

    return value;
  }

  getAmountItems() {
    return {
      meat: this.calculateMeat().toFixed(2),
      bread: this.calculateBread(),
      soda: this.calculateSoda(),
      water: this.calculateWater(),
      beer: this.calculateBeer(),
      coal: this.calculateCoal(),
      salt: this.calculateSalt().toFixed(2),
      ice: this.caculateIce(),
    };
  }
}

export default Barbecue;

class Barbecue {
  constructor(people) {
    this.people = people;
  }

  calculateMeat() {
    let value = 0;

    value += this.people.men * 0.4;
    value += this.people.women * 0.32;
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
      meat: this.calculateMeat().toFixed(2)+' kg',
      bread: this.calculateBread()+' unidades',
      soda: this.calculateSoda()+' garrafas de 2L',
      water: this.calculateWater()+' garrafas de 1L',
      beer: this.calculateBeer()+' garrafas de 600ml',
      coal: this.calculateCoal()+' kg',
      salt: this.calculateSalt().toFixed(2)+' kg',
      ice: this.caculateIce().toFixed(2)+' kg',
    };
  }
}

export default Barbecue;

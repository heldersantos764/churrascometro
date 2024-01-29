class Validation {
  static isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isCep(cep) {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
  }

  static isName(name, minLength = 0) {
    const regraRegex = /^[a-zA-Z\s]+$/;

    return this.minLength(minLength, name) && regraRegex.test(name);
  }

  static minLength(length, text) {
    return text.length >= length;
  }
}

export default Validation;

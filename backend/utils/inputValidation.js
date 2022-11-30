class inputValidation {
  FormValidation(name, email, password) {
    try {
      this.validateName(name),
        this.validateEmail(email),
        this.validatePassword(password);
    } catch (error) {
      throw error;
    }
  }

  validateName(name) {
    if (!name.match(/[a-zA-Z]{3,}$/)) {
      const error = new Error(
        "First Name and Last Name must be at least 2 characters"
      );
    }

    return true;
  }

  validateEmail(email) {
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      const error = new Error("Email is not valid");
    }

    return true;
  }

  validatePassword(password) {
    if (password.trim().length < 6) {
      const error = new Error("Password must be at least 6 characters");
      throw error;
    }

    return true;
  }
}

module.exports = inputValidation;

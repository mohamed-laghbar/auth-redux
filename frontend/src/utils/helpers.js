function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

function validatePassword(p) {
  if (p.trim().length < 4) {
    return false;
  }

  return true;
}

function validateName(name) {
  const re = /^[a-zA-Z]+$/;
  if (re.test(name)) {
    return true;
  } else return false;
}

module.exports = { ValidateEmail, validatePassword, validateName };

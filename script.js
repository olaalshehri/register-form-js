const form = document.getElementById("register-form");
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const age = document.getElementById("age");
const terms = document.getElementById("terms");
const submitButton = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

const passwordRules = {
  length: document.getElementById("rule-length"),
  upper: document.getElementById("rule-upper"),
  number: document.getElementById("rule-number"),
};

function showError(input, errorId, message = "") {
  const error = document.getElementById(errorId);
  error.textContent = message;

  input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "" && input.value !== "");
}

function isValidFullname() {
  const name = fullName.value.trim();
  if (name.length < 5) {
    showError(fullName, "fullname-error", "Enter Your Full Name");
    return false;
  }
  showError(fullName, "fullname-error");
  return true;
}

function isValidEmail() {
  const userEmail = email.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(userEmail)) {
    showError(email, "email-error", "Enter Your a Valid Email");
    return false;
  }
  showError(email, "email-error");
  return true;
}

function isValidPassword() {
  const passwordValue = password.value;
  const rules = {
    length: passwordValue.length >= 8,
    upper: /[A-Z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
  };
  Object.keys(rules).forEach((element) => {
    passwordRules[element].classList.toggle("met", rules[element]);
  });

  return Object.values(rules).every(Boolean);
}

function isValidConfirmPassword() {
  const confirmPasswordValue = confirmPassword.value;
  const passwordValue = password.value;

  if (confirmPasswordValue === "") {
    showError(
      confirmPassword,
      "confirm-password-error",
      "Your Passwords Not Correct",
    );
    return false;
  }

  if (confirmPasswordValue !== passwordValue) {
    showError(
      confirmPassword,
      "confirm-password-error",
      "Your passwords don't Match",
    );
    return false;
  }
  showError(confirmPassword, "confirm-password-error");
  return true;
}

function isValidAge() {
  const ageValue = Number(age.value);

  if (age.value === "" || ageValue < 18 || ageValue > 80) {
    showError(age, "age-error", "Age must be between 18 and 80 ");
    return false;
  }

  showError(age, "age-error");
  return true;
}

function isTermsAccepted() {
  const termsValue = terms.checked;
  if (!termsValue) {
    showError(terms, "terms-error", "Must Be Checked");
    return false;
  }
  showError(terms, "terms-error", "");
  return true;
}

function validateForm() {
  const results = [
    isValidFullname(),
    isValidEmail(),
    isValidPassword(),
    isValidConfirmPassword(),
    isValidAge(),
    isTermsAccepted(),
  ];
  const formValid = results.every(Boolean);
  submitButton.disabled = !formValid;
  return formValid;
}

form.addEventListener("input", validateForm);
form.addEventListener("change", validateForm);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateForm()) {
    formStatus.textContent = "Please fix the highlighted fields";
    formStatus.classList.remove("successs");
    return;
  }
  formStatus.textContent = `Welcome ${fullName.value.trim()}, Your account was created`;
  formStatus.classList.add("successs");

  form.reset();
  validateForm();
});

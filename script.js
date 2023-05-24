/////////////////////////////////////////////////
"use strict";

// BANKIST APP

// Account data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// HTML element selectors
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const popup = document.querySelector(".popup");

// Currency mapping
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

function displayPopup(message) {
  // const popup = document.querySelector(".popup");
  popup.textContent = message;
  popup.style.display = "block";
  popup.classList.add("popup-enter");

  // Remove the 'popup-enter' class after the animation ends
  setTimeout(() => {
    popup.classList.remove("popup-enter");
  }, 1000); // Animation duration

  // Close the popup after a delay
  setTimeout(closePopup, 3000); // Adjust this value to change the delay
}

function closePopup() {
  // const popup = document.querySelector(".popup");
  popup.classList.add("popup-exit");

  // Remove the 'popup-exit' class and hide the popup after the animation ends
  setTimeout(() => {
    popup.classList.remove("popup-exit");
    popup.style.display = "none";
  }, 6000); // Animation duration
}

// Function to display account movements
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (amount, index) {
    const type = amount > 0 ? `deposit` : `withdrawal`;
    const newMovementHTML = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    }: ${type}</div>
    <div class="movements__value">${amount} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", newMovementHTML);
  });
};

// Function to create usernames for accounts
const createUsernames = function (accs) {
  accs.forEach(function (account) {
    account.username = account.owner
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  });
};

createUsernames(accounts);

// Function to display account balance
const displayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};

// Function to calculate and display account summary
const calcAccountSummary = function (account) {
  const movements = account.movements;
  // IN
  const income = movements
    .filter((move) => move > 0)
    .reduce((acc, sum) => acc + sum, 0);
  labelSumIn.textContent = `${income}€`;
  // OUT
  const spending = Math.abs(
    movements.filter((move) => move < 0).reduce((acc, sum) => acc + sum, 0)
  );
  labelSumOut.textContent = `${spending}€`;
  // INTEREST
  const interest = movements
    .filter((move) => move > 0)
    .map((amount) => (amount * account.interestRate) / 100)
    .filter((value, i, arr) => value > 1)
    .reduce((acc, sum) => acc + sum, 0)
    .toFixed(2);
  labelSumInterest.textContent = interest;
};

// Function to check login credentials
const checkLogin = function (username, pass, accounts) {
  for (const acc of accounts) {
    if (acc.username == username && acc.pin == pass) {
      return [true, acc];
    }
  }
  return [false];
};

// Login button click event handler
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const loginFeedback = checkLogin(
    inputLoginUsername.value,
    inputLoginPin.value,
    accounts
  );
  // Login Creds found
  if (loginFeedback[0]) {
    const loggedAccount = loginFeedback[1];
    labelWelcome.textContent = `Welcome Back, ${loggedAccount.owner}`;
    calcAccountSummary(loggedAccount);
    displayBalance(loggedAccount.movements);
    displayMovements(loggedAccount.movements);
    containerApp.style.opacity = 1;
  }
  // Unsuccessful login
  else {
    displayPopup("Incorrect, please try again");
    closePopup();
  }

  // Clear input
  inputLoginPin.value = inputLoginUsername.value = "";
  inputLoginPin.blur();
});

// Transferring Money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  // Identify if inputted user is a valid account
  const validTo = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  console.log(validTo);

  if (!validTo) {
    displayPopup("Please enter a valid username");
    closePopup();
  } else {
    // Identify positive amount
    const validAmount = inputTransferAmount.value > 0;
    // Process transfer
    if (validAmount) {
      validTo.movements.push(Number(inputTransferAmount.value));
    } else {
      // Invalid amount, don't process
      displayPopup("Please enter a positive amount");
      closePopup();
    }
    // Reset input fields
    inputTransferTo.value = inputTransferAmount.value = "";
  }
});

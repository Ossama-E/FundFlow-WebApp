"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

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
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const createUsernames = function (accs) {
  const createUsername = function (fullName) {
    const username = fullName
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
    return username;
  };
  accs.forEach(function (account) {
    account.username = createUsername(account.owner);
  });
};
createUsernames(accounts);

const displayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};
const calcAccountSummary = function (movements) {
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
    .map((amount) => (amount * 1.2) / 100)
    .filter((value, i, arr) => value > 1)
    .reduce((acc, sum) => acc + sum, 0)
    .toFixed(2);
  labelSumInterest.textContent = interest;
};

const checkLogin = function (username, pass, accounts) {
  for (const acc of accounts) {
    if (acc.username == username && acc.pin == pass) {
      const data = [true, acc];
      return data;
    }
  }
  return false;
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const loginFeedback = checkLogin(
    inputLoginUsername.value,
    inputLoginPin.value,
    accounts
  );
  if (loginFeedback[0]) {
    const loggedAccount = loginFeedback[1];
    displayBalance(loggedAccount.movements);
    displayMovements(loggedAccount.movements);
    calcAccountSummary(loggedAccount.movements);
    containerApp.style.opacity = 1;
  }
});

/////////////////////////////////////////////////

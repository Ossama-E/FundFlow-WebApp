/////////////////////////////////////////////////
"use strict";

// BANKIST APP

// Account data
const account1 = {
  owner: "Java Script",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account2 = {
  owner: "Lionel Messi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};
const account3 = {
  owner: "Alphonso Davies",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account4 = {
  owner: "Mo Salah",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account5 = {
  owner: "Test Case",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
};

const account6 = {
  owner: "Ossama Elhelali",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account7 = {
  owner: "Lionel Messi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
// HTML element selectors
const accounts = [account1, account2, account3, account4, account5, account6];

// HTML element selectors
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

let loggedAccount;
let sort = false;

// Currency mapping
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// // Temporary login
// loggedAccount = account1;
// updateAccount(loggedAccount);
// containerApp.style.opacity = 100;

let currDate = new Date();
let min = `${currDate.getMinutes()}`.padStart(2, 0);
let hour = currDate.getHours();
let day = `${currDate.getDate()}`.padStart(2, 0);
let month = `${currDate.getMonth() + 1}`.padStart(2, 0);
let year = currDate.getFullYear();

let dateDisplay = `${day}/${month}/${year}, ${hour}:${min}`;
labelDate.textContent = dateDisplay;

// Popup management
function displayPopup(message) {
  // const popup = document.querySelector(".popup");
  popup.textContent = message;
  popup.style.display = "block";
  popup.classList.add("popup-enter");

  // Remove the 'popup-enter' class after the animation ends
  setTimeout(() => {
    popup.classList.remove("popup-enter");
  }, 1500); // Animation duration

  // Close the popup after a delay
  setTimeout(closePopup, 1000); // Adjust this value to change the delay
  closePopup();
}
function closePopup() {
  // const popup = document.querySelector(".popup");
  popup.classList.add("popup-exit");

  // Remove the 'popup-exit' class and hide the popup after the animation ends
  setTimeout(() => {
    popup.classList.remove("popup-exit");
    popup.style.display = "none";
  }, 3500); // Animation duration
}

// Account display management
function displayMovements(account, sorted = false) {
  containerMovements.innerHTML = "";
  const movsToUse = sorted
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movsToUse.forEach(function (amount, index) {
    let currDate = new Date(account.movementsDates[index]);
    let day = `${currDate.getDate()}`.padStart(2, "0");
    let month = `${currDate.getMonth() + 1}`.padStart(2, "0");
    let year = currDate.getFullYear();

    let recordDate = `${day}/${month}/${year}`;

    const type = amount > 0 ? "deposit" : "withdrawal";
    const newMovementHTML = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    }: ${type}</div>
    <div class="movements__date">${recordDate}</div>
    <div class="movements__value">${amount.toFixed(2)} €</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", newMovementHTML);
  });
}

function displayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
}
function calcAccountSummary(account) {
  const movements = account.movements;
  // IN
  const income = movements
    .filter((move) => move > 0)
    .reduce((acc, sum) => acc + sum, 0);
  console.log(income);
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
}
function updateAccount(account, sort = false) {
  calcAccountSummary(account);
  displayBalance(account);
  sort ? displayMovements(account, true) : displayMovements(account);
  alternateColor();
}
function alternateColor() {
  document.querySelectorAll(".movements__row").forEach(function (row, index) {
    console.log("testts");
    if (index % 2 === 0) {
      row.style.backgroundColor = "#f9f6e8";
    }
  });
}

// Account logic
function createUsernames(accs) {
  accs.forEach(function (account) {
    account.username = account.owner
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  });
}
function checkLogin(username, pass, accounts) {
  for (const acc of accounts) {
    if (acc.username == username && acc.pin == pass) {
      return [true, acc];
    }
  }
  return [false];
}

// Event handlers
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  const loginFeedback = checkLogin(
    inputLoginUsername.value,
    inputLoginPin.value,
    accounts
  );
  // Login Creds found
  if (loginFeedback[0]) {
    loggedAccount = loginFeedback[1];
    labelWelcome.textContent = `Welcome Back, ${loggedAccount.owner}`;
    updateAccount(loggedAccount);
    alternateColor();
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

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  // Identify if inputted user is a valid account
  const validTo = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  // Check validity of username
  if (!validTo) {
    displayPopup("Please enter a valid username");
    closePopup();
  } else {
    // Username is valid, continue

    // Validate a positive amount
    const validAmount = inputTransferAmount.value > 0;

    if (validAmount) {
      // Check if the account holder has enough money
      if (loggedAccount.balance >= +inputTransferAmount.value) {
        // Process the transfer on both ends
        loggedAccount.movements.push(-Number(inputTransferAmount.value));
        validTo.movements.push(+inputTransferAmount.value);

        // Display completion
        displayPopup("Transfer Completed!");
        closePopup();
        // Add transfer date
        loggedAccount.movementsDates.push(new Date().toISOString());
        validTo.movementsDates.push(new Date().toISOString());
        // Update the interface
        updateAccount(loggedAccount);
      } else {
        // User doesn't have enough money
        displayPopup(
          "You currently don't have enough funds to complete the transfer"
        );
        closePopup();
      }
    } else {
      // Invalid amount, don't process
      displayPopup("Please enter a positive amount");
      closePopup();
    }
    // Reset input fields
    inputTransferTo.value = inputTransferAmount.value = "";
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputClosePin.value != loggedAccount.pin ||
    inputCloseUsername.value != loggedAccount.username
  ) {
    displayPopup("Please enter a valid username/password");
    closePopup();
  } else {
    const indexToClose = accounts.findIndex(
      (acc) => acc.username === loggedAccount.username
    );
    // Delete Account
    accounts.splice(indexToClose, 1);

    // Reset welcome message
    labelWelcome.textContent = `Login to get started`;

    // Hide elements and data
    containerApp.style.opacity = "0";

    // Reset input fields
    inputClosePin.value = inputCloseUsername.value = "";

    displayPopup("Account Deleted!");
    closePopup();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (+loanAmount <= 0) {
    displayPopup("Please enter a valid amount");
    closePopup();
    inputLoanAmount.value = "";
  } else if (
    loggedAccount.movements.some((deposit) => deposit >= loanAmount * 0.1)
  ) {
    displayPopup("Loan Successfully Deposited");
    closePopup();
    loggedAccount.movementsDates.push(new Date().toISOString());
    loggedAccount.movements.push(loanAmount);
    updateAccount(loggedAccount);
  } else {
    displayPopup(`You don't qualify for this amount`);
    closePopup();
  }
  inputLoanAmount.value = "";
});

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sort = !sort;
  updateAccount(loggedAccount, sort);
});

// Initial operations
createUsernames(accounts);

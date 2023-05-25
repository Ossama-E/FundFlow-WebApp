/////////////////////////////////////////////////
"use strict";

// BANKIST APP

// Account data
const account1 = {
  owner: "Java Script",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  locale: "en-US",
  currency: "USD",
};

const account2 = {
  owner: "Lionel Messi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  currency: "GBP",
  locale: "en-GB",
};

const account3 = {
  owner: "Alphonso Davies",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  currency: "CAD",
  locale: "en-CA",
};

const account4 = {
  owner: "Mo Salah",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: "EGP",
  locale: "ar-EG",
};

const account5 = {
  owner: "Test Case",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 3333,
  currency: "JPY",
  locale: "ja-JP",
};

const account6 = {
  owner: "Ossama Elhelali",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  currency: "EUR",
  locale: "pt-PT",
};

const account7 = {
  owner: "Lionel Messi",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  currency: "AUD",
  locale: "en-AU",
};

// HTML element selectors
const accounts = [account1, account2, account3, account4, account5, account6];
const getRandomDateInLast15Days = () => {
  let date = new Date();
  let daysAgo = Math.floor(Math.random() * 16); // random number between 0 and 19
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

accounts.forEach((account) => {
  account.movementsDates = account.movements.map(() =>
    getRandomDateInLast15Days()
  );
});

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

// Function to calculate days between two dates
// const calcDaysPassed = (date1, date2) =>
//   Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

// Function to return different date formats
function movDate(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // Otherwise, display date
  return new Intl.DateTimeFormat(loggedAccount.locale).format(date);
}

let currDate = new Date();

let dateDisplay = movDate(currDate, true);
const options = {
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "short",
};
const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(
  currDate
);

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
    let currDateMov = new Date(account.movementsDates[index]);
    const daysPassed = movDate(currDateMov, false, true);
    const type = amount > 0 ? "deposit" : "withdrawal";
    const amountFormatted = new Intl.NumberFormat(account.locale, {
      style: "currency",
      currency: account.currency,
    }).format(amount);
    const newMovementHTML = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    }: ${type}</div>
    <div class="movements__date">${daysPassed}</div>
    <div class="movements__value">${amountFormatted}</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", newMovementHTML);
  });
}

function displayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = formatAmount(account.balance, account);
}

//
function formatAmount(amount, account) {
  let amountFormatted = new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(amount);
  return amountFormatted;
}

//
function startTimer(duration) {
  setInterval(function () {
    let min = String(Math.floor(duration / 60)).padStart(2, 0);
    let sec = String(Math.floor(duration % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    --duration;
    // console.log("hi");
  }, 1000);

  setTimeout(function () {
    // Reset welcome message
    labelWelcome.textContent = `Login to get started`;

    // Hide elements and data
    containerApp.style.opacity = "0";

    // Reset input fields
    inputClosePin.value = inputCloseUsername.value = "";

    displayPopup("You've been logged out!");
    closePopup();
  }, (duration + 1) * 1000);
}
function calcAccountSummary(account) {
  const movements = account.movements;
  // IN
  const income = movements
    .filter((move) => move > 0)
    .reduce((acc, sum) => acc + sum, 0);

  labelSumIn.textContent = formatAmount(income, account);
  // OUT

  const spending = Math.abs(
    movements.filter((move) => move < 0).reduce((acc, sum) => acc + sum, 0)
  ).toFixed(2);

  labelSumOut.textContent = formatAmount(spending, account);

  // INTEREST
  const interest = movements
    .filter((move) => move > 0)
    .map((amount) => (amount * account.interestRate) / 100)
    .filter((value, i, arr) => value > 1)
    .reduce((acc, sum) => acc + sum, 0)
    .toFixed(2);

  labelSumInterest.textContent = formatAmount(interest, account);
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
    startTimer(300);
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

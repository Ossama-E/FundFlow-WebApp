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

const accounts = [
  account1,
  account2,
  account3,
  account4,
  account5,
  account6,
  account7,
];

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

// Initialzing Processes:
// 1- Generate Random Transaction Dates for each account
accounts.forEach((account) => {
  account.movementsDates = account.movements.map(() =>
    getRandomDateInLast15Days()
  );
});

// 2- Currency mapping
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const options = {
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "short",
};

let currDate = new Date();

const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(
  currDate
);

// Displaying Date with the locale profile
let dateDisplay = movDate(currDate, true);

createUsernames(accounts);

// Helper Functions

// Dates Helper Functions:

// 1- Function to return different date formats
function movDate(date, locale) {
  console.log(date);
  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  if (!isValidDate(date)) {
    return "Invalid Date"; // Return a default value for invalid dates
  }

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // Otherwise, display date
  return new Intl.DateTimeFormat(loggedAccount.locale).format(date);
}

// 2- Generating random date within last 15 days and keep it as a Date object
function getRandomDateInLast15Days() {
  let date = new Date();
  let daysAgo = Math.floor(Math.random() * 16); // random number between 0 and 19
  date.setDate(date.getDate() - daysAgo);
  return date; // Removed conversion to string with toISOString()
}

// Pop-ups helper functions
// 1- Displaying a pop-up with a message
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
// 2- Closing the pop-up
function closePopup() {
  // const popup = document.querySelector(".popup");
  popup.classList.add("popup-exit");

  // Remove the 'popup-exit' class and hide the popup after the animation ends
  setTimeout(() => {
    popup.classList.remove("popup-exit");
    popup.style.display = "none";
  }, 3500); // Animation duration
}

// Account Helper Functions
// 1- Account display management
function displayMovements(account, sorted = false) {
  containerMovements.innerHTML = "";
  const movsToUse = sorted
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movsToUse.forEach(function (amount, index) {
    const currDateMov = account.movementsDates[index]; // Retrieve the Date object directly
    const daysPassed = movDate(currDateMov); // Pass the Date object to movDate function
    const type = amount > 0 ? "deposit" : "withdrawal";
    const amountFormatted = formatAmount(amount, account); // Format the amount using the account's locale

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

// 2- Displaying balance on UI
function displayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = formatAmount(account.balance, account);
}

// 3- Formatting amounts/numbers based on the accounts currency and locale
function formatAmount(amount, account) {
  let amountFormatted = new Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(amount);
  return amountFormatted;
}

// 4- Calculating Account's In, Out, and Interest
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

// 5- Collective function to refactor process of updating an account
function updateAccount(account, sort = false) {
  calcAccountSummary(account);
  displayBalance(account);
  sort ? displayMovements(account, true) : displayMovements(account);
  alternateColor();
}

// 6- Makeing usernames out of owner names
function createUsernames(accs) {
  accs.forEach(function (account) {
    account.username = account.owner
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  });
}

// 7- Validating login creds
function checkLogin(username, pass, accounts) {
  for (const acc of accounts) {
    if (acc.username == username && acc.pin == pass) {
      return [true, acc];
    }
  }
  return [false];
}

// UI Helpers
// 1- Timer for logging out
function startTimer(duration) {
  let remaining = duration;

  const timerId = setInterval(function () {
    let min = String(Math.floor(remaining / 60)).padStart(2, 0);
    let sec = String(Math.floor(remaining % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    --remaining;

    if (remaining < 0) {
      clearInterval(timerId); // Clears the interval
    }
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

// 2- Alternating the rows' colours based on indices
function alternateColor() {
  document.querySelectorAll(".movements__row").forEach(function (row, index) {
    if (index % 2 === 0) {
      row.style.backgroundColor = "#f9f6e8";
    }
  });
}

// Event handlers

// 1- Login Event Handler
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

// 2- Transferring Money Event Handler
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
        loggedAccount.movementsDates.push(new Date());
        validTo.movementsDates.push(new Date());
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

// 3- Deleting an Account Event Handler
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

// 4- Requesting a Loan Event Handler
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
    loggedAccount.movementsDates.push(new Date());
    loggedAccount.movements.push(loanAmount);
    updateAccount(loggedAccount);
  } else {
    displayPopup(`You don't qualify for this amount`);
    closePopup();
  }
  inputLoanAmount.value = "";
});

// 5- Sorting Transactions Event Handler
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  sort = !sort;
  updateAccount(loggedAccount, sort);
});

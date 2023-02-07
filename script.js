'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  //hena bems7 aly kan mktob gwa al html asln
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      i + 1
    }  ${type}</div>
    <div class="movements__value">${mov}&#8364</div>
  </div>`;
    // hena be5alena n7ot al resultdah m3 al html text gwa al app fo2 aly kan mktob bs gwa al parent movements
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsername = function (accounts) {
  accounts.forEach(function (accounts) {
    accounts.username = accounts.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};
createUsername(accounts);
//event listeners
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display ui welcome message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner
      .split(' ')
      .slice(0, 1)}`;
    containerApp.style.opacity = '100%';
    //display movements
    //display balance
    //display summary
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount);
    Displayall(currentAccount);
  }
});

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
  // console.log(balance);
};

const Displayall = function (acc) {
  const sumofincome = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${sumofincome}Euro`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}Euro`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}Euro`;
};

Displayall(account1);
btnTransfer.addEventListener('click', function (e) {
  //to prevent it from reloading again
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieveraccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount <= currentAccount.balance &&
    recieveraccount?.username &&
    amount > 0 &&
    recieveraccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieveraccount.balance.push(+amount);
    calcPrintBalance(account2.movements);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    currentAccount.movements.some(mov => mov > 0) &&
    currentAccount.movements.some(mov => mov > 0.1 * loanAmount) &&
    loanAmount > 0
  ) {
    currentAccount.movements.push(+loanAmount);
    displayMovements(currentAccount.movements);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const account = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (pin === currentAccount.pin && account === currentAccount.username) {
    const closeaccount = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(closeaccount);
    accounts.splice(closeaccount, 1);
    containerApp.style.opacity = 0;
    inputClosePin.value = '';
    inputCloseUsername.value = '';
  }
  console.log(accounts);
});

// for (const user of username) {
//   const initials = user.slice(0, 1);
//   // console.log(initials);
//   const users = userarray.push(initials);
//   const userjoin = userarray.join('');
//   console.log(userjoin);
// }

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

const arr = ['a', 'b', 'd', 'f', 'e'];
const fol = arr.splice(-2);

console.log(fol);
console.log(arr);

const fol2 = arr.splice(-2);
console.log(fol2);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`you depositied ${movement}`);
  } else {
    console.log(`you withdraw ${Math.abs(movement)}`);
  }
}

movements.forEach(function (movements, i, arr) {
  console.log(`movement no ${i + 1} : ${Math.abs(movements)}${arr}`);
});

const eurotodollars = 1.1;
let arro = [];
const mapping = movements.map((mov, i) => parseInt(mov * eurotodollars));
console.log(mapping);
for (const mov of movements) {
  const back = mov * 1.1;
  console.log(Math.abs(parseInt(back)));
  arro.push(mov);
}
console.log(arro);

const maper = movements.map((mov, i, arr) => {
  return ` Movemnt ${i + 1}:${mov > 2 ? 'deposited' : 'withdraw'} ${Math.abs(
    mov
  )} `;
});
console.log(maper);

const deposits = movements.filter(function (movements) {
  return movements > 0;
});
console.log(deposits);

const withdraw = movements.filter(movs => movs < 0);
console.log(withdraw);

const withD = [];
for (const movs of movements) {
  if (movs < 0) withD.push(movs);
}
console.log(withD);

const movie = movements.reduce(function (movs) {
  return movs + 120;
});
console.log(movie);
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

const maxvalue = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7],
// Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const checkDogs = function (dogsjulia, dogskate) {
  const Julia = dogsjulia.slice(1, -2);

  const joined = [...Julia, ...dogskate];
  console.log(joined);

  joined.forEach(function (dogs, i) {
    const age = dogs > '3' ? 'adult' : 'Puppy';
    console.log(`Dog number ${i + 1} is a ${age} and is ${dogs} years old`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const dogage = [5, 2, 4, 1, 15, 8, 3];
const humanage1 = [];

const dogs = [5, 2, 4, 1, 15, 8, 3];

// const calcAverage = function (dogage) {
//   const humanage = dogage.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanage);
//   const adults = humanage.filter(age => age >= 18);
//   console.log(adults);
//   const average = adults.reduce(function (acc, curr) {
//     return acc + curr / adults.length;
//   }, 0);
//   console.log(average);
// };
// calcAverage([5, 2, 4, 1, 15, 8, 3]);

// const dogy = dogage.map(function (age) {
//   if (age <= 2) {
//     console.log(`humanage= ${2 * age}`);
//   } else if (age > 2) {
//     console.log(`humanage = ${16 + age * 4}`);
//   }
// });

const calcAverage = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverage([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1);

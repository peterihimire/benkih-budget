// variables
const navbarBtn = document.querySelector(".navbar-btn");
const navbarLinks = document.querySelector(".navbar-links");

const budgetFeedback = document.querySelector(".budget-feedback");
const expenseFeedback = document.querySelector(".expense-feedback");

const budgetAmount = document.querySelector("#bud-amt");
const budgetSubmit = document.querySelector("#budget-submit");

const budgetDisplay = document.querySelector("#bud-display");
const expenseDisplay = document.querySelector("#exp-display");
const balanceDisplay = document.querySelector("#bal-display");

const expenseName = document.querySelector("#exp-name");
const expenseAmt = document.querySelector("#exp-amt");
const expenseSubmit = document.querySelector("#expense-submit");

const expenseBox = document.querySelector("#expense-box");
const expenseBoxList = document.querySelector(".exp-list");

let itemList = [];
let itemID = 0;

// navbar event listener
navbarBtn.addEventListener("click", () => {
  let value = navbarLinks.classList.contains("navbar-collapse");

  if (value) {
    navbarLinks.classList.remove("navbar-collapse");
    navbarBtn.classList.remove("change");
  } else {
    navbarLinks.classList.add("navbar-collapse");
    navbarBtn.classList.add("change");
  }
});

//submit expense form
const submitBudgetForm = () => {
  const budgetValue = budgetAmount.value;

  if (budgetValue === "" || budgetValue < 0) {
    budgetFeedback.innerHTML = `
      <p>Value cannot be empty or negative<p/>
    `;
    budgetFeedback.classList.add("error");

    setTimeout(() => {
      budgetFeedback.remove();
    }, 3000);
  } else {
    budgetDisplay.textContent = budgetValue;
    budgetAmount.value = "";
    showBalance();
  }
  console.log(budgetValue);
};

//show balance function
const showBalance = () => {
  const expense = totalExpense();
  const balance = parseInt(budgetDisplay.textContent) - expense;
  balanceDisplay.textContent = balance;
  console.log(expense);
  console.log(balance);
};

//submit expense form
const submitExpenseForm = () => {
  const expenseTitle = expenseName.value;
  const expenseValue = expenseAmt.value;

  if (expenseValue === "" || expenseValue < 0 || expenseTitle === "") {
    expenseFeedback.innerHTML = `<p>Value cannot be empty or negative<p/>`;
    expenseFeedback.classList.add("error");

    setTimeout(() => {
      expenseFeedback.remove();
    }, 3000);
  } else {
    let amount = parseInt(expenseValue);
    expenseName.value = "";
    expenseAmt.value = "";
    console.log(amount);

    let expense = {
      id: itemID,
      title: expenseTitle,
      amount: amount
    };

    itemID++;
    itemList.push(expense);
    addExpense(expense);
    showBalance();
  }
};

//add individual expense
const addExpense = expense => {
  const div = document.createElement("div");
  div.classList.add("expense");
  div.innerHTML = `

      <p>- <span id="exp-title">${expense.title}</span></p>

      <div class="center-amt">
        <p>$ <span id="exp-value">${expense.amount}</span></p>
      </div>
      
      <div class="expense-edit">
        <div class="icon" id="icon-edit" data-id=${expense.id} >
          <i class="fas fa-edit" id="edit"></i>
        </div>
        <div class="icon" id="icon-trash"  data-id= ${expense.id} >
          <i class="fas fa-trash" id="trash"></i>
        </div>
      </div>

  `;
  expenseBox.appendChild(div);
};

//total expense
const totalExpense = () => {
  let total = 0;
  if (itemList.length > 0) {
    total = itemList.reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0);
  }
  expenseDisplay.textContent = total;
  return total;
};

//edit expense
const editExpense = element => {
  let id = parseInt(element.parentElement.dataset.id);
  let singleItem = element.parentElement.parentElement.parentElement;
  expenseBox.removeChild(singleItem);
  let singleExpense = itemList.filter(item => item.id === id);
  expenseName.value = singleExpense[0].title;
  expenseAmt.value = singleExpense[0].amount;
  let tempList = itemList.filter(item => item.id !== id);
  itemList = tempList;
  showBalance();
};

//delete expense
const deleteExpense = element => {
  let id = parseInt(element.parentElement.dataset.id);
  let singleItem = element.parentElement.parentElement.parentElement;
  expenseBox.removeChild(singleItem);
  let tempList = itemList.filter(item => item.id !== id);
  itemList = tempList;
  showBalance();
};

document.addEventListener("DOMContentLoaded", () => {
  //budget submit button
  budgetSubmit.addEventListener("click", e => {
    e.preventDefault();
    submitBudgetForm();
  });

  //expense submit button
  expenseSubmit.addEventListener("click", e => {
    e.preventDefault();
    submitExpenseForm();
  });

  //expense box eventListener
  expenseBox.addEventListener("click", e => {
    console.log(e.target);
    if (e.target.classList.contains("fa-edit")) {
      editExpense(e.target);
      console.log("youve hit the edit icon");
    } else if (e.target.classList.contains("fa-trash")) {
      deleteExpense(e.target);
      console.log("Youve hit the delete icon");
    }
  });
});

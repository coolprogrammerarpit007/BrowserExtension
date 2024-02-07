`use strict`;
// chrome://extensions/

// challenge

// const container = document.getElementById(`container`);

// function buy() {
//   container.innerHTML += `<p>` + `Thankyou for Buying.` + `</p>`;
// }
// container.innerHTML = `<button onclick="buy()">Buy</button>`;

// challenge

// localStorage.setItem(`buying`, `amazon.com`);
// console.log(localStorage.getItem(`buying`));
// localStorage.clear();

// let myLeads1 = '["www.amazon.com"]';
// console.log(typeof myLeads1, myLeads1);
// let myLeads2 = JSON.parse(myLeads1);
// myLeads2.push(`www.google.com`);
// console.log(myLeads2, typeof myLeads2);
// console.log(typeof JSON.stringify(myLeads2));
let myLeads = [];
const inputEl = document.getElementById(`input-el`);
const saveInputBtn = document.getElementById(`input-btn`);
const delBtn = document.getElementById(`del-btn`);
const tabBtn = document.getElementById(`save-btn`);
const ulEl = document.getElementById(`ul-el`);

// Parse from the local storage

const leadsFromLocalStorage = JSON.parse(localStorage.getItem(`myLeads`));
// console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = ``;
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`;
  }
  ulEl.innerHTML = listItems;
}

// functions

function saveInput() {
  myLeads.push(inputEl.value);
  inputEl.value = ``;
  localStorage.setItem(`myLeads`, JSON.stringify(myLeads));
  render(myLeads);
  console.log(localStorage.getItem(`myLeads`));
}

function saveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem(`myLeads`, JSON.stringify(myLeads));
    render(myLeads);
  });
}

function deleteLeadTrack() {
  localStorage.clear();
  myLeads.length = 0;
  render(myLeads);
}

// Event Listeners
delBtn.addEventListener(`dblclick`, deleteLeadTrack);

tabBtn.addEventListener(`click`, saveTab);

saveInputBtn.addEventListener(`click`, saveInput);

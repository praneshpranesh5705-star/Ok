const form = document.querySelector('#transaction-form');
const list = document.querySelector('#transaction-list');
const emptyState = document.querySelector('#empty-state');
const message = document.querySelector('#message');
const balanceEl = document.querySelector('#balance');
const incomeEl = document.querySelector('#income');
const expensesEl = document.querySelector('#expenses');
const countEl = document.querySelector('#count');
const clearAll = document.querySelector('#clear-all');

let transactions = JSON.parse(localStorage.getItem('expense-tracker-transactions') || '[]');
const money = value => `₹${value.toFixed(2)}`;

function save() { localStorage.setItem('expense-tracker-transactions', JSON.stringify(transactions)); }
function render() {
  list.innerHTML = '';
  emptyState.hidden = transactions.length > 0;
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  balanceEl.textContent = money(income - expenses);
  incomeEl.textContent = money(income);
  expensesEl.textContent = money(expenses);
  countEl.textContent = transactions.length;
  transactions.forEach(t => {
    const item = document.createElement('article');
    item.className = 'transaction';
    item.innerHTML = `<div><div class="transaction-title"></div><div class="transaction-meta">${t.type === 'income' ? 'Income' : 'Expense'} · ${t.date}</div></div><div class="transaction-amount ${t.type}">${t.type === 'income' ? '+' : '-'}${money(t.amount)}</div>`;
    item.querySelector('.transaction-title').textContent = t.title;
    list.appendChild(item);
  });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const amount = Number(document.querySelector('#amount').value);
  const type = document.querySelector('#type').value;
  if (!title || !amount || amount <= 0) return;
  transactions.unshift({ title, amount, type, date: new Date().toLocaleDateString() });
  save(); render(); form.reset(); message.textContent = 'Transaction added successfully.';
  setTimeout(() => { message.textContent = ''; }, 2200);
});
clearAll.addEventListener('click', () => { if (transactions.length && confirm('Delete all transactions?')) { transactions = []; save(); render(); } });
render();

let transactions = [];

const handleFormSubmit = (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && amount) {
        const transaction = {
            id: Date.now(),
            description,
            amount: type === 'income' ? amount : -amount
        };

        transactions.push(transaction);
        updateTransactions();
        updateTotals();
        saveTransactions();
    }

    e.target.reset();
};

const updateTransactions = () => {
    const transactionList = document.getElementById('transactions');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>$${Math.abs(transaction.amount).toFixed(2)}</span>
        `;
        transactionList.appendChild(li);
    });
};

const updateTotals = () => {
    const totalIncome = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);
    
    const totalExpense = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const balance = totalIncome - totalExpense;

    document.getElementById('total-income').innerText = totalIncome.toFixed(2);
    document.getElementById('total-expense').innerText = totalExpense.toFixed(2);
    document.getElementById('balance').innerText = balance.toFixed(2);
};

const saveTransactions = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

const loadTransactions = () => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
        updateTransactions();
        updateTotals();
    }
};

// Load transactions when page loads
loadTransactions();

// Add event listener to form submit
document.getElementById('transaction-form').addEventListener('submit', handleFormSubmit);

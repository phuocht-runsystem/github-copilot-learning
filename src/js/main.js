document.addEventListener('DOMContentLoaded', () => {
    // Fetch monthly data from backend and update inputs
    fetch('http://localhost:3010/monthly-data')
        .then(response => response.json())
        .then(data => {
            const months = [
                'january', 'february', 'march', 'april', 'may', 'june',
                'july', 'august', 'september', 'october', 'november', 'december'
            ];
            data.income.forEach((value, i) => {
                const incomeInput = document.querySelector(`input[name="${months[i]}-income"]`);
                if (incomeInput) incomeInput.value = value;
            });
            data.expenses.forEach((value, i) => {
                const expensesInput = document.querySelector(`input[name="${months[i]}-expenses"]`);
                if (expensesInput) expensesInput.value = value;
            });
        });
    const chartTab = document.getElementById('chart-tab');
    let chartInitialized = false;
    let barChart;

    // An array of 20 dog breeds, with the following properties: id, breed_name, breed_temperament.
    const dogBreeds = [
        { id: 1, breed_name: 'Labrador Retriever', breed_temperament: 'Friendly' },
        { id: 2, breed_name: 'German Shepherd', breed_temperament: 'Intelligent' },
        { id: 3, breed_name: 'Golden Retriever', breed_temperament: 'Friendly' },
        { id: 4, breed_name: 'Bulldog', breed_temperament: 'Docile' },
        { id: 5, breed_name: 'Beagle', breed_temperament: 'Curious' },
        { id: 6, breed_name: 'Poodle', breed_temperament: 'Intelligent' },
        { id: 7, breed_name: 'Rottweiler', breed_temperament: 'Loyal' },
        { id: 8, breed_name: 'Yorkshire Terrier', breed_temperament: 'Affectionate' },
        { id: 9, breed_name: 'Dachshund', breed_temperament: 'Clever' },
        { id: 10, breed_name: 'Siberian Husky', breed_temperament: 'Energetic' },
        { id: 11, breed_name: 'Boxer', breed_temperament: 'Playful' },
        { id: 12, breed_name: 'Shih Tzu', breed_temperament: 'Affectionate' },
        { id: 13, breed_name: 'Doberman Pinscher', breed_temperament: 'Loyal' },
        { id: 14, breed_name: 'Chihuahua', breed_temperament: 'Alert' },
        { id: 15, breed_name: 'Australian Shepherd', breed_temperament: 'Intelligent' },
        { id: 16, breed_name: 'Corgi', breed_temperament: 'Friendly' },
        { id: 17, breed_name: 'Mastiff', breed_temperament: 'Gentle' },
        { id: 18, breed_name: 'Bichon Frise', breed_temperament: 'Playful' },
        { id: 19, breed_name: 'Pug', breed_temperament: 'Charming' },
        { id: 20, breed_name: 'Great Dane', breed_temperament: 'Friendly' }
    ];

    chartTab.addEventListener('shown.bs.tab', () => {
        const { income, expenses } = getMonthlyData();
        if (!chartInitialized) {
            const ctx = document.getElementById('barChart').getContext('2d');
            barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                    ],
                    datasets: [
                        {
                            label: 'Income',
                            data: income,
                            backgroundColor: 'rgba(54, 162, 235, 0.7)'
                        },
                        {
                            label: 'Expenses',
                            data: expenses,
                            backgroundColor: 'rgba(255, 99, 132, 0.7)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            chartInitialized = true;
        } else {
            barChart.data.datasets[0].data = income;
            barChart.data.datasets[1].data = expenses;
            barChart.update();
        }
    });

    // Download chart as image
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const canvas = document.getElementById('barChart');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'chart.png';
        link.click();
    });

    // Send chart via email
    document.getElementById('sendEmailBtn').addEventListener('click', async () => {
        const canvas = document.getElementById('barChart');
        const imageData = canvas.toDataURL('image/png');
        const username = document.getElementById('username').value;
        const email = prompt('Enter your email address:');
        if (!email) return;

        await fetch('http://localhost:3010/send-chart-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageData, username, email })
        });
        alert('Email sent (if backend is configured correctly).');
    });

    // Username input validation
    const usernameInput = document.getElementById('username');
    /**
     * Validates the username input against a specific pattern and updates the input's border color.
     * The username must be at least 8 characters long, contain at least one uppercase letter,
     * one digit, and one special character from !@#$%^&*~.
     * Stores the username in localStorage under the key 'username'.
     */
    function usernameInputCallback() {
        const username = usernameInput.value;
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]{8,}$/;
        usernameInput.style.borderColor = regex.test(username) ? 'green' : 'red';
        localStorage.setItem('username', username);
    }
    usernameInput.addEventListener('input', usernameInputCallback);

    // Set username from localStorage on page load
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        usernameInput.value = storedUsername;
    }
});

// Helper function
const getMonthlyData = () => {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const income = months.map(month => Number(document.querySelector(`input[name="${month}-income"]`).value) || 0);
    const expenses = months.map(month => Number(document.querySelector(`input[name="${month}-expenses"]`).value) || 0);
    return { income, expenses };
};

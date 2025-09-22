document.addEventListener('DOMContentLoaded', () => {
    const chartTab = document.getElementById('chart-tab');
    let chartInitialized = false;
    let barChart;

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
    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value;
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*~])[A-Za-z\d!@#$%^&*~]{8,}$/;
        usernameInput.style.borderColor = regex.test(username) ? 'green' : 'red';
        localStorage.setItem('username', username);
    });

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

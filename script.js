document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('profitChart').getContext('2d');
    var profitChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['パターン1', 'パターン2'],
            datasets: [{
                label: '利益額',
                data: [0, 0],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function calculateProfit(price, profitMargin, salesVolume) {
        price = parseFloat(price) || 0;
        profitMargin = parseFloat(profitMargin) || 0;
        salesVolume = parseFloat(salesVolume) || 0;
        return (price * (profitMargin / 100) * salesVolume).toFixed(2);
    }

    function updateProfit(patternId) {
        var price = document.getElementById('price' + patternId).value;
        var profitMargin = document.getElementById('profitMargin' + patternId).value;
        var salesVolume = document.getElementById('salesVolume' + patternId).value;
        var profit = calculateProfit(price, profitMargin, salesVolume);
        document.getElementById('profit' + patternId).textContent = profit;
        updateComparison();
    }

    function updateComparison() {
        var profit1 = parseFloat(document.getElementById('profit1').textContent);
        var profit2 = parseFloat(document.getElementById('profit2').textContent);
        document.getElementById('compareProfit1').textContent = profit1.toFixed(2);
        document.getElementById('compareProfit2').textContent = profit2.toFixed(2);
        document.getElementById('profitDifference').textContent = (profit2 - profit1).toFixed(2);

        // グラフの更新
        profitChart.data.datasets[0].data = [profit1, profit2];
        profitChart.update();
    }

    var inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var patternId = this.id.slice(-1);
            updateProfit(patternId);
        });
    });
});

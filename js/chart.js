$(document).ready(function () {
    setChartCasesByAge();
    setCharDiagByGender();
});

let colorsBase = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"]

function setCharDiagByGender() {
    let maleDiagnosis = [];
    let femaleDiagnosis = [];

    $.ajax({
        url: "https://fiapdiagnosisapi.azurewebsites.net/api/analytics/GetDiagnosisByGender",
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                if (res[i].gender === "Male") {
                    maleDiagnosis.push(res[i]);
                } else {
                    femaleDiagnosis.push(res[i]);
                }
            }

            setChartDiagMale(maleDiagnosis);
            setChartDiagFemale(femaleDiagnosis);
        }
    });
};

function setChartDiagMale(data) {
    let labels = [];
    let values = [];
    let colors = [];

    let max = data.length > 10 ? 10: data.length;    

    for (let i = 0; i < max; i++) {
        labels.push(data[i].profNameTranslated);
        values.push(data[i].cases);
        colors.push(colorsBase[i])
    }

    new Chart(document.getElementById("pie-chart-malediag"), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: "Maior número de diagnósticos masculinos.",
                backgroundColor: colors,
                data: values
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Maior número de diagnósticos masculinos.'
            }
        }
    });
};

function setChartDiagFemale(data) {
    let labels = [];
    let values = [];
    let colors = [];

    let max = data.length > 10 ? 10: data.length;    

    for (let i = 0; i < max; i++) {
        labels.push(data[i].profNameTranslated);
        values.push(data[i].cases);
        colors.push(colorsBase[i])
    }

    new Chart(document.getElementById("pie-chart-femalediag"), {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: "Maior número de diagnósticos femininos.",
                backgroundColor: colors,
                data: values
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Maior número de diagnósticos femininos.'
            }
        }
    });

};

function setChartCasesByAge() {
    let casesByAgeLabel = [];
    let casesByAgeNumbers = [];

    $.ajax({
        url: "https://fiapdiagnosisapi.azurewebsites.net/api/analytics/GetCasesByAge",
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                casesByAgeLabel.push(res[i].age + ' anos');
                casesByAgeNumbers.push(res[i].cases);
            }

            new Chart(document.getElementById("bar-chart-casesbyage"), {
                type: 'bar',
                data: {
                    labels: casesByAgeLabel,
                    datasets: [{
                        data: casesByAgeNumbers,
                        label: "Casos",
                        borderColor: "#8e5ea2",
                        fill: false,
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"]
                    }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Casos por idade'
                    }
                }
            });
        }
    });
}

function randomNumber() {
    return Math.floor(Math.random() * 5);
}
var storedSelectedNumbers = localStorage.getItem("selectedNumbers");
var selectedNumbers = storedSelectedNumbers ? JSON.parse(storedSelectedNumbers) : [];


function getNumbers() {

    let min = document.getElementById("startNumber").value;
    let max = document.getElementById("endNumber").value;
    if (min != "" && max != "null") {
        var randomNums = getRandomNumbers(min, max);
        generateTable(randomNums);

    } else {
        alert("Please Enter Numbers");
    }

}

function getRandomNumbers(min, max) {
    var numbers = [];
    for (var i = 0; i < 50; i++) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        numbers.push(randomNumber);
    }
    return numbers;
}

function generateTable(numbers) {
    var table = document.createElement("table");
    var numRows = Math.ceil(numbers.length / 10);

    for (var i = 0; i < numRows; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j < 10; j++) {
            var index = i * 10 + j;

            if (index < numbers.length) {
                var cell = document.createElement("td");
                var number = numbers[index];

                cell.addEventListener("click", function () {
                    if (this.classList.contains("selected")) {
                        this.classList.remove("selected");
                    } else {
                        var selectedCount = document.getElementsByClassName("selected").length;
                        if (selectedCount < 1) {
                            var buttonsContainer = document.getElementById("buttonsContainer");
                            if (!buttonsContainer) {
                                buttonsContainer = document.createElement("div");
                                buttonsContainer.id = "buttonsContainer";
                                document.body.appendChild(buttonsContainer);
                            }
                            addButtons(buttonsContainer);
                        }
                        if (selectedCount < 10) {
                            this.classList.add("selected");
                        }
                    }
                    localStorage.setItem("selectedNumbers", JSON.stringify(selectedNumbers));
                });

                var cellText = document.createTextNode(number);
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else {
                var emptyCell = document.createElement("td");
                row.appendChild(emptyCell);
            }
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
}


function addButtons(container) {
    var buttonA = document.createElement("button");
    buttonA.textContent = "Add Selected Numbers";
    buttonA.addEventListener("click", function () {
        var selectedNumbers = Array.from(document.getElementsByClassName("selected")).map(function (cell) {
            return parseInt(cell.textContent);
        });

        var sum = selectedNumbers.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue;
        }, 0);

        console.log("Sum of selected numbers:", sum);
    });

    var buttonB = document.createElement("button");
    buttonB.textContent = "Multiply Selected Numbers";
    buttonB.addEventListener("click", function () {
        var selectedNumbers = Array.from(document.getElementsByClassName("selected")).map(function (cell) {
            return parseInt(cell.textContent);
        });

        var product = selectedNumbers.reduce(function (accumulator, currentValue) {
            return accumulator * currentValue;
        }, 1);

        console.log("Multification of selected numbers:", product);
    });

    container.appendChild(buttonA);
    container.appendChild(buttonB);
}



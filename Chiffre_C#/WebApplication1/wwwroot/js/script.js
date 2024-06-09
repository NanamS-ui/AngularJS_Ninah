document.addEventListener("DOMContentLoaded", function() {
    var timeLeft = 20; 
    var timerElement = document.getElementById('timer');
    var bouton1 = document.getElementById('bouton1');
    var bouton2 = document.getElementById('bouton2');
    var form1 = document.getElementById('form1');
    var form2 = document.getElementById('form2');
    var dynamicElements = document.getElementById('dynamic-elements');

    var firstClickedButton = null;

    function getTargetNumber() {
        return parseInt(angular.element(document.body).scope().targetNumber, 10);
    }

    function handleButtonClick(event) {
        event.preventDefault();
        var button = event.target;
        if (firstClickedButton === null) {
            firstClickedButton = button;
        }
        button.parentNode.removeChild(button);
    }

    bouton1.addEventListener('click', handleButtonClick);
    bouton2.addEventListener('click', handleButtonClick);

    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = seconds % 60;
        return [
            m > 9 ? m : "0" + m,
            s > 9 ? s : "0" + s
        ].join(":");
    }

    function createButton(value, container, onClick) {
        var button = document.createElement("button");
        button.textContent = value;
        button.addEventListener('click', onClick);
        container.appendChild(button);
    }

    function createNumberButtons(numbers, inputElement) {
        var numberContainer = document.createElement("div");
        numberContainer.className = "number-buttons";
        numbers.forEach(function(number) {
            createButton(number, numberContainer, function() {
                inputElement.value += number;
                numberContainer.removeChild(this);
            });
        });
        return numberContainer;
    }

    function createOperatorButtons(inputElement) {
        var operators = ['+', '-', '*', '/'];
        var operatorContainer = document.createElement("div");
        operatorContainer.className = "operator-buttons";
        operators.forEach(function(operator) {
            createButton(operator, operatorContainer, function() {
                inputElement.value += " " + operator + " ";
            });
        });
        return operatorContainer;
    }

    // Initialiser l'affichage du timer et de l'horloge
    timerElement.innerHTML = "00:" + formatTime(timeLeft);

    // Démarrer le compte à rebours
    var countdown = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.innerHTML = "00:00";
            if (form1.contains(bouton1)) form1.removeChild(bouton1);
            if (form2.contains(bouton2)) form2.removeChild(bouton2);

            var targetNb = getTargetNumber();
            var nb1 = parseInt(document.getElementById("j1").value, 10);
            var nb2 = parseInt(document.getElementById("j2").value, 10);

            var input, button;
            if (Math.abs(targetNb - nb1) > Math.abs(targetNb - nb2)) {
                input = document.createElement("input");
                input.name = "expression2";
                input.type = "text";
                form2.appendChild(input);
                button = document.createElement("input");
                button.type = "submit";
                button.value = "valider";
                button.addEventListener('click',function(event){
                    event.preventDefault();
                });
                form2.appendChild(button);
                dynamicElements.appendChild(createNumberButtons(angular.element(document.body).scope().randomNumbers, input));
                dynamicElements.appendChild(createOperatorButtons(input));
            } else if (Math.abs(targetNb - nb1) < Math.abs(targetNb - nb2)) {
                input = document.createElement("input");
                input.name = "expression1";
                input.type = "text";
                form1.appendChild(input);
                button = document.createElement("input");
                button.type = "submit";
                button.value = "valider";
                button.addEventListener('click',function(event){
                    event.preventDefault();
                });
                form1.appendChild(button);
                dynamicElements.appendChild(createNumberButtons(angular.element(document.body).scope().randomNumbers, input));
                dynamicElements.appendChild(createOperatorButtons(input));
            } else {
                if (firstClickedButton && firstClickedButton.id === 'bouton1') {
                    input = document.createElement("input");
                    input.name = "expression1";
                    input.type = "text";
                    form1.appendChild(input);
                    button = document.createElement("input");
                    button.type = "submit";
                    button.value = "valider";
                    button.addEventListener('click',function(event){
                        event.preventDefault();
                    });
                    form1.appendChild(button);
                    dynamicElements.appendChild(createNumberButtons(angular.element(document.body).scope().randomNumbers, input));
                    dynamicElements.appendChild(createOperatorButtons(input));
                } else if (firstClickedButton && firstClickedButton.id === 'bouton2') {
                    input = document.createElement("input");
                    input.name = "expression2";
                    input.type = "text";
                    form2.appendChild(input);
                    button = document.createElement("input");
                    button.type = "submit";
                    button.value = "valider";
                    button.addEventListener('click',function(event){
                        event.preventDefault();
                    });
                    form2.appendChild(button);
                    dynamicElements.appendChild(createNumberButtons(angular.element(document.body).scope().randomNumbers, input));
                    dynamicElements.appendChild(createOperatorButtons(input));
                }
            }
        } else {
            timerElement.innerHTML = "00:" + formatTime(timeLeft);
        }
        timeLeft -= 1;
    }, 1000);
});
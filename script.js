// Variables globales
const screen = document.getElementById("screen");
let memory = 0;
let isOn = false;

// Inicializar la calculadora apagada
turnOffCalculator();

// Event listeners
document.getElementById("m-plus").addEventListener("click", addToMemory);
document.getElementById("mc").addEventListener("click", clearMemory);
document.getElementById("mr").addEventListener("click", recallMemory);
document.getElementById("ce").addEventListener("click", clearScreenIfOn);
document.getElementById("on").addEventListener("click", turnOnCalculator);
document.getElementById("off").addEventListener("click", turnOffCalculator);
document.querySelectorAll(".calculator__button").forEach(button => {
    button.addEventListener("click", handleButtonClick);
});

// Functions
function clearScreenIfOn() {
    if (isOn) {
        clearScreen();
    }
}

// Encender la calculadora
function turnOnCalculator() {
    isOn = true;
    clearScreen();
    screen.classList.remove("calculator__screen--off");
    screen.textContent = "0";
}

// Apaga la calculadora
function turnOffCalculator() {
    isOn = false;
    resetCalculator();
    screen.classList.add("calculator__screen--off");
    screen.textContent = "";
}

// Limpia la pantalla
function clearScreen() {
    screen.textContent = "0";
}

// Limpia la calculadora y la memoria
function resetCalculator() {
    clearScreen();
    memory = 0;
}

// Agrega el ultimo valor guardado si no hay valor por defecto es 0
function addToMemory() {
    if (isOn) {
        memory = parseFloat(screen.textContent) || 0;
        showTemporaryMessage("M+ added");
    }
}


// Limpiar el ultimo valor guardado
function clearMemory() {
    if (isOn) {
        memory = 0;
        showTemporaryMessage("MC cleared");
    }
}

//Recuperar el ultimo valor guardado
function recallMemory() {
    if (isOn) {
        screen.textContent = memory;
        showTemporaryMessage("MR recuperated");
    }
}

function handleButtonClick(event) {
    // Si la calculadora esta apagada no se hace nada
    if (!isOn) return;

    // Obtener el valor del boton
    const value = event.target.textContent;
    if (isNumberOrDot(value)) {
        handleNumberOrDot(value);
    } else if (value === "=") {
        evaluateExpression();
    } else if (isOperator(value)) {
        handleOperator(value);
    }
}

// Manejo de valores
function isNumberOrDot(value) {
    return !isNaN(value) || value === ".";
}


function handleNumberOrDot(value) {
    if (screen.textContent === "0") {
        screen.textContent = value;
    } else {
        screen.textContent += value;
    }
}


// Manejo de operadores
function isOperator(value) {
    return ["+", "-", "x", "÷", "%"].includes(value);
}

function handleOperator(value) {
    screen.textContent += ` ${value} `;
}

function evaluateExpression() {
    try {
        // Reemplazar los operadores por operadores funcionales
        const expression = screen.textContent
            .replace(/x/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");

        // Verificar la división por cero
        if (/\/ 0(?!\d)/.test(expression)) {
            throw new Error("Division by zero");
        }

        // Evaluación segura de la expresión
        const result = new Function(`return ${expression}`)();
        screen.textContent = result;
    } catch (error) {
        handleError(error);
    }
}

// Manejo de errores
function handleError(error) {
    if (error.message === "Division by zero") {
        screen.textContent = "Division by zero";
    } else {
        screen.textContent = "Syntax error";
    }
    setTimeout(() => {
        screen.textContent = "0";
    }, 1000);
}

// Mostrar los mensajes temporales M+ MC MR
function showTemporaryMessage(message) {
    const originalText = screen.textContent;
    screen.textContent = message;
    setTimeout(() => {
        screen.textContent = originalText;
    }, 1000);
}

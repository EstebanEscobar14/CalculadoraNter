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

// Apagar la calculadora
function turnOffCalculator() {
  isOn = false;
  resetCalculator();
  screen.classList.add("calculator__screen--off");
  screen.textContent = "OFF";
}

// Limpiar la pantalla
function clearScreen() {
  screen.textContent = "0";
}

// Limpiar la calculadora y la memoria
function resetCalculator() {
  clearScreen();
  memory = 0;
}

// Agregar el último valor guardado a la memoria
function addToMemory() {
  if (isOn) {
    memory = parseFloat(screen.textContent) || 0;
    showTemporaryMessage("M+ added");
  }
}

// Limpiar la memoria
function clearMemory() {
  if (isOn) {
    memory = 0;
    showTemporaryMessage("MC cleared");
  }
}

// Recuperar el valor guardado en la memoria
function recallMemory() {
  if (isOn) {
    screen.textContent = memory;
    showTemporaryMessage("MR recuperated");
  }
}

function handleButtonClick(event) {
  // Si la calculadora está apagada no se hace nada
  if (!isOn) return;

  // Obtener el valor del botón
  const value = event.target.textContent;
  if (isNumberOrDot(value)) {
    handleNumberOrDot(value);
  } else if (value === "=") {
    evaluateExpression();
  } else if (isOperator(value)) {
    handleOperator(value);
  }
}

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

function isOperator(value) {
  return ["+", "-", "x", "÷", "%"].includes(value);
}

function handleOperator(value) {
  screen.textContent += ` ${value} `;
}

function evaluateExpression() {
  try {
    const expression = screen.textContent
      .replace(/x/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100");

    // Verificar la división por cero
    const exp = /\/ 0(?!\d)/;
    if (exp.test(expression)) {
      throw new Error("Division by zero");
    }

    // Evaluación segura de la expresión
    const result = new Function(`return ${expression}`)();

    // Asegurarse de que el resultado tenga decimales si es necesario
    screen.textContent = Number.isInteger(result) ? result : result.toFixed(2);
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

// Mostrar mensajes temporales M+ MC MR
function showTemporaryMessage(message) {
  const originalText = screen.textContent;
  screen.textContent = message;
  setTimeout(() => {
    screen.textContent = originalText;
  }, 1000);
}

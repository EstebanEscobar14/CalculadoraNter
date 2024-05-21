// Variables globales
const screen = document.getElementById("screen"); 
const mcButton = document.getElementById("mc"); 
const mrButton = document.getElementById("mr"); 
const memoryButtons = [mcButton, mrButton];
let memory = 0;
let isOn = false;

// Inicializar la calculadora 
turnOffCalculator();

// Event listeners
document.getElementById("m-plus").addEventListener("click", addToMemory);
mcButton.addEventListener("click", clearMemory);
mrButton.addEventListener("click", recallMemory);
document.getElementById("ce").addEventListener("click", clearScreenIfOn);
document.getElementById("on").addEventListener("click", turnOnCalculator);
document.getElementById("off").addEventListener("click", turnOffCalculator);
document.querySelectorAll(".calculator__button").forEach(button => {
  button.addEventListener("click", handleButtonClick);
});

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
  disableMemoryButtons();
}

// Limpiar la pantalla si la calculadora está encendida
function clearScreenIfOn() {
  if (isOn) clearScreen();
}

// Limpiar la pantalla
function clearScreen() {
  screen.textContent = "0";
}

// Restablecer la calculadora y la memoria
function resetCalculator() {
  clearScreen();
  memory = 0;
  disableMemoryButtons();
}

// Habilitar los botones de memoria
function enableMemoryButtons() {
  memoryButtons.forEach(button => button.disabled = false);
}

// Deshabilitar los botones de memoria
function disableMemoryButtons() {
  memoryButtons.forEach(button => button.disabled = true);
}

// Agregar el valor actual de la pantalla a la memoria
function addToMemory() {
  if (isOn) {
    memory = parseFloat(screen.textContent);
    enableMemoryButtons(); 
    showTemporaryMessage("M+ added"); 
  }
}

// Limpiar la memoria
function clearMemory() {
  if (isOn) {
    memory = 0;
    disableMemoryButtons();
    showTemporaryMessage("MC cleared");
  }
}

// Recuperar el valor guardado en la memoria
function recallMemory() {
  if (isOn) {
    screen.textContent = memory;
    showTemporaryMessage("MR recalled");
  }
}

// Manejar el clic en cualquier botón
function handleButtonClick(event) {
  if (!isOn) return; // No hacer nada si la calculadora esta apagada

  const value = event.target.textContent; // Obtener el valor del boton clicado
  if (isNumberOrDot(value)) {
    handleNumberOrDot(value); // Manejar números y el punto decimal
  } else if (value === "=") {
    evaluateExpression(); // Evaluar la expresión cuando se presiona "="
  } else if (value === "%") {
    calculatePercentage(); // Calcular porcentaje
  } else if (isOperator(value)) {
    handleOperator(value); // Manejar operadores
  }
}

// Verificar si el valor es un numero o un punto decimal
function isNumberOrDot(value) {
  return !isNaN(value) || value === ".";
}

// Manejar la entrada de números y punto decimal
function handleNumberOrDot(value) {
  screen.textContent === "0" ? screen.textContent = value : screen.textContent += value; // Agregar el valor a la pantalla
}

// Verificar si el valor es un operador
function isOperator(value) {
  return ["+", "-", "x", "÷"].includes(value); 
}

// Manejar la entrada de operadores
function handleOperator(value) {
  screen.textContent += ` ${value} `;
}

function evaluateExpression() {
  try {
    const expression = screen.textContent
      .replace(/x/g, "*")
      .replace(/÷/g, "/"); // Reemplazar operadores para la evaluación

    if (/\/ 0(?!\d)/.test(expression)) throw new Error("Division by zero"); 

    const result = new Function(`return ${expression}`)();
    screen.textContent = Number.isInteger(result) ? result : result.toFixed(2); // Mostrar el resultado
  } catch (error) {
    handleError(error);
  }
}

// Calcular el porcentaje del valor actual en la pantalla
function calculatePercentage() {
  try {
    const value = parseFloat(screen.textContent);
    const result = value / 100;
    screen.textContent = Number.isInteger(result) ? result : result.toFixed(2); // Mostrar el resultado
  } catch (error) {
    handleError(error);
  }
}

// Manejar errores de evaluación
function handleError(error) {
  screen.textContent = error.message === "Division by zero" ? "Division by zero" : "Syntax error"; // Mostrar mensaje de error
  setTimeout(() => screen.textContent = "0", 500);
}

// Mostrar mensajes temporales en la pantalla
function showTemporaryMessage(message) {
  const originalText = screen.textContent; // Guardar el texto original
  screen.textContent = message;
  setTimeout(() => screen.textContent = originalText, 500);
}


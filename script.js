document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen');
    let memory = 0;
    let isOn = false;

    function clearScreen() {
        screen.textContent = '0';
    }

    function resetCalculator() {
        clearScreen();
        memory = 0;
    }

    function addToMemory() {
        if (isOn) {
            memory = parseFloat(screen.textContent);
        }
    }

    function clearMemory() {
        memory = 0;
    }

    function recallMemory() {
        if (isOn) {
            screen.textContent = memory;
        }
    }

    document.getElementById('on').addEventListener('click', () => {
        isOn = true;
        clearScreen();
    });

    document.getElementById('off').addEventListener('click', () => {
        isOn = false;
        resetCalculator();
    });

    document.getElementById('m-plus').addEventListener('click', addToMemory);
    document.getElementById('mc').addEventListener('click', clearMemory);
    document.getElementById('mr').addEventListener('click', recallMemory);
    document.getElementById('ce').addEventListener('click', () => {
        if (isOn) {
            clearScreen();
        }
    });

    document.querySelectorAll('.calculator__button').forEach(button => {
        button.addEventListener('click', () => {
            if (isOn) {
                const value = button.textContent;
                if (!isNaN(value) || value === '.') {
                    if (screen.textContent === '0') {
                        screen.textContent = value;
                    } else {
                        screen.textContent += value;
                    }
                } else if (value === '=') {
                    try {
                        screen.textContent = eval(screen.textContent.replace('x', '*').replace('÷', '/').replace('%', '/100'));
                    } catch {
                        screen.textContent = 'Error';
                    }
                } else if (value === '+' || value === '-' || value === 'x' || value === '÷' || value === '%') {
                    screen.textContent += ` ${value} `;
                }
            }
        });
    });
});

# Calculadora Nter

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Ejecución](#ejecución)
3. [Arquitectura y Estructura](#arquitectura-y-estructura)
4. [Uso](#uso)

## Instalación

1. Clona el repositorio a tu máquina local:
    ```sh
    git clone https://gitlab.nfqsolutions.es/nworld/nter/engineering/develop-team/juan-escobar/prueba-tecnica-frontend.git
    ```

2. Navega al directorio del proyecto:
    ```sh
    cd prueba-tecnica-frontend
    ```

## Ejecución

1. Abrir el archivo `index.html` en el navegador web.

## Arquitectura y Estructura

El proyecto está dividido en tres partes principales:

1. **HTML**: La estructura del documento, incluyendo la calculadora y sus botones.
2. **CSS**: Estilos para la apariencia de la calculadora.
3. **JavaScript**: Lógica para la funcionalidad de la calculadora.

### Estructura de Directorios

```
prueba-tecnica-frontend/
├── index.html
├── styles.css
└── script.js
```

### HTML

El archivo `index.html` define la estructura de la calculadora, incluyendo la pantalla y los botones.

### CSS

El archivo `styles.css` contiene los estilos para la apariencia de la calculadora, utilizando Flexbox y Grid para el diseño.

### JavaScript

El archivo `script.js` incluye la lógica para manejar los eventos de los botones y realizar los cálculos.

## Uso

### Encender la Calculadora

1. El botón `ON` para encender la calculadora. La pantalla mostrará `0`.

### Apagar la Calculadora

1. El botón `OFF` para apagar la calculadora. La pantalla se apagará.

### Operaciones Básicas

1. Los botones numéricos (`0-9`) para ingresar números.
2. Los botones de operadores (`+`, `-`, `x`, `÷`, `%`) para realizar operaciones.
3. Presionar `=` para evaluar la expresión ingresada.
4. Presionar `CE` para limpiar la pantalla.

### Gestión de Memoria

1. `M+`: Agrega el número actual a la memoria y habilita los botones MC y MR.
2. `MC`: Limpia la memoria.
3. `MR`: Recupera el valor almacenado en la memoria.

### Web de la Calculadora
*[Calculadora Nter](https://estebanescobar14.github.io/CalculadoraNter/)*

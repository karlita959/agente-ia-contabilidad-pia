const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const chips = document.querySelectorAll(".chip");

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function getResponse(prompt) {
  const p = prompt.toLowerCase();

  if (p.includes("html")) {
    return "HTML es el lenguaje que se usa para estructurar una página web. Sirve para crear títulos, párrafos, botones, imágenes y secciones.";
  }

  if (p.includes("css")) {
    return "CSS se usa para darle estilo a la página: colores, fuentes, márgenes, fondos, tamaños y diseño visual.";
  }

  if (p.includes("javascript") || p.includes("js")) {
    return "JavaScript hace que la página sea interactiva. Se usa para mostrar mensajes, validar formularios, cambiar contenido y hacer lógica.";
  }

  if (p.includes("variable")) {
    return 'Una variable es un contenedor para guardar información. Ejemplo: let nombre = "Ana";';
  }

  if (p.includes("funcion")) {
    return 'Una función es un bloque de código reutilizable. Ejemplo: function saludar() { console.log("Hola"); }';
  }

  if (p.includes("if") || p.includes("condicion")) {
    return 'La condición if sirve para ejecutar algo si se cumple una regla. Ejemplo: if (edad >= 18) { console.log("Eres mayor de edad"); }';
  }

  if (p.includes("for") || p.includes("bucle")) {
    return "Un for sirve para repetir instrucciones varias veces. Se usa mucho para recorrer listas y arreglos.";
  }

  if (p.includes("hola")) {
    return "¡Hola! Puedo ayudarte a aprender HTML, CSS, JavaScript, variables y funciones.";
  }

  if (p.includes("ejemplo")) {
    return 'Ejemplo básico: let edad = 20; console.log("Mi edad es " + edad);';
  }

  return "Puedo ayudarte con HTML, CSS, JavaScript, variables, funciones y lógica de programación. Pregúntame otra cosa.";
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const answer = getResponse(text);
  setTimeout(() => {
    addMessage(answer, "bot");
  }, 300);
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    input.value = chip.textContent;
    sendMessage();
  });
});

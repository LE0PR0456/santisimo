// ==========================================================================
// 1. LÓGICA DEL ROMPECABEZAS (DRAG AND DROP - BANDERA)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const piezas = document.querySelectorAll(".pieza");
  const lineasGuia = document.querySelectorAll(".linea-guia");
  let piezaArrastrada = null;

  // Al iniciar el arrastre de una pieza
  piezas.forEach((pieza) => {
    pieza.addEventListener("dragstart", function () {
      piezaArrastrada = this;
    });
  });

  // Habilitar las zonas de destino para aceptar soltar elementos
  lineasGuia.forEach((linea) => {
    linea.addEventListener("dragover", function (e) {
      e.preventDefault(); // Evita el comportamiento por defecto
    });

    linea.addEventListener("drop", function () {
      // Si la línea guía está vacía, metemos la pieza adentro
      if (this.children.length === 0) {
        this.innerHTML = ""; // Limpiamos el texto de fondo guía
        this.appendChild(piezaArrastrada);
      }
    });
  });
});

// Función global para revisar si el orden de la bandera es correcto
function verificarBandera() {
  const guias = document.querySelectorAll(".linea-guia");
  const feedback = document.getElementById("feedback-bandera");

  // El orden constitucional estricto de arriba a abajo
  const ordenCorrecto = ["pieza-amarillo", "pieza-azul", "pieza-rojo"];
  let aciertos = 0;

  guias.forEach((guia, index) => {
    const elementoHijo = guia.children[0];
    // Compara si la pieza introducida tiene el ID correcto para esa posición
    if (elementoHijo && elementoHijo.id === ordenCorrecto[index]) {
      aciertos++;
    }
  });

  if (aciertos === 3) {
    feedback.innerHTML =
      "🎉 ¡Perfecto, mi chamo! Armaste la Bandera Nacional correctamente en su orden constitucional.";
    feedback.style.color = "#28a745";
  } else {
    feedback.innerHTML =
      "❌ ¡Inténtalo de nuevo! Recuerda el orden de las franjas de nuestra bandera (Amarillo, Azul y Rojo).";
    feedback.style.color = "#dc3545";
  }
}

// ==========================================================================
// 2. LÓGICA DE VERIFICACIÓN DEL ESCUDO
// ==========================================================================
function verificarEscudo() {
  const caballoInput = document.getElementById("resp-caballo");
  const espigasInput = document.getElementById("resp-espigas");
  const feedback = document.getElementById("feedback-escudo");

  if (!caballoInput || !espigasInput || !feedback) return;

  const caballo = caballoInput.value.trim().toLowerCase();
  const espigas = espigasInput.value.trim();

  // Valida que la respuesta contenga "caballo" y que las espigas sean exactamente 24
  if (caballo.includes("caballo") && espigas === "24") {
    feedback.innerHTML =
      "🎉 ¡Excelente, mi chamo! Es el caballo blanco y las 24 espigas (una por cada estado y el Distrito Capital).";
    feedback.style.color = "#28a745";
  } else {
    feedback.innerHTML =
      "❌ ¡Ups! Revisa bien. Pista: Son más de 20 espigas y el animal del cuartel inferior relincha.";
    feedback.style.color = "#dc3545";
  }
}

// ==========================================================================
// 3. LÓGICA DE VERIFICACIÓN DEL CRUCIGRAMA (HIMNO)
// ==========================================================================
function verificarCrucigrama() {
  const feedback = document.getElementById("feedback-himno");
  if (!feedback) return;

  // Captura las letras de P-U-E-B-L-O (Vertical)
  const p = document.getElementById("c1")?.value.toUpperCase().trim() || "";
  const u = document.getElementById("c2")?.value.toUpperCase().trim() || ""; // Celda compartida
  const e = document.getElementById("c3")?.value.toUpperCase().trim() || "";
  const b = document.getElementById("c4")?.value.toUpperCase().trim() || "";
  const l = document.getElementById("c5")?.value.toUpperCase().trim() || "";

  // Captura las letras de Y-U-G-O (Horizontal)
  const y = document.getElementById("h1")?.value.toUpperCase().trim() || "";
  const g = document.getElementById("h2")?.value.toUpperCase().trim() || "";
  const o = document.getElementById("h3")?.value.toUpperCase().trim() || "";

  // Verificación estricta de cada celda del tablero
  if (
    p === "P" &&
    u === "U" &&
    e === "E" &&
    b === "B" &&
    l === "L" &&
    y === "Y" &&
    g === "G" &&
    o === "O"
  ) {
    feedback.innerHTML =
      "🎉 ¡Ganaste, mi chamo! Completaste con éxito las palabras PUEBLO y YUGO basadas en el Himno.";
    feedback.style.color = "#28a745";
  } else {
    feedback.innerHTML =
      "❌ ¡Hay errores en el crucigrama! Revisa las pistas de las estrofas del Gloria al Bravo Pueblo.";
    feedback.style.color = "#dc3545";
  }
}

// ==========================================================================
// 4. LÓGICA COMPLEMENTARIA: INTERRUPTOR DE CLASES NAVEGACIÓN ACTIVA
// ==========================================================================
// Detecta dinámicamente la sección visible mediante scroll para cambiar la pestaña activa del menú
window.addEventListener("scroll", () => {
  const secciones = document.querySelectorAll(
    "main[id], main.contenedor-inicio",
  );
  const linksNav = document.querySelectorAll(".nav-links a");

  let secciónActualId = "inicio";

  secciones.forEach((sección) => {
    const secciónTop = sección.offsetTop - 120; // Margen superior para el desfase del menú fijo
    if (window.scrollY >= secciónTop) {
      secciónActualId = sección.getAttribute("id") || "inicio";
    }
  });

  linksNav.forEach((link) => {
    link.classList.remove("activo");
    const href = link.getAttribute("href");
    if (href === "#inicio" && secciónActualId === "inicio") {
      link.classList.add("activo");
    } else if (href === `#${secciónActualId}`) {
      link.classList.add("activo");
    }
  });
});

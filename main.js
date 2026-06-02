// ==========================================================================
// 1. LÓGICA DEL ROMPECABEZAS (DRAG AND DROP INTEGRADO DESKTOP + MÓVIL)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const piezas = document.querySelectorAll(".pieza");
  const lineasGuia = document.querySelectorAll(".linea-guia");
  let piezaArrastrada = null;

  // --- MÉTODOS PARA ESCRITORIO (MOUSE) ---
  piezas.forEach((pieza) => {
    pieza.addEventListener("dragstart", function () {
      piezaArrastrada = this;
    });
  });

  lineasGuia.forEach((linea) => {
    linea.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    linea.addEventListener("drop", function () {
      if (this.children.length === 0) {
        this.innerHTML = ""; // Limpia texto base
        this.appendChild(piezaArrastrada);
      }
    });
  });

  // --- SOPORTE MULTITÁCTIL PARA CELULARES (TOUCH EVENTS) ---
  let coordenadasIniciales = { x: 0, y: 0 };

  piezas.forEach((pieza) => {
    pieza.addEventListener(
      "touchstart",
      function (e) {
        piezaArrastrada = this;
        const touch = e.touches[0];
        // Guardar posición inicial del elemento para retornar si no se suelta en zona correcta
        coordenadasIniciales.x = touch.clientX;
        coordenadasIniciales.y = touch.clientY;
        this.style.transition = "none";
      },
      { passive: true },
    );

    pieza.addEventListener(
      "touchmove",
      function (e) {
        if (!piezaArrastrada) return;
        const touch = e.touches[0];

        // Mueve visualmente la pieza pegada al dedo del usuario
        this.style.position = "fixed";
        this.style.left = `${touch.clientX - this.offsetWidth / 2}px`;
        this.style.top = `${touch.clientY - this.offsetHeight / 2}px`;
        this.style.zIndex = "1000";
      },
      { passive: true },
    );

    pieza.addEventListener("touchend", function (e) {
      if (!piezaArrastrada) return;

      // Detecta sobre qué elemento soltó el dedo el usuario en el móvil
      const touch = e.changedTouches[0];
      const elementoDebajo = document.elementFromPoint(
        touch.clientX,
        touch.clientY,
      );

      // Busca si el elemento inferior es una línea guía o está dentro de ella
      const zonaDestino = elementoDebajo
        ? elementoDebajo.closest(".linea-guia")
        : null;

      if (zonaDestino && zonaDestino.children.length === 0) {
        // Resetea estilos inline de arrastre móvil e inserta la pieza formalmente
        piezaArrastrada.style.position = "relative";
        piezaArrastrada.style.left = "0";
        piezaArrastrada.style.top = "0";
        piezaArrastrada.style.zIndex = "10";
        zonaDestino.innerHTML = "";
        zonaDestino.appendChild(piezaArrastrada);
      } else {
        // Si no se soltó en un área válida, regresa a su posición del contenedor original
        piezaArrastrada.style.position = "relative";
        piezaArrastrada.style.left = "0";
        piezaArrastrada.style.top = "0";
        piezaArrastrada.style.zIndex = "10";
      }
      piezaArrastrada = null;
    });
  });
});

// Función global para revisar si el orden de la bandera es correcto
function verificarBandera() {
  const guias = document.querySelectorAll(".linea-guia");
  const feedback = document.getElementById("feedback-bandera");

  const ordenCorrecto = ["pieza-amarillo", "pieza-azul", "pieza-rojo"];
  let aciertos = 0;

  guias.forEach((guia, index) => {
    const elementoHijo = guia.children[0];
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
// 3. LÓGICA DE VERIFICACIÓN DEL CRUCIGRAMA (HIMNO ACTUAlIZADO)
// ==========================================================================
function verificarCrucigrama() {
  const feedback = document.getElementById("feedback-himno");
  if (!feedback) return;

  // Captura las 6 celdas de P-U-E-B-L-O (Corregido con c6 incluido)
  const p = document.getElementById("c1")?.value.toUpperCase().trim() || "";
  const u = document.getElementById("c2")?.value.toUpperCase().trim() || "";
  const e = document.getElementById("c3")?.value.toUpperCase().trim() || "";
  const b = document.getElementById("c4")?.value.toUpperCase().trim() || "";
  const l = document.getElementById("c5")?.value.toUpperCase().trim() || "";
  const oLetra =
    document.getElementById("c6")?.value.toUpperCase().trim() || "";

  // Captura las letras adicionales de Y-U-G-O (Horizontal)
  const y = document.getElementById("h1")?.value.toUpperCase().trim() || "";
  const g = document.getElementById("h2")?.value.toUpperCase().trim() || "";
  const oYugo = document.getElementById("h3")?.value.toUpperCase().trim() || "";

  // Verificación estricta completa
  if (
    p === "P" &&
    u === "U" &&
    e === "E" &&
    b === "B" &&
    l === "L" &&
    oLetra === "O" &&
    y === "Y" &&
    g === "G" &&
    oYugo === "O"
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
window.addEventListener("scroll", () => {
  const secciones = document.querySelectorAll(
    "main[id], main.contenedor-inicio",
  );
  const linksNav = document.querySelectorAll(".nav-links a");

  let secciónActualId = "inicio";

  secciones.forEach((sección) => {
    const secciónTop = sección.offsetTop - 120;
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

// =========================
//   INSIGNIAS DISPONIBLES
// =========================

const insigniasDisponibles = {
    casoCompletado: "🥇 Caso completado",
    perfecto: "🌟 Perfecto (sin fallos)",
    tresCasos: "🏅 Persistente (3 casos completados)",
    maestro: "👑 Maestro del método científico (10 casos)"
};

// =========================
//   VARIABLES
// =========================

let puntuacion = 0;
let casoActual = null;
let etiquetaActual = null;
let alumno = "";
let curso = "";

// =========================
//   DESORDENAR ARRAY
// =========================

function mezclar(array) {
    return array
        .map(x => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map(a => a.x);
}

// =========================
//   CARGAR INSIGNIAS DEL ALUMNO
// =========================

function cargarInsignias() {
    const panel = document.getElementById("insigniasPanel");
    panel.innerHTML = "";

    const todas = JSON.parse(localStorage.getItem("insignias")) || {};
    const delAlumno = todas[alumno] || [];

    delAlumno.forEach(id => {
        const div = document.createElement("div");
        div.classList.add("insignia");
        div.innerText = insigniasDisponibles[id];
        panel.appendChild(div);
    });
}

// =========================
//   DESBLOQUEAR INSIGNIA
// =========================

function desbloquearInsignia(id) {
    let todas = JSON.parse(localStorage.getItem("insignias")) || {};

    if (!todas[alumno]) todas[alumno] = [];

    if (!todas[alumno].includes(id)) {
        todas[alumno].push(id);
        localStorage.setItem("insignias", JSON.stringify(todas));
        cargarInsignias();
    }
}

// =========================
//   CASOS
// =========================

const casos = [
    {
        titulo: "Caso 1: Crecimiento de plantas",
        bloques: [
            { texto: "Una planta crece más rápido que otra.", correcto: "observacion" },
            { texto: "Cree que la luz es la causa.", correcto: "hipotesis" },
            { texto: "Coloca ambas plantas con distinta luz.", correcto: "experimentacion" },
            { texto: "Registra el crecimiento durante dos semanas.", correcto: "analisis" },
            { texto: "Concluye que la luz influye en el crecimiento.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 2: Fusión del hielo",
        bloques: [
            { texto: "El hielo se derrite más rápido en un vaso que en otro.", correcto: "observacion" },
            { texto: "Piensa que la temperatura del vaso es la causa.", correcto: "hipotesis" },
            { texto: "Mide la temperatura de ambos vasos.", correcto: "experimentacion" },
            { texto: "Comprueba que el vaso más caliente derrite antes el hielo.", correcto: "analisis" },
            { texto: "Concluye que la temperatura acelera la fusión.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 3: Oxidación del hierro",
        bloques: [
            { texto: "Un clavo se oxida más rápido en un sitio que en otro.", correcto: "observervacion" },
            { texto: "Cree que la humedad es la causa.", correcto: "hipotesis" },
            { texto: "Coloca clavos en ambientes con distinta humedad.", correcto: "experimentacion" },
            { texto: "Observa que el clavo con más humedad se oxida antes.", correcto: "analisis" },
            { texto: "Concluye que la humedad acelera la oxidación.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 4: Flotación",
        bloques: [
            { texto: "Un objeto flota en agua pero se hunde en aceite.", correcto: "observacion" },
            { texto: "Piensa que la densidad del líquido es la causa.", correcto: "hipotesis" },
            { texto: "Compara densidades de agua y aceite.", correcto: "experimentacion" },
            { texto: "Comprueba que el aceite es menos denso.", correcto: "analisis" },
            { texto: "Concluye que la densidad determina la flotación.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 5: Marchitez de plantas",
        bloques: [
            { texto: "Una planta se marchita más rápido en una maceta.", correcto: "observacion" },
            { texto: "Cree que la cantidad de agua es la causa.", correcto: "hipotesis" },
            { texto: "Riega ambas plantas con cantidades diferentes.", correcto: "experimentacion" },
            { texto: "Observa que la planta con menos agua se marchita antes.", correcto: "analisis" },
            { texto: "Concluye que el agua es esencial para la planta.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 6: Calentamiento de metales",
        bloques: [
            { texto: "Un metal se calienta más rápido que otro al sol.", correcto: "observacion" },
            { texto: "Piensa que el color influye en la absorción de calor.", correcto: "hipotesis" },
            { texto: "Coloca metales de distintos colores al sol.", correcto: "experimentacion" },
            { texto: "Mide la temperatura de cada uno.", correcto: "analisis" },
            { texto: "Concluye que el color afecta a la absorción de calor.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 7: Rebote del balón",
        bloques: [
            { texto: "Un balón rebota más en una superficie que en otra.", correcto: "observacion" },
            { texto: "Cree que la dureza del suelo influye.", correcto: "hipotesis" },
            { texto: "Prueba el balón en distintas superficies.", correcto: "experimentacion" },
            { texto: "Registra la altura del rebote.", correcto: "analisis" },
            { texto: "Concluye que la dureza afecta al rebote.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 8: Consumo de velas",
        bloques: [
            { texto: "Una vela se consume más rápido en un lugar.", correcto: "observacion" },
            { texto: "Piensa que el viento es la causa.", correcto: "hipotesis" },
            { texto: "Coloca velas en zonas con distinta corriente de aire.", correcto: "experimentacion" },
            { texto: "Observa que la vela con más viento se consume antes.", correcto: "analisis" },
            { texto: "Concluye que el viento acelera la combustión.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 9: Descomposición de alimentos",
        bloques: [
            { texto: "Un alimento se pudre más rápido fuera de la nevera.", correcto: "observacion" },
            { texto: "Cree que la temperatura es la causa.", correcto: "hipotesis" },
            { texto: "Deja alimentos dentro y fuera de la nevera.", correcto: "experimentacion" },
            { texto: "Comprueba que el de fuera se pudre antes.", correcto: "analisis" },
            { texto: "Concluye que el frío retrasa la descomposición.", correcto: "conclusion" }
        ]
    },
    {
        titulo: "Caso 10: Intensidad del sonido",
        bloques: [
            { texto: "Un sonido se escucha mejor en un sitio que en otro.", correcto: "observacion" },
            { texto: "Piensa que la distancia influye.", correcto: "hipotesis" },
            { texto: "Mide la intensidad del sonido a distintas distancias.", correcto: "experimentacion" },
            { texto: "Observa que cuanto más lejos, menos se oye.", correcto: "analisis" },
            { texto: "Concluye que la distancia afecta a la intensidad del sonido.", correcto: "conclusion" }
        ]
    }
];

// =========================
//   CARGAR LISTA DE CASOS
// =========================

const lista = document.getElementById("lista-casos");

casos.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.innerText = c.titulo;
    btn.onclick = () => iniciarCaso(i);
    lista.appendChild(btn);
});

// =========================
//   INICIAR CASO
// =========================

function iniciarCaso(indice) {
    alumno = document.getElementById("nombreAlumno").value.trim();
    curso = document.getElementById("cursoAlumno").value;

    if (alumno === "" || curso === "") {
        alert("Introduce tu nombre y curso antes de comenzar.");
        return;
    }

    casoActual = casos[indice];
    puntuacion = 0;

    document.getElementById("puntuacion").innerText = "Puntuación: " + puntuacion;
    document.getElementById("tituloCaso").innerText = casoActual.titulo;

    cargarTexto();
    activarDragDrop();
    cargarInsignias();

    irA("actividad");
}

// =========================
//   CAMBIAR PANTALLA
// =========================

function irA(id) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    document.getElementById(id).classList.add('activa');
}

// =========================
//   CARGAR TEXTO DESORDENADO
// =========================

function cargarTexto() {
    const textoDiv = document.getElementById("texto");
    textoDiv.innerHTML = "";

    const bloquesDesordenados = mezclar(casoActual.bloques);

    bloquesDesordenados.forEach(b => {
        const bloque = document.createElement("div");
        bloque.classList.add("bloque");
        bloque.dataset.correcto = b.correcto;
        bloque.innerText = b.texto;

        textoDiv.appendChild(bloque);
    });
}

// =========================
//   DRAG & DROP
// =========================

function activarDragDrop() {

    document.querySelectorAll('.etiqueta').forEach(et => {
        et.addEventListener('dragstart', e => {
            etiquetaActual = e.target.dataset.etiqueta;
        });
    });

    document.querySelectorAll('.bloque').forEach(bl => {
        bl.addEventListener('dragover', e => e.preventDefault());

        bl.addEventListener('drop', e => {
            let correcto = bl.dataset.correcto;

            if (correcto === etiquetaActual) {
                bl.classList.remove("incorrecto");
                bl.classList.add("correcto");
                bl.innerHTML += `<div class="colocada">${etiquetaActual}</div>`;
                puntuacion += 10;
            } else {
                bl.classList.remove("correcto");
                bl.classList.add("incorrecto");
                puntuacion -= 5;
            }

            document.getElementById("puntuacion").innerText = "Puntuación: " + puntuacion;

            comprobarActividad();
        });
    });
}

// =========================
//   COMPROBAR ACTIVIDAD
// =========================

function comprobarActividad() {
    let bloques = document.querySelectorAll('.bloque');
    let completos = 0;

    bloques.forEach(b => {
        if (b.classList.contains("correcto")) completos++;
    });

    if (completos === bloques.length) {
        document.getElementById("resultado").innerText =
            "🎉 ¡Actividad completada! Puntuación final: " + puntuacion;

        guardarResultado();
        desbloquearInsignia("casoCompletado");

        if (puntuacion === 50) desbloquearInsignia("perfecto");

        let datos = JSON.parse(localStorage.getItem("resultados")) || [];
        let completados = datos.filter(r => r.alumno === alumno).length;

        if (completados >= 3) desbloquearInsignia("tresCasos");
        if (completados >= 10) desbloquearInsignia("maestro");
    }
}

// =========================
//   GUARDAR RESULTADO
// =========================

function guardarResultado() {
    let datos = JSON.parse(localStorage.getItem("resultados")) || [];

    datos.push({
        alumno: alumno,
        curso: curso,
        caso: casoActual.titulo,
        puntuacion: puntuacion,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("resultados", JSON.stringify(datos));
}

// =========================
//   EXPORTAR INSIGNIAS BONITO
// =========================

function exportarInsignias() {
    if (!alumno || !curso) {
        alert("Introduce tu nombre y curso antes de exportar.");
        return;
    }

    const todas = JSON.parse(localStorage.getItem("insignias")) || {};
    const delAlumno = todas[alumno] || [];

    // Rellenar el panel oculto
    document.getElementById("expNombre").innerText = alumno;
    document.getElementById("expCurso").innerText = curso;

    const cont = document.getElementById("expInsignias");
    cont.innerHTML = "";

    if (delAlumno.length === 0) {
        cont.innerHTML = "<p style='color:#777;'>No has conseguido ninguna insignia todavía.</p>";
    } else {
        delAlumno.forEach(id => {
            const div = document.createElement("div");
            div.classList.add("insigniaExport");
            div.innerText = insigniasDisponibles[id];
            cont.appendChild(div);
        });
    }

    // Color según curso
    const marco = document.querySelector(".marco");
    if (curso === "2º ESO B") {
        marco.style.borderColor = "#4a76fd";
    } else {
        marco.style.borderColor = "#4caf50";
    }

    const panel = document.getElementById("exportarImagen");
    panel.style.display = "block";

    html2canvas(panel, { scale: 2 }).then(canvas => {
        const enlace = document.createElement("a");
        enlace.download = `${alumno}_${curso}_insignias.png`;
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
        panel.style.display = "none";
    });
}

// =========================
//   VOLVER AL INICIO
// =========================

function volverInicio() {
    document.getElementById("resultado").innerText = "";
    cargarInsignias();
    irA("inicio");
}

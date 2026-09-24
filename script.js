// =========================
//   NORMALIZAR
// =========================

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// =========================
//   INSIGNIAS DISPONIBLES
// =========================

const insigniasDisponibles = {
    casoCompletado: "\uD83E\uDD47 Caso completado",
    perfecto: "\uD83C\uDF1F Perfecto (sin fallos)",
    tresCasos: "\uD83C\uDFC5 Persistente (3 casos completados)",
    maestro: "\uD83D\uDC51 Maestro del m\u00E9todo cient\u00EDfico (10 casos)"
};


// =========================
//   VARIABLES
// =========================

let puntuacion = 0;
let casoActual = null;
let etiquetaActual = null;
let alumno = "";
let curso = "";

let casoCompletado = false;


// =========================
//   DESORDENAR ARRAY
// =========================

function mezclar(array) {

    return array
        .map(x => ({
            x,
            r: Math.random()
        }))
        .sort((a, b) => a.r - b.r)
        .map(a => a.x);
}


// =========================
//   CARGAR INSIGNIAS
// =========================

function cargarInsignias() {

    const panel =
        document.getElementById(
            "insigniasPanel"
        );

    if (!panel) return;

    panel.innerHTML = "";

    const todas =
        JSON.parse(
            localStorage.getItem(
                "insignias"
            )
        ) || {};

    const delAlumno =
        todas[alumno] || [];


    delAlumno.forEach(id => {

        const div =
            document.createElement(
                "div"
            );

        div.classList.add(
            "insignia"
        );

        div.innerText =
            insigniasDisponibles[id] ||
            id;

        panel.appendChild(div);
    });
}


// =========================
//   DESBLOQUEAR INSIGNIA
// =========================

function desbloquearInsignia(id) {

    if (!alumno) {
        return;
    }

    let todas =
        JSON.parse(
            localStorage.getItem(
                "insignias"
            )
        ) || {};


    if (!todas[alumno]) {
        todas[alumno] = [];
    }


    if (
        !todas[alumno].includes(id)
    ) {

        todas[alumno].push(id);

        localStorage.setItem(
            "insignias",
            JSON.stringify(todas)
        );

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
            {
                texto: "Una planta crece m\u00E1s r\u00E1pido que otra.",
                correcto: "observacion"
            },
            {
                texto: "Cree que la luz es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca ambas plantas con distinta luz.",
                correcto: "experimentacion"
            },
            {
                texto: "Registra el crecimiento durante dos semanas.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que la luz influye en el crecimiento.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 2: Fusi\u00F3n del hielo",

        bloques: [
            {
                texto: "El hielo se derrite m\u00E1s r\u00E1pido en un vaso que en otro.",
                correcto: "observacion"
            },
            {
                texto: "Piensa que la temperatura del vaso es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Mide la temperatura de ambos vasos.",
                correcto: "experimentacion"
            },
            {
                texto: "Comprueba que el vaso m\u00E1s caliente derrite antes el hielo.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que la temperatura acelera la fusi\u00F3n.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 3: Oxidaci\u00F3n del hierro",

        bloques: [
            {
                texto: "Un clavo se oxida m\u00E1s r\u00E1pido en un sitio que en otro.",
                correcto: "observacion"
            },
            {
                texto: "Cree que la humedad es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca clavos en ambientes con distinta humedad.",
                correcto: "experimentacion"
            },
            {
                texto: "Observa que el clavo con m\u00E1s humedad se oxida antes.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que la humedad acelera la oxidaci\u00F3n.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 4: Flotaci\u00F3n",

        bloques: [
            {
                texto: "Un objeto flota en agua pero se hunde en aceite.",
                correcto: "observacion"
            },
            {
                texto: "Piensa que la densidad del l\u00EDquido es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Compara densidades de agua y aceite.",
                correcto: "experimentacion"
            },
            {
                texto: "Comprueba que el aceite es menos denso.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que la densidad determina la flotaci\u00F3n.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 5: Marchitez de plantas",

        bloques: [
            {
                texto: "Una planta se marchita m\u00E1s r\u00E1pido en una maceta.",
                correcto: "observacion"
            },
            {
                texto: "Cree que la cantidad de agua es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Riega ambas plantas con cantidades diferentes.",
                correcto: "experimentacion"
            },
            {
                texto: "Observa que la planta con menos agua se marchita antes.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que el agua es esencial para la planta.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 6: Calentamiento de metales",

        bloques: [
            {
                texto: "Un metal se calienta m\u00E1s r\u00E1pido que otro al sol.",
                correcto: "observacion"
            },
            {
                texto: "Piensa que el color influye en la absorci\u00F3n de calor.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca metales de distintos colores al sol.",
                correcto: "experimentacion"
            },
            {
                texto: "Mide la temperatura de cada uno.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que el color afecta a la absorci\u00F3n de calor.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 7: Rebote del bal\u00F3n",

        bloques: [
            {
                texto: "Un bal\u00F3n rebota m\u00E1s en una superficie que en otra.",
                correcto: "observacion"
            },
            {
                texto: "Cree que la dureza del suelo influye.",
                correcto: "hipotesis"
            },
            {
                texto: "Prueba el bal\u00F3n en distintas superficies.",
                correcto: "experimentacion"
            },
            {
                texto: "Registra la altura del rebote.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que la dureza afecta al rebote.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 8: Consumo de velas",

        bloques: [
            {
                texto: "Una vela se consume m\u00E1s r\u00E1pido en un lugar.",
                correcto: "observacion"
            },
            {
                texto: "Piensa que el viento es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Coloca velas en zonas con distinta corriente de aire.",
                correcto: "experimentacion"
            },
            {
                texto: "Observa que la vela con m\u00E1s viento se consume antes.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que el viento acelera la combusti\u00F3n.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 9: Descomposici\u00F3n de alimentos",

        bloques: [
            {
                texto: "Un alimento se pudre m\u00E1s r\u00E1pido fuera de la nevera.",
                correcto: "observacion"
            },
            {
                texto: "Cree que la temperatura es la causa.",
                correcto: "hipotesis"
            },
            {
                texto: "Deja alimentos dentro y fuera de la nevera.",
                correcto: "experimentacion"
            },
            {
                texto: "Comprueba que el de fuera se pudre antes.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que el fr\u00EDo retrasa la descomposici\u00F3n.",
                correcto: "conclusion"
            }
        ]
    },


    {
        titulo: "Caso 10: Intensidad del sonido",

        bloques: [
            {
                texto: "Un sonido se escucha mejor en un sitio que en otro.",
                correcto: "observacion"
            },
            {
                texto: "Piensa que la distancia influye.",
                correcto: "hipotesis"
            },
            {
                texto: "Mide la intensidad del sonido a distintas distancias.",
                correcto: "experimentacion"
            },
            {
                texto: "Observa que cuanto m\u00E1s lejos, menos se oye.",
                correcto: "analisis"
            },
            {
                texto: "Concluye que la distancia afecta a la intensidad del sonido.",
                correcto: "conclusion"
            }
        ]
    }

];


// =========================
//   CARGAR LISTA DE CASOS
// =========================

function cargarListaCasos() {

    const lista =
        document.getElementById(
            "lista-casos"
        );

    if (!lista) return;

    lista.innerHTML = "";


    casos.forEach((c, i) => {

        const btn =
            document.createElement(
                "button"
            );

        btn.type = "button";

        btn.innerText =
            c.titulo;


        btn.addEventListener(
            "click",
            function () {

                iniciarCaso(i);
            }
        );


        lista.appendChild(btn);
    });
}


// =========================
//   REINICIAR ETIQUETAS
// =========================

function reiniciarEtiquetas() {

    document
        .querySelectorAll(".etiqueta")
        .forEach(et => {

            et.classList.remove(
                "usada",
                "seleccionada"
            );

            et.draggable = true;
        });


    etiquetaActual = null;
}


// =========================
//   INICIAR CASO
// =========================

function iniciarCaso(indice) {

    alumno =
        document
            .getElementById(
                "nombreAlumno"
            )
            .value
            .trim();

    curso =
        document
            .getElementById(
                "cursoAlumno"
            )
            .value;


    if (
        alumno === "" ||
        curso === ""
    ) {

        alert(
            "Introduce tu nombre y curso antes de comenzar."
        );

        return;
    }


    casoActual =
        casos[indice];

    puntuacion = 0;

    casoCompletado = false;


    // Reiniciar completamente las etiquetas

    reiniciarEtiquetas();


    // Actualizar pantalla

    document
        .getElementById(
            "puntuacion"
        )
        .innerText =
        "Puntuaci\u00F3n: 0";


    document
        .getElementById(
            "tituloCaso"
        )
        .innerText =
        casoActual.titulo;


    document
        .getElementById(
            "resultado"
        )
        .innerText = "";


    cargarTexto();

    activarEtiquetas();

    activarBloques();

    cargarInsignias();

    irA("actividad");
}


// =========================
//   CAMBIAR PANTALLA
// =========================

function irA(id) {

    document
        .querySelectorAll(
            ".pantalla"
        )
        .forEach(p =>
            p.classList.remove(
                "activa"
            )
        );


    document
        .getElementById(id)
        .classList.add(
            "activa"
        );
}


// =========================
//   CARGAR TEXTO DESORDENADO
// =========================

function cargarTexto() {

    const textoDiv =
        document.getElementById(
            "texto"
        );


    textoDiv.innerHTML = "";


    const bloquesDesordenados =
        mezclar(
            casoActual.bloques
        );


    bloquesDesordenados.forEach(b => {

        const bloque =
            document.createElement(
                "div"
            );


        bloque.classList.add(
            "bloque"
        );


        bloque.dataset.correcto =
            b.correcto;


        bloque.innerText =
            b.texto;


        textoDiv.appendChild(
            bloque
        );
    });
}


// =========================
//   ACTIVAR ETIQUETAS
// =========================

function activarEtiquetas() {

    const etiquetas =
        document.querySelectorAll(
            ".etiqueta"
        );


    etiquetas.forEach(et => {

        // Clonamos cada etiqueta para
        // eliminar cualquier evento anterior.

        const nueva =
            et.cloneNode(true);


        et.replaceWith(nueva);


        // -------------------------
        // PC: DRAG
        // -------------------------

        nueva.addEventListener(
            "dragstart",
            function (e) {

                if (
                    nueva.classList.contains(
                        "usada"
                    )
                ) {

                    e.preventDefault();

                    return;
                }


                etiquetaActual =
                    nueva.dataset.etiqueta;


                nueva.classList.add(
                    "seleccionada"
                );
            }
        );


        nueva.addEventListener(
            "dragend",
            function () {

                nueva.classList.remove(
                    "seleccionada"
                );
            }
        );


        // -------------------------
        // M¨®VIL / TABLET: TOCAR
        // -------------------------

        nueva.addEventListener(
            "click",
            function () {

                if (
                    nueva.classList.contains(
                        "usada"
                    )
                ) {
                    return;
                }


                document
                    .querySelectorAll(
                        ".etiqueta"
                    )
                    .forEach(e =>
                        e.classList.remove(
                            "seleccionada"
                        )
                    );


                etiquetaActual =
                    nueva.dataset.etiqueta;


                nueva.classList.add(
                    "seleccionada"
                );
            }
        );
    });
}


// =========================
//   ACTIVAR BLOQUES
// =========================

function activarBloques() {

    const bloques =
        document.querySelectorAll(
            ".bloque"
        );


    bloques.forEach(bl => {

        // -------------------------
        // PC: DROP
        // -------------------------

        bl.addEventListener(
            "dragover",
            function (e) {

                e.preventDefault();
            }
        );


        bl.addEventListener(
            "drop",
            function (e) {

                e.preventDefault();

                comprobarDrop(bl);
            }
        );


        // -------------------------
        // M¨®VIL / TABLET: TOCAR
        // -------------------------

        bl.addEventListener(
            "click",
            function () {

                if (
                    etiquetaActual
                ) {

                    comprobarDrop(bl);
                }
            }
        );
    });
}


// =========================
//   COMPROBAR DROP
// =========================

function comprobarDrop(bl) {

    if (!etiquetaActual) {
        return;
    }


    if (casoCompletado) {
        return;
    }


    // Si ya est¨¢ correcto,
    // no se puede volver a puntuar.

    if (
        bl.classList.contains(
            "correcto"
        )
    ) {
        return;
    }


    const correcto =
        bl.dataset.correcto;


    // =========================
    // RESPUESTA CORRECTA
    // =========================

    if (
        normalizar(correcto) ===
        normalizar(etiquetaActual)
    ) {

        bl.classList.remove(
            "incorrecto"
        );

        bl.classList.add(
            "correcto"
        );


        const colocada =
            document.createElement(
                "div"
            );


        colocada.classList.add(
            "colocada"
        );


        colocada.innerText =
            obtenerNombreEtiqueta(
                etiquetaActual
            );


        bl.appendChild(
            colocada
        );


        puntuacion += 10;


        // Marcar etiqueta como utilizada

        document
            .querySelectorAll(
                ".etiqueta"
            )
            .forEach(et => {

                if (
                    et.dataset.etiqueta ===
                    etiquetaActual
                ) {

                    et.classList.add(
                        "usada"
                    );

                    et.classList.remove(
                        "seleccionada"
                    );

                    et.draggable = false;
                }
            });


        etiquetaActual = null;
    }


    // =========================
    // RESPUESTA INCORRECTA
    // =========================

    else {

        bl.classList.remove(
            "correcto"
        );

        bl.classList.add(
            "incorrecto"
        );


        puntuacion -= 5;


        setTimeout(() => {

            bl.classList.remove(
                "incorrecto"
            );

        }, 700);
    }


    document
        .getElementById(
            "puntuacion"
        )
        .innerText =
        "Puntuaci\u00F3n: " +
        puntuacion;


    comprobarActividad();
}


// =========================
//   NOMBRE DE ETIQUETA
// =========================

function obtenerNombreEtiqueta(
    tipo
) {

    const nombres = {

        observacion:
            "Observaci\u00F3n",

        hipotesis:
            "Hip\u00F3tesis",

        experimentacion:
            "Experimentaci\u00F3n",

        analisis:
            "An\u00E1lisis",

        conclusion:
            "Conclusi\u00F3n"
    };


    return (
        nombres[tipo] ||
        tipo
    );
}


// =========================
//   COMPROBAR ACTIVIDAD
// =========================

function comprobarActividad() {

    if (!casoActual) {
        return;
    }


    if (casoCompletado) {
        return;
    }


    const bloques =
        document.querySelectorAll(
            "#texto .bloque"
        );


    // Deben existir exactamente
    // los 5 fragmentos.

    if (
        bloques.length !== 5
    ) {
        return;
    }


    const completos =
        document.querySelectorAll(
            "#texto .bloque.correcto"
        ).length;


    // Hasta que est¨¦n los 5,
    // no se desbloquea nada.

    if (
        completos !== 5
    ) {
        return;
    }


    // El caso est¨¢ completado.

    casoCompletado = true;


    document
        .getElementById(
            "resultado"
        )
        .innerText =
        "\uD83C\uDF89 \u00A1Actividad completada! Puntuaci\u00F3n final: "
        + puntuacion;


    // Guardar SOLO al terminar.

    guardarResultado();


    // =========================
    // CASO COMPLETADO
    // =========================

    desbloquearInsignia(
        "casoCompletado"
    );


    // =========================
    // PERFECTO
    // =========================

    if (
        puntuacion === 50
    ) {

        desbloquearInsignia(
            "perfecto"
        );
    }


    // =========================
    // CONTAR CASOS DIFERENTES
    // =========================

    const datos =
        JSON.parse(
            localStorage.getItem(
                "resultados"
            )
        ) || [];


    const casosUnicos =
        [
            ...new Set(
                datos
                    .filter(
                        r =>
                            r.alumno === alumno &&
                            r.curso === curso
                    )
                    .map(
                        r => r.caso
                    )
            )
        ];


    // =========================
    // 3 CASOS
    // =========================

    if (
        casosUnicos.length >= 3
    ) {

        desbloquearInsignia(
            "tresCasos"
        );
    }


    // =========================
    // 10 CASOS
    // =========================

    if (
        casosUnicos.length >= 10
    ) {

        desbloquearInsignia(
            "maestro"
        );
    }
}


// =========================
//   GUARDAR RESULTADO
// =========================

function guardarResultado() {

    if (
        !casoActual ||
        !alumno ||
        !curso
    ) {
        return;
    }


    let datos =
        JSON.parse(
            localStorage.getItem(
                "resultados"
            )
        ) || [];


    datos.push({

        alumno: alumno,

        curso: curso,

        caso: casoActual.titulo,

        puntuacion: puntuacion,

        fecha:
            new Date().toLocaleString(
                "es-ES"
            )
    });


    localStorage.setItem(
        "resultados",
        JSON.stringify(
            datos
        )
    );
}


// =========================
//   EXPORTAR INSIGNIAS
// =========================

function exportarInsignias() {

    if (
        !alumno ||
        !curso
    ) {

        alert(
            "Introduce tu nombre y curso antes de exportar."
        );

        return;
    }


    const todas =
        JSON.parse(
            localStorage.getItem(
                "insignias"
            )
        ) || {};


    const delAlumno =
        todas[alumno] || [];


    document
        .getElementById(
            "expNombre"
        )
        .innerText =
        alumno;


    document
        .getElementById(
            "expCurso"
        )
        .innerText =
        curso;


    const cont =
        document.getElementById(
            "expInsignias"
        );


    cont.innerHTML = "";


    if (
        delAlumno.length === 0
    ) {

        cont.innerHTML =
            "<p style='color:#777;'>No has conseguido ninguna insignia todav\u00EDa.</p>";

    } else {

        delAlumno.forEach(
            id => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.classList.add(
                    "insigniaExport"
                );


                div.innerText =
                    insigniasDisponibles[id] ||
                    id;


                cont.appendChild(
                    div
                );
            }
        );
    }


    const marco =
        document.querySelector(
            ".marco"
        );


    if (
        curso === "2\u00BA ESO B"
    ) {

        marco.style.borderColor =
            "#4a76fd";

    } else {

        marco.style.borderColor =
            "#4caf50";
    }


    const panel =
        document.getElementById(
            "exportarImagen"
        );


    panel.style.display =
        "block";


    html2canvas(
        panel,
        {
            scale: 2
        }
    ).then(canvas => {

        const enlace =
            document.createElement(
                "a"
            );


        enlace.download =
            `${alumno}_${curso}_insignias.png`;


        enlace.href =
            canvas.toDataURL(
                "image/png"
            );


        enlace.click();


        panel.style.display =
            "none";
    });
}


// =========================
//   VOLVER AL INICIO
// =========================

function volverInicio() {

    document
        .getElementById(
            "resultado"
        )
        .innerText = "";


    // Limpiar completamente
    // el estado de la partida actual.

    etiquetaActual = null;

    casoActual = null;

    casoCompletado = false;

    puntuacion = 0;


    // Dejar todas las etiquetas
    // disponibles para el siguiente caso.

    reiniciarEtiquetas();


    cargarInsignias();

    irA("inicio");
}


// =========================
//   INICIO
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarListaCasos();

        cargarInsignias();
    }
);
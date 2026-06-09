const marioJuegoCanvas =
    document.getElementById(
        "marioJuegoCanvas"
    );

const marioJuegoCtx =
    marioJuegoCanvas.getContext("2d");

/* =========================
   AUDIOS
========================= */

const marioJuegoMusica =
    document.getElementById(
        "marioJuegoMusica"
    );

const marioJuegoSalto =
    document.getElementById(
        "marioJuegoSalto"
    );

const marioJuegoMoneda =
    document.getElementById(
        "marioJuegoMoneda"
    );

const marioJuegoVictoria =
    document.getElementById(
        "marioJuegoVictoria"
    );
document.getElementById("marioJuegoBtnInicio").onclick = () => {

    marioJuegoIniciado = true;

    marioJuegoMusica.volume = 0.4;
    marioJuegoMusica.play().catch(() => { });

    document.getElementById("marioJuegoBtnInicio").style.display = "none";

    document.getElementById("marioJuegoPantallaInicio").style.display = "none";
};

/* =========================
   PANEL
========================= */

const marioJuegoPuntosHTML =
    document.getElementById(
        "marioJuegoPuntos"
    );

const marioJuegoVidasHTML =
    document.getElementById(
        "marioJuegoVidas"
    );

let marioJuegoIniciado = false;
let marioJuegoPuntos = 0;

let marioJuegoVidas = 3;

/* =========================
   CONTROL
========================= */

const marioJuegoTeclas = {};

document.addEventListener(
    "keydown",
    (evento) => {

        marioJuegoTeclas[
            evento.key
        ] = true;
    }
);

document.addEventListener(
    "keyup",
    (evento) => {

        marioJuegoTeclas[
            evento.key
        ] = false;
    }
);

/* =========================
   CAMARA
========================= */

let marioJuegoCamaraX = 0;

/* =========================
   FISICA
========================= */

const marioJuegoGravedad = 0.8;

/* =========================
   JUGADOR
========================= */

const marioJuegoJugador = {

    x: 100,
    y: 420,

    w: 42,
    h: 60,

    vx: 0,
    vy: 0,

    velocidad: 5,

    salto: 15,

    enSuelo: false
};

/* =========================
   BANDERA
========================= */

const marioJuegoBandera = {

    x: 5200,
    y: 160,

    w: 20,
    h: 360
};

/* =========================
   CASTILLO
========================= */

const marioJuegoCastillo = {

    x: 5350,
    y: 300,

    w: 220,
    h: 220
};

/* =========================
   ESTADO
========================= */

let marioJuegoGanado = false;

/* =========================
   MONEDAS
========================= */

const marioJuegoMonedas = [];

for (
    let i = 0;
    i < 60;
    i++
) {

    marioJuegoMonedas.push({

        x:
            400 +
            i * 90,

        y:
            250 +
            Math.sin(i) * 70,

        radio: 14,

        activa: true,

        frame: 0
    });
}

/* =========================
   ENEMIGOS
========================= */
const marioJuegoEnemigos = [

    // ZONA 1 (antes del tubo 1)
    {
        x: 600,
        y: 480,
        w: 40,
        h: 40,
        vx: 1.5,
        vivo: true,
        min: 500,
        max: 1150
    },

    {
        x: 800,
        y: 480,
        w: 40,
        h: 40,
        vx: -1.5,
        vivo: true,
        min: 500,
        max: 1150
    },

    // ZONA 2 (entre tubo 1 y 2)
    {
        x: 1600,
        y: 480,
        w: 40,
        h: 40,
        vx: 1.5,
        vivo: true,
        min: 1300,
        max: 2450
    },

    {
        x: 1900,
        y: 480,
        w: 40,
        h: 40,
        vx: -1.5,
        vivo: true,
        min: 1300,
        max: 2450
    },

    // ZONA 3 (entre tubo 2 y 3)
    {
        x: 3000,
        y: 480,
        w: 40,
        h: 40,
        vx: 1.5,
        vivo: true,
        min: 2600,
        max: 3850
    },

    {
        x: 3300,
        y: 480,
        w: 40,
        h: 40,
        vx: -1.5,
        vivo: true,
        min: 2600,
        max: 3850
    }

];



/* =========================
   PLATAFORMAS
========================= */

const marioJuegoPlataformas = [

    {
        x: 0,
        y: 520,
        w: 6000,
        h: 80
    },

    {
        x: 500,
        y: 400,
        w: 200,
        h: 20
    },

    {
        x: 900,
        y: 320,
        w: 200,
        h: 20
    },

    {
        x: 1400,
        y: 260,
        w: 250,
        h: 20
    },

    {
        x: 2000,
        y: 380,
        w: 250,
        h: 20
    },

    {
        x: 2600,
        y: 300,
        w: 250,
        h: 20
    },

    {
        x: 3200,
        y: 250,
        w: 250,
        h: 20
    },

    {
        x: 3900,
        y: 350,
        w: 250,
        h: 20
    },

    {
        x: 4500,
        y: 280,
        w: 300,
        h: 20
    }
];

/* =========================
   COLISIONES
========================= */

function marioJuegoColision(a, b) {

    return (

        a.x < b.x + b.w &&

        a.x + a.w > b.x &&

        a.y < b.y + b.h &&

        a.y + a.h > b.y
    );
}
function marioJuegoColisionTubo(jugador, tubo) {

    return (
        jugador.x < tubo.x + tubo.w &&
        jugador.x + jugador.w > tubo.x &&
        jugador.y < tubo.y + tubo.h &&
        jugador.y + jugador.h > tubo.y
    );
}
/* =========================
   NUBES
========================= */

function marioJuegoDibujarNube(x, y) {

    marioJuegoCtx.fillStyle =
        "white";

    marioJuegoCtx.beginPath();

    marioJuegoCtx.arc(
        x,
        y,
        20,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 25,
        y - 12,
        25,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 55,
        y - 5,
        20,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 80,
        y,
        18,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.fill();
}

/* =========================
   MONTAÑAS
========================= */

function marioJuegoDibujarMontana(
    x,
    y,
    tamaño
) {

    marioJuegoCtx.fillStyle =
        "#4CAF50";

    marioJuegoCtx.beginPath();

    marioJuegoCtx.moveTo(
        x,
        y
    );

    marioJuegoCtx.quadraticCurveTo(
        x + tamaño / 2,
        y - tamaño,
        x + tamaño,
        y
    );

    marioJuegoCtx.fill();

    /* ojos */

    marioJuegoCtx.fillStyle =
        "black";

    marioJuegoCtx.beginPath();

    marioJuegoCtx.arc(
        x + tamaño * 0.4,
        y - tamaño * 0.35,
        4,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + tamaño * 0.6,
        y - tamaño * 0.35,
        4,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.fill();
}

/* =========================
   ARBUSTOS
========================= */

function marioJuegoDibujarArbusto(
    x,
    y
) {

    marioJuegoCtx.fillStyle =
        "#1FAA00";

    marioJuegoCtx.beginPath();

    marioJuegoCtx.arc(
        x,
        y,
        20,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 20,
        y - 10,
        25,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 45,
        y - 5,
        22,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 70,
        y,
        18,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.fill();
}

/* =========================
   FONDO COMPLETO
========================= */

function marioJuegoDibujarFondo() {

    /* cielo */

    marioJuegoCtx.fillStyle =
        "#5C94FC";

    marioJuegoCtx.fillRect(
        0,
        0,
        marioJuegoCanvas.width,
        marioJuegoCanvas.height
    );

    /* sol */

    marioJuegoCtx.fillStyle =
        "#FFD700";

    marioJuegoCtx.beginPath();

    marioJuegoCtx.arc(
        100,
        90,
        40,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.fill();

    /* nubes */

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        marioJuegoDibujarNube(

            i * 300 -
            marioJuegoCamaraX * 0.2,

            100 +
            Math.sin(i) * 20
        );
    }

    /* montañas */

    for (
        let i = 0;
        i < 15;
        i++
    ) {

        marioJuegoDibujarMontana(

            i * 420 -
            marioJuegoCamaraX * 0.4,

            520,

            180
        );
    }

    /* arbustos */

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        marioJuegoDibujarArbusto(

            i * 220 -
            marioJuegoCamaraX * 0.6,

            485
        );
    }
}
/* =========================
   LADRILLOS
========================= */

function marioJuegoDibujarLadrillo(x, y) {

    marioJuegoCtx.fillStyle =
        "#C76B28";

    marioJuegoCtx.fillRect(
        x,
        y,
        50,
        50
    );

    marioJuegoCtx.strokeStyle =
        "#6B3410";

    marioJuegoCtx.lineWidth = 2;

    marioJuegoCtx.strokeRect(
        x,
        y,
        50,
        50
    );

    marioJuegoCtx.beginPath();

    marioJuegoCtx.moveTo(x, y + 25);
    marioJuegoCtx.lineTo(x + 50, y + 25);

    marioJuegoCtx.moveTo(x + 25, y);
    marioJuegoCtx.lineTo(x + 25, y + 25);

    marioJuegoCtx.moveTo(x + 12, y + 25);
    marioJuegoCtx.lineTo(x + 12, y + 50);

    marioJuegoCtx.moveTo(x + 37, y + 25);
    marioJuegoCtx.lineTo(x + 37, y + 50);

    marioJuegoCtx.stroke();
}

/* =========================
   PLATAFORMAS
========================= */

function marioJuegoDibujarPlataformas() {

    marioJuegoPlataformas.forEach(
        plataforma => {

            for (
                let x = 0;
                x < plataforma.w;
                x += 50
            ) {

                marioJuegoDibujarLadrillo(

                    plataforma.x +
                    x -
                    marioJuegoCamaraX,

                    plataforma.y
                );
            }
        });
}

/* =========================
   TUBOS
========================= */

function marioJuegoDibujarTubo(x, y) {

    marioJuegoCtx.fillStyle =
        "#00AA00";

    marioJuegoCtx.fillRect(
        x,
        y,
        80,
        100
    );

    marioJuegoCtx.fillStyle =
        "#00DD00";

    marioJuegoCtx.fillRect(
        x - 10,
        y,
        100,
        20
    );

    marioJuegoCtx.fillStyle =
        "#22FF22";

    marioJuegoCtx.fillRect(
        x + 8,
        y + 20,
        8,
        80
    );
}

function marioJuegoDibujarTubos() {

    marioJuegoDibujarTubo(
        1200 -
        marioJuegoCamaraX,
        420
    );

    marioJuegoDibujarTubo(
        2500 -
        marioJuegoCamaraX,
        420
    );

    marioJuegoDibujarTubo(
        3900 -
        marioJuegoCamaraX,
        420
    );
}

/* =========================
   MONEDAS ANIMADAS
========================= */

function marioJuegoDibujarMonedas() {

    marioJuegoMonedas.forEach(
        moneda => {

            if (!moneda.activa)
                return;

            moneda.frame += 0.15;

            const escala =
                Math.abs(
                    Math.sin(
                        moneda.frame
                    )
                );

            marioJuegoCtx.save();

            marioJuegoCtx.translate(

                moneda.x -
                marioJuegoCamaraX,

                moneda.y
            );

            marioJuegoCtx.scale(
                escala,
                1
            );

            marioJuegoCtx.shadowColor =
                "gold";

            marioJuegoCtx.shadowBlur =
                15;

            marioJuegoCtx.fillStyle =
                "#FFD700";

            marioJuegoCtx.beginPath();

            marioJuegoCtx.arc(
                0,
                0,
                moneda.radio,
                0,
                Math.PI * 2
            );

            marioJuegoCtx.fill();

            marioJuegoCtx.shadowBlur =
                0;

            marioJuegoCtx.restore();
        });
}

/* =========================
   JUGADOR
========================= */

function marioJuegoDibujarJugador() {

    const x =
        marioJuegoJugador.x -
        marioJuegoCamaraX;

    const y =
        marioJuegoJugador.y;

    /* gorra */

    marioJuegoCtx.fillStyle =
        "#FF0000";

    marioJuegoCtx.fillRect(
        x + 5,
        y,
        35,
        10
    );

    /* cara */

    marioJuegoCtx.fillStyle =
        "#F5C28B";

    marioJuegoCtx.fillRect(
        x + 8,
        y + 10,
        28,
        18
    );

    /* ojos */

    marioJuegoCtx.fillStyle =
        "black";

    marioJuegoCtx.fillRect(
        x + 14,
        y + 14,
        3,
        3
    );

    marioJuegoCtx.fillRect(
        x + 25,
        y + 14,
        3,
        3
    );

    /* bigote */

    marioJuegoCtx.fillRect(
        x + 12,
        y + 22,
        18,
        4
    );

    /* overol */

    marioJuegoCtx.fillStyle =
        "#0048FF";

    marioJuegoCtx.fillRect(
        x + 8,
        y + 28,
        28,
        22
    );

    /* botones */

    marioJuegoCtx.fillStyle =
        "yellow";

    marioJuegoCtx.beginPath();

    marioJuegoCtx.arc(
        x + 15,
        y + 38,
        2,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.arc(
        x + 28,
        y + 38,
        2,
        0,
        Math.PI * 2
    );

    marioJuegoCtx.fill();

    /* piernas */

    marioJuegoCtx.fillStyle =
        "#0048FF";

    marioJuegoCtx.fillRect(
        x + 10,
        y + 50,
        8,
        12
    );

    marioJuegoCtx.fillRect(
        x + 25,
        y + 50,
        8,
        12
    );
}

/* =========================
   GOOMBAS
========================= */

function marioJuegoDibujarEnemigos() {

    marioJuegoEnemigos.forEach(


        enemigo => {


            if (!enemigo.vivo)
                return;

            const x =
                enemigo.x -
                marioJuegoCamaraX;

            const y =
                enemigo.y;

            marioJuegoCtx.fillStyle =
                "#8B4513";

            marioJuegoCtx.beginPath();

            marioJuegoCtx.ellipse(
                x + 20,
                y + 20,
                22,
                18,
                0,
                0,
                Math.PI * 2
            );

            marioJuegoCtx.fill();

            marioJuegoCtx.fillStyle =
                "white";

            marioJuegoCtx.fillRect(
                x + 12,
                y + 10,
                5,
                10
            );

            marioJuegoCtx.fillRect(
                x + 24,
                y + 10,
                5,
                10
            );

            marioJuegoCtx.fillStyle =
                "black";

            marioJuegoCtx.fillRect(
                x + 14,
                y + 14,
                2,
                3
            );

            marioJuegoCtx.fillRect(
                x + 26,
                y + 14,
                2,
                3
            );

            marioJuegoCtx.fillStyle =
                "#5A2F0D";

            marioJuegoCtx.fillRect(
                x + 8,
                y + 30,
                10,
                6
            );

            marioJuegoCtx.fillRect(
                x + 22,
                y + 30,
                10,
                6
            );
        });


}
/* =========================
   MOVIMIENTO DEL JUGADOR
========================= */

function marioJuegoActualizarJugador() {

    if (!marioJuegoIniciado) return;

    marioJuegoJugador.vx = 0;

    /* mover derecha */

    if (
        marioJuegoTeclas["ArrowRight"] ||
        marioJuegoTeclas["d"] ||
        marioJuegoTeclas["D"]
    ) {

        marioJuegoJugador.vx =
            marioJuegoJugador.velocidad;
    }

    /* mover izquierda */

    if (
        marioJuegoTeclas["ArrowLeft"] ||
        marioJuegoTeclas["a"] ||
        marioJuegoTeclas["A"]
    ) {

        marioJuegoJugador.vx =
            -marioJuegoJugador.velocidad;
    }

    /* salto */

    if (

        (
            marioJuegoTeclas[" "] ||
            marioJuegoTeclas["ArrowUp"] ||
            marioJuegoTeclas["w"] ||
            marioJuegoTeclas["W"]
        )

        &&

        marioJuegoJugador.enSuelo

    ) {

        marioJuegoJugador.vy =
            -marioJuegoJugador.salto;

        marioJuegoJugador.enSuelo =
            false;

        try {

            marioJuegoSalto.currentTime = 0;

            marioJuegoSalto.play();

        } catch (error) { }
    }

    marioJuegoJugador.x +=
        marioJuegoJugador.vx;

    marioJuegoJugador.vy +=
        marioJuegoGravedad;

    marioJuegoJugador.y +=
        marioJuegoJugador.vy;

    marioJuegoJugador.enSuelo =
        false;

    /* colisiones plataformas */

    marioJuegoPlataformas.forEach(
        plataforma => {

            if (

                marioJuegoJugador.x
                <
                plataforma.x +
                plataforma.w

                &&

                marioJuegoJugador.x +
                marioJuegoJugador.w
                >
                plataforma.x

                &&

                marioJuegoJugador.y +
                marioJuegoJugador.h
                >
                plataforma.y

                &&

                marioJuegoJugador.y +
                marioJuegoJugador.h
                <
                plataforma.y + 30

                &&

                marioJuegoJugador.vy >= 0

            ) {

                marioJuegoJugador.y =

                    plataforma.y -

                    marioJuegoJugador.h;

                marioJuegoJugador.vy = 0;

                marioJuegoJugador.enSuelo =
                    true;
            }
        });


    /* COLISION CON TUBOS (ARREGLADO) */
    marioJuegoDibujarTubos(); // ya lo tienes dibujado

    const tubos = [
        { x: 1200, y: 420, w: 80, h: 100 },
        { x: 2500, y: 420, w: 80, h: 100 },
        { x: 3900, y: 420, w: 80, h: 100 }
    ];

    tubos.forEach(tubo => {

        if (marioJuegoColisionTubo(marioJuegoJugador, tubo)) {

            // SI CAE ENCIMA
            if (marioJuegoJugador.vy >= 0) {

                marioJuegoJugador.y = tubo.y - marioJuegoJugador.h;
                marioJuegoJugador.vy = 0;
                marioJuegoJugador.enSuelo = true;
            }

            // BLOQUEO LATERAL
            if (marioJuegoJugador.vx > 0) {
                marioJuegoJugador.x = tubo.x - marioJuegoJugador.w;
            }

            if (marioJuegoJugador.vx < 0) {
                marioJuegoJugador.x = tubo.x + tubo.w;
            }
        }
    });

    /* limites */

    if (
        marioJuegoJugador.x < 0
    ) {

        marioJuegoJugador.x = 0;
    }

    /* caer fuera */

    if (
        marioJuegoJugador.y > 800
    ) {

        marioJuegoVidas--;

        marioJuegoVidasHTML.textContent =
            marioJuegoVidas;

        marioJuegoJugador.x = 100;

        marioJuegoJugador.y = 420;

        marioJuegoJugador.vy = 0;

        if (
            marioJuegoVidas <= 0
        ) {

            alert(
                "GAME OVER"
            );

            location.reload();
        }
    }
}

/* =========================
   MONEDAS
========================= */

function marioJuegoActualizarMonedas() {

    if (!marioJuegoIniciado) return;

    marioJuegoMonedas.forEach(
        moneda => {

            if (
                !moneda.activa
            ) return;

            const dx =

                marioJuegoJugador.x -
                moneda.x;

            const dy =

                marioJuegoJugador.y -
                moneda.y;

            const distancia =

                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distancia < 35
            ) {

                moneda.activa =
                    false;

                marioJuegoPuntos += 10;

                marioJuegoPuntosHTML.textContent =
                    marioJuegoPuntos;

                try {

                    marioJuegoMoneda.currentTime =
                        0;

                    marioJuegoMoneda.play();

                } catch (error) { }
            }
        });
}

/* =========================
   ENEMIGOS
========================= */

function marioJuegoActualizarEnemigos() {

    if (!marioJuegoIniciado) return;

    marioJuegoEnemigos.forEach(
        enemigo => {

            if (
                !enemigo.vivo
            ) return;

            enemigo.x += enemigo.vx;

            // LIMITE IZQUIERDA
            if (enemigo.x <= enemigo.min) {
                enemigo.x = enemigo.min;
                enemigo.vx *= -1;
            }

            // LIMITE DERECHA
            if (enemigo.x + enemigo.w >= enemigo.max) {
                enemigo.x = enemigo.max - enemigo.w;
                enemigo.vx *= -1;
            }
            /* rebote simple */

            if (
                enemigo.x < 0
            ) {

                enemigo.vx *= -1;
            }

            const jugadorEncima =

                marioJuegoJugador.vy > 0

                &&

                marioJuegoJugador.y +
                marioJuegoJugador.h - 10

                <

                enemigo.y;

            if (

                marioJuegoColision(
                    marioJuegoJugador,
                    enemigo
                )

            ) {

                if (
                    jugadorEncima
                ) {

                    enemigo.vivo =
                        false;

                    marioJuegoPuntos +=
                        100;

                    marioJuegoPuntosHTML.textContent =
                        marioJuegoPuntos;

                    marioJuegoJugador.vy =
                        -10;

                }
                else {

                    marioJuegoVidas--;

                    marioJuegoVidasHTML.textContent =
                        marioJuegoVidas;

                    marioJuegoJugador.x =
                        100;

                    marioJuegoJugador.y =
                        420;

                    marioJuegoJugador.vy =
                        0;

                    if (
                        marioJuegoVidas <= 0
                    ) {

                        alert(
                            "GAME OVER"
                        );

                        location.reload();
                    }
                }
            }
        });
}
/* =========================
   CAMARA
========================= */

function marioJuegoActualizarCamara() {

    marioJuegoCamaraX =

        marioJuegoJugador.x -

        300;

    if (
        marioJuegoCamaraX < 0
    ) {

        marioJuegoCamaraX = 0;
    }
}

/* =========================
   BANDERA
========================= */

function marioJuegoDibujarBandera() {

    const x =

        marioJuegoBandera.x -

        marioJuegoCamaraX;

    marioJuegoCtx.fillStyle =
        "#888";

    marioJuegoCtx.fillRect(
        x,
        marioJuegoBandera.y,
        6,
        marioJuegoBandera.h
    );

    marioJuegoCtx.fillStyle =
        "#00FF00";

    marioJuegoCtx.fillRect(
        x + 6,
        marioJuegoBandera.y + 30,
        60,
        40
    );
}

/* =========================
   CASTILLO
========================= */

function marioJuegoDibujarCastillo() {

    const x =

        marioJuegoCastillo.x -

        marioJuegoCamaraX;

    marioJuegoCtx.fillStyle =
        "#777";

    marioJuegoCtx.fillRect(
        x,
        marioJuegoCastillo.y,
        220,
        220
    );

    marioJuegoCtx.fillStyle =
        "#555";

    marioJuegoCtx.fillRect(
        x + 70,
        marioJuegoCastillo.y + 100,
        80,
        120
    );

    marioJuegoCtx.fillStyle =
        "#333";

    marioJuegoCtx.fillRect(
        x + 20,
        marioJuegoCastillo.y,
        30,
        30
    );

    marioJuegoCtx.fillRect(
        x + 90,
        marioJuegoCastillo.y,
        30,
        30
    );

    marioJuegoCtx.fillRect(
        x + 160,
        marioJuegoCastillo.y,
        30,
        30
    );
}

/* =========================
   VICTORIA
========================= */

function marioJuegoPantallaVictoria() {

    marioJuegoCtx.fillStyle =
        "rgba(0,0,0,0.7)";

    marioJuegoCtx.fillRect(
        0,
        0,
        marioJuegoCanvas.width,
        marioJuegoCanvas.height
    );

    marioJuegoCtx.fillStyle =
        "white";

    marioJuegoCtx.font =
        "60px Arial";

    marioJuegoCtx.fillText(
        "¡NIVEL COMPLETADO!",
        220,
        250
    );

    marioJuegoCtx.font =
        "30px Arial";

    marioJuegoCtx.fillText(
        "Puntos: " +
        marioJuegoPuntos,
        420,
        320
    );

    marioJuegoCtx.font =
        "20px Arial";

    marioJuegoCtx.fillText(
        "Gracias por jugar",
        450,
        380
    );
}

/* =========================
   LOOP PRINCIPAL
========================= */

function marioJuegoLoop() {

    if (!marioJuegoIniciado) {
        requestAnimationFrame(marioJuegoLoop);
        return;
    }

    marioJuegoCtx.clearRect(
        0,
        0,
        marioJuegoCanvas.width,
        marioJuegoCanvas.height
    );

    marioJuegoDibujarFondo();

    marioJuegoActualizarJugador();

    marioJuegoActualizarMonedas();

    marioJuegoActualizarEnemigos();

    marioJuegoActualizarCamara();

    marioJuegoDibujarPlataformas();

    marioJuegoDibujarTubos();

    marioJuegoDibujarMonedas();

    marioJuegoDibujarEnemigos();

    marioJuegoDibujarCastillo();

    marioJuegoDibujarBandera();

    marioJuegoDibujarJugador();

    if (
        marioJuegoColision(
            marioJuegoJugador,
            marioJuegoBandera
        )
    ) {

        marioJuegoGanado = true;

        try {
            marioJuegoVictoria.play();
        } catch (e) { }
    }

    if (marioJuegoGanado) {

        document.getElementById("marioJuegoPantallaFinal").style.display = "flex";

        return;
    }

    requestAnimationFrame(
        marioJuegoLoop
    );
}
/* =========================
   AJUSTES FINALES
========================= */

/* Evitar scroll con teclado */
window.addEventListener("keydown", (e) => {

    if (
        ["ArrowUp", "ArrowDown",
            "ArrowLeft", "ArrowRight", " "]
            .includes(e.key)
    ) {
        e.preventDefault();
    }
});

/* =========================
   INICIO AUTOMÁTICO DEL LOOP
========================= */

marioJuegoLoop();

/* =========================
   MEJORA: REINICIO SUAVE
========================= */

function marioJuegoReiniciar() {

    marioJuegoJugador.x = 100;
    marioJuegoJugador.y = 420;
    marioJuegoJugador.vx = 0;
    marioJuegoJugador.vy = 0;

    marioJuegoCamaraX = 0;

    marioJuegoPuntos = 0;
    marioJuegoVidas = 3;

    marioJuegoPuntosHTML.textContent = 0;
    marioJuegoVidasHTML.textContent = 3;

    marioJuegoGanado = false;

    marioJuegoMonedas.forEach(m => m.activa = true);
    marioJuegoEnemigos.forEach(e => e.vivo = true);
}

/* =========================
   OPCIONAL: REINICIO CON R
========================= */

document.addEventListener("keydown", (e) => {

    if (e.key === "r" || e.key === "R") {
        marioJuegoReiniciar();
    }
});

/* =========================
   MEJORA DE AUDIO (AUTO LOOP SEGURA)
========================= */

setInterval(() => {

    if (marioJuegoMusica.paused && !marioJuegoGanado) {
        marioJuegoMusica.play().catch(() => { });
    }

}, 3000);

document.getElementById("marioJuegoBtnReiniciar").onclick = () => {

    marioJuegoGanado = false;

    marioJuegoPuntos = 0;
    marioJuegoVidas = 3;

    marioJuegoJugador.x = 100;
    marioJuegoJugador.y = 420;
    marioJuegoJugador.vx = 0;
    marioJuegoJugador.vy = 0;

    marioJuegoCamaraX = 0;

    marioJuegoMonedas.forEach(m => m.activa = true);
    marioJuegoEnemigos.forEach(e => e.vivo = true);

    document.getElementById("marioJuegoPantallaFinal").style.display = "none";

    marioJuegoLoop();
};
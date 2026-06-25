interface Reserva {
    numeroReserva: string;
    nombreHuesped: string;
    tipoHabitacion: "simple" | "doble" | "suite";
    fechaIngreso: string;
    fechaSalida: string;
    temporada: "alta" | "baja";
    tipoHuesped: "regular" | "vip" | "corporativo";
    serviciosAdicionales: string[];
}

interface ReporteReserva {
    numeroReserva: string;
    nombreHuesped: string;
    tipoHabitacion: string;
    diasEstadia: number;
    costoBase: number;
    costoServicios: number;
    descuento: number;
    costoTotal: number;
}

function calcularDiasEstadia(
    ingreso: string,
    salida: string
): number {

    const inicio = new Date(ingreso);
    const fin = new Date(salida);

    return Math.floor(
        (fin.getTime() - inicio.getTime())
        / (1000 * 60 * 60 * 24)
    );
}

function calcularCostoBase(
    habitacion: string,
    temporada: string,
    dias: number
): number {

    const precios = {
        alta: {
            simple: 120,
            doble: 180,
            suite: 350
        },
        baja: {
            simple: 80,
            doble: 120,
            suite: 250
        }
    };

    return precios[
        temporada as "alta" | "baja"
    ][
        habitacion as "simple" | "doble" | "suite"
    ] * dias;
}

function calcularCostoServicios(
    servicios: string[],
    dias: number
): number {

    const precios: Record<string, number> = {
        desayuno: 25,
        wifi: 10,
        spa: 50,
        estacionamiento: 15,
        lavanderia: 20
    };

    let total = 0;

    servicios.forEach(servicio => {
        total += (precios[servicio] || 0) * dias;
    });

    return total;
}

function calcularDescuento(
    base: number,
    servicios: number,
    tipo: string
): number {

    const subtotal = base + servicios;

    switch (tipo) {
        case "vip":
            return subtotal * 0.15;

        case "corporativo":
            return subtotal * 0.10;

        default:
            return 0;
    }
}

function procesarReservas(
    reservas: Reserva[]
): ReporteReserva[] {

    return reservas.map(r => {

        const dias =
            calcularDiasEstadia(
                r.fechaIngreso,
                r.fechaSalida
            );

        const costoBase =
            calcularCostoBase(
                r.tipoHabitacion,
                r.temporada,
                dias
            );

        const costoServicios =
            calcularCostoServicios(
                r.serviciosAdicionales,
                dias
            );

        const descuento =
            calcularDescuento(
                costoBase,
                costoServicios,
                r.tipoHuesped
            );

        const costoTotal =
            costoBase +
            costoServicios -
            descuento;

        return {
            numeroReserva: r.numeroReserva,
            nombreHuesped: r.nombreHuesped,
            tipoHabitacion: r.tipoHabitacion,
            diasEstadia: dias,
            costoBase,
            costoServicios,
            descuento,
            costoTotal
        };
    });
}

const reservasHotel: Reserva[] = [
    {
        numeroReserva: "001",
        nombreHuesped: "Ana García",
        tipoHabitacion: "suite",
        fechaIngreso: "2024-07-15",
        fechaSalida: "2024-07-18",
        temporada: "alta",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "spa", "wifi"]
    },
    {
        numeroReserva: "002",
        nombreHuesped: "Carlos López",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-09-10",
        fechaSalida: "2024-09-13",
        temporada: "baja",
        tipoHuesped: "corporativo",
        serviciosAdicionales: [
            "desayuno",
            "wifi",
            "estacionamiento"
        ]
    },
    {
        numeroReserva: "003",
        nombreHuesped: "María Rodríguez",
        tipoHabitacion: "simple",
        fechaIngreso: "2024-08-20",
        fechaSalida: "2024-08-22",
        temporada: "alta",
        tipoHuesped: "regular",
        serviciosAdicionales: ["wifi"]
    },
    {
        numeroReserva: "004",
        nombreHuesped: "Juan Pérez",
        tipoHabitacion: "doble",
        fechaIngreso: "2024-06-01",
        fechaSalida: "2024-06-07",
        temporada: "baja",
        tipoHuesped: "vip",
        serviciosAdicionales: [
            "desayuno",
            "wifi",
            "lavanderia",
            "estacionamiento"
        ]
    }
];

const reporteHotel =
    procesarReservas(reservasHotel);

console.log("=======================================");
console.log("REPORTE DE RESERVAS HOTEL");
console.log("=======================================");

let ingresos = 0;

reporteHotel.forEach(r => {

    console.log(`Reserva #${r.numeroReserva}`);
    console.log(`Huésped: ${r.nombreHuesped}`);
    console.log(`Habitación: ${r.tipoHabitacion}`);
    console.log(`Estadía: ${r.diasEstadia} días`);
    console.log(`Costo Base: $${r.costoBase}`);
    console.log(`Servicios: $${r.costoServicios}`);
    console.log(`Descuento: $${r.descuento}`);
    console.log(`TOTAL: $${r.costoTotal}`);
    console.log("--------------------------------");

    ingresos += r.costoTotal;
});

console.log(`INGRESOS TOTALES: $${ingresos}`);
console.log(`RESERVAS: ${reporteHotel.length}`);
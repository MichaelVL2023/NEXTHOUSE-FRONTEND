import {ReservaAlquiler} from "./reserva-alquiler";
import {OpcionesPago} from "./opciones-pago";

export class Pago {
    idPago: number;
    fechaTransaccion:Date = new Date();
    monto: number;
    reserva:ReservaAlquiler;
    opcionesPago:OpcionesPago;
}

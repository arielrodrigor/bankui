type EventData = {
    tipo: string;
    data: any;
};

export class EventStore {
    private events: EventData[] = [];

    grabar(event: EventData) {
        this.events.push(event);
    }

    obtenerEventosParaEntidad(tipo: string, id: string) {
        return this.events.filter(
            event => event.data.detalles.numeroDeCuenta === id && event.tipo === tipo
        );
    }

    obtenerTodosEventos() {
        return this.events;
    }
}

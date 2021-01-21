export class ClienteModel {
  id: String;
  nombre: String;
  apellido: String;
  edad: number;
  fecha_nacimiento: String;

    constructor(){
        let fecha = new Date()
        this.fecha_nacimiento= fecha.toISOString().split('T')[0]
    }

}

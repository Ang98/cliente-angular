import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: ClienteModel[] = [];
  promedio = 0;
  desviacion = 0;
  constructor(private clientService: ClientesService) {}

  ngOnInit(): void {
    this.clientService.read_client().subscribe((resp) => {
      this.clientes = resp;
      if (this.clientes.length == 0) {
        this.promedio = 0;
        this.desviacion = 0;
      } else {
        this.promedio = this.calc_promedio(this.clientes);
        this.desviacion = this.calc_desviacion(this.clientes, this.promedio);
        console.log(this.promedio);
        console.log(this.desviacion);
      }
    });
  }

  eliminar_cliente(cliente: ClienteModel, i: number) {
    this.clientes.splice(i, 1);
    this.clientService.delete_client(cliente.id).subscribe();
    alert(`${cliente.nombre} ${cliente.apellido} fue borrado`);
    this.promedio = this.calc_promedio(this.clientes);
        this.desviacion = this.calc_desviacion(this.clientes, this.promedio);
        console.log(this.promedio);
        console.log(this.desviacion);
  }

  calc_promedio(clientes) {
    let suma = 0;
    clientes.map((x) => {
      suma = x.edad + suma;
    });

    const promedio = suma / clientes.length;

    return promedio;
  }

  calc_desviacion(clientes, promedio) {
    let suma = 0;
    clientes.map((x) => {
      suma = ((x.edad - promedio)**2) + suma;
    });

    const desviacion = (suma / (clientes.length - 1))**0.5;

    return desviacion;
  }
}

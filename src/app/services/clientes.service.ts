import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private url = 'https://cliente-crud-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  create_client(cliente: ClienteModel) {
    return this.http.post(`${this.url}/Clientes.json`, cliente).pipe(
      map((resp: any) => {
        cliente.id = resp.name;
        return cliente;
      })
    );
  }

  update_client(cliente: ClienteModel) {

    const clienteTemp = {...cliente}

    delete clienteTemp.id;

    return this.http.put(`${this.url}/Clientes/${cliente.id}.json`, clienteTemp);
  }

  get_client(id: String){

    return this.http.get(`${this.url}/Clientes/${id}.json`)

  }

  read_client(){
    return this.http.get(`${this.url}/Clientes.json`)
    .pipe(
      map(this.list_client)
    )
  }

  delete_client(id:String){
    return this.http.delete(`${this.url}/Clientes/${id}.json`,)
  }

  private list_client(lista: Object){

    const clientes: ClienteModel[]= []

    if (lista === null) { return [] }

    Object.keys(lista).forEach(key =>{

      const cliente: ClienteModel = lista[key]
      cliente.id = key;

      clientes.push(cliente)

    })

    return clientes;
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  cliente = new ClienteModel();
  btn_crear = true
  constructor(private clienteService: ClientesService,
              private route : ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id=="nuevo") {
      
    }else{
      this.btn_crear=false
      this.clienteService.get_client(id)
      .subscribe((resp:ClienteModel)=>{
        this.cliente = resp;
        this.cliente.id = id;
      })
    }

  }

  crear(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario invalido');
      return;
    }


    if (this.cliente.id) {
      this.clienteService.update_client(this.cliente).subscribe((resp) => {
        console.log(resp);
        alert('Cliente actualizado')
      });

    }else{
      this.clienteService.create_client(this.cliente).subscribe((resp) => {
        console.log(resp);
        alert('Cliente creado')
      });

    }

  }
}

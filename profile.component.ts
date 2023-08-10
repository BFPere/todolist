import { Component, OnInit } from '@angular/core';
import { Webservice } from './web.service';

@Component({
  selector: 'profile',
  template: `
    <mat-card>
      <mat-card-title>Editar perfil</mat-card-title>

        <mat-form-field class="example-full-width">
            <mat-label>Nombre:</mat-label>
            <input [(ngModel)]="modelo.nombre" matInput placeholder="Nombre">
        </mat-form-field>

        <mat-form-field class="example-full-width">
            <mat-label>Email</mat-label>
            <textarea [(ngModel)]="modelo.email" matInput placeholder="Introduzca su email"></textarea>
        </mat-form-field>

        <div class="example-button-row">
            <button (click)="post()" mat-flat-button color="primary">Guardar</button>
        </div>

    </mat-card>`,

})
export class ProfileComponent implements OnInit {

  constructor(private webservice: Webservice) {}

  modelo = {nombre: '', email: ''}

  ngOnInit() {
    this.webservice.getUser().subscribe((res: any) =>{
      this.modelo.nombre = res.nombre;
      this.modelo.email = res.email;
    });
    
  }

  post() {
    this.webservice.saveUser(this.modelo).subscribe();
  }

}

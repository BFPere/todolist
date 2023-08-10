import { Component } from '@angular/core';
import { Webservice } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'nueva-tarea',
  template: `
    <mat-card>
      <mat-card-title>Añadir tarea</mat-card-title>

        <mat-form-field class="example-full-width">
            <mat-label>Tarea</mat-label>
            <textarea [(ngModel)]="tarea.trabajo" matInput placeholder="Nombre y descripción de la tarea"></textarea>
        </mat-form-field>

        <div class="example-button-row">
            <button (click)="post()" mat-flat-button color="primary">Enviar</button>
        </div>

    </mat-card>`,

})
export class NuevaTareaComponent {

  constructor(private webservice: Webservice, private auth: AuthService) {}

  tarea = {trabajo: '', usuario: this.auth.name}
  post() {
    this.webservice.postTask(this.tarea);
  }

}

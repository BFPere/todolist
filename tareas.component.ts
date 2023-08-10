import { Component, OnInit } from '@angular/core';
import { Webservice } from './web.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'tareas',
  template: `<h1>Listado tareas: </h1 >
    <mat-card *ngFor="let tarea of tareasLista">
      <mat-card-title [routerLink]="['/tareas', tarea.usuario]"> {{tarea.usuario}}</mat-card-title>
      <mat-card-content>{{tarea.trabajo}}</mat-card-content>
    </mat-card>`,

})
export class TareasComponent implements OnInit {

  username: string ="";
  tareasLista: any;

  constructor(private webservice: Webservice, private rutaActiva: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.username = (this.rutaActiva.snapshot.params['username']);    
    this.webservice.getTask(this.username);
    this.webservice.tareasSujeto.subscribe(tareas =>{
      this.tareasLista = tareas;
    });
    this.webservice.getUser().subscribe();
  }

}

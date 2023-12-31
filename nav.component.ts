import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav',
  template: `<mat-toolbar color="primary">Todo List
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
  <mat-icon>more_vert</mat-icon>
</button>
<mat-menu #menu="matMenu">
  <button mat-menu-item routerLink="/">
    <mat-icon>home</mat-icon>
    <span>Inicio</span>
  </button>
  <button mat-menu-item routerLink="/tareas">
    <mat-icon>assignment_turned_in</mat-icon>
    <span>Tareas</span>
  </button>
  <button mat-menu-item routerLink="/login">
    <mat-icon>assignment_ind</mat-icon>
    <span>Identificarse</span>
  </button>
  <button mat-menu-item routerLink="/register">
    <mat-icon>assignment_ind</mat-icon>
    <span>Registro</span>
  </button>
  <button mat-menu-item routerLink="/" (click)="logout()">
    <mat-icon>highlight_off</mat-icon>
    <span>Salir</span>
  </button>
</mat-menu>
<span style="flex: 1 1 auto"></span>
<span *ngIf="ident" style="cursor:pointer" routerLink="/profile">Bienvenido {{name}}</span>
  </mat-toolbar>
    `
})
export class NavComponent {

  name: string;
  ident: boolean;
  constructor(private auth: AuthService){
    this.name = auth.name;
    this.ident = auth.identificado;

  }
  logout(){
    this.auth.logout();
  }

}
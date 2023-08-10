import { Component } from '@angular/core';
import { NuevaTareaComponent } from './nueva-tarea.component';
import { TareasComponent } from './tareas.component';

@Component({
  selector: 'home',
  template: `<nueva-tarea></nueva-tarea><tareas></tareas>`,
})

export class HomeComponent {

}

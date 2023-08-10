import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()

export class Webservice {

    APIURL = 'http://localhost:7070/api'

    private tareasDB: any;
    respuesta: any;
    tareasSujeto = new Subject(); // subject para acceder a BBDD de forma más segura.
    headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    tareas = this.tareasSujeto.asObservable();
    
    constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
        this.tareasDB = [];
        this.getTask(''); // càrrega inicial
    }

   getTask(username: string) {
            username = (username) ? '/' + username: '';
            this.http.get(this.APIURL + '/tareas' + username).subscribe(res =>{
               this.tareasDB = res;
               this.tareasSujeto.next(this.tareasDB);
            }, (error) => {
                this.manejadorErrores('No se han podido obtener tareas');
            });
    }

    async postTask(_tarea: { trabajo: string; usuario: string; }) {
        try {
            this.respuesta = await this.http.post(this.APIURL + '/tarea', _tarea).toPromise();
            this.tareasDB.push(this.respuesta);
            this.tareasSujeto.next(this.tareasDB); // no imprescindible, assegura que s'actualitza
        } catch (error) {
            this.manejadorErrores('No se ha podido publicar la tarea');
        }
    }

    getUser(){
        return this.http.get(this.APIURL + '/users/yop', {headers: this.headers}).pipe(map(res => res));
    }

    saveUser(usermodel: any){
        return this.http.post(this.APIURL + '/users/yop', usermodel, {headers: this.headers}).pipe(map(res => res));
    }


    private manejadorErrores(error: string){
        this._snackBar.open(error, 'Cerrar', {duration: 2000,});
    }

}
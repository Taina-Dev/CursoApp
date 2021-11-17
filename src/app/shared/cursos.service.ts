import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import{Curso} from './cursos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  curso: Curso = new Curso()
  readonly baseURL = 'https://localhost:44381/api/Cursos';

  constructor(private http: HttpClient) { }

  postCurso(): Observable<any> {
    return this.http.post(this.baseURL, this.curso);
   
  }

  putCurso(): Observable<any>{
   return  this.http.put(`${this.baseURL}/${this.curso.cursoId}`,this.curso);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(): Observable<any> {
    return this.http.get(this.baseURL);

  }
}

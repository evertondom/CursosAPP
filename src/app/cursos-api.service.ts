import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './Curso';

const httpOptions = {
   headers: new HttpHeaders({
    'content-Type': 'application/json'
   })
}
  

@Injectable({
  providedIn: 'root'
})


export class CursosApiService {

  url = 'http://localhost:53281/api/Cursos'

  constructor(private http:HttpClient) { }

  ListarCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.url)
  }

  PegarPeloId(CursoId: number): Observable<Curso>{
    const apiUrl = `${this.url}/${CursoId}`
    return this.http.get<Curso>(apiUrl)
  }
  
  AdicionarCurso(curso : Curso): Observable<any>{
    return this.http.post<Curso>(this.url, curso, httpOptions)
  }

  AtualizarCurso(curso : Curso): Observable<any>{
    return this.http.put<Curso>(`${this.url}/${curso.cursoId}`, curso, httpOptions)
  }

  DeletarCurso(CursoId : number): Observable<any>{
    return this.http.delete<any>(`${this.url}/${CursoId}`, httpOptions)
  }
}

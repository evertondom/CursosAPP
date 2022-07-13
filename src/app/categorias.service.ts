import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './Categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {



  constructor(private http:HttpClient) { }

  url = 'http://localhost:53281/api/Categorias'

  ListarCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url)
  }
}

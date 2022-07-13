import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Curso';
import { CursosApiService } from 'src/app/cursos-api.service';
import { CategoriasService } from 'src/app/categorias.service';
import { Categoria } from 'src/app/Categoria';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  formulario: any;
  cursos: Curso[];
  categorias: Categoria[];

  constructor(private cursosService: CursosApiService, private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.cursosService.ListarCursos().subscribe(resul =>{
      this.cursos = resul
    });
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });
    console.log(this.categorias)
  }

  
  
}

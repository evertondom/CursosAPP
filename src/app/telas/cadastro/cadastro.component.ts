import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Categoria } from 'src/app/Categoria';
import { CategoriasService } from 'src/app/categorias.service';
import { Curso } from 'src/app/Curso';
import { CursosApiService } from 'src/app/cursos-api.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario: any
  cursos: Curso[]
  categorias: Categoria[]

  constructor(private cursosService : CursosApiService, private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });

    this.formulario = new FormGroup({
      descricao: new FormControl(null),
      dataInicial: new FormControl(null),
      dataFinal: new FormControl(null),
      qtdAlunos: new FormControl(null),
      categoriaId: new FormControl(0)
    })
  }

  EnviarCadastro(): void{
    const curso : Curso = this.formulario.value
    console.log(curso)
    console.log(curso.descricao)

    this.cursosService.AdicionarCurso(curso).subscribe((resul)=>{
      alert('Curso Cadastrado com Sucesso!')
    })
  }
}

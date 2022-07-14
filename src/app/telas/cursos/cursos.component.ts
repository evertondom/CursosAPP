import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Curso';
import { CursosApiService } from 'src/app/cursos-api.service';
import { CategoriasService } from 'src/app/categorias.service';
import { Categoria } from 'src/app/Categoria';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  formulario: FormGroup<any>
  modalTitle: string = ''
  cursos: Curso[]
  categorias: Categoria[]
  cursosFiltrados: any = []
  private _buscar: string = ''

  constructor(private cursosService: CursosApiService, private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      descricao: new FormControl(null),
      dataInicial: new FormControl(null),
      dataFinal: new FormControl(null),
      qtdAlunos: new FormControl(null),
      categoriaId: new FormControl(0)
    })
    this.cursosService.ListarCursos().subscribe(resul =>
      this.cursos = resul);

    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });
  }

  public get buscar(){
    return this._buscar
  }

  public set search (value: string){
    this._buscar = value
    this.cursosFiltrados = this.buscar ? this.filtrarCursos(this.buscar) : this.cursos
  }

  filtrarCursos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase()
    return this.cursos.filter(
      (curso: { descricao: string}) =>
        curso.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  EnviarCadastro(): void{
    const curso : Curso = this.formulario.value
    console.log(curso)
    if(curso.cursoId > 0){
    this.cursosService.AtualizarCurso(curso).subscribe((resul)=>{
      alert('Curso Atualizado com Sucesso')
      this.cursosService.ListarCursos().subscribe(res =>{
        this.cursos = res
      })
    },
    (resultadoError)=>{
      alert(resultadoError.error);
    })
    }else{
      this.cursosService.AdicionarCurso(curso).subscribe((resul)=>{
      alert('Curso Cadastrado com Sucesso')
      this.cursosService.ListarCursos().subscribe(res =>{
        this.cursos = res
      })
    },
    (resultadoError)=>{
      alert(resultadoError.error);
    })
    }
  } 

  ExibeCadastro(): void{
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });
    console.log(this.categorias)
    this.modalTitle = `Novo Curso`
    this.formulario = new FormGroup({
      descricao: new FormControl(null),
      dataInicial: new FormControl(null),
      dataFinal: new FormControl(null),
      qtdAlunos: new FormControl(null),
      categoriaId: new FormControl(0)
    })
  }


  ExibeAtualizacao(cursoId): void{
    
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });
    this.cursosService.PegarPeloId(cursoId).subscribe(resul =>{
      this.modalTitle = `Atualizando`
      this.formulario = new FormGroup({
        cursoId: new FormControl(resul.cursoId),
        descricao: new FormControl(resul.descricao),
        qtdAlunos: new FormControl(resul.qtdAlunos),
        categoriaId: new FormControl(resul.categoriaId),
        dataInicial: new FormControl(resul.dataInicial.split("T")[0]),
        dataFinal: new FormControl(resul.dataFinal.split("T")[0])
      })
    })
  }
  
}

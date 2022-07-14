import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/Curso';
import { CursosApiService } from 'src/app/cursos-api.service';
import { CategoriasService } from 'src/app/categorias.service';
import { Categoria } from 'src/app/Categoria';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  formulario: FormGroup<any>
  cursos: Curso[]
  categorias: Categoria[]
  cursosFiltrados: Curso[]
  modalTitle: string
  private _buscar: string = ''


  public get buscar(){
    return this._buscar
  }

  public set buscar (value: string){
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


  constructor(private cursosService: CursosApiService, private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      descricao: new FormControl(null,[Validators.required]),
      dataInicial: new FormControl(null,[Validators.required]),
      dataFinal: new FormControl(null,[Validators.required]),
      qtdAlunos: new FormControl(null),
      categoriaId: new FormControl(0,[Validators.required])
    })
    this.cursosService.ListarCursos().subscribe(resul =>{
      this.cursos = resul, this.cursosFiltrados = this.cursos
    })
      
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    })
  }

  

  EnviarCadastro(): void{
    const curso : Curso = this.formulario.value

    if(curso.cursoId > 0){
    this.cursosService.AtualizarCurso(curso).subscribe((resul)=>{
      alert('Curso Atualizado com Sucesso')
      this.cursosService.ListarCursos().subscribe(res =>{
        this.cursosFiltrados = res
      })
    },
    (resultadoError)=>{
      alert(resultadoError.error.mensagem);
    })
    }else{
      this.cursosService.AdicionarCurso(curso).subscribe((resul)=>{
      alert('Curso Cadastrado com Sucesso')
      this.cursosService.ListarCursos().subscribe(res =>{
        this.cursosFiltrados = res
      })
    },
    (resultadoError)=>{
      alert(resultadoError.error.mensagem);
    })
    }
  } 

  ExibeCadastro(): void{
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });
    this.modalTitle = `Cadastrando`
    this.formulario = new FormGroup({
      descricao: new FormControl(null,[Validators.required]),
      dataInicial: new FormControl(null,[Validators.required]),
      dataFinal: new FormControl(null,[Validators.required]),
      qtdAlunos: new FormControl(null),
      categoriaId: new FormControl(0,[Validators.required])
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
        descricao: new FormControl(resul.descricao,[Validators.required]),
        qtdAlunos: new FormControl(resul.qtdAlunos),
        categoriaId: new FormControl(resul.categoriaId,[Validators.required]),
        dataInicial: new FormControl(resul.dataInicial.split("T")[0],[Validators.required]),
        dataFinal: new FormControl(resul.dataFinal.split("T")[0],[Validators.required])
      })
    })
  }
  
  DeletarCurso(deletar: number){
    this.cursosService.DeletarCurso(deletar).subscribe((resul)=>{
      alert('Deletado com Sucesso')
      this.cursosService.ListarCursos().subscribe((reg) =>{
        this.cursosFiltrados = reg
      })
      },
      (resultadoError)=>{
        alert(resultadoError.error.mensagem);
      }
    )
  }
}

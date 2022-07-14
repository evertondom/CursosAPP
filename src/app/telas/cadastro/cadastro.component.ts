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

  @Input() formulario: FormGroup<any>
  modalTitle: string = ''
  cursos: Curso[]
  categorias: Categoria[]
  
  private _search: string = ''

  constructor(
    private cursosService : CursosApiService,
    private categoriasService : CategoriasService,
    ) { }

  ngOnInit(): void {
    
    this.categoriasService.ListarCategorias().subscribe(resul =>{
      this.categorias = resul
    });
    this.modalTitle = 'Novo Curso'
    // this.formulario = new FormGroup({
    //   descricao: new FormControl(null),
    //   dataInicial: new FormControl(null),
    //   dataFinal: new FormControl(null),
    //   qtdAlunos: new FormControl(null),
    //   categoriaId: new FormControl(0)
    // })
  }

  EnviarCadastro(): void{
    const curso : Curso = this.formulario.value
    console.log(curso)
    if(curso.cursoId > 0){
      curso.ativo = true;
    this.cursosService.AtualizarCurso(curso).subscribe((resul)=>{
      alert('Curso Atualizado com Sucesso')
      this.cursosService.ListarCursos().subscribe(res =>{
        this.cursos = res
      })
    },
    (resultadoError)=>{
      alert(resultadoError.error.mensagem);
    })
    }else{
      curso.cursoId = 0;
      this.cursosService.AdicionarCurso(curso).subscribe((resul)=>{
      alert('Curso Cadastrado com Sucesso')
      this.cursosService.ListarCursos().subscribe(res =>{
        this.cursos = res
      })
    },
    (resultadoError)=>{
      alert(resultadoError.error.mensagem);
    })
    }
  } 

  voltar(): void{
    document.location.reload();
  }
}

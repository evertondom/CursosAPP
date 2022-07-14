import { Categoria } from "./Categoria"

export class Curso{
    cursoId: number
    descricao: string
    dataInicial: string
    dataFinal: string
    qtdAlunos: number
    ativo: boolean
    categoriaId: string
    categoria: Categoria
}
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Curso } from './../shared/cursos.model';
import { CursosService } from './../shared/cursos.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
 baseURL = 'https://localhost:44381/api/Cursos';
 constructor(public service: CursosService, private toastr: ToastrService, private http: HttpClient) { }
 cursos: Curso[] = []
 private _filtroLista: string ='';



   public get filtroLista(): string {
     return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.cursos = this.filtroLista ? this.filtrarCursos(this.filtroLista): this.cursos;
  }

  ngOnInit(): void {
    this.service.refreshList().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  filtrarCursos(filtrarPor: string): any{
    filtrarPor= filtrarPor.toLocaleLowerCase();
    return this.cursos.filter(
      (curso: {nomeCurso: string; dataInicio: string;categorias: string}) => curso.nomeCurso.toLocaleLowerCase().indexOf(filtrarPor) !== -1||
      curso.dataInicio.toLocaleLowerCase().indexOf(filtrarPor) !== -1 || curso.dataInicio.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  populateForm(curso: Curso){
    this.service.curso = curso;

  }

  onSubmit(form: NgForm) {
    if(this.service.curso == null ) return
    if (this.service.curso.cursoId == 0)

      this.insertRecord(form);
    else
      this.updateRecord(form);
      this.service.refreshList();
      this.toastr.success('Salvo com sucesso', 'resgistro de cursos')
  }

  onDelete(id: number){
    if (confirm('Atenção deseja excluir este registro?')){
      this.service.deleteCurso(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error('Registro deletado', 'registro de curso')
        },
        err => {console.log(err)}
      )
    }
  }

  insertRecord(form: NgForm) {

    if(this.service.curso == null ) return
    this.service.postCurso().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Inserido com sucesso', 'resgistro de cursos')
      },
      err => { console.log(err); }
    );
  }

  checarDatas(){
    let datainicial = new Date(this.service.curso.dataInicio);
    let datafinal = new Date(this.service.curso.data);
    console.log(datainicial,datafinal)
    if(this.service.curso == null ) return
    if(datainicial >= datafinal){
      this.toastr.error('Data invalida');
      this.service.curso.dataInicio = "";
      this.service.curso.data = "";
    }
    else{
      this.toastr.success("Data valida")
    }
  }

  updateRecord(form: NgForm) {
    this.service.putCurso().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Editado com sucesso', 'registro de curso')
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset()
  }



}




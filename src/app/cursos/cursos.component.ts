import { Curso } from './../shared/cursos.model';
import { CursosService } from './../shared/cursos.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = []
  constructor(public service: CursosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList().subscribe(cursos => {
      this.cursos = cursos;
    });
  }
  populateForm(curso: Curso){
    this.service.curso = curso;
  }
  AdicionarCurso(){
    debugger
    this.service.curso= new Curso()

  }

  onDelete(id: number){
    if (confirm('Atenção deseja excluir este registro?')){
      this.service.deleteCurso(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error("Registro deletado.", 'Cadastro curso');
        },
        err => {console.log(err)}
      )
    }
  }
  onSubmit(form: NgForm) {
    if(this.service.curso == null ) return

    if (this.service.curso.cursoId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  insertRecord(form: NgForm) {
    if(this.service.curso == null ) return
    this.service.postCurso().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Inserido com sucesso', 'resgistro de')
      },
      err => { console.log(err); }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putCurso().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Salvo com sucesso', 'registro de curso')
      },
      err => { console.log(err); }
    );
  }
  resetForm(form: NgForm) {
    form.form.reset();

  }


}




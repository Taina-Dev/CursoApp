import { Curso } from './../../shared/cursos.model';
import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from 'src/app/shared/cursos.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {


  constructor(public service: CursosService, private toastr: ToastrService) { }

  ngOnInit(): void {

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
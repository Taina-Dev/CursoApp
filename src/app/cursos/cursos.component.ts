import { Curso } from './../shared/cursos.model';
import { CursosService } from './../shared/cursos.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


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


}

import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl  } from '@angular/forms';

import { PessoaDto } from 'src/models/PessoaDto.model.';
import { PessoaService } from 'src/services/pessoa.service';

@Component({
  selector: 'app-tabela-pessoas',
  templateUrl: './tabela-pessoas.component.html',
  providers: [DecimalPipe],
  styleUrls: ['./tabela-pessoas.component.css']
})

export class TabelaPessoasComponent {

  idPessoa = '';

	private _filter : string = "";
  public PessoasFiltradas : PessoaDto[]
  PESSOAS: PessoaDto[] = [];

  public get filter() : string{
    return this._filter;
  }

  public set filter(value: string){
    this._filter = value;
    this.PessoasFiltradas = this.filter ? this.filtrarPessoas(this.filter) : this.PESSOAS;
  }

  filtrarPessoas(filtrarPor: string) : PessoaDto[] {
    filtrarPor = filtrarPor.toLowerCase();

    return this.PESSOAS.filter(
      pessoa => pessoa.name.toLowerCase().indexOf(filtrarPor) != -1
    )

  }

	constructor(pipe: DecimalPipe, private pessoaService: PessoaService) {}

  async ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas(){
    this.pessoaService.getPessoas().subscribe(res => {
      this.PESSOAS = res;
      this.PessoasFiltradas = this.PESSOAS;
    });
  }

  removerPessoa(idPessoa: string): void{
    if(confirm("Certeza que deseja deletar?")) {
      this.pessoaService.removerPessoa(idPessoa).subscribe(res => {
        console.log('deletedao com sucesso!!');
        this.carregarPessoas();
      });
    }
  }

}

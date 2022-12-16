import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { PessoaService } from 'src/services/pessoa.service';
import { PessoaDtoCreate } from 'src/models/PessoaDtoCreate.model';


@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrls: ['./modal-adicionar.component.css']
})

export class ModalAdicionarComponent implements OnInit{

    form: FormGroup;

    @Output() carregarTabelaPessoas = new EventEmitter

    constructor(private fb:FormBuilder, private modalService: NgbModal, private pessoaService: PessoaService) {
    }

    ngOnInit(): void {
      this.form = this.fb.group({
        nome: ['', Validators.required],
        contatos: this.fb.array([]) ,
      });
    }

    get contatos() : FormArray {
      return this.form.get("contatos") as FormArray
    }

    novoContato(): FormGroup {
      return this.fb.group({
        email: ['', [Validators.email]],
        telefone: '',
        whatsApp: '',
      })
    }

    adicionarContato() {
      this.contatos.push(this.novoContato());
    }

    async onSubmit() {

      if(this.form.valid){
        let novaPessoa: PessoaDtoCreate = new PessoaDtoCreate(this.form.value.nome, this.form.value.contatos)
        this.pessoaService.adicionarPessoa(novaPessoa).subscribe(res =>{
          this.carregarTabelaPessoas.emit();
          this.close();
        })

      }

      else{
        console.log('form invalido');
      }

    }

  open(content : any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-adicionar-pessoa'}).result;
	}

  close() {
    this.contatos.clear();
    this.form.reset();
    this.modalService.dismissAll();

	}

}

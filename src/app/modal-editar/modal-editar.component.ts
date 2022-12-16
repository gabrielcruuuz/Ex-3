import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'
import { PessoaService } from 'src/services/pessoa.service';
import { PessoaDtoUpdate } from 'src/models/PessoaDtoUpdate.model';
import { PessoaDto } from 'src/models/PessoaDto.model.';
import { ContatoDto } from 'src/models/ContatoDto.model';


@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit {

  form: FormGroup;
  pessoa: PessoaDto ;

  @Output() carregarTabelaPessoas = new EventEmitter
  @Input() idPessoa = '';


  constructor(private fb:FormBuilder, private modalService: NgbModal, private pessoaService: PessoaService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      nome: [{value: '', disabled: true}, Validators.required],
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

  removerContato(index: number) {
    this.contatos.removeAt(index);
  }

  async onSubmit() {

    if(this.form.valid){
      let pessoaUpdate: PessoaDtoUpdate = new PessoaDtoUpdate(this.form.value.id, this.form.value.contatos)
      this.pessoaService.updatePessoa(pessoaUpdate).subscribe(res =>{
        this.carregarTabelaPessoas.emit();
        this.close();
      })

    }

    else{
      console.log('form invalido');
    }

  }

  carregarPessoa(idPessoa : string){
    this.pessoaService.getPessoa(idPessoa).subscribe(res => {
      this.pessoa = res;

      this.form = this.fb.group({
        id: idPessoa,
        nome: [{value: this.pessoa.name, disabled: true}, Validators.required],
        contatos: this.fb.array([]) ,
      });


      this.preencherFormulario(this.pessoa.contatos);
    });
  }

  preencherFormulario(contatos : ContatoDto[]){
    contatos.forEach(elemento => {

     let controleForm = this.fb.group({
        email: [elemento.email, [Validators.email]],
        telefone: [elemento.telefone],
        whatsApp: [elemento.whatsApp],
      })

      this.contatos.push(controleForm);
    });


  }

  open(content : any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-editar-pessoa'}).result;
    this.carregarPessoa(this.idPessoa);
  }

  close() {
    this.contatos.clear();
    this.form.reset();
    this.modalService.dismissAll();
  }

}

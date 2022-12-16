import { ContatoDto } from "./ContatoDto.model";

export class PessoaDto {
 id: string
 name: string;
 contatos: ContatoDto[]

  constructor(id:string, name: string, contatos: ContatoDto[]) {
    this.id = id
    this.name = name;
    this.contatos = contatos;
  }
}

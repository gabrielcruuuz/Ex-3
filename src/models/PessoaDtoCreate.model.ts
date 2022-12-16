import { ContatoDto } from "./ContatoDto.model";

export class PessoaDtoCreate {
 name: string;
 contatos: ContatoDto[]

  constructor(name: string, contatos: ContatoDto[]) {
    this.name = name;
    this.contatos = contatos;
  }
}

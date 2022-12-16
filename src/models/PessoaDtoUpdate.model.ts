import { ContatoDto } from "./ContatoDto.model";

export class PessoaDtoUpdate{
 id: string;
 contatos: ContatoDto[]

  constructor(id: string, contatos: ContatoDto[]) {
    this.id = id;
    this.contatos = contatos;
  }
}

export class ContatoDto {
  public email: string;
  public telefone: string;
  public whatsApp: string;

  constructor(obj: any) {
    this.email = obj && obj.email || '';
    this.telefone = obj && obj.telefone || null;
    this.whatsApp = obj && obj.whatsApp || null;
  }

}

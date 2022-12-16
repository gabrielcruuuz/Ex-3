import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { PessoaDto } from 'src/models/PessoaDto.model.';

import { PessoaDtoCreate } from 'src/models/PessoaDtoCreate.model';
import { PessoaDtoUpdate } from 'src/models/PessoaDtoUpdate.model';


@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  //TESTE LOCAIS:
  // private API: string = 'https://localhost:44372/api/Pessoa';

  private API: string = 'https://listacontatos20221216155214.azurewebsites.net/api/Pessoa';

  constructor(private httpClient: HttpClient){}

    getPessoas(): Observable<PessoaDto[]>{
        return this.httpClient.get<PessoaDto[]>(`${this.API}`)
    }

    getPessoa(idPessoa : string): Observable<PessoaDto>{
      return this.httpClient.get<PessoaDto>(`${this.API}/${idPessoa}`)
    }

    adicionarPessoa(novaPessoa: PessoaDtoCreate): Observable<PessoaDto> {
      return this.httpClient.post<PessoaDto>(`${this.API}`, novaPessoa);
    }

    removerPessoa(idPessoa: string) : Observable<boolean>{
      return this.httpClient.delete<boolean>(`${this.API}/${idPessoa}`)
    }

    updatePessoa(pessoaAlterada: PessoaDtoUpdate) : Observable<PessoaDto>{
      return this.httpClient.put<PessoaDto>(`${this.API}`, pessoaAlterada)
    }

    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
    }
}

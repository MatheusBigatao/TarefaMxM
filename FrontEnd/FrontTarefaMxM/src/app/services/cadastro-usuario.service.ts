import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroPessoaDTO } from '../models/DTOs/cadastroPessoaDTO';
import { urlGlobal } from './urlGlobal';
@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

    constructor(private httpClient:HttpClient) { }

    cadastrarPessoa(cadastroPessoaDTO: CadastroPessoaDTO):Observable<any>{
        return this.httpClient.post(`${urlGlobal}/cadastrousuario`,cadastroPessoaDTO, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'text/plain',
              'Allow-Origin': '*',
              'Access-Control-Allow-Origin': '*'
            })
            })
            .pipe(
                res => res,
                error => error
                )
    
        }
}

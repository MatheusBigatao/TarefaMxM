import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroPessoaDTO } from '../models/DTOs/cadastroPessoaDTO';
import { urlGlobal } from './urlGlobal';


@Injectable({
  providedIn: 'root'
})
export class CepApiExternalService {

    constructor(private httpClient:HttpClient) { }

    /**
     * Retorna informação de endereço a partir do numero do CEP.
     *
     * @param {string} cep - O CEP que irá obter os dados do endereço.
     * @return {Observable<any>} Oobservable com a informação do endereço.
     */
    dadosLogradouroPeloCep(cep: string):Observable<any>{
    return this.httpClient.get(`${urlGlobal}/correioapi?cep=${cep}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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

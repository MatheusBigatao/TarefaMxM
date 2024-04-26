import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import {CadastroUsuarioService} from '../services/cadastro-usuario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskPipe, NgxMaskDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    cadastroForm: FormGroup;

    constructor(private _http: HttpClient, private _route: Router, private usuarioServices:CadastroUsuarioService) {
        this.cadastroForm = new FormGroup({
            primeiro_nome: new FormControl('', Validators.required),
            sobrenome: new FormControl('', Validators.required),
            cpf_cnpj_valor: new FormControl('', [Validators.required]),
            cpf_cnpj: new FormControl('cpf', Validators.required),
            email: new FormControl('', Validators.required),
            telefone: new FormControl('', Validators.required),
            cep: new FormControl('', Validators.required),
            estado: new FormControl('UF', Validators.required),
            cidade: new FormControl('', Validators.required),
            rua: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            bairro: new FormControl('', Validators.required),
            complemento: new FormControl('', Validators.required),
        });
    }

    submitForm() {
        alert('Login efetuado com sucesso!')
        // this._http.get<any>('http://localhost:3000/users').subscribe(res => {
        //     const user = res.find((u: any) => { return u.cpf === this.cadastroForm.value.cpf && u.senha === this.cadastroForm.value.senha })
        //     if (user) {
        //         alert('Login efetuado com sucesso!')
        //         localStorage.setItem('user', JSON.stringify(user))
        //         this.cadastroForm.reset()
        //         this._route.navigate(['/home'])
        //     } else {
        //         alert('Usuario ou senha incorretos!')
        //     }
        // })
    }

    limpar_cpf_cnpj(){
        let element = document.getElementById('cpf_cnpj_valor') as HTMLInputElement;
        if (element) {
            let value = element.value = '';
        }
    }

    atribuir_mascara_cpf_cnpj() {
        let element_selected = document.getElementById('cpf_cnpj') as HTMLInputElement;

        let element_valor = document.getElementById('cpf_cnpj_valor') as HTMLInputElement;
        if (element_valor) {
            let value = element_valor.value;
            let pattern = /^(\d{3})?(\d{3})?(\d{3})?(\d{2})?$/;
            let replacement = element_selected.value == 'cpf' ? '$1.$2.$3-$4' : '$1.$2.$3/$4-$5';
            element_valor.value = value.replace(pattern, replacement);
            let masked_value = element_valor.value.replace(/\D/g, '');
            element_valor.value = masked_value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, replacement);
        }
    }
}

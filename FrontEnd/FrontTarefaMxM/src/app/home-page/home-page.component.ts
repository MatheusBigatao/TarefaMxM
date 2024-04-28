import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { CadastroUsuarioService } from '../services/cadastro-usuario.service';
import { HttpClient } from '@angular/common/http';
import { CadastroPessoaDTO } from '../models/DTOs/cadastroPessoaDTO';
import { CepApiExternalService } from '../services/cep-api-external.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskPipe, NgxMaskDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
    cadastroForm: FormGroup;

    constructor(private _http: HttpClient, private _route: Router, private usuarioServices:CadastroUsuarioService, private cepServico: CepApiExternalService) {
        this.cadastroForm = new FormGroup({
            primeiro_nome: new FormControl('', Validators.required),
            sobrenome: new FormControl('', Validators.required),
            cpf_cnpj_valor: new FormControl('', [Validators.required]),
            cpf_cnpj: new FormControl('cpf', Validators.required),
            email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
            telefone: new FormControl('', Validators.required),
            cep: new FormControl('', Validators.required),
            estado: new FormControl('UF', Validators.required),
            cidade: new FormControl('', Validators.required),
            rua: new FormControl('', Validators.required),
            numero: new FormControl('', Validators.required),
            bairro: new FormControl('', Validators.required),
            complemento: new FormControl('', Validators.required),
        });

        var element_cpf_cnpj = document.getElementById('cpf_cnpj_valor') as HTMLInputElement;
        element_cpf_cnpj?.addEventListener('keypress', () => {
            this.atribuir_mascara_cpf_cnpj();
        })

    }

    validacaoTodosCampos():boolean {
        if (this.checarFormatacaoInput('primeiro_nome', true) || this.checarFormatacaoInput('sobrenome', true) ||
            this.checarFormatacaoInput('cpf_cnpj_valor', true) || this.checarFormatacaoInput('cpf_cnpj_valor') ||
            this.checarFormatacaoInput('email', true) || this.checarFormatacaoInput('email') ||
            this.checarFormatacaoInput('cep', true) || this.checarFormatacaoInput('estado', true) ||
            this.checarFormatacaoInput('cidade', true) || this.checarFormatacaoInput('rua', true) ||
            this.checarFormatacaoInput('numero', true) || this.checarFormatacaoInput('bairro', true) ||
            this.checarFormatacaoInput('telefone', true) || this.checarFormatacaoInput('telefone')
            )
        {
            return true;
        }
        return false;
    }
    submitForm() {
        this.cadastroForm.markAllAsTouched();
        if (this.validacaoTodosCampos()) {
            alert('Todos os campos devem ser preenchidos corretamente!');
            return;
        }

        var pessoaCadastrada = new CadastroPessoaDTO();

        pessoaCadastrada.nome = this.cadastroForm.value.primeiro_nome + ' ' + this.cadastroForm.value.sobrenome;

        var documentoSelecionado = this.cadastroForm.value.cpf_cnpj;
        if (documentoSelecionado == 'cpf'){
            pessoaCadastrada.cpf = this.cadastroForm.value.cpf_cnpj_valor;
            pessoaCadastrada.cnpj = "";
        }else{ // cnpj
            pessoaCadastrada.cpf = "";
            pessoaCadastrada.cnpj = this.cadastroForm.value.cpf_cnpj_valor;
        }
        pessoaCadastrada.telefone = this.cadastroForm.value.telefone;
        pessoaCadastrada.email = this.cadastroForm.value.email;
        pessoaCadastrada.endereco.cep = this.cadastroForm.value.cep.replace(/-/g, '');
        pessoaCadastrada.endereco.uf = this.cadastroForm.value.estado;
        pessoaCadastrada.endereco.cidade = this.cadastroForm.value.cidade;
        pessoaCadastrada.endereco.logradouro = this.cadastroForm.value.rua + ', ' + this.cadastroForm.value.numero;
        pessoaCadastrada.endereco.bairro = this.cadastroForm.value.bairro;
        pessoaCadastrada.endereco.complemento = this.cadastroForm.value.complemento;

        this.usuarioServices.cadastrarPessoa(pessoaCadastrada).subscribe(
            {
                next: (res) => {
                    // console.log(res);
                }
            }
        )
        alert('Cadastro efetuado com sucesso!')
    }

    limpar_cpf_cnpj(){
        var element_selected: HTMLInputElement = document.getElementById('cpf_cnpj') as HTMLInputElement;
        var tipo_selecionado:string = element_selected.value;
        var maxLength:number = 14;
        var placeholder:string = '123.456.789-10';
        if (tipo_selecionado == 'cpf'){
            maxLength = 14
        }else{
            maxLength = 18
            placeholder = '00.623.904/0001-73';
    }
        var element: HTMLInputElement = document.getElementById('cpf_cnpj_valor') as HTMLInputElement;
        if (element) {
            element.value = '';

            element.maxLength =maxLength;
            element.placeholder = placeholder;
        }
    }

    

    atribuir_mascara_cpf_cnpj() {
        var element_selected = document.getElementById('cpf_cnpj') as HTMLInputElement;

        var element_valor = document.getElementById('cpf_cnpj_valor') as HTMLInputElement;
        if (!element_valor) {
            return;
        }
        var inputLength = element_valor.value.length;

        if (element_selected.value == 'cpf'){ // Máscara para CPF 123.456.789-10
            if(inputLength === 3 || inputLength === 7){
                element_valor.value += '.';
            }else if(inputLength === 11){
                element_valor.value += '-';
            }
        }else if(element_selected.value == 'cnpj'){ // Máscara para CNPJ  00.623.904/0001-73
            if(inputLength === 2 || inputLength === 6){
                element_valor.value += '.';
            }else if (inputLength === 10){
                element_valor.value += '/';
            }else if(inputLength === 15){
                element_valor.value += '-';
            }
        }
    }

    atribuir_mascara_cep() {
        var element_valor = document.getElementById('cep') as HTMLInputElement;
        var inputLength = element_valor.value.length;
        
        if(inputLength === 5){
            element_valor.value += '-';
        }
    }
    atribuir_mascara_telefone() {
        var element_valor = document.getElementById('telefone') as HTMLInputElement;
        var inputLength = element_valor.value.length;
        ehNumeroCelular = true;
        if (inputLength >4) {
            var digitoCelular = element_valor.value.charAt(5);
            switch (digitoCelular) {
                case '6':
                case '7':
                case '8':
                case '9':
                    var ehNumeroCelular = true;
                break;
                default:
                    var ehNumeroCelular = false;
                break;
            }
        }

        if (ehNumeroCelular){
            element_valor.maxLength = 15;
        }else{
            element_valor.maxLength = 14;
        }

        if(inputLength === 1){
            element_valor.value = '('+element_valor.value;
        }else if(inputLength === 3){
            element_valor.value += ') ';
        }

        if (ehNumeroCelular){
            if(inputLength === 10){
                element_valor.value += '-';
            }
        }else {
            if(inputLength === 9){
                element_valor.value += '-';
            }
        }
        
    }

    checarEstado() {
        var element = document.getElementById('estado') as HTMLSelectElement;
        var value = element.selectedOptions[0].value;
        if (value == 'UF') {
            return true;
        }
        return false;
    }
    checarFormatacaoInput(idInput: string, naoPodeVazio?: boolean) {
        var element = document.getElementById(idInput) as HTMLInputElement;
        
        var value = element.value;

        if (naoPodeVazio) {
            if (!value) {
                return true;
            }
            else{
                return false;
            }
        }
        
        // Não aparece formatação inválida se o campo estiver vazio
        if (!value) {
            return false;
        }

        switch(idInput) {
            case "cpf_cnpj_valor":
                if (!value) {
                    return false;
                }
                var element_cpf_cnpj = document.getElementById('cpf_cnpj') as HTMLInputElement;
                var tipo_selecionado = element_cpf_cnpj.value;
                if (tipo_selecionado == 'cpf'){
                    var regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
                }else{ //CNPJ
                    var regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
                }
                return !regex.test(String(value).toLowerCase());
            break;
            case "email":
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return !regex.test(String(value).toLowerCase());
            break;

            case "telefone":
                var regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                return !regex.test(String(value).toLowerCase());

            break;
            case "estado":
                if (value == "UF") {
                    return true;
                }else{
                    return false;
                }
            break;
            default:
                return false;
            break;
        }
    }

    pesquisaCep() {
        var element_cep = document.getElementById('cep') as HTMLInputElement;
        var cep = element_cep.value;
        if (!cep) {
            return;
        }
        cep = cep.replace(/-/g, ''); // Removendo o "-"

        this.cepServico.dadosLogradouroPeloCep(cep).subscribe(
            {
                next: (res) => {
                    this.atualizaEnderecoPeloCep(res);
                }
            }
        )

    }
    atualizaEnderecoPeloCep(res: any) {
        this.cadastroForm.patchValue({
            cep: res.cep,
            estado: res.uf,
            cidade: res.cidade,
            rua: res.logradouro,
            bairro: res.bairro
        })
    }
}

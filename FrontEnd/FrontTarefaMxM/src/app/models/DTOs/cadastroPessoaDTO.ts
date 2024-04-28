export class CadastroPessoaDTO{
    public nome!: string;
    public cpf: string = "";
    public cnpj: string = "";
    public email!: string;
    public telefone!: string;
    public endereco: EnderecoDTO = new EnderecoDTO();
}

export class EnderecoDTO{
    public cep!: string;
    public uf!: string;
    public cidade!: string;
    public bairro!: string;
    public logradouro!: string;
    public complemento: string = "";
}
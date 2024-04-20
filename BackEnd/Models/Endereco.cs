using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Endereco
    {
        string Cep { get; set; }
        string Uf { get; set; }
        string Cidade { get; set; }
        string Bairro { get; set; }
        string Logradouro { get; set; }
        string Complemento { get; set; }
    }
}
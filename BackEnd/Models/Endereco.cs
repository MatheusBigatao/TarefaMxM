using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class Endereco
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        public string Cep { get; set; }
        public string Uf { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Logradouro { get; set; }
        public string Complemento { get; set; }
    public Endereco(string cep, string uf, string cidade, string bairro, string logradouro, string complemento)
        {
            Cep = cep;
            Uf = uf;
            Cidade = cidade;
            Bairro = bairro;
            Logradouro = logradouro;
            Complemento = complemento;
        }
    }

}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using BackEnd.Models;

namespace Mysql.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string? CPF { get; set; }
        public string? CNPJ { get; set; }
        public string Email { get; set; } = "";
        public string Telefone { get; set; } = "";
        public Endereco? Endereco { get; set; }

        public Usuario(string nome)
        {
           Nome = nome;
        }
    }
}

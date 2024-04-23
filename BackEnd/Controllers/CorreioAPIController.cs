using System.Text.Json;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Mysql.Context;
using Mysql.Models;

namespace Mysql.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CorreioAPIController : ControllerBase
    {
        private readonly AppDbContext DBContext;

        public CorreioAPIController(AppDbContext context)
        {
            DBContext = context;
        }
        [HttpGet(Name = "LogradouroPeloCEP")]
        public async Task<Endereco> Get(string Cep)
        {
            HttpClient client = new HttpClient();

            var response = await client.GetAsync($"https://viacep.com.br/ws/{Cep}/json/");
            var conteudo = await response.Content.ReadAsStringAsync();

            var endereco = JsonSerializer.Deserialize<Endereco>(conteudo);

            return endereco;

            // return new Endereco()
            // -            {
            // -                Cep = "12345678",
            // -                Cidade = "Cidade",
            // -                Logradouro = "Logradouro",
            // -                Bairro = "Bairro",
            // -                Complemento = "Complemento",
            // -            };
        }
    }
}
using BackEnd.Contracts;
using BackEnd.Models;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace BackEnd.ExternalAPIs
{
    public class ViaCepAPI : ICepAPI
    {
        public string Cep {get; set;} = "";
        public string URL {get;} = "https://viacep.com.br/ws/";
        public async Task<Endereco?> Get(string Cep)
        {
            var client = new HttpClient();
            var response = await client.GetAsync($"https://viacep.com.br/ws/{Cep}/json/");

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            var conteudo = await response.Content.ReadAsStringAsync();
            JObject json = JObject.Parse(conteudo);
            string cep = json["cep"]?.ToString() ?? "";
            string uf = json["uf"]?.ToString() ?? "";
            string localidade = json["localidade"]?.ToString() ?? "";
            string bairro = json["bairro"]?.ToString() ?? "";
            string logradouro = json["logradouro"]?.ToString() ?? "";
            string complemento = json["complemento"]?.ToString() ?? "";

            Endereco endereco = new Endereco(cep, uf, localidade, bairro, logradouro, complemento);

            return endereco;
        }

    }
}
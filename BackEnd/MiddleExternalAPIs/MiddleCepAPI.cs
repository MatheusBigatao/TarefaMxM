using BackEnd.Contracts;
using BackEnd.Models;
using BackEnd.ExternalAPIs;

namespace BackEnd.MiddleExternalAPIs
{
    public class MiddleCepAPI
    {
        private ICepAPI CepAPI { get; } = new ViaCepAPI();

        public MiddleCepAPI(){ 
        }

        public async Task<Endereco?> GetCepInfo (string Cep) {
            return await CepAPI.Get(Cep);
        }
    }
}
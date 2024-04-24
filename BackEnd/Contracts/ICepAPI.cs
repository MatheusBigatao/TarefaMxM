using BackEnd.Models;

namespace BackEnd.Contracts
{
    public interface ICepAPI
    {
        string Cep { get; set; }
        string URL { get; }
        Task<Endereco?> Get(string Cep);
    }
}
using System.Text.Json;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Mysql.Context;
using Mysql.Models;

using BackEnd.Contracts;
using BackEnd.ExternalAPIs;
using BackEnd.MiddleExternalAPIs;

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
        public async Task<IActionResult> Get(string Cep)
        {
            MiddleCepAPI CepAPI = new MiddleCepAPI();
            Endereco? responseEndereco = await CepAPI.GetCepInfo(Cep);
            if (responseEndereco == null)
            {
                return BadRequest();
            }
            return Ok(responseEndereco);
        }
    }
}
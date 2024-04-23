using Microsoft.AspNetCore.Mvc;
using Mysql.Context;
using Mysql.Models;

namespace Mysql.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CadastroUsuarioController : ControllerBase
    {
        private readonly AppDbContext DBContext;

        public CadastroUsuarioController(AppDbContext context)
        {
            DBContext = context;
        }

        [HttpPost(Name = "CadastroUsuario")]
        public async Task<bool> Post(Usuario novoUsuario)
        {
            // Usuario usuario = new Usuario("Matheus", "qTqZv@example.com", "31999999999");
            Usuario usuario = novoUsuario;
            var criarUsuario = await DBContext.Usuarios.AddAsync(usuario);
            await DBContext.SaveChangesAsync();

            return true;

           
        }
    }
}
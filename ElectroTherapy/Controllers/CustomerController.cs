using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ElectroTherapy.Auth;
using ElectroTherapy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace ElectroTherapy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly IAuthService auth;

        public CustomerController(IConfiguration config, IAuthService auth)
        {
            this.config = config;
            this.auth = auth;
        }
        
        [HttpPost("signup")]
        public async Task<IActionResult> AddUser(Customer newUser)
        {
            try
            {
                await using var context = new ElectroDbContext(this.config);
                context.Customers.Add(newUser);
                await context.SaveChangesAsync();
            }
            catch (DbUpdateException ex) when ((ex.InnerException as MySqlException)?.ErrorCode ==
                                               MySqlErrorCode.DuplicateKeyEntry)
            {
                return StatusCode(500, "This e-mail already exists. How many accounts do you need?");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Error in updating database.");

            }

            return this.Ok();
        }
        
        [HttpPost("signin")]
        public async Task<ActionResult<string>> SignIn(SignInRequest user)
        {
            await using var context = new ElectroDbContext(this.config);
            var customer = context.Customers.SingleOrDefault(c => c.Email == user.Email && c.Password == user.Password);
            if (customer == null)
            {
                return StatusCode(500, "Incorrect e-mail or password, or both?");
            }

            return this.auth.GenerateToken(customer);
        }

    }
}
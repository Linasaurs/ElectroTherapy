using System;
using System.Linq;
using System.Threading.Tasks;
using ElectroTherapy.Auth;
using ElectroTherapy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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
        public async Task AddUser(Customer newUser)
        {
            await using var context = new ElectroDbContext(this.config);
            context.Customers.Add(newUser);
            await context.SaveChangesAsync();
        }
        
        [HttpPost("signin")]
        public async Task<string> SignIn(SignInRequest user)
        {
            await using var context = new ElectroDbContext(this.config);
            var customer = context.Customers.Single(c => c.Email == user.Email && c.Password == user.Password);
            if (customer == null)
            {
                throw new Exception("User not found");
            }

            return this.auth.GenerateToken(customer);
        }

    }
}
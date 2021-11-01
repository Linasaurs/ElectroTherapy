using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectroTherapy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ElectroTherapy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration config;

        public ProductController(IConfiguration config)
        {
            this.config = config;
        }

        [HttpGet]
        public async Task<List<Product>> GetProducts()
        {
            await using var context = new ElectroDbContext(this.config);
            return await context.Products.ToListAsync();
        }
        
        [HttpPost]
        public async Task AddProduct(Product newProduct)
        {
            await using var context = new ElectroDbContext(this.config);
            context.Products.Add(newProduct);
            await context.SaveChangesAsync();
        }
    }
}
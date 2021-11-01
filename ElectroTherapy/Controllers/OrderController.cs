using System;
using System.Linq;
using System.Threading.Tasks;
using ElectroTherapy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ElectroTherapy.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController:ControllerBase
    {
        private readonly IConfiguration config;

        public OrderController(IConfiguration config)
        {
            this.config = config;
        }
        
        [HttpPost("{productId}/{count}")]
        public async Task AddOrder([FromRoute(Name="productId")] int productId, [FromRoute(Name="count")] int count)
        {
            await using var context = new ElectroDbContext(this.config);
            var product = context.Products.Single(prod => prod.Id == productId);
            
            if (product == null)
            {
                throw new Exception("Cannot add order to unknown product");
            }
            
            var customer = context.Customers.First();
            context.Orders.Add(new Order
            {
                Count = count,
                Customer = customer,
                Product = product,
                TotalAmount = await this.CalculateTotalPrice(product, count)
            });
            await context.SaveChangesAsync();
        }
        
        [HttpGet("getTotalPrice/{productId}/{count}")]
        public async Task<decimal> GetTotalPrice([FromRoute(Name="productId")] int productId, [FromRoute(Name="count")] int count)
        {
            await using var context = new ElectroDbContext(this.config);
            var product= context.Products.Single(p => p.Id == productId);
            
            return await this.CalculateTotalPrice(product, count);
        }

        private async Task<decimal> CalculateTotalPrice(Product product, int count)
        {
            await using var context = new ElectroDbContext(this.config);
            var discount = context.Discounts.OrderByDescending(d => d.Percentage)
                .FirstOrDefault(d => d.Product.Id == product.Id && d.MinCount <= count);

            if (discount == null)
            {
                return product.Price * count;
            }
            else
            {
                return product.Price * count * (1 - discount.Percentage);
            }
        }
    }
}
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
    public class DiscountController :ControllerBase
    {
        private readonly IConfiguration config;

            public DiscountController(IConfiguration config)
            {
                this.config = config;
            }

            [HttpPost]
            public async Task AddDiscount(AddDiscountRequest addDiscountRequest)
            {
                await using var context = new ElectroDbContext(this.config);
                var product = context.Products.Single(prod => prod.Id == addDiscountRequest.ProductId);
                if (product == null)
                {
                    throw new Exception("Cannot add discount to unknown product");
                }
                context.Discounts.Add(new Discount
                {
                    Product = product,
                    MinCount = addDiscountRequest.MinCount,
                    Percentage = addDiscountRequest.Percentage
                });
                await context.SaveChangesAsync();
            }
    }
}
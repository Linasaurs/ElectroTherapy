using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;

namespace ElectroTherapy.Models
{
    public class ElectroDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        private readonly IConfiguration config;
        
        public ElectroDbContext(IConfiguration config)
        {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            string connectionString = ConfigurationExtensions.GetConnectionString(this.config, "ElectroDb");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }

        protected override void OnModelCreating(ModelBuilder models)
        {
            models.Entity<Customer>().HasIndex(m => m.Email).IsUnique();
        }

    }
}
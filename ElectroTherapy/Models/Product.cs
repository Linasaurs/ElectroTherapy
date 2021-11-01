using System.ComponentModel.DataAnnotations;

namespace ElectroTherapy.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public ProductCategory Category { get; set; }
        
        public string Desc { get; set; }
    }
}
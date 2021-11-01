using System.ComponentModel.DataAnnotations;

namespace ElectroTherapy.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Product Product { get; set; }
        [Required]
        public int Count { get; set; }
        [Required]
        public Customer Customer { get; set; }
        [Required] 
        public decimal TotalAmount { get; set; }

    }
}
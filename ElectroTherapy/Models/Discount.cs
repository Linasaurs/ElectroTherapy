using System.ComponentModel.DataAnnotations;

namespace ElectroTherapy.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Product Product { get; set; }
        [Required]
        public int MinCount { get; set; }
        [Required]
        [Range(0.0,1.0)]
        public decimal Percentage { get; set; }
    }
}
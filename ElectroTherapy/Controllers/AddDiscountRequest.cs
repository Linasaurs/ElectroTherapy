using System.ComponentModel.DataAnnotations;
using ElectroTherapy.Models;

namespace ElectroTherapy.Controllers
{
    public class AddDiscountRequest
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int MinCount { get; set; }
        [Required]
        public decimal Percentage { get; set; }
    }
}
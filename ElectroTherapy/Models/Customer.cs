using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ElectroTherapy.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public bool IsAdmin { get; set; } = false;

    }
}
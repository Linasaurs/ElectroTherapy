using ElectroTherapy.Models;

namespace ElectroTherapy.Auth
{
    public interface  IAuthService
    {
        string GenerateToken(Customer user);
    }
}
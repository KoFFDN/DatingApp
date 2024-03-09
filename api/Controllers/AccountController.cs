using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    public class AccountController: BaseApiController
    {
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService): base(context)
        {
            _tokenService = tokenService;
        }

        public bool ValidateRegisterUser(RegisterDTO register) {
            return string.IsNullOrEmpty(register.Username) || string.IsNullOrEmpty(register.Password);
        }

        private async Task<bool> IsUserExists(string userName) {
            return await this.context.Users.AnyAsync(x=> x.UserName == userName.ToLower());
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO) {
            var user = await this.context.Users.SingleOrDefaultAsync(x => x.UserName == loginDTO.Username.ToLower());
            if(user == null) {
                return Unauthorized();
            }
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            for(int i = 0; i<=passwordHash.Length-1; i++) {
                if(passwordHash[i] != user.PasswordHash[i]) {
                    return Unauthorized();
                }
            }
            return new UserDTO {
                Username = loginDTO.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO register) {
            if(ValidateRegisterUser(register)) {
                return BadRequest("Error: validation");
            }
            if(await IsUserExists(register.Username)) {
                return BadRequest("Error: User exists");
            }
            using var hmac = new HMACSHA512();
            var user = new AppUser() {
                UserName = register.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            
            return new UserDTO {
                Username = register.Username,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    public class UsersController: BaseApiController
    {
        public UsersController(DataContext context) : base(context) {}

        [AllowAnonymous]
        [HttpGet] 
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() {
            return await this.context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id) {
            return await this.context.Users.FindAsync(id);
        } 
        
    }
}
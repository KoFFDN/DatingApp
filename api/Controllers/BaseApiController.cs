using System.Diagnostics;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController: ControllerBase
    {
        public readonly DataContext context;

        public BaseApiController(DataContext context) {
            this.context = context;
        }
    }
}
﻿namespace api.Data
{
    using api.Entities;
    using Microsoft.EntityFrameworkCore;

    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options): base(options) { }

        public DbSet<AppUser> Users { get; set; }
    }
}

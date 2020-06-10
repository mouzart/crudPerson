using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotaControl.Model
{
    public class NotaControlContext : DbContext
    {
        public NotaControlContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Person> Person { get; set; }
    }
}

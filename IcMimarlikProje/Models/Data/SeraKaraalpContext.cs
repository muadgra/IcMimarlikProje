using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace IcMimarlikProje.Models.Data
{
    public partial class SeraKaraalpContext : DbContext
    {
        public SeraKaraalpContext()
            : base("name=SeraKaraalpContext")
        {
        }

        public virtual DbSet<Articles> Articles { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Articles>()
                .Property(e => e.Title)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .Property(e => e.Content)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .Property(e => e.Thumbnail)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .Property(e => e.SeoAuthor)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .Property(e => e.SeoDescription)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .Property(e => e.SeoTags)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .Property(e => e.Slug)
                .IsUnicode(false);

            modelBuilder.Entity<Articles>()
                .HasMany(e => e.Comment)
                .WithRequired(e => e.Articles)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Comment>()
                .Property(e => e.CommentText)
                .IsUnicode(false);

            modelBuilder.Entity<Comment>()
                .Property(e => e.AuthorName)
                .IsUnicode(false);

            modelBuilder.Entity<Comment>()
                .Property(e => e.CommentIp)
                .IsUnicode(false);
        }
    }
}

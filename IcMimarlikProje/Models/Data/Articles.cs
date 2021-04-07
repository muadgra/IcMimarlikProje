namespace IcMimarlikProje.Models.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Articles
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Articles()
        {
            Comment = new HashSet<Comment>();
        }

        [Key]
        public int ArticleId { get; set; }

        [StringLength(100)]
        public string Title { get; set; }

        public string Content { get; set; }

        [StringLength(100)]
        public string Thumbnail { get; set; }

        public DateTime? CreatedDate { get; set; }

        public int? ViewsCount { get; set; }

        public int? CommentsCount { get; set; }

        [StringLength(100)]
        public string SeoAuthor { get; set; }

        [StringLength(250)]
        public string SeoDescription { get; set; }

        [StringLength(250)]
        public string SeoTags { get; set; }

        public DateTime? UpdateDate { get; set; }

        [StringLength(50)]
        public string Slug { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Comment> Comment { get; set; }
    }
}

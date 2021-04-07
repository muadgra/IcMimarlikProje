namespace IcMimarlikProje.Models.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Comment")]
    public partial class Comment
    {
        public int CommentId { get; set; }

        [StringLength(250)]
        public string CommentText { get; set; }

        [StringLength(25)]
        public string AuthorName { get; set; }

        public int ArticleId { get; set; }

        [StringLength(50)]
        public string CommentIp { get; set; }
        public DateTime? CommentDate { get; set; }

        public virtual Articles Articles { get; set; }
    }
}

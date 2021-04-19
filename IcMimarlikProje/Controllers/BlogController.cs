using IcMimarlikProje.Models.Data;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace IcMimarlikProje.Controllers
{
    [RoutePrefix("Blog")]
    public class BlogController : Controller
    {
        private bool KullaniciIpKontrol(string ipAdresi)
        {
            var lastComment = db.Comment.OrderByDescending(x => x.CommentDate).FirstOrDefault();
            DateTime now = DateTime.Now;
            TimeSpan difference = now.Subtract((DateTime)lastComment.CommentDate);
            if(difference.TotalSeconds < 60)
            {
                return false;
            }
            return true;
        }
        private readonly SeraKaraalpContext db = new SeraKaraalpContext();
        public ActionResult Index()
        {
            return View(db.Articles.ToList());
        }

        public ActionResult Yazi(string Slug)
        {
            var model = db.Articles.Where(x => x.Slug == Slug).FirstOrDefault();

            return View(model);
        }

        public JsonResult Yorum()
        {
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        
        // POST: Articles/Delete/5
        [HttpPost]
        public JsonResult Yorum([Bind(Include = "CommentId, CommentText, AuthorName, ArticleId")] Comment comment,string recaptcha)
        {
            if (recaptcha == "ERR")
                return Json("ERR", JsonRequestBehavior.AllowGet);
            if (recaptcha == "NOAUTHOR")
                return Json("NOAUTHOR", JsonRequestBehavior.AllowGet);
            if (recaptcha == "NOCOMMENT")
                return Json("NOCOMMENT", JsonRequestBehavior.AllowGet);

            
            var response = recaptcha;
            string secretKey = "";
            var client = new WebClient();
            var result = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", secretKey, response));
            var obj = JObject.Parse(result);
            var status = (bool)obj.SelectToken("success");

            // Eğer google doğrulama yapıldıysa
            if (status)
            {
                string ipAddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (string.IsNullOrEmpty(ipAddress))
                {
                    ipAddress = Request.ServerVariables["REMOTE_ADDR"];
                }
                //buraya ip adres kontrolü koy.

                if (!KullaniciIpKontrol(ipAddress))
                {
                    return Json("FLOOD", JsonRequestBehavior.AllowGet);
                }
                comment.CommentIp = ipAddress;



                comment.CommentDate = DateTime.Now;
                string commentStyle = "";
                try
                {
                    db.Comment.Add(comment);
                    db.SaveChanges();
                    commentStyle =
                        string.Format(@"
                                <div class='comment-card' style='background-color:rgba(0,255,0,0.1)'>
                                    <img src = 'img/comment-avatar-2.jpg' alt='' class='comment-card__image' />
                                    <div class='comment-card__content'>
                                        <div class='comment-card__head'>
                                            <div class='comment-card__name'>{0}</div>
                                            <div class='comment-card__date'>- {1}</div>
                                        </div>
                                        <div class='comment-card__text'>
                                            {2}
                                        </div>
                                    </div>
                                </div>
                    ", comment.AuthorName, comment.CommentDate, comment.CommentText);
                    return Json(commentStyle, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {

                    return Json(commentStyle, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
                

            
        }
    }
}

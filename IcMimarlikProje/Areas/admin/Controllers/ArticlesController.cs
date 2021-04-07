using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using IcMimarlikProje.Areas.admin.Models;
using IcMimarlikProje.Models.Data;

namespace IcMimarlikProje.Controllers
{
    [AuthorizeAdminUserAttribute]
    public class ArticlesController : Controller
    {
        private SeraKaraalpContext db = new SeraKaraalpContext();

        // GET: Articles
        public ActionResult Index()
        {
            if (Session["AdminUser"].ToString() == "1")
            {              
                var articles = db.Articles.ToList();
                return View(articles.ToList());
            }
            else
                return RedirectToAction("Giris", "Admin");

        }

        // GET: Articles/Details/5
        public ActionResult Details(int? id)
        {

            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Articles articles = db.Articles.Find(id);
            if (articles == null)
            {
                return HttpNotFound();
            }
            return View(articles);
        }

        
        public ActionResult Create()
        {
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title");
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title");

            return View();
        }

        // POST: Articles/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create([Bind(Include = "ArticleId,Title,Content,Thumbnail,CreatedDate,ViewsCount,CommentsCount,SeoAuthor,SeoDescription,SeoTags")] Articles articles, HttpPostedFileBase Thumbnail)
        {
            if (ModelState.IsValid)
            {
                
                articles.CreatedDate = DateTime.Now;
                articles.Slug = Kullanici.GetFriendlyTitle(articles.Title);
                articles.ViewsCount = 1;
                articles.CommentsCount = 0;
                articles.UpdateDate = DateTime.Now;
                if (articles.Thumbnail != null)
                {
                    string fileName = articles.Slug + Path.GetExtension(Kullanici.GetFriendlyTitle(Thumbnail.FileName));
                    try
                    {
                        string path = Path.Combine(Server.MapPath("~/UploadedFiles"), fileName);
                        Thumbnail.SaveAs(path);
                        articles.Thumbnail = fileName;
                    }
                    catch (Exception)
                    {
                        articles.Thumbnail = "resim-yok.jpg";
                    }
                }
                db.Articles.Add(articles);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title", articles.ArticleId);
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title", articles.ArticleId);
            return View(articles);
        }

        // GET: Articles/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Articles articles = db.Articles.Find(id);
            if (articles == null)
            {
                return HttpNotFound();
            }
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title", articles.ArticleId);
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title", articles.ArticleId);
            return View(articles);
        }

        // POST: Articles/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit([Bind(Include = "ArticleId,Title,Content,Thumbnail,CreatedDate,ViewsCount,CommentsCount,SeoAuthor,SeoDescription,SeoTags,Slug")] Articles articles, HttpPostedFileBase Thumbnail)
        {
            if (ModelState.IsValid)
            {
                if(Thumbnail != null)
                {
                    string fileName = articles.Slug + Path.GetExtension(Thumbnail.FileName);
                    string path = Path.Combine(Server.MapPath("~/UploadedFiles"), fileName);
                    Thumbnail.SaveAs(path);
                    articles.Thumbnail = fileName;
                }
                articles.UpdateDate = DateTime.Now;
                db.Entry(articles).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title", articles.ArticleId);
            ViewBag.ArticleId = new SelectList(db.Articles, "ArticleId", "Title", articles.ArticleId);
            return View(articles);
        }
        
        // GET: Articles/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Articles articles = db.Articles.Find(id);
            if (articles == null)
            {
                return HttpNotFound();
            }
            return View(articles);
        }

        // POST: Articles/Delete/5
        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                Articles articles = db.Articles.Find(id);
                db.Articles.Remove(articles);
                
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

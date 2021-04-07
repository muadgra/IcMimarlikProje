using IcMimarlikProje.Models.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IcMimarlikProje.Controllers
{
    [RoutePrefix("")]
    public class HomeController : Controller
    {
        private readonly SeraKaraalpContext db = new SeraKaraalpContext();
        public List<Articles> gonderilecekPostlar = new List<Articles>();
        
        [Route("")]
        public ActionResult Index()
        {
            var postlar = db.Articles.OrderByDescending(x => x.CreatedDate).Take(3);
            return View(postlar);
        }
        
        [Route("iletisim")]
        public ActionResult Iletisim()
        {
            return View();
        }
        [Route("Kurumsal")]
        public ActionResult Kurumsal()
        {
           
            return View();
        }
        
    }
}
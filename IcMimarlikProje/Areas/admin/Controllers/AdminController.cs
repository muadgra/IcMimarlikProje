using IcMimarlikProje.Areas.admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace IcMimarlikProje.Areas.admin.Controllers
{
   
    public class AdminController : Controller
    {
        [AuthorizeAdminUserAttribute]
        public ActionResult AdminSayfasi()
        {
            return View();
        }
        public ActionResult Giris()
        {
            if (Session["AdminUser"]!=null)
            {
                return RedirectToAction(nameof(AdminSayfasi));
            }
            else
                return View();
        }
        [HttpPost]
        public ActionResult Giris( Kullanici kullanici)
        {
            //These values are not used in the real site for security purposes.
            if (kullanici.KullaniciSifresi.Equals("ad") && kullanici.KullaniciSifresi.Equals("sifre"))
            {

                Session["AdminUser"] = "1";
                return RedirectToAction(nameof(AdminSayfasi));
            }
            else
            {
                return RedirectToAction(nameof(Giris));
            }
        }
        public ActionResult Logout()
        {
            Session["AdminUser"] = null;
            return RedirectToAction(nameof(Giris));
        }
    }
}
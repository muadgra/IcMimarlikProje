using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;
using System.Web.Routing;

namespace IcMimarlikProje.Areas.admin.Models
{
    public class AuthorizeAdminUserAttribute : ActionFilterAttribute, IAuthenticationFilter
    {
        public void OnAuthentication(AuthenticationContext filterContext)
        {
            var sessionValue = filterContext.HttpContext.Session["AdminUser"];

            if (sessionValue == null)
            {
                filterContext.Result = new HttpUnauthorizedResult();
            }
            else
            {
                HttpContext.Current.Session["AdminUser"] = sessionValue.ToString();
            }
        }
        public void OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
        {
            if (filterContext.Result == null || filterContext.Result is HttpUnauthorizedResult)
            {
                //Redirecting the user to the Login View of Account Controller  
                filterContext.Result = new RedirectToRouteResult(
                new RouteValueDictionary
                {
                     { "controller", "Admin" },
                     { "action", "Giris" }
                });
            }
        }
    }
}
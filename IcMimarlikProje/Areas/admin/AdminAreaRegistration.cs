                                            using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

public class AdminAreaRegistration : AreaRegistration
{
    public override string AreaName
    {
        get { return "admin"; }
    }
    public override void RegisterArea(AreaRegistrationContext context)
    {
        context.MapRoute(
            "admin_default",
            "admin/{controller}/{action}/{id}",
            new { action = "AdminSayfasi",controller="Admin", id = UrlParameter.Optional }
        );
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace IcMimarlikProje.Areas.admin.Models
{
    public class Kullanici
    {
        public string KullaniciAdi { get; set; }
        public string KullaniciSifresi { get; set; }
        public static string GetFriendlyTitle(string title, bool remapToAscii = false, int maxlength = 80)
        {
            if (title == null)
            {
                return string.Empty;
            }

            int length = title.Length;
            title = ReplaceMethod(title);
            bool prevdash = false;
            StringBuilder stringBuilder = new StringBuilder(length);
            char c;

            for (int i = 0; i < length; ++i)
            {
                c = title[i];
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
                {
                    stringBuilder.Append(c);
                    prevdash = false;
                }
                else if (c >= 'A' && c <= 'Z')
                {
                    // tricky way to convert to lowercase
                    stringBuilder.Append((char)(c | 32));
                    prevdash = false;
                }
                else if ((c == ' ') || (c == ',') || (c == '.') || (c == '/') ||
                    (c == '\\') || (c == '-') || (c == '_') || (c == '='))
                {
                    if (!prevdash && (stringBuilder.Length > 0))
                    {
                        stringBuilder.Append('-');
                        prevdash = true;
                    }
                }
                else if (c >= 128)
                {
                    int previousLength = stringBuilder.Length;


                    stringBuilder.Append(c);

                    if (previousLength != stringBuilder.Length)
                    {
                        prevdash = false;
                    }
                }

                if (i == maxlength)
                {
                    break;
                }
            }

            if (prevdash)
            {
                return stringBuilder.ToString().Substring(0, stringBuilder.Length - 1);
            }
            else
            {
                return stringBuilder.ToString();
            }
        }

        private static string ReplaceMethod(string item)
        {
            item = item.ToLower();
            item = item.Replace("ü", "u");
            item = item.Replace("ö", "o");
            item = item.Replace("ş", "s");
            item = item.Replace("ç", "c");
            item = item.Replace("ğ", "g");
            item = item.Replace("ı", "i");
            return item;
        }
    }
}
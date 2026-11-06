# راهنمای راه‌اندازی داشبورد فهیم فتحی (اپ قابل نصب، همگام بین دو نفر، کار بدون اینترنت)

اینجا همان روشی است که برای صندوق استفاده شد: میزبانی رایگان روی GitHub Pages و پایگاه داده رایگان Firebase.
همه‌چیز رایگان است و ثبت‌ها روی همهٔ گوشی‌ها همگام می‌شود. بدون اینترنت هم می‌شود ثبت کرد و با وصل شدن اینترنت خودکار ارسال می‌شود.

## گام ۱ ـ ساخت پروژه در Firebase
1. به console.firebase.google.com برو و با حساب گوگل وارد شو.
2. «Add project» را بزن و یک نام بگذار (مثلاً fahim-dashboard). آنالیتیکس را خاموش کن.
3. از منوی Build > **Authentication** > Get started > Sign-in method > **Email/Password** را روشن (Enable) و ذخیره کن.
4. در همان بخش، تب **Users** > Add user: ایمیل و رمز خودت را بساز. بعد یک کاربر دیگر برای نفر دوم بساز.
5. از Build > **Firestore Database** > Create database. محل را نزدیک‌ترین بگذار و حالت **Production mode** را انتخاب کن.
6. در Firestore تب **Rules** را باز کن، محتوای فایل `firestore.rules` را جایگزین کن، دو ایمیل داخلش را با ایمیل‌های همان دو کاربر عوض کن و **Publish** بزن.
7. روی چرخ‌دنده کنار Project Overview > Project settings > پایین صفحه Your apps > آیکون وب `</>` > یک نام بده و Register کن.
   بلوک `firebaseConfig` را می‌بینی. مقادیرش را در فایل `config.js` به جای `PASTE_...` بنویس.

## گام ۲ ـ گذاشتن فایل‌ها روی GitHub Pages
1. در github.com یک مخزن (repository) جدید بساز، مثلاً fahim-dashboard. می‌تواند Public باشد، چون هیچ داده‌ای داخل فایل‌ها نیست.
2. «Add file > Upload files» را بزن و همهٔ فایل‌های این پوشه را آپلود کن (index.html، config.js، sw.js، manifest.webmanifest و سه آیکون). Commit کن.
3. Settings > **Pages** > Source را روی «Deploy from a branch» بگذار، شاخهٔ main و پوشهٔ root را انتخاب و Save بزن.
4. بعد از یکی دو دقیقه آدرسی مثل `https://نام‌کاربری.github.io/fahim-dashboard/` ساخته می‌شود.

## گام ۳ ـ نصب روی گوشی
1. آدرس را روی گوشی باز کن (اولین بار با اینترنت) و با ایمیل و رمزی که ساختی وارد شو.
2. اندروید (Chrome): منوی سه‌نقطه > **Install app** یا Add to Home screen. آیفون (Safari): دکمهٔ اشتراک > **Add to Home Screen**.
3. نفر دوم هم همین کار را با ایمیل و رمز خودش انجام بدهد.

## گام ۴ ـ انتقال داده‌های فعلی
1. در آرتیفکت فعلی: «قیمت‌ها و پشتیبان» > «ساخت کد پشتیبان» > «کپی کد».
2. در اپ جدید: «قیمت‌ها و پشتیبان» > کد را در کادر بچسبان > «ورود اطلاعات».

## نکته‌ها
- بعد از تغییر index.html یا config.js روی GitHub، در sw.js شمارهٔ VERSION را یکی بالا ببر (مثلاً fahim-gh-v2) تا گوشی‌ها نسخهٔ جدید را بگیرند.
- اگر هنگام ورود خطای «unauthorized-domain» دیدی: در Firebase > Authentication > Settings > Authorized domains، دامنهٔ `نام‌کاربری.github.io` را اضافه کن.
- اگر ورود یا ثبت جواب نداد، ممکن است Firebase یا GitHub بدون فیلترشکن در دسترس نباشند.
- ورود اول حتماً باید با اینترنت باشد. بعد از آن برنامه بدون اینترنت هم باز می‌شود و ورود حفظ می‌ماند.

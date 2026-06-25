import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.resolve(__dirname, "../src/i18n/locales");
const enPath = path.join(localesDir, "en.json");
const arPath = path.join(localesDir, "ar.json");

/** Keys whose string values must never be translated */
const SKIP_KEYS = new Set([
  "href",
  "embedUrl",
  "mapsUrl",
  "directionsUrl",
  "action",
  "type",
  "step",
  "suffix",
  "required",
]);

/** Exact string values to preserve */
const PRESERVE_EXACT = new Set([
  "Dynamic Oil Tools",
  "Dynamic Oil Tools Co.",
  "LinkedIn",
  "DOT",
  "info@dynamicoiltools.com",
  "+966 (13) 8041290",
  "tel:+966138041290",
  "mailto:info@dynamicoiltools.com",
  "you@company.com",
  "cookie-preferences",
  "email",
  "phone",
  "address",
  "Apex Energy",
  "Gulf Industrial",
  "Petroline",
  "Meridian Drilling",
  "Orinoco Fields",
  "Steel Basin Co.",
  "Horizon Petroleum",
  "Titan Well Services",
  "Autodesk Inventor Professional",
  "Inventor HSM (CAM) & Feature CAM",
  "Tenaris",
  "SABIC",
  "DynamicLink",
  "API Spec 4F Certificate of Registration",
  "API Spec 7-1 Certificate of Registration",
  "API Spec 11B Certificate of Registration",
  "API Spec 16A Certificate of Registration",
  "API Spec 19C Certificate of Registration",
  "https://www.google.com/maps?q=25.9235182,49.9488192&hl=en&z=17&output=embed",
  "https://maps.app.goo.gl/Drv9WZHNdiHDiLdFA",
  "https://www.google.com/maps/dir/?api=1&destination=25.9235182,49.9488192",
  "{{locale}}",
  "",
  "PDF",
]);

function shouldPreserve(value, key, parentPath = "") {
  if (typeof value !== "string") return true;
  if (SKIP_KEYS.has(key)) return true;
  if (PRESERVE_EXACT.has(value)) return true;
  if (key === "name" && parentPath.includes("trustedPartners")) return true;
  if (key === "alt" && parentPath.includes("trustedPartners")) return true;
  if (key === "value" && /contact|footer\.contact|map\.address|pages\.contact/.test(parentPath))
    return true;
  if (/^(\/|#|https?:\/\/|mailto:|tel:)/.test(value)) return true;
  if (key === "value" && /^\+?\d/.test(value) && value.includes("@") === false)
    return /\d{3,}/.test(value);
  if (key === "value" && value.includes("@")) return true;
  return false;
}

function translateValue(value, key, parentPath = "") {
  if (shouldPreserve(value, key, parentPath)) return value;
  if (T[value] !== undefined) return T[value];
  return value;
}

function deepTranslate(obj, parentKey = "", parentPath = "") {
  if (typeof obj === "string") {
    return translateValue(obj, parentKey, parentPath);
  }
  if (Array.isArray(obj)) {
    return obj.map((item, i) =>
      deepTranslate(item, parentKey, `${parentPath}[${i}]`),
    );
  }
  if (obj !== null && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const path = parentPath ? `${parentPath}.${k}` : k;
      if (typeof v === "string") {
        out[k] = translateValue(v, k, path);
      } else {
        out[k] = deepTranslate(v, k, path);
      }
    }
    return out;
  }
  return obj;
}

const T = {
  // Footer quick links (duplicate nav)
  Home: "الرئيسية",
  "About Us": "من نحن",
  Products: "المنتجات",
  Catalogs: "الكتالوجات",
  News: "الأخبار",
  "Contact Us": "اتصل بنا",

  Services: "الخدمات",
  "Oil & Gas Equipment": "معدات النفط والغاز",
  "Process Industry Screens": "شاشات الصناعات التحويلية",
  "Downhole Screens": "شاشات أسفل البئر",
  "Screen Baskets & Strainers": "سلال الشبك والمصافي",
  "Product Treatments": "معالجات المنتجات",

  "Contact Information": "معلومات الاتصال",
  Email: "البريد الإلكتروني",
  Phone: "الهاتف",
  Address: "العنوان",
  "Privacy Policy": "سياسة الخصوصية",
  "Terms & Conditions": "الشروط والأحكام",
  "Cookie Preferences": "تفضيلات ملفات تعريف الارتباط",

  "We value your privacy":
    "نحن نُقدّر خصوصيتك",
  "We use cookies to improve your experience, analyze site traffic, and support our marketing efforts. You can accept all cookies, reject non-essential cookies, or customize your preferences.":
    "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة الموقع ودعم جهودنا التسويقية. يمكنك قبول جميع ملفات تعريف الارتباط أو رفض غير الضرورية منها أو تخصيص تفضيلاتك.",
  "Accept All": "قبول الكل",
  "Reject Non-Essential": "رفض غير الضرورية",
  "Customize Preferences": "تخصيص التفضيلات",
  "Manage how Dynamic Oil Tools uses cookies and similar technologies. Necessary cookies are always active because they are required for the website to function.":
    "إدارة كيفية استخدام Dynamic Oil Tools لملفات تعريف الارتباط والتقنيات المماثلة. تبقى ملفات تعريف الارتباط الضرورية مفعّلة دائمًا لأنها مطلوبة لعمل الموقع.",
  "Save Preferences": "حفظ التفضيلات",
  Necessary: "ضرورية",
  "Required for core site functionality such as security, network management, and accessibility. These cannot be disabled.":
    "مطلوبة لوظائف الموقع الأساسية مثل الأمان وإدارة الشبكة وإمكانية الوصول. لا يمكن تعطيلها.",
  Analytics: "التحليلات",
  "Help us understand how visitors interact with our website so we can improve performance and content.":
    "تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا لتحسين الأداء والمحتوى.",
  Marketing: "التسويق",
  "Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.":
    "تُستخدم لتقديم إعلانات ذات صلة وقياس فعالية حملاتنا التسويقية.",
  Preferences: "التفضيلات",
  "Remember your settings and choices to provide a more personalized experience on future visits.":
    "تتذكر إعداداتك واختياراتك لتوفير تجربة أكثر تخصيصًا في الزيارات المستقبلية.",
  "Cookie consent": "الموافقة على ملفات تعريف الارتباط",

  Directions: "الاتجاهات",
  "View larger map": "عرض خريطة أكبر",
  Language: "اللغة",
  "Switch to {{locale}}": "التبديل إلى {{locale}}",
  English: "العربية",

  "Breadcrumb": "مسار التنقل",
  Pagination: "ترقيم الصفحات",
  Previous: "السابق",
  Next: "التالي",
  Page: "صفحة",
  "Read More": "اقرأ المزيد",
  "View More": "عرض المزيد",

  About: "من نحن",
  Contact: "اتصل بنا",
  "Page Not Found": "الصفحة غير موجودة",

  "Precision Manufacturing for Oil & Gas": "تصنيع دقيق لقطاع النفط والغاز",
  "Engineered for Demanding Operations.": "هندسة مصممة للعمليات الشاقة.",
  "Built in Saudi Arabia.": "صُنع في المملكة العربية السعودية.",
  "Precision machining, downhole equipment, and engineered manufacturing solutions designed to deliver reliability, quality, and performance for the global oil & gas industry.":
    "تشغيل دقيق ومعدات أسفل البئر وحلول تصنيع هندسية مصممة لتقديم الموثوقية والجودة والأداء لقطاع النفط والغاز العالمي.",
  "Explore Products": "استكشف المنتجات",
  "About DOT": "عن DOT",
  "Industrial oil and gas facility with pipeline infrastructure at golden hour":
    "منشأة صناعية للنفط والغاز مع بنية تحتية للأنابيب عند الغروب",
  "Engineering • Manufacturing • Services": "الهندسة • التصنيع • الخدمات",
  "Precision Solutions.": "حلول دقيقة.",
  "Trusted in the Field.": "موثوقة في الميدان.",
  "From advanced machining and screen manufacturing to repair, refurbishment, and premium connection services, DOT supports operators with dependable solutions built for demanding environments.":
    "من التشغيل المتقدم وتصنيع الشاشات إلى الإصلاح وإعادة التأهيل وخدمات الوصلات المتميزة، تدعم DOT المشغّلين بحلول موثوقة مصممة للبيئات الشاقة.",
  "Our Services": "خدماتنا",
  "Advanced manufacturing and refinery operations at sunset":
    "عمليات تصنيع وتكرير متقدمة عند الغروب",

  "Engineering Excellence for Oil & Gas\nManufacturing • Machining • Industrial Services":
    "تميز هندسي لقطاع النفط والغاز\nالتصنيع • التشغيل • الخدمات الصناعية",
  "Precision\nMachining": "تشغيل\nدقيق",
  "Downhole\nEquipment": "معدات\nأسفل البئر",
  "Engineering\nServices": "خدمات\nهندسية",
  "Plant\nSupport": "دعم\nالمصانع",
  "Dynamic Oil Tools operations": "عمليات Dynamic Oil Tools",
  "Who we are": "من نحن",
  "Driven by Precision.": "مدفوعة بالدقة.",
  "Built for Performance.": "مصممة للأداء.",
  "Dynamic Oil Tools (DOT) is a Saudi-based manufacturer specializing in precision machining, oil & gas equipment, engineering services, advanced manufacturing, and product treatments":
    "تُعد Dynamic Oil Tools (DOT) شركة تصنيع سعودية متخصصة في التشغيل الدقيق ومعدات النفط والغاز والخدمات الهندسية والتصنيع المتقدم ومعالجات المنتجات",
  "We combine engineering expertise with world-class manufacturing capabilities to deliver reliable, high-performance solutions that meet the demands of the global energy industry.":
    "نجمع بين الخبرة الهندسية وقدرات التصنيع العالمية لتقديم حلول موثوقة وعالية الأداء تلبي متطلبات قطاع الطاقة العالمي.",
  "Watch Our Video": "شاهد الفيديو",

  "What We": "ما الذي",
  "Can Offer": "نقدّمه",
  "Explore Services": "استكشف الخدمات",
  "Precision-engineered downhole and surface equipment manufactured to meet the demanding requirements of upstream and downstream oil & gas operations.":
    "معدات أسفل البئر والسطحية هندسية دقيقة مصنّعة لتلبية المتطلبات الشاقة لعمليات النفط والغاز في مرحلتي الإنتاج والتكرير.",
  "High-performance screening solutions designed for efficient separation, filtration, and long-term reliability across industrial processing applications.":
    "حلول فرز عالية الأداء مصممة للفصل والترشيح الفعّال والموثوقية طويلة الأمد عبر تطبيقات المعالجة الصناعية.",
  "Advanced sand control screen systems engineered to maximize production, improve well performance, and extend operational life.":
    "أنظمة شاشات متقدمة لمكافحة الرمال هندسية لزيادة الإنتاج وتحسين أداء البئر وإطالة العمر التشغيلي.",
  "Custom-manufactured baskets and strainers built for accurate filtration, high flow efficiency, and dependable industrial performance.":
    "سلال ومصافي مصنّعة حسب الطلب لترشيح دقيق وكفاءة تدفق عالية وأداء صناعي موثوق.",
  "Specialized surface treatments including hardbanding, laser cladding, and premium finishing services to improve durability, wear resistance, and equipment life.":
    "معالجات سطحية متخصصة تشمل التصلب السطحي والطلاء بالليزر وخدمات التشطيب المتميز لتحسين المتانة ومقاومة التآكل وعمر المعدات.",
  "Dynamic Oil Tools industrial manufacturing facility":
    "منشأة Dynamic Oil Tools للتصنيع الصناعي",
  "Years Experience": "سنوات من الخبرة",
  Projects: "مشروعًا",
  Clients: "عميلًا",
  "Why Choose Us": "لماذا تختارنا",
  "We Are a Leader In Industrial Market": "نحن روّاد في السوق الصناعي",
  "Precision-machined industrial component manufactured by Dynamic Oil Tools":
    "مكوّن صناعي مشغول بدقة من تصنيع Dynamic Oil Tools",
  "We Are Open For Opportunities!": "نرحب بفرص التعاون!",
  "View Our Works": "اطلع على أعمالنا",
  "Make An Appointment": "احجز موعدًا",
  Mission: "الرسالة",
  "Delivering cutting-edge products to our customers through our continuously innovative facility. Supporting our clients with technically advanced and cost-efficient solutions.":
    "تقديم منتجات متطورة لعملائنا عبر منشأتنا المبتكرة باستمرار. دعم عملائنا بحلول تقنية متقدمة وفعّالة من حيث التكلفة.",
  Vision: "الرؤية",
  "DOT aims to be a global leader focused on manufacturing high-quality, market-oriented, and state-of-the-art products for the oil and gas industry.":
    "تسعى DOT إلى أن تكون رائدة عالمية في تصنيع منتجات عالية الجودة وموجهة للسوق ومتطورة لقطاع النفط والغاز.",
  "Precision. Performance. Partnership.": "الدقة. الأداء. الشراكة.",

  "R&D / Engineering Department": "قسم البحث والتطوير / الهندسة",
  How: "كيف",
  We: "نعمل",
  Work: "",
  "Our engineering team combines advanced design, simulation, and precision manufacturing to develop reliable oil & gas solutions that meet demanding industry standards.":
    "يجمع فريقنا الهندسي بين التصميم المتقدم والمحاكاة والتصنيع الدقيق لتطوير حلول موثوقة للنفط والغاز تلبي المعايير الصناعية الشاقة.",
  "Designing, Modeling & Analysis": "التصميم والنمذجة والتحليل",
  "Every solution begins with precision engineering. Using advanced CAD software and engineering analysis, our team develops optimized designs tailored to customer requirements and operational performance.":
    "تبدأ كل حل بالهندسة الدقيقة. باستخدام برامج CAD المتقدمة والتحليل الهندسي، يطوّر فريقنا تصاميم محسّنة وفق متطلبات العملاء والأداء التشغيلي.",
  "CNC Machine Code Generator": "مولّد أكواد آلات CNC",
  "Approved designs are transformed into high-quality components through advanced CNC machining and CAM programming, ensuring consistent accuracy, repeatability, and manufacturing efficiency.":
    "تُحوَّل التصاميم المعتمدة إلى مكوّنات عالية الجودة عبر التشغيل المتقدم بآلات CNC وبرمجة CAM، بما يضمن دقة متسقة وقابلية تكرار وكفاءة تصنيع.",

  "Our Products": "منتجاتنا",
  "Featured Products": "منتجات مميزة",
  "A selection of engineered screens, strainers, and filtration solutions built for demanding oil & gas and industrial applications.":
    "مجموعة مختارة من الشاشات والمصافي وحلول الترشيح الهندسية المصممة لتطبيقات النفط والغاز والصناعات الشاقة.",
  "View Product": "عرض المنتج",
  "Explore All Products": "استكشف جميع المنتجات",
  Our: "شهاداتنا",
  Certificates: "",
  "Recognized Globally": "معترف بها عالميًا",

  "News & Insights": "الأخبار والرؤى",
  Industry: "رؤى",
  "Insights & Updates": "وتحديثات القطاع",
  "Stay informed with the latest company news, industry developments, exhibitions, and announcements from Dynamic Oil Tools across the oil and gas sector.":
    "ابقَ على اطلاع بأحدث أخبار الشركة وتطورات القطاع والمعارض والإعلانات من Dynamic Oil Tools في قطاع النفط والغاز.",
  "View All News": "عرض جميع الأخبار",
  "Dynamic Oil Tools manufacturing facility": "منشأة تصنيع Dynamic Oil Tools",
  "Our Location": "موقعنا",
  "Stay Informed": "ابقَ على اطلاع",
  "Subscribe to our newsletter for the latest updates, industry insights, and company news.":
    "اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات ورؤى القطاع وأخبار الشركة.",
  "Enter your email": "أدخل بريدك الإلكتروني",
  Subscribe: "اشتراك",

  "Learn about Dynamic Oil Tools — our mission, capabilities, and commitment to Saudi industrial excellence.":
    "تعرّف على Dynamic Oil Tools — رسالتنا وقدراتنا والتزامنا بالتميز الصناعي السعودي.",
  "Dynamic Oil Tools is a Saudi industrial manufacturing company serving the oil & gas and energy industries.":
    "Dynamic Oil Tools شركة صناعية سعودية تخدم قطاعي النفط والغاز والطاقة.",
  "Company Overview": "نظرة عامة على الشركة",
  "Who We Are": "من نحن",
  "DOT is a Saudi-based manufacturer of high-performance screens, strainers, and filtration solutions engineered for demanding oil & gas and industrial applications.":
    "DOT شركة تصنيع سعودية للشاشات والمصافي وحلول الترشيح عالية الأداء المصممة لتطبيقات النفط والغاز والصناعات الشاقة.",
  "Built on a strong engineering foundation, we combine advanced manufacturing capabilities with a commitment to reliability, quality, and client-focused service — delivering products that perform in the field and support long-term operational efficiency.":
    "انطلاقًا من أساس هندسي قوي، نجمع بين قدرات التصنيع المتقدمة والالتزام بالموثوقية والجودة وخدمة تركز على العميل — لنقدّم منتجات تؤدي في الميدان وتدعم الكفاءة التشغيلية طويلة الأمد.",
  "Dynamic Oil Tools manufacturing facility in Saudi Arabia":
    "منشأة تصنيع Dynamic Oil Tools في المملكة العربية السعودية",
  "Saudi Made": "صُنع في السعودية",
  "Proudly designed and manufactured in Saudi Arabia.":
    "مصمّمة ومصنّعة بفخر في المملكة العربية السعودية.",
  "Quality Driven": "الجودة أولًا",
  "Committed to the highest quality standards across every process.":
    "ملتزمون بأعلى معايير الجودة في كل عملية.",
  "Client Focused": "العميل في المحور",
  "Building long-term partnerships through trust and reliability.":
    "نبني شراكات طويلة الأمد عبر الثقة والموثوقية.",
  "Global Supply": "توريد عالمي",
  "Serving clients across the globe with consistent performance.":
    "نخدم عملاء حول العالم بأداء متسق.",
  "Years of Experience": "سنوات من الخبرة",
  "m² Manufacturing Facility": "م² مساحة تصنيع",
  "Skilled Professionals": "محترفًا ماهرًا",
  "Countries Served": "دولة نخدمها",

  "Our Capabilities": "قدراتنا",
  "What We Do Best": "ما نتقنه",
  "We combine engineering expertise, advanced manufacturing and rigorous quality control to deliver reliable solutions that perform in the toughest conditions.":
    "نجمع بين الخبرة الهندسية والتصنيع المتقدم ومراقبة الجودة الصارمة لتقديم حلول موثوقة تؤدي في أقسى الظروف.",
  "Engineering Excellence": "التميز الهندسي",
  "Advanced design, simulation and technical expertise to develop high-performance solutions.":
    "تصميم متقدم ومحاكاة وخبرة تقنية لتطوير حلول عالية الأداء.",
  "Engineering blueprints and precision metal components":
    "مخططات هندسية ومكوّنات معدنية دقيقة",
  "Advanced Manufacturing": "التصنيع المتقدم",
  "State-of-the-art production capabilities ensuring precision, efficiency and scalability.":
    "قدرات إنتاج متطورة تضمن الدقة والكفاءة وقابلية التوسع.",
  "Advanced laser cutting and manufacturing process":
    "عملية قطع بالليزر وتصنيع متقدمة",
  "Quality Assurance": "ضمان الجودة",
  "Strict quality control processes ensuring reliability, compliance and long-term performance.":
    "عمليات مراقبة جودة صارمة تضمن الموثوقية والامتثال والأداء طويل الأمد.",
  "Quality inspection of industrial filtration equipment":
    "فحص جودة معدات الترشيح الصناعية",
  "Continuous Innovation": "الابتكار المستمر",
  "Ongoing R&D and process improvement to meet evolving industry demands.":
    "بحث وتطوير مستمر وتحسين العمليات لتلبية متطلبات القطاع المتطورة.",
  "Finished industrial pipes ready for deployment":
    "أنابيب صناعية جاهزة للنشر",
  "Looking for Engineering Solutions?": "هل تبحث عن حلول هندسية؟",
  "Partner with DOT for reliable, efficient and high-performance solutions built for your toughest challenges.":
    "شارك DOT للحصول على حلول موثوقة وفعّالة وعالية الأداء مصممة لأصعب تحدياتك.",
  "View Products": "عرض المنتجات",

  "Explore Dynamic Oil Tools' engineered screens, strainers, and filtration solutions for oil & gas and industrial applications.":
    "استكشف شاشات ومصافي وحلول الترشيح الهندسية من Dynamic Oil Tools لتطبيقات النفط والغاز والصناعات.",
  "Engineered screens, strainers, and filtration solutions for oil & gas and industrial applications.":
    "شاشات ومصافي وحلول ترشيح هندسية لتطبيقات النفط والغاز والصناعات.",
  "Search products…": "البحث في المنتجات…",
  "No products match your search.": "لا توجد منتجات تطابق بحثك.",
  "Need a custom engineering solution?": "هل تحتاج حلًا هندسيًا مخصصًا؟",
  "Contact our team.": "تواصل مع فريقنا.",

  "Get in touch with Dynamic Oil Tools for engineering support, product inquiries, and partnership opportunities.":
    "تواصل مع Dynamic Oil Tools للحصول على الدعم الهندسي واستفسارات المنتجات وفرص الشراكة.",
  "Get in Touch": "تواصل معنا",
  "Reach out to our engineering and manufacturing team for product inquiries, technical support, and partnership opportunities.":
    "تواصل مع فريقنا الهندسي والتصنيعي لاستفسارات المنتجات والدعم الفني وفرص الشراكة.",
  "Company Information": "معلومات الشركة",
  "How to Reach Us": "كيفية التواصل معنا",
  "Phone Number": "رقم الهاتف",
  "Email Address": "عنوان البريد الإلكتروني",
  "Office Location": "موقع المكتب",
  "Industrial City 3, Sector II, Block 7, Dammam, Saudi Arabia":
    "المدينة الصناعية الثالثة، القطاع الثاني، المبنى 7، الدمام، المملكة العربية السعودية",
  "Working Hours": "ساعات العمل",
  "Sunday – Thursday: 8:00 AM – 5:00 PM": "الأحد – الخميس: 8:00 ص – 5:00 م",
  "Send an Inquiry": "إرسال استفسار",
  "Complete the form below and our team will respond to your request promptly.":
    "أكمل النموذج أدناه وسيرد فريقنا على طلبك في أقرب وقت.",
  Name: "الاسم",
  "Company Name": "اسم الشركة",
  Subject: "الموضوع",
  Message: "الرسالة",
  "Your full name": "اسمك الكامل",
  "Company or organization": "الشركة أو المؤسسة",
  "Brief subject line": "موضوع مختصر",
  "Describe your inquiry or project requirements":
    "صف استفسارك أو متطلبات مشروعك",
  "Send Inquiry": "إرسال الاستفسار",
  "Visit Our Facility": "زيارة منشأتنا",
  "Google Maps embed": "خريطة Google Maps",
  "Need Technical Support?": "هل تحتاج دعمًا فنيًا؟",
  "Our engineering team is ready to assist with product selection, specifications, and custom solutions.":
    "فريقنا الهندسي جاهز لمساعدتك في اختيار المنتجات والمواصفات والحلول المخصصة.",
  "Contact Our Team": "تواصل مع فريقنا",

  "Download Dynamic Oil Tools product catalogs, technical brochures, and company profiles.":
    "حمّل كتالوجات منتجات Dynamic Oil Tools والكتيبات الفنية وملفات الشركة.",
  "Catalogs & Resources": "الكتالوجات والموارد",
  "Access our technical documentation, product catalogs, and company profiles. Download PDF resources for engineering reference, procurement, and project planning.":
    "اطلع على وثائقنا الفنية وكتالوجات المنتجات وملفات الشركة. حمّل موارد PDF للمرجعية الهندسية والمشتريات وتخطيط المشاريع.",
  "Document Library": "مكتبة الوثائق",
  "Download PDF": "تحميل PDF",
  PDF: "PDF",
  "Corporate Profile": "الملف التعريفي للشركة",
  "Company overview covering Dynamic Oil Tools' capabilities, facilities, and commitment to Saudi industrial excellence.":
    "نظرة عامة على الشركة تغطي قدرات Dynamic Oil Tools ومنشآتها والتزامها بالتميز الصناعي السعودي.",
  "Corporate Profile catalog cover": "غلاف كتالوج الملف التعريفي للشركة",
  "Ground Water Screens": "شاشات المياه الجوفية",
  "Technical catalog for groundwater well screens, slot configurations, and filtration applications.":
    "كتالوج فني لشاشات آبار المياه الجوفية وتكوينات الفتحات وتطبيقات الترشيح.",
  "Ground Water Screens catalog cover": "غلاف كتالوج شاشات المياه الجوفية",
  "Oil and Gas Equipment": "معدات النفط والغاز",
  "Engineered downhole screens, sand control systems, and oil & gas production equipment.":
    "شاشات أسفل البئر هندسية وأنظمة مكافحة الرمال ومعدات إنتاج النفط والغاز.",
  "Oil and Gas Equipment catalog cover": "غلاف كتالوج معدات النفط والغاز",
  "Industrial screens and strainers for process plants, refineries, and utility filtration systems.":
    "شاشات ومصافي صناعية لمصانع المعالجة والمصافي وأنظمة ترشيح المرافق.",
  "Process Industry Screens catalog cover":
    "غلاف كتالوج شاشات الصناعات التحويلية",

  "Company news, exhibitions, project updates, and industry activities from Dynamic Oil Tools.":
    "أخبار الشركة والمعارض وتحديثات المشاريع وأنشطة القطاع من Dynamic Oil Tools.",
  "News & Updates": "الأخبار والتحديثات",
  "Stay informed about our latest projects, exhibitions, company updates and engineering developments.":
    "ابقَ على اطلاع بأحدث مشاريعنا ومعارضنا وتحديثات الشركة والتطورات الهندسية.",
  "Dynamic Oil Tools news and company updates":
    "أخبار وتحديثات شركة Dynamic Oil Tools",
  "Latest News": "آخر الأخبار",
  "Need More Information?": "هل تحتاج مزيدًا من المعلومات؟",
  "Contact our team for project inquiries, technical support, and company updates.":
    "تواصل مع فريقنا لاستفسارات المشاريع والدعم الفني وتحديثات الشركة.",

  "The page you are looking for could not be found. Return to Dynamic Oil Tools or explore our products and services.":
    "تعذّر العثور على الصفحة التي تبحث عنها. عد إلى Dynamic Oil Tools أو استكشف منتجاتنا وخدماتنا.",
  "Error 404": "خطأ 404",
  "The page you requested may have been moved, removed, or is temporarily unavailable. Use the links below to continue browsing our engineering solutions and product catalog.":
    "ربما نُقلت الصفحة المطلوبة أو أُزيلت أو أنها غير متاحة مؤقتًا. استخدم الروابط أدناه لمتابعة تصفح حلولنا الهندسية وكتالوج المنتجات.",
  "Return to Homepage": "العودة إلى الصفحة الرئيسية",
  "Contact Support": "تواصل مع الدعم",
  "Explore Our Site": "استكشف موقعنا",
  "Our mission, capabilities, and manufacturing expertise.":
    "رسالتنا وقدراتنا وخبرتنا في التصنيع.",
  "Download technical catalogs and product documentation.":
    "حمّل الكتالوجات الفنية ووثائق المنتجات.",
  "Reach our engineering team for inquiries and support.":
    "تواصل مع فريقنا الهندسي للاستفسارات والدعم.",
  "Need immediate assistance?": "هل تحتاج مساعدة فورية؟",
  "Our engineering and sales teams are available to help with product specifications, technical support, and partnership inquiries.":
    "فرقنا الهندسية والمبيعات متاحة للمساعدة في مواصفات المنتجات والدعم الفني واستفسارات الشراكة.",
  "Email Us": "راسلنا",
  "Call Us": "اتصل بنا",

  "Industrial manufacturing, engineering, and oil & gas services from Dynamic Oil Tools.":
    "خدمات التصنيع الصناعي والهندسة والنفط والغاز من Dynamic Oil Tools.",

  "Trusted Worldwide": "موثوقون عالميًا",
  "Trusted by Industry Leaders": "موثوقون من قادة القطاع",
  "Engineering precision. Manufacturing excellence. Delivering reliable oilfield solutions for clients across multiple industries and international markets.":
    "دقة هندسية. تميز في التصنيع. نقدّم حلولًا موثوقة لحقول النفط لعملاء عبر صناعات متعددة وأسواق دولية.",

  Overview: "نظرة عامة",
  Applications: "التطبيقات",
  Features: "الميزات",
  Benefits: "الفوائد",
  "Technical Data": "البيانات الفنية",
  "Need Technical Assistance?": "هل تحتاج مساعدة فنية؟",
  "Our engineering team is ready to help you find the right solution for your well completion requirements.":
    "فريقنا الهندسي جاهز لمساعدتك في إيجاد الحل المناسب لمتطلبات إكمال البئر.",
  "Request Information": "طلب معلومات",

  Materials: "المواد",
  Sizes: "الأحجام",
  "Slot ranges": "نطاقات الفتحات",
  "All grades of stainless steel, duplex, super duplex, alloy, etc.":
    "جميع درجات الفولاذ المقاوم للصدأ والدوبلكس والسوبر دوبلكس والسبائك وغيرها.",
  "In accordance to client's requirement.":
    "وفقًا لمتطلبات العميل.",
  "50 microns and above": "50 ميكرون فأكثر",

  "Centrifuge Baskets": "سلال الطرد المركزي",
  "Centrifuge Screen Baskets": "سلال شبك الطرد المركزي",
  CollectorDistributionScreen: "CollectorDistribution Screen",
  "CollectorDistribution Screen": "شاشة التوزيع المجمّع",
  "DynamicLink Screen Liner": "بطانة شاشة DynamicLink",
  "Filter Nozzle": "فوهة الترشيح",
  "Fit To Base Screen Joint with Passive or Active Control Device":
    "وصلة شاشة ملائمة للأنبوب الأساسي مع جهاز تحكم سلبي أو نشط",
  "The basepipe is machined to accommodate different kinds of active or passive flow control valves.":
    "يُشغَّل الأنبوب الأساسي لاستيعاب أنواع مختلفة من صمامات التحكم في التدفق النشطة أو السلبية.",
  "The screen is then wrapped as per client specifications directly on the pipe.":
    "ثم تُلف الشاشة وفق مواصفات العميل مباشرة على الأنبوب.",
  "Rings and covers are manufactured with high precision as per clients request, then assembled and welded into the basepipe.":
    "تُصنَّع الحلقات والأغطية بدقة عالية وفق طلب العميل، ثم تُجمَّع وتُلحَم في الأنبوب الأساسي.",
  "Suitable for flow control applications with or without sand control.":
    "مناسبة لتطبيقات التحكم في التدفق مع أو بدون مكافحة الرمال.",
  "Suitable for vertical, deviated and horizontal completions.":
    "مناسبة للإكمالات العمودية والمنحرفة والأفقية.",
  "No elastomers, all-welded construction.": "بدون مطاط، بناء ملحوم بالكامل.",
  "Simple construction.": "بناء بسيط.",
  "Robust design.": "تصميم متين.",
  "Installations with flow control devices.": "تركيبات مع أجهزة التحكم في التدفق.",
  "Optimized flow performance into the basepipe.":
    "أداء تدفق محسّن إلى الأنبوب الأساسي.",
  "Control of unwanted water/gas production.":
    "التحكم في إنتاج المياه/الغاز غير المرغوب.",
  "Can be re-configured to fit other applications.":
    "يمكن إعادة تهيئتها لتناسب تطبيقات أخرى.",

  "Fit To Base Screen on Perforated Basepipe":
    "شاشة ملائمة للأنبوب الأساسي على أنبوب أساسي مثقّب",
  "This product consists of a wire wrapped screen on a perforated base pipe up to 7”OD & 39ft length.":
    "يتكوّن هذا المنتج من شاشة ملفوفة بالسلك على أنبوب أساسي مثقّب بقطر خارجي يصل إلى 7 بوصة وطول 39 قدمًا.",
  "The screen can be manufactured up to a total length of 28ft (8.5 meters) on the pipe. Meanwhile the joint is perforated casing with a 39ft (12 meters) bed length - 8 spindle drilling machine.":
    "يمكن تصنيع الشاشة بإجمالي طول يصل إلى 28 قدمًا (8.5 متر) على الأنبوب. في الوقت نفسه، تكون الوصلة غلافًا مثقّبًا بطول سرير 39 قدمًا (12 متر) — آلة حفر بثمانية محاور.",
  "The DOT standard spiral and staggered perforation patterns use Ø 3/8” and Ø 1/2” diameter holes, to create the client’s required open area. Upon request, custom hole sizes can be drilled in any number and / or pattern. Every joint perforated by DOT well screen is deburred internally and externally.":
    "تستخدم أنماط التثقيب الحلزونية والمتداخلة القياسية لدى DOT ثقوبًا بقطر 3/8 بوصة و1/2 بوصة لتحقيق المساحة المفتوحة المطلوبة من العميل. عند الطلب، يمكن حفر أحجام ثقوب مخصصة بأي عدد و/أو نمط. تُزال الحواف من كل وصلة مثقّبة من DOT من الداخل والخارج.",
  "The size, grade and weight of the base pipe are manufactured as per API casing/tubing specification.":
    "يُصنَّع حجم ودرجة ووزن الأنبوب الأساسي وفق مواصفات API للأغلفة/الأنابيب.",
  "Oil and Gas wells.": "آبار النفط والغاز.",
  "Sand control completions.": "إكمالات مكافحة الرمال.",
  "Thermal applications, including heavy-oil and steam assisted wells.":
    "تطبيقات حرارية، بما في ذلك آبار النفط الثقيل والبخار المساعد.",
  "Available in basepipe sizes ranging from 2 7/8 to 7 in. No requirement for welding on basepipe (screen wire is shrink-fitted to basepipe).":
    "متوفر بأحجام أنبوب أساسي من 2 7/8 إلى 7 بوصة. لا حاجة للحام على الأنبوب الأساسي (يُثبَّت سلك الشاشة بالانكماش على الأنبوب الأساسي).",
  "Coherent, harmonious, and precise slot opening.":
    "فتحات متسقة ومتناسقة ودقيقة.",
  "Slot opening from 50 micron up to 2000 micron.":
    "فتحات من 50 ميكرون حتى 2000 ميكرون.",
  "Longer laminar flow preventing erosion.":
    "تدفق طبقي أطول يمنع التآكل.",
  "Improved flow efficiency into basepipe.":
    "كفاءة تدفق محسّنة إلى الأنبوب الأساسي.",
  "Longer well life and optimized production.":
    "عمر بئر أطول وإنتاج محسّن.",

  "Fit To Base Screen on Perforated Basepipe 1":
    "شاشة ملائمة للأنبوب الأساسي على أنبوب أساسي مثقّب 1",
  "This product consists of a wire wrapped screen on a perforated base pipe up to Ø 7”-39ft length.":
    "يتكوّن هذا المنتج من شاشة ملفوفة بالسلك على أنبوب أساسي مثقّب بقطر يصل إلى 7 بوصة وطول 39 قدمًا.",
  "The screen can be manufactured up to a total length of 8.5 meters on the pipe. Meanwhile the perforated liner or pre-perforated casing is manufactured with a 12m bed length - 8 spindle Drilling machine.":
    "يمكن تصنيع الشاشة بإجمالي طول 8.5 متر على الأنبوب. في الوقت نفسه، يُصنَّع البطانة المثقّبة أو الغلاف المثقّب مسبقًا بطول سرير 12 متر — آلة حفر بثمانية محاور.",
  "Groundwater Wells": "آبار المياه الجوفية",
  "Available in base pipe sizes ranging from 2 7/8 to 7 in.":
    "متوفر بأحجام أنبوب أساسي من 2 7/8 إلى 7 بوصة.",
  "No requirement for welding on base pipe (screen wire is shrink- fitted to base pipe).":
    "لا حاجة للحام على الأنبوب الأساسي (يُثبَّت سلك الشاشة بالانكماش على الأنبوب الأساسي).",
  "Slot opening from 50 micron up to 2000 micron, which can be customized based on well specifications.":
    "فتحات من 50 ميكرون حتى 2000 ميكرون، ويمكن تخصيصها وفق مواصفات البئر.",
  "Customized material grades 304/316L/904/Duplex/Alloy 625.":
    "درجات مواد مخصصة: 304/316L/904/Duplex/Alloy 625.",
  "Improved water flow efficiency into base pipe.":
    "كفاءة تدفق مياه محسّنة إلى الأنبوب الأساسي.",
  "Optimized inflaw peformance.": "أداء تدفق داخل محسّن.",
  "Longer well life and optimized production":
    "عمر بئر أطول وإنتاج محسّن",

  "Flat Panels": "ألواح مسطحة",
  Coal: "فحم",
  Potash: "بوتاس",
  Salt: "ملح",
  Sand: "رمل",
  Pulp: "لب",
  Paper: "ورق",
  "Other Chemicals": "مواد كيميائية أخرى",
  "Mining and Mineral Processes": "عمليات التعدين والمعادن",
  Advantages: "المزايا",
  "High abrasion and corrosion resistance": "مقاومة عالية للتآكل والاحتكاك",
  "High temperature resistance": "مقاومة عالية للحرارة",
  "Balanced and self-supporting": "متوازنة وذاتية الدعم",
  "Low pressure drop": "انخفاض في انخفاض الضغط",
  "High durability": "متانة عالية",
  "Easy Installation": "تركيب سهل",
  "No-clogging structure": "هيكل لا يتسبب في الانسداد",

  "Flat Sieves": "مناخل مسطحة",
  "Inline Surface Filter": "مرشح سطحي خطي",
  "Protection of pumps, Valves etc.": "حماية المضخات والصمامات وغيرها.",
  "Standard coiled tubing.": "أنابيب ملفوفة قياسية.",
  "Abrasive pumping": "ضخ كاشط",
  "Oil & Gas Industry": "قطاع النفط والغاز",
  "Consistency of viscosity and smoothness": "اتساق اللزوجة والنعومة",
  "The highest levels of product security": "أعلى مستويات أمان المنتج",
  "Designed to allow fluids to pass, but traps debris":
    "مصمم للسماح بمرور السوائل مع احتجاز الشوائب",
  "Easy to install and replace": "سهل التركيب والاستبدال",
  "High filtering efficiency without clogging":
    "كفاءة ترشيح عالية دون انسداد",

  "Open hole System": "نظام البئر المفتوح",
  "Openhole System": "نظام البئر المفتوح",
  "The DynamicLink Screen Liner open hole system is a profile wire screen completion system, designed to achieve laminar flow conditions primarily in long horizontal wells. The profile wire design helps maximize sand free production that resists damage and erosion for effective, long term sand control.":
    "نظام البئر المفتوح لبطانة شاشة DynamicLink هو نظام إكمال بشاشة سلكية ملفوفة، مصمم لتحقيق ظروف تدفق طبقي خاصة في الآبار الأفقية الطويلة. يساعد تصميم السلك الملفوف على تعظيم الإنتاج الخالي من الرمال المقاوم للتلف والتآكل لمكافحة رمال فعّالة طويلة الأمد.",
  "The DynamicLink Screen Liner open hole system is a profile wire screen completion system, designed to achieve laminar flow conditions primarily in long horizontal wells.":
    "نظام البئر المفتوح لبطانة شاشة DynamicLink هو نظام إكمال بشاشة سلكية ملفوفة، مصمم لتحقيق ظروف تدفق طبقي خاصة في الآبار الأفقية الطويلة.",
  "The DynamicLink no base pipe screen is robust yet lightweight. It is suitable for high mechanical loads, short radius wellbores, and wells with high rate gas flow conditions. It can also be used with or instead of current completion systems. While conventional sand screens are affected by high inflow velocity of gas or liquid, DynamicLink screens feature specially engineered profiles that force inflow to be distributed more uniformly over a longer length of screens compared with that of conventional screens. This reduces velocity and eliminates erosion hot spots through laminar flow regimes without the need to choke production.":
    "شاشة DynamicLink بدون أنبوب أساسي متينة وخفيفة الوزن. مناسبة للأحمال الميكانيكية العالية وآبار نصف قطرها قصير وآبار ذات معدلات تدفق غاز عالية. يمكن استخدامها مع أو بدل أنظمة الإكمال الحالية. بينما تتأثر شاشات الرمال التقليدية بسرعة التدفق الداخل العالية للغاز أو السائل، تتميز شاشات DynamicLink بملفات هندسية خاصة توزّع التدفق الداخل بشكل أكثر انتظامًا على طول أطول من الشاشات مقارنة بالشاشات التقليدية. يقلل ذلك السرعة ويزيل نقاط التآكل الساخنة عبر أنظمة تدفق طبقي دون الحاجة إلى خنق الإنتاج.",
  "No Base Pipe - No Flow restriction": "بدون أنبوب أساسي — لا قيود على التدفق",
  "Robust design - resistance to plugging": "تصميم متين — مقاومة للانسداد",
  "Suitability for Short - Radius well profiles":
    "ملاءمة لملفات آبار نصف قطرها قصير",
  "Higher reservoir drainage": "تصريف أعلى للمكامن",
  "Low laminar flow preventing erosion": "تدفق طبقي منخفض يمنع التآكل",
  "Resists plugging": "مقاومة للانسداد",

  "The DynamicLink Screen open hole system is a profile wire screen completion system, designed to achieve laminar flow conditions primarily in long horizontal wells. The profile wire design helps maximize sand free production that resists damage and erosion for effective, long term sand control.":
    "نظام البئر المفتوح لشاشة DynamicLink هو نظام إكمال بشاشة سلكية ملفوفة، مصمم لتحقيق ظروف تدفق طبقي خاصة في الآبار الأفقية الطويلة. يساعد تصميم السلك الملفوف على تعظيم الإنتاج الخالي من الرمال المقاوم للتلف والتآكل لمكافحة رمال فعّالة طويلة الأمد.",
  "The DynamicLink no base pipe screen is robust yet lightweight. It is suitable for high mechanical loads, short radius wellbores, and wells with high rate gas flow conditions. It can also be used with or instead of current completion systems.":
    "شاشة DynamicLink بدون أنبوب أساسي متينة وخفيفة الوزن. مناسبة للأحمال الميكانيكية العالية وآبار نصف قطرها قصير وآبار ذات معدلات تدفق غاز عالية. يمكن استخدامها مع أو بدل أنظمة الإكمال الحالية.",
  "Whereas conventional sand screens are affected by high inflow velocity of gas or liquid, DynamicLink screens feature specially engineered profiles that force inflow to be distributed more uniformly over a longer length of screens compared with that of conventional screens. This reduces velocity and eliminates erosion hot spots through laminar flow regimes without the need to choke production.":
    "بينما تتأثر شاشات الرمال التقليدية بسرعة التدفق الداخل العالية للغاز أو السائل، تتميز شاشات DynamicLink بملفات هندسية خاصة توزّع التدفق الداخل بشكل أكثر انتظامًا على طول أطول من الشاشات مقارنة بالشاشات التقليدية. يقلل ذلك السرعة ويزيل نقاط التآكل الساخنة عبر أنظمة تدفق طبقي دون الحاجة إلى خنق الإنتاج.",
  "Onshore and Offshore wells.": "آبار برية وبحرية.",
  "Stand-alone completions.": "إكمالات مستقلة.",
  "High Rate Gas environment.": "بيئة غاز عالية المعدل.",
  "No Base Pipe - Minimal Flow restriction.":
    "بدون أنبوب أساسي — قيود دنيا على التدفق.",
  "Suitability for Short- Radius well profiles.":
    "ملاءمة لملفات آبار نصف قطرها قصير.",
  "Ability to clear / stimulate through entire joint.":
    "القدرة على التنظيف/التحفيز عبر الوصلة بأكملها.",
  "Higher reservoir drainage.": "تصريف أعلى للمكامن.",
  "Longer Laminar flow preventing erosion.":
    "تدفق طبقي أطول يمنع التآكل.",

  "DOT offers profile wire screens for several different applications. Each profile wire screen product is custom designed to suit the specific requirements of the customer and provides high-performance solutions.":
    "تقدّم DOT شاشات سلكية ملفوفة لتطبيقات متعددة. يُصمَّم كل منتج شاشة سلكية حسب الطلب ليلائم متطلبات العميل المحددة ويوفر حلولًا عالية الأداء.",
  "Some of the applications where profile wire screens can be found are:":
    "من التطبيقات التي تُستخدم فيها الشاشات السلكية الملفوفة:",
  "Mining and Mineral Processes.": "عمليات التعدين والمعادن.",
  "Water Treatment Processes.": "عمليات معالجة المياه.",
  "Dynamic Oil Tools — Saudi industrial manufacturing and oil & gas solutions built for reliability and performance.":
    "Dynamic Oil Tools — حلول تصنيع صناعية سعودية للنفط والغاز مصممة للموثوقية والأداء.",
  "Engineered screens, strainers, and filtration solutions.":
    "شاشات ومصافي وحلول ترشيح هندسية.",
  "Food and Beverage Industry": "صناعة الأغذية والمشروبات",
  "Food and Beverage Industry.": "صناعة الأغذية والمشروبات.",
  "DOT offers profile wire screens for several different applications.":
    "تقدّم DOT شاشات سلكية ملفوفة لتطبيقات متعددة.",
  "The DynamicLink Screen open hole system is a profile wire screen completion system, designed to achieve laminar flow conditions primarily in long horizontal wells.":
    "نظام البئر المفتوح لشاشة DynamicLink هو نظام إكمال بشاشة سلكية ملفوفة، مصمم لتحقيق ظروف تدفق طبقي خاصة في الآبار الأفقية الطويلة.",
  "Improved water flow efficiency into base pipe":
    "كفاءة تدفق مياه محسّنة إلى الأنبوب الأساسي",
  "Chemical and Pharmaceutical Industry.": "الصناعة الكيميائية والدوائية.",
  "Oil & Gas Industry.": "قطاع النفط والغاز.",
  "Benefits & Features": "الفوائد والميزات",
  "Wide range of profile wires are available to suit most systems.":
    "مجموعة واسعة من الأسلاك الملفوفة متاحة لتناسب معظم الأنظمة.",
  "Low maintenance costs: Separation at the screen surface which can be easily cleaned by scraping or back washing":
    "تكاليف صيانة منخفضة: الفصل على سطح الشاشة ويمكن تنظيفه بسهولة بالكشط أو الغسل العكسي",
  "Maximum process output: Precise and continuous slot openings resulting in accurate separation without loss off media.":
    "أقصى إنتاجية للعملية: فتحات دقيقة ومستمرة تؤدي إلى فصل دقيق دون فقدان الوسط.",
  "Low operational costs: Large open area with an effective flow, high yield and a low pressure drop (dP).":
    "تكاليف تشغيل منخفضة: مساحة مفتوحة كبيرة مع تدفق فعّال وعائد عالٍ وانخفاض ضغط (dP).",
  "Chemical and thermal resistant: A variety of corrosion resistant stainless-steel materials and many exotic alloys suitable for high temperatures and pressures.":
    "مقاومة كيميائية وحرارية: مجموعة متنوعة من مواد الفولاذ المقاوم للصدأ ومسبائك خاصة مناسبة لدرجات حرارة وضغوط عالية.",
  "Long life: Welded at each intersection creating a strong and durable screen.":
    "عمر طويل: ملحومة عند كل تقاطع لتكوين شاشة قوية ومتينة.",

  "Resin Traps with Housing": "مصائد الراتنج مع الغلاف",
  "Screen Baskets": "سلال الشبك",
  "Food processes": "عمليات الأغذية",
  "Brewing Processes": "عمليات التخمير",
  "Sugar Processes": "عمليات السكر",
  "Corn Wet Milling": "طحن الذرة الرطب",
  "Fruit extraction": "استخلاص الفواكه",
  "Coffee and cacao processes": "عمليات القهوة والكاكاو",
  "Strong and durable": "قوية ومتينة",
  "Wide range of profile wire is available to suit most systems":
    "مجموعة واسعة من الأسلاك الملفوفة متاحة لتناسب معظم الأنظمة",
  "Smooth surface and long service life": "سطح أملس وعمر خدمة طويل",
  "Easy of replacement will reduce downtime":
    "سهولة الاستبدال تقلل وقت التوقف",
  "Easy to clean and backwash": "سهل التنظيف والغسل العكسي",

  "Screen Jacket on Perforated Base Pipe":
    "غلاف شاشة على أنبوب أساسي مثقّب",
  "Screen Jacket on Perforated Basepipe":
    "غلاف شاشة على أنبوب أساسي مثقّب",
  "This wire wrapped screen jacket is installed on a perforated base pipe up to Ø 7”- 39ft length.":
    "يُركَّب غلاف الشاشة الملفوفة بالسلك على أنبوب أساسي مثقّب بقطر يصل إلى 7 بوصة وطول 39 قدمًا.",
  "The screen can be manufactured up to a total length of 10 m, from corrosion resistant materials.":
    "يمكن تصنيع الشاشة بإجمالي طول 10 أمتار من مواد مقاومة للتآكل.",
  "The perforated liner or pre-perforated casing is manufactured with a 12m (39ft) bed length, 8 spindle Drilling machine.":
    "يُصنَّع البطانة المثقّبة أو الغلاف المثقّب مسبقًا بطول سرير 12 متر (39 قدم) — آلة حفر بثمانية محاور.",
  "The DOT standard spiral and staggered perforation patterns use Ø 3/8” and Ø 1/2” diameter holes, to create the client’s required open area. Upon request, custom hole sizes can be drilled in any number and any pattern. Every joint perforated is deburred internally and externally.":
    "تستخدم أنماط التثقيب الحلزونية والمتداخلة القياسية لدى DOT ثقوبًا بقطر 3/8 بوصة و1/2 بوصة لتحقيق المساحة المفتوحة المطلوبة. عند الطلب، يمكن حفر أحجام ثقوب مخصصة بأي عدد وأي نمط. تُزال الحواف من كل وصلة مثقّبة من الداخل والخارج.",
  "The screen jacket is fully pickled and passivated for maximum corrosion resistance.":
    "يُعالَج غلاف الشاشة بالنقع والتخميل بالكامل لأقصى مقاومة للتآكل.",
  "Welded rings isolate jacket from mechanical loads on base pipe":
    "حلقات ملحومة تعزل الغلاف عن الأحمال الميكانيكية على الأنبوب الأساسي",
  "Available in base pipe sizes from 2 7/8 to 7 in.":
    "متوفر بأحجام أنبوب أساسي من 2 7/8 إلى 7 بوصة.",
  "Multiple unique surface and support wire profile options":
    "خيارات متعددة لملفات سلك السطح والدعم الفريدة",
  "Optimized inflow performance": "أداء تدفق داخل محسّن",
  "The screen can be manufactured up to a total length of 33ft (10 m), from corrosion resistant materials.":
    "يمكن تصنيع الشاشة بإجمالي طول 33 قدمًا (10 أمتار) من مواد مقاومة للتآكل.",
  "The perforated joint is perforated with a 39ft (12m) bed length, 8 spindle Drilling machine.":
    "تُثقَّب الوصلة بطول سرير 39 قدمًا (12 متر) — آلة حفر بثمانية محاور.",
  "Installations with Inflow or injection control devices.":
    "تركيبات مع أجهزة التحكم في التدفق الداخل أو الحقن.",
  "Longer laminar flow preventing erosion.":
    "تدفق طبقي أطول يمنع التآكل.",

  "Screen Support Grids": "شبكات دعم الشاشة",
  "Sea Water Intake Screens": "شاشات سحب مياه البحر",
  "Sieve Bends": "منحنيات المناخل",
  Strainers: "المصافي",
  "Well Test Screen": "شاشة اختبار البئر",

  Corporate: "أخبار الشركة",
  Event: "فعالية",
  "TENARIS VISIT Dynamic Oil Tools was visited by team from Tenaris Feb 2020":
    "زيارة Tenaris: زار Dynamic Oil Tools فريق من Tenaris في فبراير 2020",
  "June 19, 2022": "19 يونيو 2022",
  "We are the leading manufacturer of pipes and related services for the worlds energy industry and certain other industrial applications. Our manufacturing system integrates steelmaking, pipe rolling and forming, heat treatment, threading and finishing across 16 countries. We also have an R&D network focused on enhancing our product portfolio and improving our production processes. Our team, based in more than 30 countries worldwide, is united by a passion for excellence in everything we do.":
    "نحن الشركة الرائدة في تصنيع الأنابيب والخدمات ذات الصلة لقطاع الطاقة العالمي وبعض التطبيقات الصناعية الأخرى. يدمج نظامنا التصنيعي صناعة الصلب ودرفلة وتشكيل الأنابيب والمعالجة الحرارية والخيطنة والتشطيب عبر 16 دولة. لدينا أيضًا شبكة بحث وتطوير تركز على تعزيز محفظة منتجاتنا وتحسين عمليات الإنتاج. يجمع فريقنا، المنتشر في أكثر من 30 دولة حول العالم، شغف التميز في كل ما نقوم به.",
  "SABIC CONFERENCE: Dynamic Oil Tools attended SABIC CONFERENCE 2020":
    "مؤتمر SABIC: حضرت Dynamic Oil Tools مؤتمر SABIC 2020",
  "The largest and most profitable non-oil company in the Middle East and one of the world’s five largest petrochemicals manufacturers, SABIC is a public company based in Riyadh, Saudi Arabia. 70% of the Company’s shares are owned by the Saudi Arabian government, with the remaining 30% held by private investors in Saudi Arabia and other countries of the Gulf Cooperation Council.":
    "SABIC أكبر وأكثر الشركات غير النفطية ربحية في الشرق الأوسط وإحدى أكبر خمس شركات بتروكيماويات في العالم، وهي شركة مساهمة عامة مقرها الرياض، المملكة العربية السعودية. تمتلك الحكومة السعودية 70% من أسهم الشركة، بينما يحتفظ المستثمرون الخاصون في المملكة ودول مجلس التعاون الخليجي بالـ30% المتبقية.",
};

// Special composite heading fixes applied after map
const POST_FIXES = [
  [/("heading": "كيف",\s*"headingAccent": "نعمل",\s*"headingSuffix": )""/, '$1"نعمل"'],
  [/("heading": "شهاداتنا",\s*"headingAccent": )""/, '$1"المعتمدة"'],
  [/("heading": "ما الذي",\s*"headingAccent": )"نقدّمه"/, '$1"نقدّمه"'],
  [/("heading": "رؤى",\s*"headingAccent": )"وتحديثات القطاع"/, '$1"القطاع والتحديثات"'],
];

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let ar = deepTranslate(en);

// Preserve handcrafted nav/site/seo sections
const partial = JSON.parse(fs.readFileSync(arPath, "utf8"));
ar.site = partial.site;
ar.seo = partial.seo;
ar.nav = partial.nav;
ar.footer.description = partial.footer.description;
ar.footer.logos = partial.footer.logos;
ar.footer.quickLinks.title = partial.footer.quickLinks.title;
// Translate footer quick link labels to match nav
ar.footer.quickLinks.items = en.footer.quickLinks.items.map((item, i) => ({
  ...item,
  label: ar.nav.items[i]?.label ?? item.label,
}));

let json = JSON.stringify(ar, null, 2) + "\n";
for (const [pattern, replacement] of POST_FIXES) {
  json = json.replace(pattern, replacement);
}

fs.writeFileSync(arPath, json, "utf8");

function countLeaves(o) {
  if (typeof o === "string" || typeof o === "number" || typeof o === "boolean")
    return 1;
  if (Array.isArray(o)) return o.reduce((s, v) => s + countLeaves(v), 0);
  if (o && typeof o === "object")
    return Object.values(o).reduce((s, v) => s + countLeaves(v), 0);
  return 0;
}

function countUntranslated(enO, arO, path = "") {
  let hits = [];
  if (typeof enO === "string" && typeof arO === "string") {
    const key = path.split(".").pop()?.replace(/\[\d+\]$/, "") ?? "";
    if (enO === arO && !shouldPreserve(enO, key, path)) {
      hits.push(path);
    }
    return hits;
  }
  if (Array.isArray(enO) && Array.isArray(arO)) {
    enO.forEach((v, i) => {
      hits.push(...countUntranslated(v, arO[i], `${path}[${i}]`));
    });
    return hits;
  }
  if (enO && typeof enO === "object" && arO && typeof arO === "object") {
    for (const k of Object.keys(enO)) {
      hits.push(...countUntranslated(enO[k], arO[k], path ? `${path}.${k}` : k));
    }
  }
  return hits;
}

ar = JSON.parse(json);
const untranslated = countUntranslated(en, ar);
const stats = fs.statSync(arPath);
console.log(`Wrote ${arPath}`);
console.log(`File size: ${stats.size} bytes`);
console.log(`Leaf key count: ${countLeaves(ar)}`);
console.log(`Untranslated strings: ${untranslated.length}`);
if (untranslated.length) {
  console.log(untranslated.slice(0, 40).join("\n"));
}

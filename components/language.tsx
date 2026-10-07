'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { track } from '@vercel/analytics'

type Language = 'en' | 'ar'

const arabic: Record<string, string> = {
  'Kavach home': 'الرئيسية - كافاش',
  Home: 'الرئيسية', About: 'من نحن', Services: 'الخدمات', Journal: 'المجلة', Bookings: 'الحجوزات', Contact: 'تواصل معنا',
  'Vastu checker': 'فاحص فاستو', 'Primary navigation': 'التنقل الرئيسي', 'Footer navigation': 'روابط التذييل',
  'Book a consultation': 'احجز استشارة', 'Close menu': 'إغلاق القائمة', 'Open menu': 'فتح القائمة',
  'Spatial advisory rooted in Vastu': 'استشارات مكانية مستندة إلى فاستو',
  'How a review works': 'كيف تسير المراجعة',
  'From first look to a clearer next step.': 'من النظرة الأولى إلى خطوة تالية أوضح',
  'Tell us what matters': 'أخبرونا بما يهمكم',
  'Share your plan, priorities and where you are in the process.': 'شاركوا مخططكم وأولوياتكم والمرحلة التي وصلتم إليها.',
  'Review how the space works': 'مراجعة طريقة استخدام المساحة',
  'Consider orientation, daylight, circulation and the way each room will be used.': 'ندرس الاتجاه وضوء النهار والحركة وطريقة استخدام كل غرفة.',
  'Leave with practical next steps': 'خطوات عملية واضحة',
  'Discuss practical points to explore before you buy, renovate or build.': 'نناقش نقاطاً عملية يمكنكم دراستها قبل الشراء أو التجديد أو البناء.',
  'Choose a topic': 'اختاروا موضوعاً',
  'Choose a space to start your WhatsApp enquiry.': 'اختاروا نوع المساحة لبدء استفساركم عبر واتساب.',
  'Open WhatsApp options': 'فتح خيارات واتساب',
  'Close WhatsApp options': 'إغلاق خيارات واتساب',
  'Beyond the floor plan': 'ما وراء المخطط الطابقي',
  'Feel the fit': 'اكتشف ملاءمة المساحة',
  'before you commit.': 'قبل الالتزام.',
  'Listings show rooms, not how daylight, circulation and orientation shape daily life. Kavach helps you assess those details before you buy, rent or build.': 'تعرض الإعلانات الغرف، لكنها لا توضح كيف يؤثر ضوء النهار والحركة والاتجاه في حياتكم اليومية. تساعدكم كافاش على تقييم هذه التفاصيل قبل الشراء أو الاستئجار أو البناء.',
  'Spaces that feel like home.': 'مساحات تشبه البيت.',
  'Go beyond listings. See whether a home’s layout, orientation and flow fit your life—before you buy, rent or redesign.': 'تجاوز الإعلانات العقارية. تعرّف على مدى ملاءمة تصميم المنزل واتجاهه وانسيابيته لحياتك قبل الشراء أو الاستئجار أو التجديد.',
  'Start a conversation': 'ابدأ حواراً', 'Our services': 'خدماتنا',
  'A considered approach to every space': 'نهج مدروس لكل مساحة', 'Our approach': 'نهجنا',
  'Light, flow and orientation, read with care.': 'الضوء والحركة والاتجاه، بفهم متأنٍ.',
  'Founded by Vedang Joshi, Kavach looks at how a space is lived in: where the morning light lands, how people move, and what each room is asked to do. Recommendations are practical, considered, and shaped around your priorities.': 'أسس فيدانغ جوشي شركة كافاش لدراسة كيفية عيش الناس في المساحات: أين يصل ضوء الصباح، وكيف يتحركون، وما الغرض من كل غرفة. نقدم توصيات عملية ومدروسة وفقاً لأولوياتكم.',
  'Meet your advisor': 'تعرّف على مستشارك', 'How we help': 'كيف نساعد',
  'Advice for the spaces that matter.': 'إرشاد للمساحات المهمة.', 'All services': 'جميع الخدمات',
  'Home harmony': 'انسجام المنزل', 'Guidance for buying, renting, or redesigning a home.': 'إرشاد عند شراء المنزل أو استئجاره أو إعادة تصميمه.',
  'Bright open-plan living room with soft sofas': 'غرفة معيشة مشرقة بتصميم مفتوح وأرائك مريحة',
  'Workplace flow': 'انسيابية بيئة العمل', 'Spatial advice for focus, culture, and better work.': 'استشارات مكانية تدعم التركيز والثقافة وجودة العمل.',
  'Calm modern office corridor with natural tones': 'ممر مكتبي عصري وهادئ بألوان طبيعية',
  'Developer advisory': 'استشارات للمطورين', 'A considered perspective from concept through handover.': 'رؤية مدروسة من مرحلة الفكرة حتى التسليم.',
  'Contemporary timber-clad home beneath an open sky': 'منزل معاصر بكسوة خشبية تحت سماء مفتوحة',
  'Selected spaces': 'مساحات مختارة', 'Calm, considered, lived in.': 'هدوء مدروس وحياة يومية.',
  'Read the journal': 'اقرأ المجلة', 'Sunlit living room with indoor plants': 'غرفة معيشة مضاءة بالشمس ونباتات داخلية',
  'Light & greenery': 'الضوء والخضرة', 'Residential study': 'دراسة سكنية',
  'Quiet reading corner with a yellow armchair': 'ركن قراءة هادئ مع مقعد أصفر', 'A quiet corner': 'ركن هادئ', 'Interior study': 'دراسة داخلية',
  'White villa beside a turquoise pool': 'فيلا بيضاء بجانب مسبح فيروزي', 'An open outlook': 'إطلالة مفتوحة', 'Exterior study': 'دراسة خارجية',
  'Warm lounge with long windows and timber floors': 'صالة دافئة بنوافذ طويلة وأرضيات خشبية', 'Grounded warmth': 'دفء طبيعي', 'Living space': 'مساحة معيشة',
  'Modern home glowing at dusk beneath a large tree': 'منزل عصري عند الغروب تحت شجرة كبيرة', 'Open to the east': 'انفتاح نحو الشرق', 'Architecture study': 'دراسة معمارية',
  'Based in Dubai': 'مقرنا في دبي', 'Ready when you are. Let’s begin.': 'نحن جاهزون متى كنتم. لنبدأ.',
  'Contact us': 'تواصل معنا', 'Contact details': 'بيانات التواصل', 'Let’s talk about your space.': 'لنتحدث عن مساحتكم.',
  'Spatial advisory for more intentional living and working. Tell us what you are looking for and we will help you find the right next step.': 'استشارات مكانية لحياة وعمل أكثر وعياً. أخبرونا بما تبحثون عنه وسنساعدكم في تحديد الخطوة التالية.',
  Phone: 'الهاتف', Email: 'البريد الإلكتروني', WhatsApp: 'واتساب', 'Message us': 'راسلنا', 'Message us directly': 'راسلنا مباشرة',
  Studio: 'المكتب', 'Dubai, United Arab Emirates': 'دبي، الإمارات العربية المتحدة', 'Request a consultation': 'اطلب استشارة',
  'A different way to look at space': 'نظرة مختلفة إلى المساحة', 'Ancient wisdom. Clear-eyed advice.': 'حكمة عريقة. إرشاد واضح.',
  'Vastu is not about fear or rigid rules. It is a thoughtful way to understand how light, movement, orientation and intention shape the way a space feels.': 'لا يقوم فاستو على الخوف أو القواعد الجامدة. بل هو نهج متأنٍ لفهم أثر الضوء والحركة والاتجاه والغاية في إحساسنا بالمكان.',
  'Founded by Vedang Joshi, Kavach offers practical, considered recommendations for the way people live and work today. We begin by listening to what matters to you, then look at the space and its possibilities together.': 'أسس فيدانغ جوشي شركة كافاش لتقديم توصيات عملية ومدروسة تناسب أنماط الحياة والعمل اليوم. نبدأ بالاستماع إلى ما يهمكم، ثم ندرس المكان وإمكاناته معاً.',
  'Explore our services': 'اكتشف خدماتنا', 'Sunlit interior with a rounded doorway and indoor greenery': 'مساحة داخلية مضاءة بالشمس وبها مدخل مقوس ونباتات', 'Dubai skyline at sunrise': 'أفق دبي عند الشروق',
  'Advice for the spaces that matter most.': 'إرشاد للمساحات الأهم.',
  'Residential advisory': 'استشارات سكنية', 'A home that works for the way you live.': 'منزل يناسب أسلوب حياتكم.',
  'Whether you are choosing a new home or rethinking one you already love, we help you look at orientation, natural light, movement and how each room supports daily life.': 'سواء كنتم تختارون منزلاً جديداً أو تعيدون التفكير في منزل تحبونه، نساعدكم على دراسة الاتجاه والضوء الطبيعي والحركة ودور كل غرفة في الحياة اليومية.',
  'Pre-purchase or rental review of a floor plan and orientation': 'مراجعة المخطط والاتجاه قبل الشراء أو الاستئجار',
  'Guidance for renovations, room use and furniture placement': 'إرشاد بشأن التجديد واستخدام الغرف وتوزيع الأثاث',
  'On-site or remote consultation shaped around your priorities': 'استشارة حضورية أو عن بُعد وفقاً لأولوياتكم',
  'Workplace advisory': 'استشارات لبيئة العمل', 'Space for good work to happen.': 'مساحة تساعد على إنجاز العمل.',
  'We help business owners and teams make considered spatial decisions for offices, shops, clinics and restaurants, balancing practical needs with a clearer sense of flow.': 'نساعد أصحاب الأعمال والفرق على اتخاذ قرارات مكانية مدروسة للمكاتب والمتاجر والعيادات والمطاعم، مع مراعاة الاحتياجات العملية وانسيابية الحركة.',
  'Planning input for new premises and fit-outs': 'مدخلات تخطيطية للمواقع الجديدة وتجهيزاتها',
  'Review of room functions, circulation and key work areas': 'مراجعة وظائف الغرف ومسارات الحركة ومناطق العمل الأساسية',
  'Advice for existing spaces seeking a more intentional layout': 'إرشاد للمساحات القائمة الراغبة في تصميم أكثر وعياً',
  'Development advisory': 'استشارات التطوير العقاري', 'A considered partner from concept to handover.': 'شريك مدروس من الفكرة حتى التسليم.',
  'Kavach works alongside developers, architects and interior designers to bring a Vastu-informed perspective into the design conversation, early enough to be useful.': 'تعمل كافاش مع المطورين والمهندسين المعماريين ومصممي الديكور لإدخال منظور مستند إلى فاستو في نقاش التصميم في مرحلة مبكرة ومفيدة.',
  'Concept-stage orientation and planning review': 'مراجعة الاتجاه والتخطيط في مرحلة الفكرة',
  'Collaborative input for architects and interior designers': 'مساهمة تعاونية للمهندسين المعماريين ومصممي الديكور',
  'Clear recommendations presented for real project decisions': 'توصيات واضحة لدعم قرارات المشروع الفعلية',
  'Your next step': 'خطوتكم التالية', 'Let’s make space for good.': 'لنهيئ مساحة لما هو أفضل.',
  'Tell us a little about your space and preferred timing. The team can then follow up with next steps. For direct enquiries, visit our': 'أخبرونا قليلاً عن مساحتكم والوقت المناسب لكم. سيتواصل معكم الفريق لمتابعة الخطوات التالية. للاستفسارات المباشرة، تفضلوا بزيارة',
  'contact page': 'صفحة التواصل', 'Your name': 'الاسم', 'Email address': 'البريد الإلكتروني', 'Phone number': 'رقم الهاتف',
  'Preferred date': 'التاريخ المفضل', 'Property type': 'نوع العقار', 'Residential property': 'منزل', Workplace: 'مكان عمل', Development: 'مشروع تطوير',
  'How can we help?': 'كيف يمكننا مساعدتكم؟', 'Submit booking enquiry': 'إرسال طلب الاستشارة', Sending: 'جارٍ الإرسال',
  'Thank you. Your booking enquiry has been sent. We will be in touch soon.': 'شكراً لكم. تم إرسال طلب الاستشارة وسنتواصل معكم قريباً.',
  'We could not send your request right now.': 'تعذر إرسال طلبكم الآن.', 'We could not send your request right now. Please try again.': 'تعذر إرسال طلبكم الآن. يرجى المحاولة مجدداً.',
  'All fields are required.': 'جميع الحقول مطلوبة.', 'Enter a valid email.': 'أدخلوا بريداً إلكترونياً صحيحاً.',
  'Please shorten one or more fields.': 'يرجى اختصار حقل واحد أو أكثر.', 'Choose a valid preferred date.': 'اختاروا تاريخاً مفضلاً صحيحاً.',
  'Choose a date that is today or later.': 'اختاروا تاريخ اليوم أو تاريخاً لاحقاً.',
  'Enter a valid phone number.': 'أدخلوا رقم هاتف صحيحاً.',
  'Choose a valid property type.': 'اختاروا نوع عقار صحيحاً.',
  'Online booking is not configured yet. Please use the contact page to request a consultation.': 'لم يتم إعداد الحجز عبر الإنترنت بعد. يرجى استخدام صفحة التواصل لطلب استشارة.',
  'Booking email is partially configured. Please contact the site administrator.': 'تم إعداد البريد للحجوزات جزئياً. يرجى التواصل مع مسؤول الموقع.',
  'We could not send your request right now. Please try again shortly.': 'تعذر إرسال طلبكم الآن. يرجى المحاولة بعد قليل.',
  'Get in touch': 'تواصلوا معنا', 'A thoughtful conversation starts here.': 'هنا تبدأ محادثة مدروسة.', 'Call us': 'اتصلوا بنا', 'Email us': 'راسلونا',
  'Share a few details about your space and we can arrange a conversation.': 'شاركونا بعض التفاصيل عن مساحتكم لنرتب محادثة.',
  'From the journal': 'من المجلة', 'A little perspective.': 'وجهة نظر مختلفة.', 'What Vastu is, and what it is not': 'ما هو فاستو وما ليس كذلك',
  'A grounded introduction to Vastu, separating practical spatial guidance from superstition and rigid rules.': 'مقدمة واقعية عن فاستو تميز الإرشاد المكاني العملي عن الخرافات والقواعد الجامدة.',
  'Choosing a home that feels right': 'اختيار منزل يناسبكم',
  'A simple lens for noticing light, flow, orientation, and the everyday feeling of a potential home.': 'نظرة بسيطة إلى الضوء والحركة والاتجاه والإحساس اليومي في المنزل المحتمل.',
  'The quiet power of a well-oriented workplace': 'أثر بيئة العمل جيدة التوجيه',
  'How thoughtful planning can support focus, collaboration, and a calmer rhythm at work.': 'كيف يدعم التخطيط المدروس التركيز والتعاون وإيقاع عمل أكثر هدوءاً.',
  'Article preview': 'مقتطف من المقال', 'Essay': 'مقال', '5 min read': 'قراءة في ٥ دقائق', '4 min read': 'قراءة في ٤ دقائق', '6 min read': 'قراءة في ٦ دقائق',
  'Arrange a consultation': 'رتبوا استشارة', 'Explore this service': 'اكتشفوا هذه الخدمة', 'Back to all services': 'العودة إلى جميع الخدمات',
  'A quick first look': 'نظرة أولية سريعة', 'Get a few general pointers for your space, then book a full consultation for advice based on your complete plan.': 'احصلوا على بعض الإرشادات العامة لمساحتكم، ثم احجزوا استشارة كاملة لتوصيات تستند إلى مخططكم بالكامل.',
  'Check your space': 'افحصوا مساحتكم', 'Quick Vastu checker': 'فاحص فاستو السريع', 'General guidance only': 'إرشادات عامة فقط',
  'Try a quick space check': 'جرّبوا فحصاً سريعاً للمساحة', 'Answer three simple questions about a property.': 'أجيبوا عن ثلاثة أسئلة بسيطة حول العقار.',
  'A few details can help you notice what to look at next. This is not a pass/fail rating or a substitute for a full plan review.': 'تساعدكم بعض التفاصيل على معرفة ما ينبغي ملاحظته لاحقاً. هذا ليس تقييماً بالنجاح أو الرسوب ولا يغني عن مراجعة كاملة للمخطط.',
  'What kind of space is it?': 'ما نوع المساحة؟', 'Development project': 'مشروع تطوير',
  'Which direction does the main entrance face?': 'إلى أي اتجاه يواجه المدخل الرئيسي؟', North: 'الشمال', East: 'الشرق', South: 'الجنوب', West: 'الغرب', 'I’m not sure': 'لست متأكداً',
  'What would you most like to improve?': 'ما الجانب الذي ترغبون في تحسينه؟', 'Entry and circulation': 'المدخل ومسارات الحركة', 'Daylight': 'ضوء النهار', 'Quiet and rest': 'الهدوء والراحة', 'Work and focus': 'العمل والتركيز',
  'For a development project, review orientation, circulation and daylight together while the plan can still be adjusted.': 'في مشروع التطوير، راجعوا الاتجاه ومسارات الحركة وضوء النهار معاً بينما لا يزال بالإمكان تعديل المخطط.',
  'For a home, compare the layout with the routines of everyone who lives there.': 'في المنزل، قارنوا المخطط بروتين جميع السكان.',
  'For a workplace, consider how staff, visitors and service routes move through it.': 'في مكان العمل، راعوا حركة الموظفين والزوار ومسارات الخدمة.',
  'Walk from the entrance to the main rooms. Check that everyday routes stay clear.': 'تحركوا من المدخل إلى الغرف الرئيسية وتأكدوا من خلو مسارات الحركة اليومية.',
  'Notice where daylight falls at different times, including heat and glare.': 'لاحظوا مواضع ضوء النهار في أوقات مختلفة، بما في ذلك الحرارة والوهج.',
  'Consider how quieter rooms relate to doors, shared spaces and outdoor noise.': 'راعوا علاقة الغرف الهادئة بالأبواب والمساحات المشتركة والضوضاء الخارجية.',
  'Check whether the work area has useful light and enough separation from interruptions.': 'تحققوا من توفر ضوء مناسب في منطقة العمل ومن عزلها بما يكفي عن مصادر المقاطعة.',
  'Your selection': 'اختياراتكم', 'Sending…': 'جارٍ الإرسال…',
  'Chat with our Vastu assistant on WhatsApp': 'تحدثوا مع مساعد فاستو عبر واتساب',
  'Light-filled modern villa with a reflecting pool under a clear sky': 'فيلا عصرية مضاءة تحيط بها بركة عاكسة تحت سماء صافية',
  'Spaces that': 'مساحات', 'feel like home.': 'تشبه البيت.',
  'Your advisor': 'مستشارك',
  'Show my pointers': 'اعرضوا الإرشادات', 'Your starting points': 'نقاط للبدء', 'The entrance direction is only one part of a space. Observe its daylight and heat through the day, then consider it alongside your layout and routines.': 'اتجاه المدخل جزء واحد فقط من المساحة. لاحظوا الضوء والحرارة خلال اليوم، ثم قارنوها بالمخطط وروتينكم اليومي.',
  'For a home, compare the layout with the routines of everyone who lives there. For a workplace, consider how staff and visitors move through it.': 'في المنزل، قارنوا المخطط بروتين جميع السكان. وفي مكان العمل، راعوا حركة الموظفين والزوار.',
  'Notice how your priority area connects to nearby rooms, natural light and the main circulation route. Small changes in use or furniture may be worth exploring.': 'لاحظوا ارتباط المنطقة ذات الأولوية بالغرف المجاورة والضوء الطبيعي ومسار الحركة الرئيسي. قد يكون من المفيد دراسة تغييرات بسيطة في الاستخدام أو الأثاث.',
  'Book a full consultation': 'احجزوا استشارة كاملة', 'Start again': 'ابدأوا من جديد',
  'Select one': 'اختاروا', 'Dubai': 'دبي',
  'Meet the founder': 'تعرفوا على المؤسس',
  'Founder & Principal Vastu Advisor': 'المؤسس والمستشار الرئيسي لفاستو',
  'Book a consultation with Vedang': 'احجزوا استشارة مع فيدانغ',
  'Behind Kavach': 'من وراء كافاش',
  'Every consultation is guided by Vedang Joshi.': 'يشرف فيدانغ جوشي على كل استشارة.',
  'Kavach starts by listening to what matters to you, then considers how light, movement, orientation and daily routines shape a space.': 'تبدأ كافاش بالاستماع إلى ما يهمكم، ثم تدرس أثر الضوء والحركة والاتجاه والروتين اليومي في المساحة.',
  'Kavach was founded by Vedang Joshi to bring a practical, people-first perspective to Vastu and the spaces people live and work in.': 'أسس فيدانغ جوشي كافاش لتقديم منظور عملي يضع الناس أولاً في فاستو والمساحات التي يعيشون ويعملون فيها.',
  'Based in Dubai, Kavach advises on homes, workplaces and developments by considering light, orientation, movement and the way each space is used.': 'تقدم كافاش، ومقرها دبي، استشارات للمنازل وبيئات العمل ومشاريع التطوير مع مراعاة الضوء والاتجاه والحركة وطريقة استخدام المساحة.',
}

type LanguageContextValue = { language: Language; toggleLanguage: () => void; t: (text: string) => string }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem('kavach-language')
    if (saved === 'ar' || saved === 'en') setLanguage(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    window.localStorage.setItem('kavach-language', language)
  }, [language])

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    toggleLanguage: () => setLanguage((current) => {
      const next = current === 'en' ? 'ar' : 'en'
      track('Language Changed', { language: next })
      return next
    }),
    t: (text) => language === 'ar' ? arabic[text] ?? text : text,
  }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage()
  return <button type="button" onClick={toggleLanguage} aria-label={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'} aria-pressed={language === 'ar'} className={`rounded-full border border-current px-3 py-2 text-xs font-medium transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${className}`}>
    {language === 'en' ? 'العربية' : 'English'}
  </button>
}

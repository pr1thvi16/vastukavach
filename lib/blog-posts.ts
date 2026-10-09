export type BlogLocaleContent = {
  title: string
  excerpt: string
  imageAlt: string
  intro: string
  sections: { heading: string; paragraphs: string[] }[]
}

export type BlogPost = {
  slug: string
  image: string
  readingMinutes: number
  en: BlogLocaleContent
  ar: BlogLocaleContent
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-vastu-is-and-is-not',
    image: '/images/living-greenery.jpg',
    readingMinutes: 5,
    en: {
      title: 'What Vastu is, and what it is not',
      excerpt: 'A grounded introduction to Vastu: a way to look at light, movement, orientation and everyday use without fear or rigid rules.',
      imageAlt: 'Sunlit living room with indoor plants',
      intro: 'Vastu is often described through a long list of rules. A more useful place to begin is with the space in front of you: how people enter, where daylight falls, how rooms connect, and whether the layout supports the way people actually live or work.',
      sections: [
        {
          heading: 'Start with the way a space is used',
          paragraphs: [
            'A plan is more than a collection of rooms. It creates routes between daily activities, quiet and social areas, work and rest. Notice where people naturally walk, where bags and everyday items collect, and which corners are bright, warm, noisy or rarely used. These observations make a conversation about a space more specific.',
            'Orientation can be part of that review, alongside daylight, heat, ventilation, privacy and practical constraints. A rented apartment, an existing villa and a building still on paper all have different options. Advice should take those realities into account rather than assume every space can be rebuilt.'
          ]
        },
        {
          heading: 'What Vastu does not need to become',
          paragraphs: [
            'It does not need to be a pass-or-fail score, a reason to fear a home, or a promise that a single direction will guarantee an outcome. No short online checklist can fully assess a property or replace a review of the complete plan and its context.',
            'Be cautious of pressure to make costly changes before someone has understood your priorities and the limits of the building. A thoughtful review should explain what was observed, why it may matter to you, and what practical choices are available.'
          ]
        },
        {
          heading: 'A practical first review',
          paragraphs: [
            'Choose one concern to start with: a busy entrance, a dark room, a difficult route between the kitchen and dining area, or a workplace that makes focused tasks hard. Note when the problem occurs and who it affects. If you have a floor plan, bring it along.',
            'The aim is clarity, not perfection. Looking carefully at how a space works gives you better questions to ask and a more grounded starting point for deciding what to change — or what is already working well.'
          ]
        }
      ]
    },
    ar: {
      title: 'ما هو فاستو، وما الذي لا يعنيه؟',
      excerpt: 'مقدمة عملية إلى فاستو تركز على الضوء والحركة والاتجاه والاستخدام اليومي دون خوف أو قواعد جامدة.',
      imageAlt: 'غرفة معيشة مضيئة مع نباتات داخلية',
      intro: 'يُعرض فاستو أحياناً على شكل قائمة طويلة من القواعد. لكن البداية الأكثر فائدة هي النظر إلى المساحة نفسها: كيف يدخل الناس إليها، وأين يصل الضوء، وكيف تتصل الغرف، وهل يناسب التخطيط طريقة العيش أو العمل الفعلية.',
      sections: [
        {
          heading: 'ابدأ بكيفية استخدام المكان',
          paragraphs: [
            'المخطط ليس مجرد مجموعة غرف؛ فهو ينظم الحركة بين الأنشطة اليومية ومناطق الهدوء والاجتماع والعمل والراحة. لاحظ مسارات المشي الطبيعية، والأماكن التي تتجمع فيها الأغراض، والزوايا المضيئة أو الحارة أو الصاخبة أو قليلة الاستخدام.',
            'يمكن دراسة الاتجاهات إلى جانب ضوء النهار والحرارة والتهوية والخصوصية والقيود العملية. تختلف الخيارات المتاحة في شقة مستأجرة عن فيلا قائمة أو مبنى لا يزال في مرحلة التخطيط، وينبغي أن تراعي الإرشادات هذه الظروف.'
          ]
        },
        {
          heading: 'ما الذي لا ينبغي أن يتحول إليه فاستو؟',
          paragraphs: [
            'لا ينبغي أن يكون اختبار نجاح أو فشل، أو سبباً للخوف من المنزل، أو وعداً بأن اتجاهاً واحداً يضمن نتيجة معينة. ولا تستطيع قائمة قصيرة عبر الإنترنت تقييم عقار بالكامل أو أن تحل محل مراجعة المخطط وسياقه.',
            'احذر من الضغط لإجراء تغييرات مكلفة قبل فهم أولوياتك وحدود المبنى. المراجعة الجيدة تشرح ما تمت ملاحظته ولماذا قد يهمك وما الخيارات العملية المتاحة.'
          ]
        },
        {
          heading: 'كيف تبدأ مراجعة عملية؟',
          paragraphs: [
            'ابدأ بملاحظة واحدة، مثل مدخل مزدحم، أو غرفة قليلة الضوء، أو مسار صعب بين المطبخ ومنطقة الطعام، أو مكان عمل يصعّب التركيز. دوّن متى تظهر المشكلة ومن يتأثر بها، وأحضر المخطط إن توفر.',
            'الهدف هو الوضوح لا الكمال. إن فهم طريقة عمل المكان يساعدك على طرح أسئلة أفضل وتحديد ما يمكن تحسينه وما يعمل بشكل جيد بالفعل.'
          ]
        }
      ]
    }
  },
  {
    slug: 'choosing-a-home-that-feels-right',
    image: '/images/villa-pool.jpg',
    readingMinutes: 4,
    en: {
      title: 'Choosing a home that feels right',
      excerpt: 'A calm checklist for viewing a property: notice daylight, routes, privacy and the routines that matter to you.',
      imageAlt: 'White villa beside a turquoise pool',
      intro: 'A property can look impressive in photographs and still feel awkward once you spend time in it. During a viewing, take a moment to imagine an ordinary day rather than focusing only on finishes, furniture or the first impression.',
      sections: [
        {
          heading: 'Walk the everyday routes',
          paragraphs: [
            'Imagine arriving with shopping, getting ready in the morning, preparing food, finding a quiet place to rest and welcoming visitors. Are the routes between those activities straightforward? Do doors, corridors and storage support the way you expect to use the home?',
            'Pay attention to natural light at the time of your visit, and ask whether you can return at another time of day. Notice glare, heat, outdoor noise and how private the bedrooms and shared spaces feel. These details are often easier to judge in person than in a listing.'
          ]
        },
        {
          heading: 'Look beyond a single direction',
          paragraphs: [
            'Orientation can influence daylight and heat, but it is one part of a bigger picture. Layout, window placement, ventilation, neighbouring buildings, maintenance and your own schedule all affect daily comfort. Avoid treating one feature as the only thing that determines whether a property is suitable.',
            'If you are comparing several homes, use the same short checklist for each one. Write down what works, what concerns you and what needs an answer from the agent or landlord.'
          ]
        },
        {
          heading: 'Ask better questions before committing',
          paragraphs: [
            'Request a floor plan and confirm details that are hard to judge from photos: storage, service areas, changes to the layout, building rules and any planned work nearby. For a rental, consider which changes are permitted and which would need to remain reversible.',
            'A Vastu-informed review can provide another lens for considering orientation and room use alongside your practical needs. It is guidance for a more informed conversation, not a guarantee about the future or a substitute for legal, engineering or property due diligence.'
          ]
        }
      ]
    },
    ar: {
      title: 'كيف تختار منزلاً يناسبك؟',
      excerpt: 'قائمة هادئة لمعاينة العقار: راقب الضوء ومسارات الحركة والخصوصية والعادات اليومية المهمة لك.',
      imageAlt: 'فيلا بيضاء بجوار مسبح بلون فيروزي',
      intro: 'قد يبدو العقار رائعاً في الصور، لكنه لا يكون مريحاً عند قضاء الوقت فيه. أثناء المعاينة، تخيل يوماً عادياً في المنزل بدلاً من التركيز فقط على التشطيبات والأثاث والانطباع الأول.',
      sections: [
        {
          heading: 'تتبّع مسارات الحياة اليومية',
          paragraphs: [
            'تخيل الوصول إلى المنزل، والاستعداد صباحاً، وإعداد الطعام، والعثور على مكان هادئ للراحة واستقبال الزوار. هل الحركة بين هذه الأنشطة سهلة؟ وهل تدعم الأبواب والممرات ومساحات التخزين طريقة استخدامك المتوقعة؟',
            'انتبه إلى ضوء النهار أثناء الزيارة واسأل إن كان بإمكانك العودة في وقت آخر. لاحظ الوهج والحرارة والضوضاء الخارجية ودرجة الخصوصية في غرف النوم والمساحات المشتركة.'
          ]
        },
        {
          heading: 'لا تعتمد على اتجاه واحد فقط',
          paragraphs: [
            'قد يؤثر الاتجاه على الضوء والحرارة، لكنه جزء واحد من الصورة الكاملة. يؤثر التخطيط والنوافذ والتهوية والمباني المجاورة والصيانة وجدولك اليومي أيضاً في الراحة.',
            'إذا كنت تقارن عدة منازل، استخدم القائمة نفسها لكل منها. دوّن ما يناسبك وما يقلقك وما يحتاج إلى إجابة من الوسيط أو المالك.'
          ]
        },
        {
          heading: 'اسأل قبل أن تلتزم',
          paragraphs: [
            'اطلب مخطط الطابق وتحقق من التفاصيل التي لا تظهر بوضوح في الصور، مثل التخزين ومناطق الخدمات والتغييرات المسموح بها وقواعد المبنى وأعمال البناء القريبة. وفي العقار المستأجر، اسأل عن التعديلات المسموح بها والتي يمكن إزالتها لاحقاً.',
            'يمكن لمراجعة تسترشد بمبادئ فاستو أن تضيف زاوية أخرى لفهم الاتجاه واستخدام الغرف بجانب احتياجاتك العملية. لكنها لا تضمن المستقبل ولا تحل محل الفحص القانوني أو الهندسي أو التحقق العقاري.'
          ]
        }
      ]
    }
  },
  {
    slug: 'well-oriented-workplace',
    image: '/images/workplace.jpg',
    readingMinutes: 6,
    en: {
      title: 'The quiet power of a well-oriented workplace',
      excerpt: 'Consider how arrival, focused work, collaboration and service routes come together in a workplace layout.',
      imageAlt: 'Calm modern office corridor with natural tones',
      intro: 'A workplace shapes more than its appearance. People arrive, find their way, concentrate, meet clients, collaborate and take breaks throughout the day. A useful layout helps those activities coexist without unnecessary friction.',
      sections: [
        {
          heading: 'Begin with the working day',
          paragraphs: [
            'Follow the journey from the entrance to reception, meeting rooms, individual desks and shared areas. Is it obvious where visitors should go? Do deliveries or service tasks cross busy visitor routes? Can people find a quiet place when the work requires focus?',
            'The answers may be found in simple observations rather than a major renovation. Clear routes, sensible placement of shared resources and a visible welcome point can help people understand the space and move through it with less interruption.'
          ]
        },
        {
          heading: 'Balance focus and connection',
          paragraphs: [
            'Open collaboration areas can be useful, but they work best when people can also take calls or complete focused tasks without excessive noise. Notice how sound travels, whether screens receive glare, and how daylight changes across the workday.',
            'A good workplace review considers the needs of different roles. A reception team, a person handling confidential conversations and a team doing collaborative work may need different relationships to entrances, windows and shared spaces.'
          ]
        },
        {
          heading: 'Use orientation as one useful lens',
          paragraphs: [
            'Direction and daylight can be part of a review, together with ventilation, safety, accessibility, equipment, privacy and building constraints. These elements should be considered together; a compass direction alone cannot tell you whether an office layout works.',
            'Before changing the space, gather feedback from the people who use it. Bring a current floor plan, note recurring bottlenecks and identify any changes that need landlord or facilities approval. The goal is a more considered plan that supports how the team really works.'
          ]
        }
      ]
    },
    ar: {
      title: 'الأثر الهادئ لتخطيط مكان العمل بعناية',
      excerpt: 'تعرّف على كيفية ترابط الوصول والعمل المركز والتعاون ومسارات الخدمات داخل مكان العمل.',
      imageAlt: 'ممر مكتب حديث وهادئ بألوان طبيعية',
      intro: 'لا يقتصر تأثير مكان العمل على مظهره. يصل الناس، ويبحثون عن وجهتهم، ويركزون، ويقابلون العملاء، ويتعاونون ويأخذون فترات راحة طوال اليوم. ويساعد التخطيط الجيد هذه الأنشطة على التعايش بسلاسة أكبر.',
      sections: [
        {
          heading: 'ابدأ بيوم العمل المعتاد',
          paragraphs: [
            'تتبّع المسار من المدخل إلى الاستقبال وغرف الاجتماعات والمكاتب الفردية والمساحات المشتركة. هل يعرف الزوار إلى أين يتجهون؟ وهل تتقاطع عمليات التوصيل أو الخدمات مع مسارات الزوار؟ هل يوجد مكان هادئ عندما تتطلب المهمة تركيزاً؟',
            'قد تظهر الإجابات من ملاحظات بسيطة لا من تجديد كبير. فالممرات الواضحة وتوزيع الموارد المشتركة بشكل منطقي ونقطة استقبال بارزة تساعد الناس على فهم المساحة والتحرك فيها بمقاطعات أقل.'
          ]
        },
        {
          heading: 'وازن بين التركيز والتواصل',
          paragraphs: [
            'قد تكون المساحات المفتوحة للتعاون مفيدة، لكنها تعمل بشكل أفضل عندما يستطيع الموظفون أيضاً إجراء المكالمات وإنجاز المهام المركزة دون ضوضاء مفرطة. لاحظ انتقال الصوت والوهج على الشاشات وتغيّر ضوء النهار خلال اليوم.',
            'تراعي مراجعة مكان العمل احتياجات الأدوار المختلفة؛ فقد يحتاج فريق الاستقبال ومن يجري محادثات سرية وفريق العمل التعاوني إلى علاقات مختلفة مع المداخل والنوافذ والمساحات المشتركة.'
          ]
        },
        {
          heading: 'اجعل الاتجاه جزءاً من الصورة',
          paragraphs: [
            'يمكن دراسة الاتجاه والضوء مع التهوية والسلامة وسهولة الوصول والمعدات والخصوصية وقيود المبنى. ينبغي النظر إلى هذه العناصر معاً، لأن اتجاه البوصلة وحده لا يكفي للحكم على جودة التخطيط.',
            'قبل إجراء التغييرات، اجمع آراء الأشخاص الذين يستخدمون المكان. أحضر مخططاً حديثاً وسجّل نقاط الازدحام المتكررة والتغييرات التي تحتاج إلى موافقة المالك أو إدارة المرافق. الهدف هو تخطيط مدروس يدعم طريقة عمل الفريق فعلياً.'
          ]
        }
      ]
    }
  }
]

export const blogSlugs = blogPosts.map((post) => post.slug)

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

import React from 'react';

export interface CourseModule {
  id: number;
  number: string;
  title: string;
  description: string;
  featured: boolean;
  featured_message?: string;
  icon?: React.ReactNode;
  /** 540×570 WebP in /public/course-modules/ */
  image?: string;
  /** Short Arabic description of what the image shows */
  imageAlt?: string;
  /** Gold badge + popup instead of the inline expand */
  isMasterclass?: boolean;
  /** Popup content for masterclass modules */
  masterclass?: {
    highlights: string[];
    instructor: string;
    duration: string;
  };
}

export const courseModules: CourseModule[] = [
  {
    id: 1,
    number: "01",
    image: '/course-modules/module-01.webp',
    imageAlt: 'رأس فيه لمبة زرقاء تضوي، رمز العقلية',
    title: "عقلية رائد الأعمال الناجح",
    description: "العقلية الصحيحة هي أهم حاجة ، فما أسرار مهمة لازم تعرفهم لهنا.",
    featured: false,
  },
  {
    id: 2,
    number: "02",
    image: '/course-modules/module-02.webp',
    imageAlt: 'لابتوب متحول لمتجر صغير قدامو عربة تسوق',
    title: "تقديم عام على التجارة الإلكترونية",
    description: "باش تعرف الطرق المختلفة إلي تنجم تخدم بيهم التجارة الإلكترونية، الأسواق والفرق بنتهم ، الخطوات إلي يتعدى بيهم مشروعك وبرشا مفاهيم أخرين مهمة.",
    featured: false,
  },
  {
    id: 3,
    number: "03",
    image: '/course-modules/module-03.webp',
    imageAlt: 'صندوق أدوات تطلع منو أدوات المشروع',
    title: "تأسيس المشروع",
    description: "كيفاش ادوات الخدمة لمشروعك (صفحات التواصل الإجتماعي، المتجر، الحساب الإعلاني ...) خطوة بخطوة بطريقة ساهلة و سريعة.",
    featured: false,
  },
  {
    id: 4,
    number: "04",
    image: '/course-modules/module-04.webp',
    imageAlt: 'مكبرة فوق تلاثة علب، وحدة منهم زرقاء',
    title: "إختيار المنتج",
    description: "كفاش تختار المنتج إلي فيه إمكانية كبيرة ينجح ، كفاش تصنع المنتج متاعك ، كفاش تستورد المنتج متاعك ، وطرق جديدة صعيب تلقاها في كورس اخر.",
    featured: false,
  },
  {
    id: 5,
    number: "05",
    image: '/course-modules/module-05.webp',
    imageAlt: 'رسوم بيانية وبوصلة لدراسة السوق',
    title: "دراسة السوق",
    description: "باش تتعلم كيفاش تحلل السوق، تفهم المنافسين، وتكتشف الفرص التجارية ألي المنافسين ينجمو ميفيقوش بيها.",
    featured: false,
  },
  {
    id: 6,
    number: "06",
    image: '/course-modules/module-06.webp',
    imageAlt: 'حصان شطرنج أزرق ذهبي بجنب لمبة',
    isMasterclass: true,
    masterclass: {
      highlights: ['TODO: أهم نقطة 1', 'TODO: أهم نقطة 2', 'TODO: أهم نقطة 3'],
      instructor: 'TODO: اسم المدرب',
      duration: 'TODO: المدة',
    },
    title: 'اصنع "Creative Strategy" قوية',
    description: 'كلمة "Creative strategy" تسمع فيها برشة أما قليل إلي يعرف شمعنها ويعرف يخدمها بالطريقة المحترفة. بش تتعلم ال-"Creative Strategy" على 9a3da صحيحة',
    featured: true,
    featured_message: "A Masterclass"

  },
  {
    id: 7,
    number: "07",
    image: '/course-modules/module-07.webp',
    imageAlt: 'تيليفون فيه زر تشغيل فيديو وبطاقات محتوى',
    title: 'صناعة المحتوى الإعلاني "Creatives"',
    description: "باش تتعلم شنية الحاجات إلي تخلي المحتوى الإعلاني متاعك يجبلك مبيعات، باش نشوفوا عشرات الإعلانات و نفهمو علاش نجحوا.",
    featured: false,
  },
  {
    id: 8,
    number: "08",
    image: '/course-modules/module-08.webp',
    imageAlt: 'قلم حبر ذهبي يكتب خط أزرق على ورقة',
    isMasterclass: true,
    masterclass: {
      highlights: ['TODO: أهم نقطة 1', 'TODO: أهم نقطة 2', 'TODO: أهم نقطة 3'],
      instructor: 'TODO: اسم المدرب',
      duration: 'TODO: المدة',
    },
    title: 'إتقان ال-"Copywriting"',
    description: "الجزء هذا وحدو قيمتوا برشا ملاين. كفاش تقنع أي عبد عن طريق الكلمات. الفلوس الكل في الجزء هذا .",
    featured: true,
    featured_message: "A Masterclass"
  },
  {
    id: 9,
    number: "09",
    image: '/course-modules/module-09.webp',
    imageAlt: 'تيليفون ولوحة مونتاج فيديو وكلاكيت',
    isMasterclass: true,
    masterclass: {
      highlights: ['TODO: أهم نقطة 1', 'TODO: أهم نقطة 2', 'TODO: أهم نقطة 3'],
      instructor: 'TODO: اسم المدرب',
      duration: 'TODO: المدة',
    },
    title: "كورس مونتاج الفيديوات كامل",
    description: 'بش تتعلم كفاش تمنتج بالتيلفون بطريقة سهلة أما باش تتعلم زادة الطريقة المحترفة مع "Youssef Smaoui" إلي خادم مع عشرات البرندة المعروفة في تونس. الكورس هذا وحدو يسوى برش فلوس',
    featured: true,
    featured_message: "A Masterclass",
  },
  {
    id: 10,
    number: "10",
    image: '/course-modules/module-10.webp',
    imageAlt: 'لوحة ألوان وقلم تصميم وبطاقة إعلان',
    title: "تصميم الإعلانات إلي تجيب مبيعات",
    description: "ماكش بش تتعلم كفاش تعمل تصميم أكهو. أما باش تتعلم ما أهم، السيكولوجيا وراء التصميم إلي اجيب المبيعات. باش تنبهر في الجزء هذا خاطر ماريتش شكون حكى عليه.",
    featured: false,
  },
  {
    id: 11,
    number: "11",
    image: '/course-modules/module-11.webp',
    imageAlt: 'لابتوب فيه صفحة منتج وقمع تحويل',
    title: "إنشاء صفحات المنتجات",
    description: 'باش تتعلم كفاش تعمل المواقع متاعك وكفاش تصنع "structure" واضحة لصفحات المنتجات في وسط المتجر متاعك. والأهم كفاش تكون صفحة المنتج مناسبة للمنتج متاعك و تكون فيها نسبة تحويل عالية. باش نكتشفوا دومين كامل اسموا "CRO".',
    featured: false,
  },
  {
    id: 12,
    number: "12",
    image: '/course-modules/module-12.webp',
    imageAlt: 'ميكروفون أزرق يوجه إشارات لهدف ذهبي',
    isMasterclass: true,
    masterclass: {
      highlights: ['TODO: أهم نقطة 1', 'TODO: أهم نقطة 2', 'TODO: أهم نقطة 3'],
      instructor: 'TODO: اسم المدرب',
      duration: 'TODO: المدة',
    },
    title: "Media buying مع محمد بوعلي",
    description: 'باش تتعلم من واحد من أحسن Media Buyer في تونس. بعد ماوصل للمليار "1.000.000dt" في converty وافق أنوا يشارك معاك خبرتو و تجربتو في الإعلانات "Sponsoring" ويعلمك خطوة بخطوة السيستام إلي يخدم بيه. قيمة الجزء هذا أكثر برشا من أي مبلغ…',
    featured: true,
    featured_message: "A Masterclass",
  },
  {
    id: 13,
    number: "13",
    image: '/course-modules/module-13.webp',
    imageAlt: 'فقاعة محادثة فوق طرد عليه علامة تأكيد',
    title: "إدارة العملاء والطلبيات",
    description: "كفاش تجاوب على المسجات ، تعمل تأكيد الطلب باش تزيد في نسبة ال-confirmation على أكثر متنجم .",
    featured: false,
  },
  {
    id: 14,
    number: "14",
    image: '/course-modules/module-14.webp',
    imageAlt: 'رفوف فيها علب مرتبة وقائمة جرد',
    title: "إدارة المخزون",
    description: "باش تعلّم كيف تبع مخزونك، وتتخذ قرارات أفضل باش تتجنب نفاد المنتجات أو تراكم السلعة. طريقة باش تكون سهلة برشا وفعالة.",
    featured: false,
  },
  {
    id: 15,
    number: "15",
    image: '/course-modules/module-15.webp',
    imageAlt: 'آلة حاسبة ودفتر حسابات وميزان',
    title: "المحاسبة والالإدارة المالية",
    description: "باش تفهم الأرقام المهمة في مشروعك أما منغير تعقيد ، بالعكس بطريقة مفهومة وساهلة . تفهم الإرادة، التكاليف وهامش الربح باش متخدمش وتطلع خاسر في الاخر.",
    featured: false,
  },
  {
    id: 16,
    number: "16",
    image: '/course-modules/module-16.webp',
    imageAlt: 'درج يطلع وصاروخ أزرق ينطلق من فوق',
    title: 'تكبير المشروع "Scalling"',
    description: "الScalling مهوش في الاعلانات كهو! باش تتعلم كفاش تهز مشروعك من ربح 5 ملاين في الشهر لأرقام أكبر ببرشا.",
    featured: false,
  },
  {
    id: 17,
    number: "17",
    image: '/course-modules/module-17.webp',
    imageAlt: 'تروس وعلامة اتجاهات لاتخاذ القرار',
    title: "إدارة العمليات واتخاذ القرارات",
    description: "تعلّم كيفاش تدير مشروعك بكفاءة، وتنظّم العمليات اليومية، تواجه التحديات، وتتخذ قرارات مدروسة تعاونك على تحقيق أهدافك.",
    featured: false,
  },
  {
    id: 18,
    number: "18",
    image: '/course-modules/module-18.webp',
    imageAlt: 'كراس مفتوح وفانوس أزرق يضوي',
    title: "مشاركة تجاربي الخاصة",
    description: "الجزء هذا خاص برشا. باش نشارك معاكم الدروس، التجارب، الأخطاء إلي تعلمتهم في حياتي إلي عطاوني الحكمة.",
    featured: false,
  },
  {
    id: 19,
    number: "19",
    image: '/course-modules/module-19.webp',
    imageAlt: 'قطع بازل تتجمع في شبكة متصلة',
    title: "Business Development",
    description: "قريبًا! استراتيجيات متقدمة لتطوير المشاريع، وفتح آفاق جديدة للنمو، وبناء أعمال أكثر قوة واستدامة.",
    featured: true,
    featured_message: "Coming Soon",
  },
  {
    id: 20,
    number: "20",
    image: '/course-modules/module-20.webp',
    imageAlt: 'صندوق هدية بشريطة زرقاء يضوي من داخل',
    title: "مفاجأة خاصة",
    description: "قريبًا! ماش مفاجأة وحدة أما أكثر باش اكون موجودين وست الدورة . نخليك تكتشف قيمتهم وحدك.",
    featured: true,
    featured_message: "Coming Soon",
  },
];

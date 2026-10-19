import React from 'react';

export interface CourseModule {
  id: number;
  number: string;
  title: string;
  description: string;
  featured: boolean;
  featured_message?: string;
  icon?: React.ReactNode;
  image?: string;
}

export const courseModules: CourseModule[] = [
  {
    id: 1,
    number: "01",
    title: "عقلية رائد الأعمال الناجح",
    description: "العقلية الصحيحة هي أهم حاجة ، فما أسرار مهمة لازم تعرفهم لهنا.",
    featured: false,
  },
  {
    id: 2,
    number: "02",
    title: "تقديم عام على التجارة الإلكترونية",
    description: "باش تعرف الطرق المختلفة إلي تنجم تخدم بيهم التجارة الإلكترونية، الأسواق والفرق بنتهم ، الخطوات إلي يتعدى بيهم مشروعك وبرشا مفاهيم أخرين مهمة.",
    featured: false,
  },
  {
    id: 3,
    number: "03",
    title: "تأسيس المشروع",
    description: "كيفاش ادوات الخدمة لمشروعك (صفحات التواصل الإجتماعي، المتجر، الحساب الإعلاني ...) خطوة بخطوة بطريقة ساهلة و سريعة.",
    featured: false,
  },
  {
    id: 4,
    number: "04",
    title: "إختيار المنتج",
    description: "كفاش تختار المنتج إلي فيه إمكانية كبيرة ينجح ، كفاش تصنع المنتج متاعك ، كفاش تستورد المنتج متاعك ، وطرق جديدة صعيب تلقاها في كورس اخر.",
    featured: false,
  },
  {
    id: 5,
    number: "05",
    title: "دراسة السوق",
    description: "باش تتعلم كيفاش تحلل السوق، تفهم المنافسين، وتكتشف الفرص التجارية ألي المنافسين ينجمو ميفيقوش بيها.",
    featured: false,
  },
  {
    id: 6,
    number: "06",
    title: 'اصنع "Creative Strategy" قوية',
    description: 'كلمة "Creative strategy" تسمع فيها برشة أما قليل إلي يعرف شمعنها ويعرف يخدمها بالطريقة المحترفة. بش تتعلم ال-"Creative Strategy" على 9a3da صحيحة',
    featured: true,
    featured_message: "A Masterclass $$$",
  },
  {
    id: 7,
    number: "07",
    title: 'صناعة المحتوى الإعلاني "Creatives"',
    description: "باش تتعلم شنية الحاجات إلي تخلي المحتوى الإعلاني متاعك يجبلك مبيعات، باش نشوفوا عشرات الإعلانات و نفهمو علاش نجحوا.",
    featured: false,
  },
  {
    id: 8,
    number: "08",
    title: 'إتقان ال-"Copywriting"',
    description: "الجزء هذا وحدو قيمتوا برشا ملاين. كفاش تقنع أي عبد عن طريق الكلمات. الفلوس الكل في الجزء هذا .",
    featured: true,
    featured_message: "A Masterclass $$$",
  },
  {
    id: 9,
    number: "09",
    title: "كورس مونتاج الفيديوات كامل",
    description: 'بش تتعلم كفاش تمنتج بالتيلفون بطريقة سهلة أما باش تتعلم زادة الطريقة المحترفة مع "Youssef Smaoui" إلي خادم مع عشرات البرندة المعروفة في تونس. الكورس هذا وحدو يسوى برش فلوس',
    featured: true,
    featured_message: "A Masterclass $$$",
  },
  {
    id: 10,
    number: "10",
    title: "تصميم الإعلانات إلي تجيب مبيعات",
    description: "ماكش بش تتعلم كفاش تعمل تصميم أكهو. أما باش تتعلم ما أهم، السيكولوجيا وراء التصميم إلي اجيب المبيعات. باش تنبهر في الجزء هذا خاطر ماريتش شكون حكى عليه.",
    featured: false,
  },
  {
    id: 11,
    number: "11",
    title: "إنشاء صفحات المنتجات",
    description: 'باش تتعلم كفاش تعمل المواقع متاعك وكفاش تصنع "structure" واضحة لصفحات المنتجات في وسط المتجر متاعك. والأهم كفاش تكون صفحة المنتج مناسبة للمنتج متاعك و تكون فيها نسبة تحويل عالية. باش نكتشفوا دومين كامل اسموا "CRO".',
    featured: false,
  },
  {
    id: 12,
    number: "12",
    title: "Media buying مع محمد بوعلي",
    description: 'باش تتعلم من واحد من أحسن Media Buyer في تونس. بعد ماوصل للمليار "1.000.000dt" في converty وافق أنوا يشارك معاك خبرتو و تجربتو في الإعلانات "Sponsoring" ويعلمك خطوة بخطوة السيستام إلي يخدم بيه. قيمة الجزء هذا أكثر برشا من أي مبلغ…',
    featured: true,
    featured_message: "A Masterclass $$$",
  },
  {
    id: 13,
    number: "13",
    title: "إدارة العملاء والطلبيات",
    description: "كفاش تجاوب على المسجات ، تعمل تأكيد الطلب باش تزيد في نسبة ال-confirmation على أكثر متنجم .",
    featured: false,
  },
  {
    id: 14,
    number: "14",
    title: "إدارة المخزون",
    description: "باش تعلّم كيف تبع مخزونك، وتتخذ قرارات أفضل باش تتجنب نفاد المنتجات أو تراكم السلعة. طريقة باش تكون سهلة برشا وفعالة.",
    featured: false,
  },
  {
    id: 15,
    number: "15",
    title: "المحاسبة والالإدارة المالية",
    description: "باش تفهم الأرقام المهمة في مشروعك أما منغير تعقيد ، بالعكس بطريقة مفهومة وساهلة . تفهم الإرادة، التكاليف وهامش الربح باش متخدمش وتطلع خاسر في الاخر.",
    featured: false,
  },
  {
    id: 16,
    number: "16",
    title: 'تكبير المشروع "Scalling"',
    description: "الScalling مهوش في الاعلانات كهو! باش تتعلم كفاش تهز مشروعك من ربح 5 ملاين في الشهر لأرقام أكبر ببرشا.",
    featured: false,
  },
  {
    id: 17,
    number: "17",
    title: "إدارة العمليات واتخاذ القرارات",
    description: "تعلّم كيفاش تدير مشروعك بكفاءة، وتنظّم العمليات اليومية، تواجه التحديات، وتتخذ قرارات مدروسة تعاونك على تحقيق أهدافك.",
    featured: false,
  },
  {
    id: 18,
    number: "18",
    title: "مشاركة تجاربي الخاصة",
    description: "الجزء هذا خاص برشا. باش نشارك معاكم الدروس، التجارب، الأخطاء إلي تعلمتهم في حياتي إلي عطاوني الحكمة.",
    featured: false,
  },
  {
    id: 19,
    number: "19",
    title: "Business Development",
    description: "قريبًا! استراتيجيات متقدمة لتطوير المشاريع، وفتح آفاق جديدة للنمو، وبناء أعمال أكثر قوة واستدامة.",
    featured: true,
    featured_message: "Coming Soon",
  },
  {
    id: 20,
    number: "20",
    title: "مفاجأة خاصة",
    description: "قريبًا! ماش مفاجأة وحدة أما أكثر باش اكون موجودين وست الدورة . نخليك تكتشف قيمتهم وحدك.",
    featured: true,
    featured_message: "Coming Soon",
  },
];

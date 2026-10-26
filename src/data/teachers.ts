export interface Teacher {
  id: string;
  name: string;
  role: string;
  /** 896×1200 WebP generated from image-sources/ (scripts/optimize-images.mjs) */
  image: string;
  imageSrcSet: string;
  /** 192×256 WebP for the 96px results avatars */
  avatar: string;
  bioPoints: string[];
}

export const TEACHERS: Teacher[] = [
  {
    id: 'mohamed-aziz',
    name: 'محمد عزيز اللطيف',
    role: 'تاجر إلكتروني بخبرة 5 سنين في تونس ومؤسس الأكاديمية',
    image: '/teachers/mohamed-aziz-896.webp',
    imageSrcSet: '/teachers/mohamed-aziz-448.webp 448w, /teachers/mohamed-aziz-896.webp 896w',
    avatar: '/teachers/mohamed-aziz-avatar.webp',
    bioPoints: [
      'ناجح في المجال وبخبرة 5 سنين في السوق التونسية',
      'جرب، فشل، واكتشف الاستراتيجيات الحقيقية اللي تخدم',
      'يعلمك بمنهجية واضحة وبخطوات عملية وساهلة تطبقها',
    ],
  },
  {
    id: 'rayan-bensalem',
    name: 'ريان بن سالم',
    role: 'خبير إعلانات رقمية وميديا بايينغ (Media Buying)',
    image: '/teachers/rayan-bensalem-896.webp',
    imageSrcSet: '/teachers/rayan-bensalem-448.webp 448w, /teachers/rayan-bensalem-896.webp 896w',
    avatar: '/teachers/rayan-bensalem-avatar.webp',
    bioPoints: [
      'مسير ميزانيات إعلانية بمئات آلاف الدنانير على فيسبوك وتيك توك',
      'مختص في استراتيجيات الاستهداف والـ Scaling لتحقيق أعلى عائد',
      'يوريك أسرار إعلانات تجيب مبيعات حقيقية بأقل تكلفة للعميل',
    ],
  },
  {
    id: 'youssef-mejri',
    name: 'يوسف الماجري',
    role: 'خبير بناء المتاجر والـ CRO واللوجستيك والتوصيل',
    image: '/teachers/youssef-mejri-896.webp',
    imageSrcSet: '/teachers/youssef-mejri-448.webp 448w, /teachers/youssef-mejri-896.webp 896w',
    avatar: '/teachers/youssef-mejri-avatar.webp',
    bioPoints: [
      'صمم أكثر من 80 متجر إلكتروني بمعدلات تحويل مبيعات عالية',
      'خبير إدارة المخزون، التعامل مع شركات التوصيل وتقليل الـ Retour',
      'يرافقك في بناء براند احترافية تخدم على المدى الطويل',
    ],
  },
];

export interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  bioPoints: string[];
}

export const TEACHERS: Teacher[] = [
  {
    id: 'mohamed-aziz',
    name: 'محمد عزيز اللطيف',
    role: 'تاجر إلكتروني بخبرة 5 سنين في تونس ومؤسس الأكاديمية',
    image: '/teachers/mohamed-aziz.jpg',
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
    image: '/teachers/rayan-bensalem.jpg',
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
    image: '/teachers/youssef-mejri.jpg',
    bioPoints: [
      'صمم أكثر من 80 متجر إلكتروني بمعدلات تحويل مبيعات عالية',
      'خبير إدارة المخزون، التعامل مع شركات التوصيل وتقليل الـ Retour',
      'يرافقك في بناء براند احترافية تخدم على المدى الطويل',
    ],
  },
];

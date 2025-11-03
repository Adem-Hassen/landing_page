import "./LandingPage.css";
import NavBar from "../components/NavBar.tsx";
import VideoPlayer from "../components/VideoPlayer.tsx";
import Button from "../components/Button.tsx";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { MdReportProblem } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { GiTunisia } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";

import { FaBrain } from "react-icons/fa";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faMoneyBillTrendUp,
  faChartLine,
  faGlobe,
  faLaptop,
  faDollarSign,
  faShippingFast,
  faRocket,
  faLightbulb,
  faEarthAfrica
} from '@fortawesome/free-solid-svg-icons'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState, useEffect } from 'react';

function LandingPage() {
  const [showIcons, setShowIcons] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [validation, setValidation] = useState(true);

const courseModules = [
  {
    id: 1,
    number: "01",
    title: "Mindset Transformation",
    description: "How the mindset will change your life, you really need to know important secrets here",
    featured: false,
    icon: <DotLottieReact
                    src="Powerful Mind.lottie"
                    style={{marginTop:"70px"}}
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 2,
    number: "02",
    title: "Business Setup",
    description: "How to actually start an ecommerce business",
    featured: false,
    icon: <DotLottieReact
                    src="City Skyline Building.lottie"
                    speed={2}
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 3,
    number: "03",
    title: "Product Selection",
    description: "How to choose a product that has a great chance to change your life",
    featured: false,
    icon: <DotLottieReact
                    src="Product.lottie"
                                                            style={{marginTop:"-70px"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 4,
    number: "04",
    title: "Market Research",
    description: "You will know how to study and understand the market, the competitors and see opportunities no one sees",
    featured: false,
    icon: <DotLottieReact
                    src="Data Analysis.lottie"
                                       style={{height:"70%", width:"70%"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 5,
    number: "05",
    title: "Creatives Creation",
    description: "How to create videos and designs that bring incredible sales",
    featured: false,
    icon: <DotLottieReact
                    src="Creative Idea.lottie"
                                        style={{marginTop:"-40px"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 6,
    number: "06",
    title: "Video Editing",
    description: "How to edit using a simple tool and a professional tool and make the best engaging possible videos",
    featured: false,
    icon:  <DotLottieReact
                    src="Web Development.lottie"
                    style={{marginTop:"-50px"}}
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 7,
    number: "07",
    title: "Design Fundamentals",
    description: "You will learn basics of design, how to use canva, what's the psychology behind designs",
    featured: false,
    icon:  <DotLottieReact
                    src="UIUX Designer.lottie"
                    
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 8,
    number: "08",
    title: "Copywriting Mastery",
    description: "This part alone is worth millions. How to convince anyone with your words. This is magic",
    featured: false,
    icon: <DotLottieReact
                    src="Copywriting.lottie"
                    
                    loop
                    autoplay
                   style={{height:"70%", width:"70%",marginTop:"-20px"}}
                  />
  },
  {
    id: 9,
    number: "09",
    title: "Product Page Creation",
    description: "How to create your website, create professional product pages that bring sales",
    featured: false,
    icon:  <DotLottieReact
                    src="website building of shopping sale.lottie"
                                                            style={{marginTop:"-20px"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 10,
    number: "10",
    title: "Professional Ads Creation",
    description: "How to create professional ads, latest winning strategies for 2025. All you need about Meta Ads",
    featured: false,
    icon: <DotLottieReact
                    src="Social Media Marketing.lottie"
                                       style={{height:"80%", width:"80%" ,marginTop:"-20px"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 11,
    number: "11",
    title: "Leads Management",
    description: "When a customer sends you a message or makes an order, how you will deal and manage them",
    featured: false,
    icon: <DotLottieReact
                    src="Add user.lottie"
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 12,
    number: "12",
    title: "Inventory Management",
    description: "How to track your inventory, make analysis to your inventory",
    featured: false,
    icon: <DotLottieReact
                    src="Loading Spinner - Inventory.lottie"
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 13,
    number: "13",
    title: "Campaign Evaluation",
    description: "You will know if your ads are good or bad, why campaigns failed or won",
    featured: false,
    icon: <DotLottieReact
                    src="Analytics Character Animation.lottie"
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 14,
    number: "14",
    title: "Campaign Optimization",
    description: "You will know how to better a campaign if it's not good",
    featured: false,
    icon:  <DotLottieReact
                    src="Business Increase.lottie"
                                                            style={{marginTop:"60px"}}

                    speed={0.45}
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 15,
    number: "15",
    title: "Business Scaling",
    description: "How to go from 5k TND profit to 30K TND profit per month. How to scale in your business",
    featured: false,
    icon: <DotLottieReact
                    src="money.lottie"
                                        style={{marginTop:"30px"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 16,
    number: "16",
    title: "Accounting & Finance",
    description: "You will understand all important numbers, analyze your business financially like a pro",
    featured: false,
    icon: <DotLottieReact
                    src="Finance.lottie"
                                                            style={{marginTop:"-20px"}}

                    loop
                    autoplay
                   
                  />
  },
  {
    id: 17,
    number: "17",
    title: "Operations & Decision Making",
    description: "How to manage your project and how to take right decisions in your business",
    featured: false,
    icon: <DotLottieReact
                    src="business strategy.lottie"
                    style={{marginTop:"50px"}}
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 18,
    number: "18",
    title: "Wisdom & Resources",
    description: "I will share resources, mistakes, lessons that give wisdom for both technical and life skills",
    featured: false,
    icon: <DotLottieReact
                    src="Business Knowledge.lottie"
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 19,
    number: "19",
    title: "Business Development",
    description: "Coming soon - Advanced business growth strategies",
    featured: true,
        featured_message:" Coming Soon ",

    icon: <DotLottieReact
                    src="Growth software.lottie"
                    style={{marginTop:"30px"}}
                    loop
                    autoplay
                   
                  />
  },
  {
    id: 20,
    number: "20",
    title: "Special Gift",
    description: "This is an incredible gift that you will not believe it",
    featured: true,
    featured_message:" Special ",
    icon: <DotLottieReact
                    src="Groovy gift.lottie"
                    style={{marginTop:"30px",height:"80%", width:"80%"}}
                    loop
                    autoplay
                   
                  />
  }
];

  // Course Parts Data for Stacked Cards
  const courseParts = [
    {
      id: 1,
      number: "01",
    
      image: "part1.PNG"
    },
    {
      id: 2,
      number: "02", 

      image: "part2.PNG"
    },
    {
      id: 3,
      number: "03",
     
      image: "part3.PNG"
    },
    {
      id: 4,
      number: "04",

      image: "part4.PNG"
    },
    {
      id: 5,
      number: "05",
    
      image: "part5.PNG"
    },
    {
      id: 6,
      number: "06",
    
      image: "part6.PNG"
    },  {
      id: 7,
      number: "07",
    
      image: "part7.PNG"
    },  {
      id: 8,
      number: "08",
      
      image: "part8.PNG"
    }
  ];
// Results Data Array
const resultsData = [
  {
    id: 1,
    image: "part2.PNG",
    title: "أول 1000 دينار في أسبوع واحد",

  },
  {
    id: 2,
    image: "part2.PNG", 
    title: "مبيعات تتجاوز 5000 دينار في الشهر",
  },
  {
    id: 3,
    image: "part2.PNG",
    title: "من طالب إلى رائد أعمال في 3 أشهر",
 
  },
  {
    id: 4,
    image: "part2.PNG",
    title: "أول ربح 2000 دينار من أول حملة إعلانية",
 
  },
  {
    id: 5,
    image: "part2.PNG",
    title: "توسعة المشروع وفتح مخزن خاص",
 
  }
];



const rotateCards = () => {
    setCurrentStartIndex((prev) => (prev + 1) % courseParts.length);
  };

  const goToCard = (targetIndex: number) => {
    setCurrentStartIndex(targetIndex);
  };

  useEffect(() => {
let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const heroSection = document.getElementById('section1');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const shouldShow = heroBottom > 600;
        
        setIsScrolling(true);
        setShowIcons(shouldShow);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: ''
});

// Add this handleInputChange function
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

    if (name === 'phone') {
    // Only allow numbers, +, -, spaces, and parentheses
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if (phoneRegex.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  } else{setFormData(prev => ({
    ...prev,
    [name]: value
  }));}
  
};


const sendViaWhatsApp = () => {

   if (!formData.email || !formData.name || !formData.phone) {
    setValidation(false);
    return; // Stop if validation fails
  }
  const { name, email, phone, message } = formData;
  
  const text = `
طلب انضمام جديد 📝

الاسم: ${name}
البريد: ${email}
الهاتف: ${phone}
${message ? `الرسالة: ${message}` : ''}

أرغب في الانضمام للكورس
  `.trim();

  const whatsappLink = `https://wa.me/21622584067?text=${encodeURIComponent(text)}`;
  
  window.open(whatsappLink, '_blank');
};
const [openFAQ, setOpenFAQ] = useState<number | null>(null);

// Add this function
const toggleFAQ = (index: number) => {
  setOpenFAQ(openFAQ === index ? null : index);
};
  return (
    <div className="gradient-bg">
      {/* ===== FLOATING BACKGROUND ICONS ===== */}
      <div className={`floating-icons ${showIcons ? 'fade-in' : 'fade-out'} ${isScrolling ? 'scrolling' : ''}`}>
        <div className="icon icon-1">
          <FontAwesomeIcon icon={faMoneyBillTrendUp} />
        </div>
        <div className="icon icon-2">
          <FontAwesomeIcon icon={faChartLine} />
        </div>
        <div className="icon icon-3">
          <FontAwesomeIcon icon={faGlobe} />
        </div>
        <div className="icon icon-4">
          <FontAwesomeIcon icon={faLaptop} />
        </div>
        <div className="icon icon-5">
          <FontAwesomeIcon icon={faDollarSign} />
        </div>
        <div className="icon icon-6">
          <FontAwesomeIcon icon={faShippingFast} />
        </div>
      </div>
      
      <div className="app-content">
        <NavBar />

        {/* ===== HERO SECTION ===== */}
        <section id="section1" className="hero-section">
          <h1 className="title1">
            كفاش تبني أول مشروع تجارة إلكترونية مربح و توصل للحرية المالية حتى
            كان بادي من الصفر؟
          </h1>
          <p className="title">ساهلة برشا كان تركز فلي باش نقولهولك</p>
          <div className="hero-divider"></div>
          <p className="title2">
            <strong>
              الأسرار إلي باش تكتشفهم بعد ماتكمل تقرا وتسمع إلي موجود فالصفحة
              هذي باش يخليك تكتشف أنك قادر تعمل برشا فلوس في تونس بنسبة 100%.
              ابدا بالفيديو هذا.
            </strong>
          </p>
        </section>

        {/* ===== VIDEO PLAYER SECTION ===== */}
        <div className="video-section">
          <VideoPlayer videoUrl="https://www.youtube.com/watch?v=WOZGZK7K-Jo" />
        </div>

        {/* ===== CTA SECTION ===== */}
        <div className="cta-section">
          <Button
            variant="outline"
            size="lg"
            className="btn-glow"
            onClick={() => (window.location.href = "#section9")}
          >
            إنضم إلينا وأبدى رحلتك توا
          </Button>
        </div>

        {/* ===== PROBLEMS SECTION ===== */}
        <section id="section2" className="problems-section">
          <div className="problems-container">
            <div className="glow-corner-bottom"></div>
            <div className="glow-corner-top-right"></div>
            <div className="glow-corner-bottom-left"></div>
            
            <h2 className="problems-main-title">
              الكلّ يحكي على الربح من الإنترنت… أما القليل يورّيك كيفاش تعملها
              بالحق
            </h2>

            <p className="problems-description">
              يمكن شفت برشا الفيديوهات ، قرّيت عشرات البوستات، و مازال ما تعرفش
              منين تبدأ. كل مرة معلومة جديدة أما مزلة الثنية مش واضحة
            </p>

            <h3 className="problems-subtitle">والمشكل الأكبر </h3>

            <div className="problems-cards">
              {/* Card 1 */}
              <div className="problem-card">
              <div className="animation-section">
                  <DotLottieReact
                    src="Scared 2D character.lottie"
                    loop
                    speed={1.5}
                    autoplay
                    style={{ 
                      width: '500px', 
                      height: '105%',
                    }}
                  />
                </div>
                <div className="content-section">
                  <h4 className="card-title">هل نجم نعملها اني زادة</h4>
                  <p className="card-description">
                    بالك صعبة ولا منجمش روحي ولا لزمني راس مل كبر ولا برش وقت
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="problem-card">
                <div className="animation-section">
                  <DotLottieReact
                    src="search for employee2.lottie"
                    loop
                    autoplay
                    style={{ 
                      width: '500px', 
                      height: '105%',
                    }}
                  />
                </div>
                <div className="content-section">
                  <h4 className="card-title">
                    هل ناس إلي تعطي في في المعلومة يعرفوا فش قاعدين يعملوا و نجحوا
                    بالحق
                  </h4>
                  <p className="card-description">
                    توا ناس الكل تعطي في معلومات على كفاش تعمل فلوس أما قليل إلي
                    عملوا فلوس
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="problem-card">
           
                       <div className="animation-section">
                  <DotLottieReact
                    src="Character Confusion.lottie"
                    loop
                    autoplay
                    style={{ 
                      width: '500px', 
                      height: '105%',
                    }}
                  />
                </div>
                <div className="content-section">
                  <h4 className="card-title">معادش عارف منين تتعلم</h4>
                  <p className="card-description">
                    فما برشا معلومات ونتي حاير منين تبدى وكفاش تبدا
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        {/* ===== JOURNEY TIMELINE SECTION ===== */}
        <div className="journey-container">
          <div className="glow-corner-top-left"></div>
          <div className="glow-corner-bottom-right"></div>
          
          <h2 className="journey-main-title">
            تعديت بنفس تسألتك ومخاوفك قبل 5 سنين وخلي نطمنك إلي فما اجابت لكل تسأل
          </h2>

          <div className="horizontal-timeline">
            <div className="timeline-connectors">
              <div className="connector-line connector-line-1"></div>
              <div className="connector-line connector-line-2"></div>
              <div className="connector-line connector-line-3"></div>
            </div>
            
            {/* Checkpoint 1 - الواقع */}
            <div className="timeline-point">
              <div className="point-marker">
                <div className="point-circle">
                  <FontAwesomeIcon icon={faEarthAfrica} style={{ fontSize: '30px' }} />
                </div>
              </div>
              <div className="point-content">
                <h3 className="point-title">الواقع</h3>
                <div className="point-description">
                  <p>خالي نهنيك المشكل مش فيك المشكل أن في تونس في 2025 ما فماش نظام واضح في تونس و يعاون الناس إلي كيفك بالضبط</p>
                </div>
              </div>
            </div>

            {/* Checkpoint 2 - الصعوبات */}
            <div className="timeline-point">
              <div className="point-marker">
                <div className="point-circle">
                  <MdReportProblem style={{ fontSize: '30px' }}/>
                </div>
              </div>
              <div className="point-content">
                <h3 className="point-title">الصعوبات</h3>
                <div className="point-description">
                  <p>أول مبديت في مجال التجارة الإلكترونية خذيت كورس الاول جربت وفشلت، كورس الثاني جربت وفشلت، كورس الثالث جربت وفشلت</p>
                </div>
              </div>
            </div>

            {/* Checkpoint 3 - الاكتشاف */}
            <div className="timeline-point">
              <div className="point-marker">
                <div className="point-circle">
                  <FontAwesomeIcon icon={faLightbulb} style={{ fontSize: '30px' }} />
                </div>
              </div>
              <div className="point-content">
                <h3 className="point-title">الاكتشاف</h3>
                <div className="point-description">
                  <p>وبعد اكتشفت إلي لزمني نتعلم من مصادر خير نجرب طرق اخرى الي خلتني ننجح في المجال هذا بعد 5 سنين من محاولة</p>
                </div>
              </div>
            </div>

            {/* Checkpoint 4 - اختصارك */}
            <div className="timeline-point">
              <div className="point-marker">
                <div className="point-circle">
                  <FontAwesomeIcon icon={faRocket} style={{ fontSize: '30px' }} />
                </div>
              </div>
              <div className="point-content">
                <h3 className="point-title">اختصارك</h3>
                <div className="point-description">
                  <p>الحكاية مش صعيبة، لكن لازم تبدأ بخطة حقيقية و خطوات واضحة. من انسان تعدى بالخطوات الكل</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SOLUTIONS SECTION ===== */}
        <section id="section3" className="solutions-section">
          <div className="solutions-container">
            <div className="glow-corner-top-right"></div>
            <div className="glow-corner-bottom-left"></div>
            
            <h2 className="solutions-main-title">
              هكعلش نحطيت كل وقتي ومعرفتي وتجربي في مكان واحد، كورس التجارة الإلكترونية الشامل في تونس من 0 للاحتراف
            </h2>

            <p className="solutions-subtitle">
              شنوا إلي اخليك متاكد أن الكورس هذا هو الحل ليك
            </p>

            {/* Single Box with All Reasons */}
            <div className="single-reasons-box">
              {/* Reason 1 - المدرب */}
              <div className="reason-item">
                <div className="reason-icon-wrapper">
                  <DotLottieReact src="Stickman and arrow graph.lottie" speed={1.2} loop autoplay />
                </div>
                <h3 className="reason-title">مدرب محترف</h3>
              </div>

              {/* Separator Line */}
              <div className="reason-separator"></div>

              {/* Reason 2 - المنهجية */}
              <div className="reason-item">
                <div className="reason-icon-wrapper">
                  <DotLottieReact src="Step Color.lottie" speed={1.2} loop autoplay />
                </div>
                <h3 className="reason-title">منهجية واضحة</h3>
              </div>

              {/* Separator Line */}
              <div className="reason-separator"></div>

              {/* Reason 3 - النتائج */}
              <div className="reason-item">
                <div className="reason-icon-wrapper">
                  <DotLottieReact src="Growth Chart.lottie" speed={1.2} loop autoplay />
                </div>
                <h3 className="reason-title">نتائج مضمونة</h3>
              </div>
            </div>

            {/* CTA Button */}
            <div className="solutions-cta">
              <Button
                variant="outline"
                size="lg"
                className="btn-glow"
                onClick={() => (window.location.href = "#section9")}
              >
                إبدأ رحلتك نحو النجاح توا
              </Button>
            </div>
          </div>
        </section>

        {/* ===== COURSE CONTENT SECTION ===== */}
        <section id="section4" className="course-content-section">
          <div className="course-content-container">
            <div className="glow-corner-top-left"></div>
            <div className="glow-corner-bottom-right"></div>
            
            {/* Main Title - Centered */}
            <div className="text-center mb-8">
              <h2 className="course-content-main-title">
                نخليك تحكم وحدك، هذا شنوا باش تتعلم 
              </h2>
            </div>

            {/* Subtitle - Centered */}
            <div className="text-center mb-12">
              <p className="course-content-subtitle">
                و كل جزء باش يخلق رائد أعمال كاسح
                <br />
                كل جزء بالتفاصيل متعوا, كل جزء باش يقربك لنجح
              </p>
            </div>

            {/* Course Content Carousel */}
            <div className="carousel-container">  
              <Carousel
                opts={{ align: "start" }}
                className="w-full max-w-screen-xl"
              >
                <CarouselContent>
                  {courseModules.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                      <div className="p-1">
                        <Card className="h-full">
                          <CardContent className="flex flex-col h-full p-2">
                            {/* Top half: Icon / Animation */}
                            <div className="card-top-half flex-1 flex items-center justify-center">
                              <div className="module-icon text-4xl">
                                {item.featured && (
                                  <span className="featured-badge bg-yellow-300 text-xs px-2 py-1 rounded">
                                    {item.featured_message}
                                  </span>
                                )}
                                {item.icon}
                              </div>
                            </div>

                            {/* Bottom half: Title / Description / Number */}
                            <div className="card-bottom-half flex-1 flex flex-col justify-between mt-2">
                              <div>
                                <h3 className="module-title text-lg font-semibold">
                                  {item.title}
                                </h3>
                                <p className="module-description text-sm text-gray-600 mt-1">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <span className="module-number font-bold">{item.number}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious style={{width:"45px",height:"45px",left:"-60px"}} />
                <CarouselNext style={{width:"45px",height:"45px" ,right:"-60px"}} />
              </Carousel>
            </div>
          </div>
        </section>

        {/* ===== COURSE PARTS SECTION - STACKED CARDS CAROUSEL ===== */}
        <section id="section5" className="course-parts-section">
          <div className="course-parts-container">
            <div className="glow-corner-top-right"></div>
            <div className="glow-corner-bottom-left"></div>
            
            {/* Main Title */}
            <div className="text-center mb-12">
              <h2 className="course-parts-main-title">
                أجزاء تغطي كل شيء من الفكرة للأرباح
              </h2>
            </div>

            {/* Stacked Cards Carousel */}
            <div className="stacked-cards-container">
                <button 
      className="nav-arrow prev-arrow"
      onClick={() => goToCard((currentStartIndex - 1 + courseParts.length) % courseParts.length)}
    >
      ‹
    </button>
              <div className="stacked-cards"> 
                {courseParts.map((part, index) => {
                  // Calculate the position based on the current start index
                  const position = (index - currentStartIndex + courseParts.length) % courseParts.length;
                  
                  return (
                    <div
                      key={part.id}
                      className={`stacked-card ${
                        position === 0 ? 'active' : 
                        position === 1 ? 'next' : 
                        position === 2 ? 'behind' : 'hidden'
                      }`}
                      onClick={() => rotateCards()}
                      style={{ zIndex: courseParts.length - position }}
                    >
                      <div className="card-image">
                        {/* Placeholder for image - replace with actual images */}
                        <div className="image-placeholder">
                        <img src={part.image} alt={`Part ${part.number}`} className="part-image" />
                        </div>
                        <div className="image-overlay"></div>
                      </div>
                  
                      <div className="part-number">
                        <span>{part.number}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
   <button 
      className="nav-arrow next-arrow"
      onClick={() => goToCard((currentStartIndex + 1) % courseParts.length)}
    >
      ›
    </button>
              {/* Navigation Dots */}
              <div className="stacked-cards-indicators">
                {courseParts.map((part, index) => (
                  <button
                    key={part.id}
                    className={`indicator ${
                      // Active dot should correspond to the front card
                      courseParts[(currentStartIndex) % courseParts.length].id === part.id ? 'active' : ''
                    }`}
                    onClick={() => goToCard(index)}
                  />
                ))}
              </div>

              {/* Navigation Instructions */}
          
            </div>
            <div className="course-parts-cta">
      <Button
        variant="outline"
        size="lg"
        className="btn-glow btn-extra-large"
        onClick={() => (window.location.href = "#section9")}
      >
 get it now      </Button>
    </div>
          </div>
          
        </section>
{/* ===== TARGET AUDIENCE SECTION ===== */}
<section id="section6" className="target-audience-section">
  <div className="target-audience-container">
    <div className="glow-corner-top-left"></div>
    <div className="glow-corner-bottom-right"></div>
    
    {/* Main Title */}
    <div className="text-center mb-16">
      <h2 className="target-audience-main-title">
        هذا الكورس ليك إذ
      </h2>
    </div>

    {/* Three Icon Points */}
    <div className="icon-points-grid">
      {/* Point 1 */}
      <div className="icon-point">
        <div className="icon-wrapper">
          <DotLottieReact
            src="Money (1).lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <h3 className="icon-point-title">
          تحب تغيّر حياتك وتبني مصدر دخل حقيقي
        </h3>
      </div>

      {/* Point 2 */}
      <div className="icon-point">
        <div className="icon-wrapper">
          <DotLottieReact
            src="Growth.lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <h3 className="icon-point-title">
          عندك بزنس صغير وتحب تكبر المبيعات
        </h3>
      </div>

      {/* Point 3 */}
      <div className="icon-point">
        <div className="icon-wrapper">
          <DotLottieReact
            src="Knowledge, Idea, Power, Books, Creativity, Learning Animation icon.lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <h3 className="icon-point-title">
          نت شاب حاب تبدأ من الصفر وتتعلم التجارة الإلكترونية
        </h3>
      </div>
    </div>
          <div className="course-parts-cta">
      <Button
        variant="outline"
        size="lg"
        className="btn-glow btn-extra-large"
        onClick={() => (window.location.href = "#section9")}
      >
 get it now      </Button>
    </div>
  </div>
</section>
{/* ===== WHY LEARN FROM ME SECTION ===== */}
{/* ===== WHY LEARN FROM ME SECTION ===== */}
<section id="section7" className="why-learn-section">
  <div className="why-learn-container">
    <div className="glow-corner-top-right"></div>
    <div className="glow-corner-bottom-left"></div>
    
    {/* Main Title */}
    <div className="text-center mb-8">
      <h2 className="why-learn-main-title">
        علاش تتعلم مني؟
      </h2>
    </div>

    {/* Subtitle */}
    <div className="text-center mb-12">
      <p className="why-learn-subtitle">
        بديت من لا شيء: تليفون، كمبيوتر، وإنترنت.
        
        غلطت، خسرت، تعلمت، ورجعت نحاول حتى نجحت.
       
        اليوم نشارك معاكم كل حاجة تعلمتها بالخبرة  في تونس
      </p>
    </div>

    {/* Cards Grid with New Row Arrangement */}
    <div className="why-learn-cards-grid">
      {/* First Row: Profile Card + Reason 1 */}
      <div className="first-row">
<div className="profile-card main-card">
  <div className="profile-image-full">
    <img 
      src="image.png" 
      alt="محمد عزيز اللطيف" 
      className="profile-image"
    />
    
    {/* Gradient Overlays */}
    <div className="gradient-overlay-top"></div>
    <div className="gradient-overlay-bottom"></div>
    <div className="gradient-overlay-sides"></div>
    
    {/* Text Content Overlay */}
    <div className="profile-content-overlay">
      <h3 className="profile-name">محمد عزيز اللطيف</h3>
      <div className="profile-quote">
        <p>"بديت من الصفر، وعرفت شنوّة المشاكل إلي تواجهك"</p>
      </div>
    </div>
  </div>
</div>

        {/* Reason 1 - Large Rectangle */}
        <div className="reason-card large-rectangle">
          <div className="reason-icon" ><FaBrain size="2em" /></div>
          <div className="reason-content">
            <h3 className="reason-title">تطبيقي</h3>
            <p className="reason-description">
              نعلّمك من التجربة، موش من الكتب
            </p>
          </div>
        </div>
      </div>

      {/* Second Row: Three Reason Cards */}
      <div className="second-row">
        {/* Reason 2 - Medium Square */}
        <div className="reason-card medium-square">
          <div className="reason-icon"><FaHandsHelping />
</div>
          <div className="reason-content">
            <h3 className="reason-title">قريب ليك</h3>
            <p className="reason-description">
              نعرف شنوّة تفكر وشنوّة مشاكلك
            </p>
          </div>
        </div>

        {/* Reason 3 - Medium Square */}
        <div className="reason-card medium-square">
          <div className="reason-icon"><FiTarget /></div>
          <div className="reason-content">
            <h3 className="reason-title">نَتائِج</h3>
            <p className="reason-description">
              كل درس فيه تطبيق واضح
            </p>
          </div>
        </div>

        {/* Reason 4 - Medium Square */}
        <div className="reason-card medium-square">
          <div className="reason-icon"><GiTunisia /></div>
          <div className="reason-content">
            <h3 className="reason-title">محلي</h3>
            <p className="reason-description">
              كل خطوة مهيّأة للسوق التونسية
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== RESULTS SECTION ===== */}
{/* ===== RESULTS SECTION ===== */}
{/* ===== RESULTS SECTION ===== */}
<section id="section8" className="results-section">
  <div className="results-container">
    <div className="glow-corner-top-left"></div>
    <div className="glow-corner-bottom-right"></div>
    
    {/* Main Title */}
    <div className="text-center mb-12">
      <h2 className="results-main-title">
        مانيش باش نزيد نحكيلك نخليك تشوف النتائج وحدك
      </h2>
    </div>

    {/* Screenshot Carousel - Single Wide Cards */}
    <div className="screenshot-carousel-container">
      <Carousel
        opts={{ 
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent>
          {resultsData.map((result) => (
            <CarouselItem key={result.id} className="basis-full">
              <div className="p-4">
                <div className="screenshot-card">
                  <div className="screenshot-image-container">
                    <img 
                      src={result.image} 
                      alt={result.title} 
                      className="screenshot-image"
                    />
                    <div className="image-overlay"></div>
                    {/* Elegant Title Overlay */}
                    <div className="title-overlay">
                      <h3 className="elegant-title">{result.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="carousel-nav-prev" />
        <CarouselNext className="carousel-nav-next" />
      </Carousel>
    </div>
  </div>
</section>
{/* ===== OFFER & CONTACT SECTION ===== */}
<section id="section9" className="offer-section">
  <div className="offer-container">
    <div className="glow-corner-top-right"></div>
    <div className="glow-corner-bottom-left"></div>
    
    {/* Main Title */}
    <div className="text-center mb-12">
      <h2 className="offer-main-title">
        إنضم إلينا وابدأ رحلتك نحو النجاح
      </h2>
    </div>

    {/* Flip Cards Container */}
    <div className="flip-cards-container">
    <div className="flip-card contact-flip-card">
    <div className="flip-card-inner">
      {/* Front Side - Contact Info */}
      <div className="flip-card-front">
        <div className="contact-info-card">
          <div className="contact-info-header">
            <div className="header-icon"><FaAddressCard size={"3.2rem"}/>
</div>
            <h3>معلومات الاتصال</h3>
          </div>
          
          <div className="contact-info-content">
            <div className="contact-method">
              <div className="contact-icon"><FaWhatsapp size={"1.5em"} style={{marginBottom:"0.5rem"}}/></div>
              <div className="contact-details">
                <h4>الواتساب</h4>
                <p>+216 12 345 678</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon"><MdOutlineMailOutline size={"1.5em"}/></div>
              <div className="contact-details">
                <h4>البريد الإلكتروني</h4>
                <p>contact@example.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon"><BiSupport size={"1.5em"}/></div>
              <div className="contact-details">
                <h4>أوقات الدعم</h4>
                <p>كل أيام الأسبوع من 9 صباحاً إلى 10 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side - New Content (Add your content here) */}
      <div className="flip-card-back">
        <div className="contact-card">
          <div className="contact-header">
      <h3 className="offer-title">العرض الخاص</h3>
      <div className="offer-badge">محدود</div>          
          </div>
          
  <div className="offer-content">
      <div className="price-section">
        <div className="price">299 <span className="currency">دينار</span></div>
      </div>
      <div className="animation-section">
   
      </div>
       <div className="offer-features-back">
        <div className="feature">
          <span className="feature-icon"><FaGraduationCap  /></span>
          <span>كورس كامل من الصفر للإحتراف</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><IoLogoWhatsapp />
</span>
          <span>دعم مباشر على الواتساب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><MdAccessTimeFilled />
</span>
          <span>وصول دائم للمحتوى</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><FaUsers />
</span>
          <span >مجموعة خاصة بالطلاب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><PiCertificateFill /></span>
          <span>شهادة إتمام</span>
        </div>
      </div>
      
     
      
     
    </div>   
     
  
        </div>
      </div>
    </div>
  </div>
      {/* Main Offer Card (Front) */}
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front Side - Offer */}
       <div className="flip-card-front">
        
  <div className="offer-card">
          
    <div className="offer-header">
      <h3 className="offer-title">العرض الخاص</h3>
      <div className="offer-badge">محدود</div>
    </div>
     
    <div className="offer-content">
      <div className="price-section">
        <div className="price">299 <span className="currency">دينار</span></div>
      </div>
       <div className="features-with-overlay-animation">
      <div className="animation-overlay">
   <img src="Online Course.png" alt="" />
      
    
      </div>
      <div className="offer-features">
        <div className="feature">
          <span className="feature-icon"><FaGraduationCap  /></span>
          <span>كورس كامل من الصفر للإحتراف</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><IoLogoWhatsapp />
</span>
          <span>دعم مباشر على الواتساب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><MdAccessTimeFilled />
</span>
          <span>وصول دائم للمحتوى</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><FaUsers />
</span>
          <span >مجموعة خاصة بالطلاب</span>
        </div>
        <div className="feature">
          <span className="feature-icon"><PiCertificateFill /></span>
          <span>شهادة إتمام</span>
        </div>
      </div>
      </div>
    
    
    </div>
    
    <div className="offer-actions">
       <Button
    variant="outline"
    size="lg"
    className="flip-btn"
    onClick={() => {
      const offerCard = document.querySelector('.flip-card:not(.contact-flip-card)');
      const contactCard = document.querySelector('.contact-flip-card');
      
      if (offerCard) offerCard.classList.add('flipped');
      if (contactCard) contactCard.classList.add('flipped');
    }}
  >
    سجل الآن
  </Button>
    </div>
  </div>
</div>

          {/* Back Side - Contact Form */}
          <div className="flip-card-back">
            <div className="contact-card">
              <div className="contact-header">
                <h3 className="contact-title">سجل في الكورس</h3>
               <button 
  className="back-btn"
  onClick={() => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setValidation(true);
    
    // Flip back both cards
    const offerCard = document.querySelector('.flip-card:not(.contact-flip-card)');
    const contactCard = document.querySelector('.contact-flip-card');
    
    if (offerCard) offerCard.classList.remove('flipped');
    if (contactCard) contactCard.classList.remove('flipped');
  }}
>
  رجوع
</button>
              </div>
              
              <div className="contact-form">
  <div className="form-group">
    <label>الاسم الكامل</label>
    <input 
      type="text" 
      name="name"
      placeholder="أدخل اسمك الكامل" 
      value={formData.name}
      onChange={handleInputChange}
      className={!validation && !formData.name ? 'error' : ''}

    />
  </div>
  
  <div className="form-group">
    <label>البريد الإلكتروني</label>
    <input 
      type="email" 
      name="email"
      placeholder="example@email.com" 
      value={formData.email}
      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
      onChange={handleInputChange}
            className={!validation && (!formData.email.includes('@') || !formData.email.includes('.')) ? 'error' : ''}

    />
  </div>
  
  <div className="form-group">
    <label>رقم الهاتف</label>
    <input 
      type="tel" 
      name="phone"
      placeholder="+216 XX XXX XXX" 
       pattern="[0-9+-\s()]*"
      inputMode="numeric"
      maxLength={8}
      value={formData.phone}
      onChange={handleInputChange}
            className={!validation && !formData.phone ? 'error' : ''}

    />
  </div>
  
  <div className="form-group">
    <label>رسالة</label>
    <textarea 
      name="message"
      placeholder="أي أسئلة أو استفسارات..." 
      rows={3}
      value={formData.message}
      onChange={handleInputChange}
    ></textarea>
  </div>
</div>

<div className="contact-actions">
 
  <Button
    variant="outline"
    size="lg"
    className="email-btn"
    onClick={sendViaWhatsApp}
  >
سجل توا  

</Button>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Card (Static) */}
    
    </div>
  </div>
</section>
{/* ===== FAQ SECTION ===== */}
<section id="section10" className="faq-section">
  <div className="faq-container">
    <div className="glow-corner-top-left"></div>
    <div className="glow-corner-bottom-right"></div>
    
    {/* Main Title */}
    <div className="text-center mb-12">
      <h2 className="faq-main-title">
        الأسئلة الشائعة
      </h2>
    </div>

    {/* FAQ Items */}
    <div className="faq-items">
      {/* FAQ 1 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(0)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">أنا مبتدئ، نجم ننجح؟</h3>
          <span className="toggle-icon">{openFAQ === 0 ? '−' : '+'}</span>
        </div>
        {openFAQ === 0 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">أكيد. الكورس معمول باش تبدأ من الصفر خطوة بخطوة.</p>
          </div>
        )}
      </div>

      {/* FAQ 2 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(1)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">نحتاج ميزانية كبيرة؟</h3>
          <span className="toggle-icon">{openFAQ === 1 ? '−' : '+'}</span>
        </div>
        {openFAQ === 1 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">لا، نبدأ بأقل تكلفة ونخدم بطريقة ذكية.</p>
          </div>
        )}
      </div>

      {/* FAQ 3 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(2)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">هل المحتوى مناسب لتونس؟</h3>
          <span className="toggle-icon">{openFAQ === 2 ? '−' : '+'}</span>
        </div>
        {openFAQ === 2 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">100%. كل الدروس مبنية على تجارب تونسية حقيقية.</p>
          </div>
        )}
      </div>

      {/* FAQ 4 */}
      <div className="faq-item">
        <div className="faq-question" onClick={() => toggleFAQ(3)}>
          <span className="question-icon"><p>س</p></span>
          <h3 className="question-text">وقتاش نشوف النتائج؟</h3>
          <span className="toggle-icon">{openFAQ === 3 ? '−' : '+'}</span>
        </div>
        {openFAQ === 3 && (
          <div className="faq-answer">
            <span className="answer-icon"><p>ج</p></span>
            <p className="answer-text">في العادة من أول 2 إلى 4 أسابيع كي تطبق كل شي بجدية.</p>
          </div>
        )}
      </div>
    </div>
  </div>
</section>
{/* ===== FOOTER SECTION ===== */}
<footer className="footer-section">
  <div className="footer-container">
    {/* Copyright Text */}
    <div className="footer-copyright">
      <p>© 2025 Ecom Academy by Mohamed Aziz Eltaief</p>
    </div>
    
    {/* Links with Icons */}
    <div className="footer-links">
      <a href="#" className="footer-link">
        <span className="footer-icon"><RiContractFill  size={"1.5em"} /></span>
        الشروط
      </a>
      <a href="#" className="footer-link">
        <span className="footer-icon"><FaShield  size={"1.5em"} />
</span>
        الخصوصية
      </a>
      <a href="#section9" className="footer-link">
        <span className="footer-icon"><FaPhone size={"1.5em"} /></span>
        التواصل
      </a>
      <a href="https://www.instagram.com/aziz_eltaief_" className="footer-link">
        <span className="footer-icon"><FaInstagram size={"1.5em"} />
</span>
        Instagram
      </a>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}

export default LandingPage;
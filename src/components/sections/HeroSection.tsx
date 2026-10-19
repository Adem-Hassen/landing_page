import '../../styles/HeroSection.css';
import Button from '../shared/Button';
import VideoPlayer from '../shared/VideoPlayer';

export default function HeroSection() {
  const scrollToVideo = () => {
    const videoElement = document.getElementById('video-section');
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section id="/" className="hero-section">
        <h1 className="title1">
   الأسرار إلي باش تكتشفهم بعد ما تتفرّج في الفيديو هذا، باش تخلّيك تكتشف إنك قادر تعمل فلوس أكثر ببرشا من التجارة الإلكترونية في تونس، سواء كنت مبتدئ ولا عندك خبرة!
        </h1>
     
      </section>
      <div className="cta-section">
        <Button
          variant="outline"
          size="lg"
          className="btn-glow"
          onClick={scrollToVideo}
        >
          تفرج في الفيديو قبل كل شي
        </Button>
      </div>
      {/* ===== VIDEO PLAYER SECTION ===== */}
      <div id="video-section" className="video-section">
        <VideoPlayer videoUrl="https://www.youtube.com/watch?v=Kl-I7sUcAOY" />
      </div>

      {/* ===== CTA SECTION ===== */}
    
    </>
  );
}

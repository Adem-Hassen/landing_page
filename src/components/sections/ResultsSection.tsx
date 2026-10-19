import '../../styles/ResultsSection.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { resultsData } from '../../data/resultsData';

export default function ResultsSection() {
  return (
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
  );
}

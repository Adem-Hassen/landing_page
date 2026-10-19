import '../../styles/CoursePartsSection.css';
import { useState } from 'react';
import Button from '../shared/Button';
import { courseParts } from '../../data/courseParts';

export default function CoursePartsSection() {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);

  const rotateCards = () => {
    setCurrentStartIndex((prev) => (prev + 1) % courseParts.length);
  };

  const goToCard = (targetIndex: number) => {
    setCurrentStartIndex(targetIndex);
  };

  return (
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
  );
}

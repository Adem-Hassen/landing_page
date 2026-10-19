import '../../styles/ProblemsSection.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ProblemsSection() {
  return (
    <section id="section2" className="problems-section">
      <div className="problems-container">
        <div className="glow-corner-bottom"></div>
        <div className="glow-corner-top-right"></div>
        <div className="glow-corner-bottom-left"></div>
        
        <h2 className="problems-main-title">
         الكلّ يحكي على الربح من الإنترنت… أما قليل إلي يورّيك كيفاش تعملها بالحق!

        </h2>

        <p className="problems-description">
         يمكن شفت برشا الفيديوهات ، قريت عشرات البوستات، و مازلت ما تعرفش منين تبدأ. كل مرة معلومة جديدة أما مازلت الثنية ماش واضحة 
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
                className="problem-lottie"
              />
            </div>
            <div className="content-section">
              <h4 className="card-title">هل نجم ننجح انا زادة ؟
</h4>
              <p className="card-description">
                بالك صعيبة ولا منجمش روحي ولا لزمني راس مال كبير ولا برش وقت !؟!

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
                className="problem-lottie"
              />
            </div>
            <div className="content-section">
              <h4 className="card-title">
               هل الناس إلي تعطي في المعلومة، يعرفوا فاش قاعدين يعملوا و نجحوا بالحق ؟

              </h4>
              <p className="card-description">
               توا برشا صناع محتوى تعطي في معلومات على كيفاش تعمل فلوس، أما لازم تعرف تختار الشخص المناسب ! 

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
                className="problem-lottie"
              />
            </div>
            <div className="content-section">
              <h4 className="card-title">معادش عارف منين تتعلم</h4>
              <p className="card-description">
              فما برشا معلومات و إنتي حاير منين و كفاش تبدا 

              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

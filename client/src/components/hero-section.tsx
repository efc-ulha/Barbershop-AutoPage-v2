interface HeroSectionProps {
  onShowTemplateForm: () => void;
  onShowPersonalizedForm: () => void;
}

export default function HeroSection({ onShowTemplateForm, onShowPersonalizedForm }: HeroSectionProps) {
  return (
    <section className="gradient-hero text-white py-20 relative overflow-hidden">
      {/* Decorative barber pole strips */}
      <div className="absolute top-0 right-0 w-8 h-full barber-pole opacity-20"></div>
      <div className="absolute top-0 left-0 w-8 h-full barber-pole opacity-20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-fa-gold rounded-full flex items-center justify-center">
              <i className="fas fa-cut text-fa-slate-900 text-xl"></i>
            </div>
            <span className="text-fa-gold font-semibold tracking-wide">PREMIUM BARBERSHOP WEBSITES</span>
          </div>
        </div>
        
        <h1 className="barber-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Professional Barbershop<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fa-gold via-fa-accent to-fa-barber-red">
            Websites in Minutes
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Turn your barbershop into a digital destination with our AI-powered website builder. 
          Professional templates with authentic barbershop aesthetics, ready in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onShowTemplateForm}
            className="barber-button bg-fa-primary hover:bg-fa-barber-red text-white px-10 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-2xl min-w-[280px]"
          >
            <i className="fas fa-magic mr-3"></i>
            Quick Template Website
            <div className="text-sm opacity-90 mt-1">Preview ready in 5 minutes • $120 + $8/mo</div>
          </button>
          
          <div className="text-slate-400 font-medium">OR</div>
          
          <button 
            onClick={onShowPersonalizedForm}
            className="barber-button bg-transparent border-2 border-fa-gold hover:bg-fa-gold hover:text-fa-slate-900 text-fa-gold px-10 py-5 rounded-xl text-lg font-bold transition-all min-w-[280px]"
          >
            <i className="fas fa-crown mr-3"></i>
            Custom Design
            <div className="text-sm opacity-90 mt-1">Consultation • Full Service</div>
          </button>
        </div>
        
        <div className="mt-16 flex justify-center items-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt text-fa-gold"></i>
            <span className="text-sm">Secure & Fast</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-mobile-alt text-fa-gold"></i>
            <span className="text-sm">Mobile Optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-search text-fa-gold"></i>
            <span className="text-sm">SEO Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}

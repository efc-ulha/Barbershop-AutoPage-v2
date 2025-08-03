interface HeroSectionProps {
  onShowTemplateForm: () => void;
  onShowPersonalizedForm: () => void;
}

export default function HeroSection({ onShowTemplateForm, onShowPersonalizedForm }: HeroSectionProps) {
  return (
    <section className="gradient-hero text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Beautiful Barbershop<br/>
          <span className="text-transparent bg-clip-text gradient-fa-primary bg-gradient-to-r from-blue-400 to-emerald-400">
            Websites in Minutes
          </span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Get your barbershop online with our AI-powered website generator. Choose from professional templates or get a fully customized design tailored to your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onShowTemplateForm}
            className="bg-fa-primary hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            <i className="fas fa-magic mr-2"></i>
            Generate Template Website
          </button>
          <button 
            onClick={onShowPersonalizedForm}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-fa-slate-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
          >
            <i className="fas fa-palette mr-2"></i>
            Get Custom Design
          </button>
        </div>
      </div>
    </section>
  );
}

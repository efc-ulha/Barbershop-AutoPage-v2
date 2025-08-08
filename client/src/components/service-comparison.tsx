interface ServiceComparisonProps {
  onShowTemplateForm: () => void;
  onShowPersonalizedForm: () => void;
}

export default function ServiceComparison({ onShowTemplateForm, onShowPersonalizedForm }: ServiceComparisonProps) {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-fa-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-fa-barber-red rounded-full"></div>
            <span className="text-fa-gold font-bold tracking-wider">OUR SERVICES</span>
            <div className="w-8 h-1 bg-fa-barber-blue rounded-full"></div>
          </div>
          <h2 className="barber-heading text-4xl md:text-5xl font-bold text-fa-secondary mb-6">Choose Your Perfect Solution</h2>
          <p className="text-xl text-fa-slate-600 max-w-3xl mx-auto leading-relaxed">
            Whether you need a lightning-fast launch or a completely bespoke design, 
            we craft digital experiences that bring customers to your chair.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Template Website Card */}
          <div className="barber-card rounded-2xl p-8 border-2 border-slate-200 hover:border-fa-primary transition-all duration-300 hover:shadow-2xl relative group">
            <div className="absolute top-4 right-4 bg-fa-accent text-white px-3 py-1 rounded-full text-xs font-bold">
              FASTEST
            </div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 gradient-fa-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-bolt text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-fa-secondary mb-3 barber-heading">Quick Template</h3>
              <p className="text-fa-slate-600 mb-6">AI-powered barbershop websites with authentic styling</p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-fa-primary">$199</span>
                <span className="text-sm text-slate-500">/one-time</span>
              </div>
              <p className="text-sm text-fa-gold font-semibold">⚡ Ready in 5 minutes</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-fa-slate-700">
                <div className="w-6 h-6 bg-fa-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="font-medium">AI-Generated Barbershop Content</span>
              </li>
              <li className="flex items-center text-fa-slate-700">
                <div className="w-6 h-6 bg-fa-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="font-medium">Classic & Modern Templates</span>
              </li>
              <li className="flex items-center text-fa-slate-700">
                <div className="w-6 h-6 bg-fa-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="font-medium">Live Preview Before Payment</span>
              </li>
              <li className="flex items-center text-fa-slate-700">
                <div className="w-6 h-6 bg-fa-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="font-medium">Mobile-First Design</span>
              </li>
              <li className="flex items-center text-fa-slate-700">
                <div className="w-6 h-6 bg-fa-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="font-medium">Contact Forms & Google Maps</span>
              </li>
              <li className="flex items-center text-fa-slate-700">
                <div className="w-6 h-6 bg-fa-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
                <span className="font-medium">Same Day Deployment</span>
              </li>
            </ul>
            
            <button 
              onClick={onShowTemplateForm}
              className="barber-button w-full bg-fa-primary hover:bg-fa-barber-red text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-xl"
            >
              <i className="fas fa-bolt mr-2"></i>
              Start Template Generation
            </button>
          </div>

          {/* Personalized Website Card */}
          <div className="bg-gradient-to-br from-fa-slate-800 via-fa-slate-900 to-fa-primary rounded-2xl p-8 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="absolute top-4 right-4 bg-fa-gold text-fa-slate-900 px-4 py-2 rounded-full text-xs font-bold">
              🏆 PREMIUM
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fa-gold opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="text-center mb-8 relative z-10">
              <div className="w-20 h-20 gradient-fa-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-crown text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3 barber-heading">Custom Design</h3>
              <p className="text-slate-300 mb-6">Bespoke barbershop websites that set you apart</p>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-fa-gold">$89</span>
                <span className="text-sm text-slate-400">/consultation</span>
              </div>
              <p className="text-sm text-fa-accent font-semibold">👑 Applied to final project cost</p>
            </div>
            
            <ul className="space-y-4 mb-8 relative z-10">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-fa-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-fa-slate-900 text-xs"></i>
                </div>
                <span className="font-medium">One-on-One Design Consultation</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-fa-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-fa-slate-900 text-xs"></i>
                </div>
                <span className="font-medium">Unlimited Design Revisions</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-fa-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-fa-slate-900 text-xs"></i>
                </div>
                <span className="font-medium">Custom Brand Identity</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-fa-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-fa-slate-900 text-xs"></i>
                </div>
                <span className="font-medium">Advanced Booking Integration</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-fa-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-fa-slate-900 text-xs"></i>
                </div>
                <span className="font-medium">Professional SEO Setup</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-fa-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check text-fa-slate-900 text-xs"></i>
                </div>
                <span className="font-medium">30-Day Premium Support</span>
              </li>
            </ul>
            
            <button 
              onClick={onShowPersonalizedForm}
              className="barber-button w-full bg-fa-gold hover:bg-fa-accent text-fa-slate-900 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] shadow-xl relative z-10"
            >
              <i className="fas fa-crown mr-2"></i>
              Start Custom Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceComparisonProps {
  onShowTemplateForm: () => void;
  onShowPersonalizedForm: () => void;
}

export default function ServiceComparison({ onShowTemplateForm, onShowPersonalizedForm }: ServiceComparisonProps) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-fa-secondary mb-4">Choose Your Perfect Solution</h2>
          <p className="text-xl text-fa-slate-600 max-w-2xl mx-auto">
            Whether you need a quick launch or a completely custom design, we have the perfect solution for your barbershop.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Template Website Card */}
          <div className="bg-fa-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-fa-primary transition-all duration-300 hover:shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-fa-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-magic text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-fa-secondary mb-2">Template Website</h3>
              <p className="text-fa-slate-600 mb-4">AI-generated content with professional templates</p>
              <div className="text-4xl font-bold text-fa-primary mb-2">$199</div>
              <p className="text-sm text-slate-500">One-time payment</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>AI-Generated Content</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>2 Professional Templates</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Live Preview Before Payment</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Mobile Responsive Design</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Contact Forms & Maps</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Same Day Delivery</span>
              </li>
            </ul>
            
            <button 
              onClick={onShowTemplateForm}
              className="w-full bg-fa-primary hover:bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Start Template Generation
            </button>
          </div>

          {/* Personalized Website Card */}
          <div className="bg-gradient-to-br from-fa-slate-800 to-fa-slate-900 rounded-2xl p-8 text-white relative overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-4 right-4 bg-fa-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-fa-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-palette text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">Personalized Website</h3>
              <p className="text-slate-300 mb-4">Fully custom design tailored to your brand</p>
              <div className="text-4xl font-bold text-fa-accent mb-2">$89</div>
              <p className="text-sm text-slate-400">Consultation fee (Applied to final cost)</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Custom Design Consultation</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Unlimited Revisions</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Brand Identity Development</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>Advanced Features & Integrations</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>SEO Optimization</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-fa-accent mr-3"></i>
                <span>30-Day Support Included</span>
              </li>
            </ul>
            
            <button 
              onClick={onShowPersonalizedForm}
              className="w-full bg-fa-accent hover:bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Start Custom Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

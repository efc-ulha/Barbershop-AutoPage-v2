import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServiceComparison from "@/components/service-comparison";
import TemplateForm from "@/components/template-form";
import PersonalizedForm from "@/components/personalized-form";
import WebsitePreview from "@/components/website-preview";
import { useState } from "react";

export default function Home() {
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showPersonalizedForm, setShowPersonalizedForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-fa-slate-50">
      <Navigation />
      
      <HeroSection 
        onShowTemplateForm={() => setShowTemplateForm(true)}
        onShowPersonalizedForm={() => setShowPersonalizedForm(true)}
      />
      
      <ServiceComparison 
        onShowTemplateForm={() => setShowTemplateForm(true)}
        onShowPersonalizedForm={() => setShowPersonalizedForm(true)}
      />

      {/* About Section */}
      <section id="about" className="py-20 bg-fa-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-fa-secondary mb-6">Why Choose FA Web Design?</h2>
            <p className="text-xl text-fa-slate-600 mb-12">
              We specialize in creating stunning websites for barbershops and salons that convert visitors into customers.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-fa-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-rocket text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-fa-secondary mb-3">Fast Delivery</h3>
                <p className="text-fa-slate-600">Template websites delivered same day, custom designs within 7 days.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-fa-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-fa-secondary mb-3">Mobile Optimized</h3>
                <p className="text-fa-slate-600">All websites are fully responsive and optimized for mobile devices.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-headset text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-fa-secondary mb-3">Ongoing Support</h3>
                <p className="text-fa-slate-600">We provide continued support and maintenance for all our websites.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fa-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 gradient-fa-primary rounded-lg flex items-center justify-center">
                  <i className="fas fa-cut text-white"></i>
                </div>
                <span className="text-xl font-bold">FA Web Design</span>
              </div>
              <p className="text-slate-300">
                Creating beautiful websites for barbershops and salons worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Template Websites</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SEO Optimization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-300">
                <li><i className="fas fa-envelope mr-2"></i>hello@fawebdesign.com</li>
                <li><i className="fas fa-phone mr-2"></i>(555) 123-4567</li>
                <li><i className="fas fa-map-marker-alt mr-2"></i>New York, NY</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 FA Web Design. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showTemplateForm && (
        <TemplateForm 
          onClose={() => setShowTemplateForm(false)}
          onShowPreview={(data) => {
            setPreviewData(data);
            setShowTemplateForm(false);
            setShowPreview(true);
          }}
        />
      )}

      {showPersonalizedForm && (
        <PersonalizedForm 
          onClose={() => setShowPersonalizedForm(false)}
        />
      )}

      {showPreview && previewData && (
        <WebsitePreview 
          data={previewData}
          onClose={() => setShowPreview(false)}
          onRequestPersonalization={() => {
            setShowPreview(false);
            setShowPersonalizedForm(true);
          }}
        />
      )}
    </div>
  );
}

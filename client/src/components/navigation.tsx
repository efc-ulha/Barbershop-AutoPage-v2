export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg border-b border-slate-200 relative">
      <div className="absolute top-0 left-0 w-full h-1 gradient-barber"></div>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-fa-primary rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-cut text-white text-lg"></i>
          </div>
          <div>
            <span className="text-xl font-bold text-fa-secondary barber-heading">FA Web Design</span>
            <div className="text-xs text-fa-gold font-semibold tracking-wider">BARBERSHOP SPECIALISTS</div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-fa-slate-600 hover:text-fa-primary transition-colors font-medium">Services</a>
          <a href="#about" className="text-fa-slate-600 hover:text-fa-primary transition-colors font-medium">About</a>
          <a href="#contact" className="text-fa-slate-600 hover:text-fa-primary transition-colors font-medium">Contact</a>
          <button className="barber-button bg-gradient-to-r from-fa-primary to-fa-barber-red text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
            <i className="fas fa-rocket mr-2"></i>
            Get Started
          </button>
        </div>
        <button className="md:hidden text-fa-slate-600">
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
    </nav>
  );
}

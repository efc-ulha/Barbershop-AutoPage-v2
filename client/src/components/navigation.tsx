export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-fa-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-cut text-white text-lg"></i>
          </div>
          <span className="text-xl font-bold text-fa-secondary">FA Web Design</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-fa-slate-600 hover:text-fa-primary transition-colors">Services</a>
          <a href="#about" className="text-fa-slate-600 hover:text-fa-primary transition-colors">About</a>
          <a href="#contact" className="text-fa-slate-600 hover:text-fa-primary transition-colors">Contact</a>
          <button className="bg-fa-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
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

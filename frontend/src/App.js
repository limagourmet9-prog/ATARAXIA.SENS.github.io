import React, { useState, useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Menu, X, Instagram, Facebook, Phone, MapPin, Mail } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hola! Soy ${formData.nombre}. ${formData.mensaje}`;
    const whatsappUrl = `https://wa.me/5214591162796?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const projects = [
    { id: 1, category: 'Systems', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
    { id: 2, category: 'Experience', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80' },
    { id: 3, category: 'Experience', image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&q=80' },
    { id: 4, category: 'Academy', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80' },
    { id: 5, category: 'Systems', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
    { id: 6, category: 'Experience', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80' },
  ];

  const cocktails = [
    { id: 1, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80' },
    { id: 2, image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=800&q=80' },
    { id: 3, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80' },
  ];

  const filteredProjects = activeFilter === 'Todos' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div className="bg-black text-white">
              {/* Navigation */}
              <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 border-2 border-gold rotate-45 flex items-center justify-center">
                        <span className="-rotate-45 text-gold font-bold text-xl">A</span>
                      </div>
                      <span className="text-xl font-bold">ATARAXIA</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                      <button onClick={() => scrollToSection('inicio')} className="hover:text-gold transition">Inicio</button>
                      <button onClick={() => scrollToSection('divisiones')} className="hover:text-gold transition">Divisiones</button>
                      <button onClick={() => scrollToSection('portafolio')} className="hover:text-gold transition">Portafolio</button>
                      <button onClick={() => scrollToSection('nosotros')} className="hover:text-gold transition">Nosotros</button>
                      <button onClick={() => scrollToSection('contacto')} className="hover:text-gold transition">Contacto</button>
                      <Button onClick={() => scrollToSection('contacto')} className="bg-gold hover:bg-gold/90 text-black font-semibold">
                        Iniciar Proyecto
                      </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
                      {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                  </div>

                  {/* Mobile Menu */}
                  {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4">
                      <button onClick={() => scrollToSection('inicio')} className="block w-full text-left py-2 hover:text-gold">Inicio</button>
                      <button onClick={() => scrollToSection('divisiones')} className="block w-full text-left py-2 hover:text-gold">Divisiones</button>
                      <button onClick={() => scrollToSection('portafolio')} className="block w-full text-left py-2 hover:text-gold">Portafolio</button>
                      <button onClick={() => scrollToSection('nosotros')} className="block w-full text-left py-2 hover:text-gold">Nosotros</button>
                      <button onClick={() => scrollToSection('contacto')} className="block w-full text-left py-2 hover:text-gold">Contacto</button>
                      <Button onClick={() => scrollToSection('contacto')} className="w-full bg-gold hover:bg-gold/90 text-black font-semibold">
                        Iniciar Proyecto
                      </Button>
                    </div>
                  )}
                </div>
              </nav>

              {/* Hero Section */}
              <section id="inicio" className="min-h-screen flex items-center justify-center relative pt-20" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}>
                <div className="absolute inset-0 bg-black/80"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                  <p className="text-gold text-sm tracking-widest mb-4">LABORATORIO CREATIVO-TÉCNICO</p>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="text-gold">ATARAXIA</span><br />
                    <span className="text-white">TECH LAB</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    Diseñamos sistemas y experiencias que elevan el desempeño técnico y humano. <span className="text-gold">Precision. Experience. Evolution.</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => scrollToSection('contacto')} className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-6 text-lg">
                      Iniciar Proyecto →
                    </Button>
                    <Button onClick={() => scrollToSection('divisiones')} variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
                      Explorar Servicios
                    </Button>
                  </div>
                  <div className="mt-12 inline-block px-6 py-3 border border-gold/50 rounded-full">
                    <p className="text-sm text-gray-400">EST. 2024</p>
                    <p className="text-gold font-semibold">Engineering Experiences</p>
                  </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <p className="text-gray-500 text-sm">SCROLL</p>
                  <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
                </div>
              </section>

              {/* Divisions Section */}
              <section id="divisiones" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* ATARAXIA SYSTEMS */}
                    <Card className="bg-gray-900 border-gray-800 hover:border-gold transition-all duration-300 group" data-testid="division-systems">
                      <div className="relative h-64 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="Systems" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-gold mb-3">ATARAXIA SYSTEMS</h3>
                        <p className="text-sm text-gold/80 mb-4">Precision. Structure. Results.</p>
                        <p className="text-gray-400">Soluciones técnicas y digitales con enfoque en eficiencia y resultados medibles.</p>
                      </CardContent>
                    </Card>

                    {/* ATARAXIA EXPERIENCE */}
                    <Card className="bg-gray-900 border-gray-800 hover:border-gold transition-all duration-300 group" data-testid="division-experience">
                      <div className="relative h-64 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" alt="Experience" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-gold mb-3">ATARAXIA EXPERIENCE</h3>
                        <p className="text-sm text-gold/80 mb-4">Sensation. Emotion. Memory.</p>
                        <p className="text-gray-400">Experiencias sensoriales que generan impacto emocional y rentabilidad.</p>
                      </CardContent>
                    </Card>

                    {/* ATARAXIA ACADEMY */}
                    <Card className="bg-gray-900 border-gray-800 hover:border-gold transition-all duration-300 group" data-testid="division-academy">
                      <div className="relative h-64 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80" alt="Academy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold text-gold mb-3">ATARAXIA ACADEMY</h3>
                        <p className="text-sm text-gold/80 mb-4">Knowledge. Growth. Mastery.</p>
                        <p className="text-gray-400">Transferencia real de conocimiento para el desarrollo profesional.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Arte Culinario Section */}
              <section className="py-20 px-4 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                  <p className="text-gold text-sm tracking-widest text-center mb-2">TRAYECTORIA & CREACIONES</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Arte <span className="text-gold">Culinario</span></h2>
                  <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
                    Cada creación es una experiencia sensorial única, resultado de años de formación y pasión.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cocktails.map((cocktail) => (
                      <div key={cocktail.id} className="relative group overflow-hidden rounded-lg aspect-square">
                        <img src={cocktail.image} alt="Cocktail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <a href="https://instagram.com/Marroquin7" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                        <Instagram className="mr-2" size={18} />
                        Ver más en Instagram
                      </Button>
                    </a>
                  </div>
                </div>
              </section>

              {/* Statistics Section */}
              <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center" data-testid="stat-projects">
                      <p className="text-5xl md:text-6xl font-bold text-gold mb-2">50+</p>
                      <p className="text-gray-400">Proyectos Completados</p>
                    </div>
                    <div className="text-center" data-testid="stat-divisions">
                      <p className="text-5xl md:text-6xl font-bold text-gold mb-2">3</p>
                      <p className="text-gray-400">Divisiones Especializadas</p>
                    </div>
                    <div className="text-center" data-testid="stat-satisfaction">
                      <p className="text-5xl md:text-6xl font-bold text-gold mb-2">100%</p>
                      <p className="text-gray-400">Clientes Satisfechos</p>
                    </div>
                    <div className="text-center" data-testid="stat-award">
                      <p className="text-5xl md:text-6xl font-bold text-gold mb-2">1er</p>
                      <p className="text-gray-400">Lugar Mixología</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Projects Section */}
              <section id="portafolio" className="py-20 px-4 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                  <p className="text-gold text-sm tracking-widest text-center mb-2">CASOS DE IMPACTO</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Proyectos <span className="text-gold">Destacados</span></h2>
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['Todos', 'Systems', 'Experience', 'Academy'].map((filter) => (
                      <Button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        variant={activeFilter === filter ? 'default' : 'outline'}
                        className={activeFilter === filter ? 'bg-gold text-black hover:bg-gold/90' : 'border-gray-700 text-gray-400 hover:text-white hover:border-gold'}
                        data-testid={`filter-${filter.toLowerCase()}`}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <div key={project.id} className="relative group overflow-hidden rounded-lg aspect-video" data-testid="project-card">
                        <img src={project.image} alt={project.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4">
                            <p className="text-gold font-semibold">{project.category}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* About Us Section */}
              <section id="nosotros" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                  <p className="text-gold text-sm tracking-widest text-center mb-2">SOBRE NOSOTROS</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">El Arte de <span className="text-gold">Integrar Mundos</span></h2>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <p className="text-gray-400 mb-6 text-lg">
                        ATARAXIA TECH LAB nace de la visión del <span className="text-gold font-semibold">Loco Sabio</span>: aquel que parece disperso, pero en realidad integra mundos. No somos "los que hacen de todo". Somos <span className="text-white font-semibold">arquitectos de soluciones técnicas y experiencias transformadoras</span>.
                      </p>
                      <p className="text-gray-400 mb-6">
                        Con formación en <span className="text-gold">Gastronomía</span> (Club de Cuisine, 2018) y <span className="text-gold">Mixología</span> (Colegio de Bartenders con Mane Maldonado, 2020), combinamos técnica culinaria con creatividad sensorial para crear experiencias únicas.
                      </p>
                      <blockquote className="border-l-4 border-gold pl-4 py-2 italic text-lg mb-8">
                        "Diseño experiencias y sistemas que transforman personas y proyectos, combinando técnica, arte y estrategia."
                      </blockquote>
                      <div className="space-y-3">
                        <p className="flex items-center text-gold">✓ 1er Lugar - Concurso Mixología Tonatzin</p>
                        <p className="flex items-center text-gray-400">✓ Club de Cuisine 2018</p>
                        <p className="flex items-center text-gray-400">✓ Colegio de Bartenders 2020</p>
                      </div>
                    </div>
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80" alt="Brian Marroquin" className="rounded-lg" />
                      <div className="absolute -bottom-6 -right-6 bg-gold text-black p-6 rounded-lg shadow-2xl">
                        <p className="text-sm font-semibold mb-1">FOUNDER</p>
                        <p className="font-bold text-lg">Brian Marroquin Ambriz</p>
                        <p className="text-sm italic">El Loco Sabio</p>
                        <a href="https://instagram.com/Marroquin7" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center text-sm hover:underline">
                          <Instagram size={16} className="mr-1" /> @Marroquin7
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contacto" className="py-20 px-4 bg-gray-900/50">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Iniciemos Tu <span className="text-gold">Proyecto</span></h2>
                  <p className="text-gray-400 text-center mb-12">
                    ¿Listo para transformar tu visión en realidad? Cuéntanos sobre tu proyecto y diseñemos juntos la solución perfecta.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <a href="https://wa.me/5214591162796" target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp">
                      <Card className="bg-gray-900 border-gray-800 hover:border-gold transition-all cursor-pointer h-full">
                        <CardContent className="p-6 flex items-start space-x-4">
                          <Phone className="text-gold" size={24} />
                          <div>
                            <p className="font-semibold mb-1">WhatsApp Personal</p>
                            <p className="text-gray-400 text-sm">+52 459 116 2796</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>

                    <a href="https://www.facebook.com/profile.php?id=61571907088542" target="_blank" rel="noopener noreferrer">
                      <Card className="bg-gray-900 border-gray-800 hover:border-gold transition-all cursor-pointer h-full">
                        <CardContent className="p-6 flex items-start space-x-4">
                          <Facebook className="text-gold" size={24} />
                          <div>
                            <p className="font-semibold mb-1">Facebook</p>
                            <p className="text-gray-400 text-sm">Brian Marroquin Ambriz</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>

                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <Instagram className="text-gold" size={24} />
                        <div>
                          <p className="font-semibold mb-1">Instagram</p>
                          <p className="text-gray-400 text-sm">@Marroquin7</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <MapPin className="text-gold" size={24} />
                        <div>
                          <p className="font-semibold mb-1">Ubicación</p>
                          <p className="text-gray-400 text-sm">Tacámbaro y Morelia, Michoacán</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                        <div>
                          <label className="block text-sm font-medium mb-2">Nombre *</label>
                          <Input
                            required
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Tu nombre completo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="tu@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Mensaje</label>
                          <Textarea
                            value={formData.mensaje}
                            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white h-32"
                            placeholder="Cuéntanos sobre tu proyecto..."
                          />
                        </div>
                        <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-6 text-lg" data-testid="submit-button">
                          Enviar Mensaje →
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-12 px-4 border-t border-gray-800">
                <div className="max-w-7xl mx-auto">
                  <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 border-2 border-gold rotate-45 flex items-center justify-center">
                          <span className="-rotate-45 text-gold font-bold">A</span>
                        </div>
                        <span className="font-bold">ATARAXIA</span>
                      </div>
                      <p className="text-gray-400 text-sm">Laboratorio Creativo-Técnico</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-gold">Divisiones</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li>ATARAXIA Systems</li>
                        <li>ATARAXIA Experience</li>
                        <li>ATARAXIA Academy</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-gold">Servicios</h4>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li>Branding</li>
                        <li>Gastronomía</li>
                        <li>IT & Sistemas</li>
                        <li>Mixología</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 text-gold">Síguenos</h4>
                      <div className="flex space-x-4">
                        <a href="https://instagram.com/Marroquin7" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition">
                          <Instagram size={24} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61571907088542" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition">
                          <Facebook size={24} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
                    <p>© 2024 ATARAXIA TECH LAB. Todos los derechos reservados.</p>
                    <p className="mt-2">Tacámbaro y Morelia, Michoacán</p>
                  </div>
                </div>
              </footer>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
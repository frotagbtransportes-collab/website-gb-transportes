import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Instagram, Mail, MapPin, Phone, ChevronDown, CheckCircle2, ChevronLeft, ChevronRight, Shield, FileText, Plus } from 'lucide-react';

// Ícone do WhatsApp (SVG Personalizado)
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const App = () => {
  // CONFIGURAÇÃO DO EMAIL (FORMSPREE)
  const FORMSPREE_ID = "xeelonnr"; 

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedProject, setSelectedProject] = useState(null); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  
  // ESTADOS PARA O PORTFÓLIO INFINITO
  const [visibleCount, setVisibleCount] = useState(4); 
  const PROJECTS_PER_PAGE = 4;

  const [formStatus, setFormStatus] = useState('idle'); 
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Definição das animações CSS
  const customStyles = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeInSlide { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
    .animate-fade-in-slide { animation: fadeInSlide 0.6s ease-out forwards; }
    .animate-scale-up { animation: scaleUp 0.3s ease-out forwards; }
    .filter-btn { position: relative; }
    .filter-btn::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: black; transition: width 0.3s ease; }
    .filter-btn.active::after { width: 100%; }
  `;

  // Monitora o scroll para mudar a cor do menu
  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueio de Scroll Seguro (Correção do "Travamento")
  useEffect(() => {
    if (selectedProject || isPrivacyOpen || isTermsOpen) {
      document.body.style.overflow = 'hidden'; 
      if (selectedProject) setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject, isPrivacyOpen, isTermsOpen]);

  // Resetar contagem ao mudar categoria
  useEffect(() => { setVisibleCount(PROJECTS_PER_PAGE); }, [activeCategory]);

  // Função segura de navegação suave
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setSelectedProject(null);
    setIsPrivacyOpen(false);
    setIsTermsOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => (prev === selectedProject.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1));
    }
  };

  // BANCO DE DADOS DE PROJETOS (ATUALIZADO PARA PNG)
  const projects = [
    {
      id: 1,
      title: "Edifício Comercial Campinas",
      category: "comercial",
      location: "Campinas, SP",
      image: "/projetos/predio-comercial.png",
      gallery: [
        "/projetos/predio-comercial.png"
      ],
      desc: "Projeto arquitetônico para um edifício comercial em Campinas. A fachada apresenta uma composição simétrica elegante com grandes panos de vidro que maximizam a iluminação natural, contrastando com painéis ripados e elementos amadeirados no térreo. O layout foi pensado para abrigar múltiplas frentes de negócios com vagas recuadas e paisagismo integrado."
    },
    {
      id: 2,
      title: "Galpão ERC Trading",
      category: "comercial",
      location: "Campinas, SP",
      image: "/projetos/erc-trading.png",
      gallery: [
        "/projetos/erc-trading.png"
      ],
      desc: "Desenvolvimento de galpão para o empreendimento da ERC Trading. O projeto une a robustez do concreto aparente com a estética industrial do tijolinho nas docas. Detalhes em brise metálico escuro na área administrativa não só conferem um visual corporativo forte, mas também garantem controle térmico para os escritórios voltados para a fachada."
    },
    {
      id: 3,
      title: "Cozinha Afetiva",
      category: "residencial",
      location: "Projeto de Interiores",
      image: "/projetos/cozinha-1.png",
      gallery: [
        "/projetos/cozinha-1.png",
        "/projetos/cozinha-2.png",
        "/projetos/cozinha-3.png",
        "/projetos/cozinha-4.png"
      ],
      desc: "Projeto de reforma com enorme valor afetivo, desenvolvido para a avó de uma das arquitetas do nosso estúdio. Buscamos um equilíbrio perfeito entre o nostálgico e o moderno. A marcenaria em tons de madeira natural com puxadores clássicos ganha vida e contraste com a península em azul suave e o piso de ladrilho hidráulico. Um espaço pensado para conforto, memória e funcionalidade."
    },
    {
      id: 4,
      title: "Banheiro da Vó",
      category: "residencial",
      location: "Projeto de Interiores",
      image: "/projetos/banheiro-1.png",
      gallery: [
        "/projetos/banheiro-1.png",
        "/projetos/banheiro-2.png"
      ],
      desc: "Parte do projeto afetivo residencial, este banheiro ousa na combinação de cores e texturas. O revestimento de listras verticais em tons de verde menta cria uma atmosfera vintage atualizada, que contrasta maravilhosamente com os metais e barras de acessibilidade em amarelo vibrante. O box texturizado (vidro canelado escuro) adiciona uma camada extra de sofisticação tátil ao ambiente."
    }
  ];

  const filteredProjects = activeCategory === 'todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + PROJECTS_PER_PAGE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) { setFormStatus('success'); e.target.reset(); } else { setFormStatus('error'); }
    } catch (error) { setFormStatus('error'); }
  };

  // Componente de Modal Genérico
  const TextModal = ({ title, onClose, children, icon: Icon }) => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl h-auto max-h-[80vh] overflow-y-auto relative shadow-2xl rounded-sm p-8 md:p-12 animate-scale-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-black">
          <X size={24} />
        </button>
        <div className="flex items-center space-x-3 mb-8 border-b border-gray-100 pb-4">
          {Icon && <Icon size={28} className="text-black"/>}
          <h2 className="text-2xl font-bold uppercase tracking-widest text-black">{title}</h2>
        </div>
        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-black selection:text-white">
      <style>{customStyles}</style>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`text-2xl font-bold tracking-widest uppercase ${isScrolled ? 'text-black' : 'text-black md:text-white'}`}>
            Arch<span className="font-light">Lab</span>.
          </a>

          <div className={`hidden md:flex space-x-12 text-sm font-medium tracking-wide ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:opacity-60 transition-opacity">PROJETOS</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:opacity-60 transition-opacity">SOBRE</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:opacity-60 transition-opacity">SERVIÇOS</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:opacity-60 transition-opacity">CONTATO</a>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-black focus:outline-none">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} color={isScrolled ? 'black' : 'white'} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-8 px-6 flex flex-col space-y-6 md:hidden animate-fade-in-slide border-t border-gray-100">
            <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="text-lg font-medium text-black">Projetos</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-lg font-medium text-black">Sobre</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-lg font-medium text-black">Serviços</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-lg font-medium text-black">Iniciar Projeto</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
            alt="Arquitetura Minimalista" 
            className="w-full h-full object-cover brightness-75 animate-scale-up"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 animate-fade-in-slide">
          <p className="text-sm md:text-base tracking-[0.3em] mb-4 uppercase text-gray-200">Arquitetura & Design</p>
          <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
            Design que define <br /> <span className="font-bold">o futuro.</span>
          </h1>
          <a 
            href="#portfolio" 
            onClick={(e) => scrollToSection(e, 'portfolio')}
            className="inline-flex items-center space-x-2 border border-white px-8 py-4 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            <span>VER PROJETOS</span>
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown size={32} />
        </div>
      </header>

      {/* Intro / Philosophy */}
      <section id="about" className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 animate-fade-in-slide">
              <span className="block text-xs font-bold tracking-[0.3em] text-gray-400 mb-6 uppercase">A Nossa Abordagem</span>
              <h2 className="text-4xl md:text-6xl font-light leading-tight text-gray-900">
                A estética <br/>da <span className="font-bold">necessidade</span> <br/>e da função.
              </h2>
              <div className="h-0.5 w-24 bg-black mt-8"></div>
            </div>
            <div className="md:col-span-7 md:pl-12 space-y-8 text-lg font-light leading-relaxed text-gray-600 animate-fade-in-slide animate-delay-100">
              <p>No <span className="font-medium text-black">ArchLab</span>, não nos prendemos a rótulos ou estilos pré-definidos. A nossa assinatura é a pertinência. Acreditamos que a verdadeira arquitetura nasce da resposta exata ao que o projeto exige.</p>
              <p>Unimos o funcional ao estético de forma inseparável. Se o espaço pede silêncio, desenhamos calma; se pede impacto, desenhamos ousadia. O nosso compromisso é <span className="italic text-gray-900">desenhar o necessário</span> com inteligência, criando espaços que servem, antes de tudo, à vida de quem os habita.</p>
              <div className="pt-8"><p className="text-xs font-bold tracking-widest uppercase text-black">Arquitetura Sob Medida • Desde 2025</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">Portfolio Selecionado</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nossos Projetos</h2>
            </div>
            
            <div className="flex space-x-6 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
              {['todos', 'residencial', 'comercial'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`uppercase text-sm tracking-widest pb-2 transition-colors filter-btn ${
                    activeCategory === cat ? 'text-black active' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
            {visibleProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group cursor-pointer animate-fade-in-slide"
                style={{ animationDelay: `${index * 100}ms` }} 
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop"; }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 text-sm tracking-widest uppercase transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">Ver Detalhes</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-500 mt-1 line-clamp-1">{project.desc}</p>
                  </div>
                  <span className="text-xs font-bold border border-gray-200 px-2 py-1 uppercase text-gray-400">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {hasMoreProjects && (
            <div className="flex justify-center mt-16 animate-fade-in">
              <button 
                onClick={loadMore}
                className="group flex items-center space-x-2 border-b border-black pb-1 text-sm tracking-widest uppercase hover:text-gray-600 transition-colors"
              >
                <span>Carregar Mais Projetos</span>
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300"/>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div className="bg-white w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-up" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors text-black shadow-lg"
            >
              <X size={24} />
            </button>
            
            <div className="grid md:grid-cols-2 h-full">
               <div className="h-64 md:h-full min-h-[400px] relative bg-gray-100 group">
                 <img 
                   src={selectedProject.gallery ? selectedProject.gallery[currentImageIndex] : selectedProject.image} 
                   alt={`${selectedProject.title} ${currentImageIndex + 1}`} 
                   className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 animate-fade-in" 
                   key={currentImageIndex} 
                   onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop"; }}
                 />
                 
                 {/* Setas de navegação */}
                 {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                   <>
                     <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={24} /></button>
                     <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={24} /></button>
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                       {selectedProject.gallery.map((_, idx) => (
                         <div key={idx} onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}/>
                       ))}
                     </div>
                   </>
                 )}
               </div>
               
               <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                 <div className="mb-auto">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-xs font-bold tracking-widest uppercase text-black border border-black px-2 py-1">{selectedProject.category}</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{selectedProject.title}</h3>
                   <div className="flex items-center text-gray-500 mb-8 pb-8 border-b border-gray-100">
                     <MapPin size={18} className="mr-2" />
                     <span className="text-sm tracking-wide">{selectedProject.location}</span>
                   </div>
                   <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-900">Conceito</h4>
                   <p className="text-gray-600 leading-loose mb-8">{selectedProject.desc}</p>
                 </div>
                 <button onClick={(e) => { setSelectedProject(null); scrollToSection(e, 'contact'); }} className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                   <span>Quero um projeto similar</span>
                   <ArrowRight size={16} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16"><h3 className="text-sm font-bold tracking-[0.2em] text-gray-400 mb-2 uppercase">Expertise</h3><h2 className="text-3xl md:text-4xl font-bold text-gray-900">O Que Fazemos</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 group hover:bg-black hover:text-white transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Arquitetura Residencial</h3>
              <p className="text-gray-600 group-hover:text-gray-300 mb-6 leading-relaxed">Projetos de casas e reformas que priorizam o conforto, a estética e a personalidade dos moradores. Do conceito à entrega.</p>
              <ul className="space-y-2 text-sm text-gray-500 group-hover:text-gray-400"><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Projetos Executivos</li><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Aprovação Legal</li><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Detalhamento</li></ul>
            </div>
            <div className="bg-gray-50 p-8 group hover:bg-black hover:text-white transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Design de Interiores</h3>
              <p className="text-gray-600 group-hover:text-gray-300 mb-6 leading-relaxed">Transformação de ambientes internos com foco em ergonomia, iluminação e seleção curada de materiais e mobiliário.</p>
              <ul className="space-y-2 text-sm text-gray-500 group-hover:text-gray-400"><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Layout e Fluxos</li><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Marcenaria Personalizada</li><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Produção e Decoração</li></ul>
            </div>
            <div className="bg-gray-50 p-8 group hover:bg-black hover:text-white transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Gestão e Consultoria</h3>
              <p className="text-gray-600 group-hover:text-gray-300 mb-6 leading-relaxed">Acompanhamento técnico para garantir que a execução da obra seja fiel ao projeto, dentro do prazo e do orçamento.</p>
              <ul className="space-y-2 text-sm text-gray-500 group-hover:text-gray-400"><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Acompanhamento de Obra</li><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Viabilidade Técnica</li><li className="flex items-center"><CheckCircle2 size={16} className="mr-2"/> Consultoria Online</li></ul>
            </div>
          </div>
        </div>
      </section>

      {/* Briefing / Contact Form */}
      <section id="contact" className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6">Vamos construir <br/>o <span className="font-bold">extraordinário?</span></h2>
                <p className="text-gray-400 leading-relaxed text-lg">Estamos prontos para ouvir sobre o seu novo desafio. Preencha o briefing ao lado ou entre em contato direto pelos nossos canais.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="text-gray-500" />
                  <div>
                    <h4 className="font-bold text-lg">Telefone / WhatsApp</h4>
                    <p className="text-gray-400">+55 (19) 97428-2792</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="text-gray-500" />
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-gray-400">contato@archlabstudio.com.br</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-6 pt-6">
                <a href="https://www.instagram.com/archlab.br" target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/5519974282792" target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-colors">
                  <WhatsAppIcon size={20} />
                </a>
              </div>
            </div>

            {/* Briefing Form */}
            <div className="bg-white/5 p-8 md:p-10 rounded-sm border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-light mb-8 border-b border-gray-700 pb-4">Briefing Inicial</h3>
              
              {formStatus === 'success' ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4"><CheckCircle2 className="w-8 h-8"/></div>
                  <h4 className="text-2xl font-bold mb-2">Mensagem Recebida</h4>
                  <p className="text-gray-400">Nossa equipe analisará seu briefing e entrará em contato em até 24h.</p>
                  <button onClick={() => window.location.reload()} className="mt-6 text-sm underline text-gray-500 hover:text-white">Enviar outro projeto</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="nome" className="text-xs uppercase tracking-wider text-gray-500">Nome Completo</label>
                      <input required name="nome" type="text" className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="telefone" className="text-xs uppercase tracking-wider text-gray-500">Telefone</label>
                      <input required name="telefone" type="tel" className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors" placeholder="(00) 00000-0000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-gray-500">Email Corporativo/Pessoal</label>
                    <input required name="email" type="email" className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors" placeholder="seuemail@exemplo.com" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tipo_projeto" className="text-xs uppercase tracking-wider text-gray-500">Tipo de Projeto</label>
                    <select name="tipo_projeto" className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors text-gray-300">
                      <option className="bg-gray-900" value="">Selecione...</option>
                      <option className="bg-gray-900" value="residencial-nova">Residencial (Nova Construção)</option>
                      <option className="bg-gray-900" value="residencial-reforma">Residencial (Reforma)</option>
                      <option className="bg-gray-900" value="comercial-corporativo">Comercial (Corporativo)</option>
                      <option className="bg-gray-900" value="comercial-varejo">Comercial (Varejo/Loja)</option>
                      <option className="bg-gray-900" value="incorporacao">Incorporação Imobiliária</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mensagem" className="text-xs uppercase tracking-wider text-gray-500">Sobre o Projeto</label>
                    <textarea name="mensagem" rows="3" className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors resize-none" placeholder="Fale-nos sobre o local, área e expectativas..."></textarea>
                  </div>

                  <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4">
                    {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Briefing'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
          <p>&copy; 2025 ArchLab Arquitetura. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">Termos</button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <TextModal title="Política de Privacidade" icon={Shield} onClose={() => setIsPrivacyOpen(false)}>
          <p className="mb-4"><strong>Última atualização: Dezembro 2025</strong></p>
          <p className="mb-4">No ArchLab, levamos a sua privacidade a sério. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.</p>
          <h3 className="text-lg font-bold text-black mt-6 mb-2">1. Coleta de Dados</h3>
          <p className="mb-4">Coletamos informações que você nos fornece diretamente através do formulário de contato, como nome, e-mail, telefone e detalhes do projeto.</p>
          <h3 className="text-lg font-bold text-black mt-6 mb-2">2. Uso das Informações</h3>
          <p className="mb-4">Utilizamos seus dados exclusivamente para: responder às suas solicitações de orçamento, agendar reuniões e enviar propostas comerciais.</p>
          <h3 className="text-lg font-bold text-black mt-6 mb-2">3. Proteção de Dados</h3>
          <p className="mb-4">Implementamos medidas de segurança para proteger seus dados contra acesso não autorizado. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
        </TextModal>
      )}

      {/* Terms of Use Modal */}
      {isTermsOpen && (
        <TextModal title="Termos de Uso" icon={FileText} onClose={() => setIsTermsOpen(false)}>
          <p className="mb-4">Bem-vindo ao site do ArchLab. Ao acessar este site, você concorda com os seguintes termos:</p>
          <h3 className="text-lg font-bold text-black mt-6 mb-2">1. Propriedade Intelectual</h3>
          <p className="mb-4">Todo o conteúdo deste site, incluindo textos, imagens de projetos, logotipos e design, é de propriedade exclusiva do ArchLab e está protegido pelas leis de direitos autorais.</p>
          <h3 className="text-lg font-bold text-black mt-6 mb-2">2. Uso das Imagens</h3>
          <p className="mb-4">É proibida a reprodução, distribuição ou uso comercial das imagens dos projetos sem autorização prévia por escrito.</p>
          <h3 className="text-lg font-bold text-black mt-6 mb-2">3. Orçamentos</h3>
          <p className="mb-4">As estimativas de investimento apresentadas no site são apenas referências e não constituem uma proposta comercial vinculativa.</p>
        </TextModal>
      )}
    </div>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, ShieldCheck, Truck, MapPin, Phone } from 'lucide-react';
import { Button } from '../components/Button';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featuredProduct = PRODUCTS[0]; // iPhone 17 Pro Max

  return (
    <div className="bg-white dark:bg-apple-black">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          {/* Using a placeholder image that represents the 'Apple Ecosystem on Black' aesthetic. 
              User should replace this URL with the uploaded banner image URL if available. */}
          <img 
            src="https://images.unsplash.com/photo-1556656793-02715d8dd660?q=80&w=2070&auto=format&fit=crop" 
            alt="Galeria Apple Banner" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-slide-up flex flex-col items-center">
          {/* Logo / Brand */}
          <div className="mb-2">
             <svg className="w-12 h-12 md:w-16 md:h-16 text-apple-gold mx-auto fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.8-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.3 0 2.52.87 3.33.87.82 0 2.15-.87 3.63-.87 2.05.15 3.6.83 4.67 2.18-2.6 1.58-2.18 5.76.98 7.23-.2 1.35-1.02 2.67-1.72 3.2M13 3.5c.74-.91 1.24-2.17 1.1-3.42-1.17.06-2.58.79-3.42 1.77-.73.85-1.35 2.22-1.18 3.46 1.33.1 2.68-.81 3.5-1.81z" />
             </svg>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight mb-2 text-gray-100">
            Galeria Apple
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-medium mb-4 text-gray-200">
            iPhones Originais & Acessórios Apple
          </h2>
          
          <p className="text-xl md:text-2xl text-apple-gold italic font-serif mb-12">
            Qualidade, tecnologia e confiança
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 w-full max-w-md sm:max-w-none">
            <Link to={`/product/${featuredProduct.id}`} className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-apple-gold text-black hover:bg-yellow-500 border-none">
                Ver Destaque
              </Button>
            </Link>
            <Link to="/catalog" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-black">
                Explorar Loja
              </Button>
            </Link>
          </div>

          {/* Contact Info Strip */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-gray-300 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
            <div className="flex items-center gap-2">
               <MapPin size={20} className="text-apple-gold" />
               <span className="font-medium tracking-wide">Malanje | Luanda</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="flex items-center gap-2">
               <Phone size={20} className="text-apple-gold" />
               <span className="font-medium tracking-wide">924 323 789</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Navegue por Categoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'iPhones', link: '/catalog?category=iPhone', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800' },
            { name: 'Acessórios', link: '/catalog?category=Acessórios', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800' },
            { name: 'Ofertas', link: '/catalog?category=Ofertas', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800' }
          ].map((cat) => (
            <Link key={cat.name} to={cat.link} className="group relative h-96 rounded-3xl overflow-hidden shadow-xl">
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  {cat.name} <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Garantia Apple Oficial</h3>
              <p className="text-gray-500 dark:text-gray-400">Todos os produtos são originais e possuem garantia global.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Smartphone className="w-8 h-8 text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trade-in Disponível</h3>
              <p className="text-gray-500 dark:text-gray-400">Troque seu iPhone antigo por crédito na compra de um novo.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Truck className="w-8 h-8 text-apple-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Frete Grátis e Seguro</h3>
              <p className="text-gray-500 dark:text-gray-400">Entrega rápida para todo o país com rastreamento em tempo real.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
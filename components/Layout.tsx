import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Smartphone, Watch, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-apple-blue" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-apple-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-semibold tracking-tight dark:text-white">
                Galeria <span className="text-gray-400 font-light">Apple</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`${isActive('/')} text-sm font-medium transition-colors`}>Início</Link>
              <Link to="/catalog" className={`${isActive('/catalog')} text-sm font-medium transition-colors`}>Loja</Link>
              <Link to="/profile" className={`${isActive('/profile')} text-sm font-medium transition-colors`}>Conta</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <Link to={user ? "/profile" : "/login"} className="hidden md:block p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
                {user ? (
                   <img src={user.avatar} alt="Profile" className="w-6 h-6 rounded-full ring-2 ring-gray-200" />
                ) : (
                  <User size={20} />
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-500 dark:text-gray-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-apple-black border-t border-gray-200 dark:border-gray-800 absolute w-full h-screen animate-fade-in">
            <div className="px-4 pt-8 pb-3 space-y-6">
              <Link 
                to="/catalog?category=iPhone" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-4 text-2xl font-medium text-gray-900 dark:text-white"
              >
                <Smartphone className="text-gray-400" />
                <span>iPhone</span>
              </Link>
              <Link 
                to="/catalog?category=Acessórios" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-4 text-2xl font-medium text-gray-900 dark:text-white"
              >
                <Watch className="text-gray-400" />
                <span>Acessórios</span>
              </Link>
              <Link 
                to="/catalog?category=Ofertas" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-4 text-2xl font-medium text-gray-900 dark:text-white"
              >
                <Gift className="text-gray-400" />
                <span>Ofertas</span>
              </Link>
               <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                  <Link to={user ? "/profile" : "/login"} onClick={() => setIsMenuOpen(false)} className="text-lg text-apple-blue font-medium">
                    {user ? "Minha Conta" : "Iniciar Sessão"}
                  </Link>
               </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Comprar</h3>
              <ul className="space-y-3">
                <li><Link to="/catalog" className="text-sm text-gray-500 dark:text-gray-400 hover:text-apple-blue">iPhone</Link></li>
                <li><Link to="/catalog" className="text-sm text-gray-500 dark:text-gray-400 hover:text-apple-blue">Acessórios</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Serviços</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-apple-blue">AppleCare+</a></li>
                <li><a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-apple-blue">Pagamentos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Conta</h3>
              <ul className="space-y-3">
                <li><Link to="/profile" className="text-sm text-gray-500 dark:text-gray-400 hover:text-apple-blue">Meus Pedidos</Link></li>
                <li><Link to="/cart" className="text-sm text-gray-500 dark:text-gray-400 hover:text-apple-blue">Carrinho</Link></li>
              </ul>
            </div>
             <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Sobre</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Galeria Apple é uma revendedora premium fictícia criada para demonstração.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">© 2024 Galeria Apple. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, MessageSquare, Loader2, Minus, Plus } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { askProductConcierge } from '../services/geminiService';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      if (product.capacities) setSelectedCapacity(product.capacities[0]);
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-20">Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedCapacity);
    navigate('/cart');
  };

  const handleAiAsk = async () => {
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    const answer = await askProductConcierge(product, aiQuestion);
    setAiResponse(answer);
    setAiLoading(false);
  };

  return (
    <div className="bg-white dark:bg-apple-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center p-8">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain max-h-[600px] hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl">
                 <Truck className="w-6 h-6 text-apple-blue mb-2" />
                 <h4 className="font-semibold text-sm">Frete Grátis</h4>
                 <p className="text-xs text-gray-500">Para todo o Brasil</p>
               </div>
               <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl">
                 <Shield className="w-6 h-6 text-apple-blue mb-2" />
                 <h4 className="font-semibold text-sm">Garantia de 1 Ano</h4>
                 <p className="text-xs text-gray-500">Suporte Apple oficial</p>
               </div>
            </div>
          </div>

          {/* Details Section */}
          <div>
             <div className="mb-2 flex items-center space-x-2">
                {product.isNew && (
                  <span className="text-xs font-bold bg-yellow-500 text-white px-2 py-0.5 rounded-full">NOVO</span>
                )}
                <span className="text-sm font-medium text-apple-blue">{product.category}</span>
             </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews.length} avaliações)</span>
            </div>

            <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
              Kz {product.price.toLocaleString('pt-AO')}
              <span className="text-sm text-gray-500 font-normal block mt-1">
                ou 12x de Kz {(product.price / 12).toLocaleString('pt-AO', { maximumFractionDigits: 2 })} sem juros
              </span>
            </p>

            {/* Configurator */}
            <div className="space-y-8 mb-10 border-t border-gray-100 dark:border-zinc-800 pt-8">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Acabamento</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-3 rounded-full border text-sm transition-all ${
                        selectedColor === color
                          ? 'border-apple-blue ring-1 ring-apple-blue text-apple-blue bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacities */}
              {product.capacities && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Armazenamento</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.capacities.map((cap) => (
                      <button
                        key={cap}
                        onClick={() => setSelectedCapacity(cap)}
                        className={`px-4 py-3 rounded-lg border text-sm transition-all min-w-[80px] ${
                          selectedCapacity === cap
                            ? 'border-apple-blue ring-1 ring-apple-blue text-apple-blue bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mb-12">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Adicionar à Sacola
              </Button>
            </div>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sobre este produto</h3>
               <p>{product.description}</p>
               <ul className="mt-4 space-y-2">
                 {Object.entries(product.specs).map(([key, val]) => (
                   <li key={key} className="flex justify-between border-b border-gray-100 dark:border-zinc-800 py-2">
                     <span className="font-medium">{key}</span>
                     <span>{val}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* AI Concierge */}
            <div className="mt-12 bg-gray-50 dark:bg-zinc-900 rounded-2xl p-6 border border-gray-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                   <MessageSquare size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900 dark:text-white">Galeria AI Concierge</h3>
                   <p className="text-xs text-gray-500">Tire suas dúvidas sobre o {product.name}</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                {aiResponse && (
                  <div className="bg-white dark:bg-black p-4 rounded-xl border border-gray-100 dark:border-zinc-800 text-sm leading-relaxed animate-fade-in">
                    <p>{aiResponse}</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="Ex: A câmera é boa para fotos noturnas?"
                    className="flex-1 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-full px-4 py-2 focus:ring-2 focus:ring-apple-blue focus:outline-none text-sm"
                  />
                  <Button size="sm" onClick={handleAiAsk} disabled={aiLoading || !aiQuestion} className="rounded-full">
                    {aiLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Perguntar'}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
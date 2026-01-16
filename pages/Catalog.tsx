import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Category } from '../types';
import { Button } from '../components/Button';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'Todos';

  const categories = ['Todos', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-gray-50 dark:bg-apple-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Loja</h1>
          
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchParams({ category: cat })}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 dark:bg-zinc-900 dark:text-gray-300 dark:border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-800">
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-zinc-800 relative">
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                      NOVO
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-apple-blue mb-1">{product.category}</p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-apple-blue transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Kz {product.price.toLocaleString('pt-AO')}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Ver detalhes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchParams({ category: 'Todos' })}>
              Ver todos os produtos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
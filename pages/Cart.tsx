import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (cart.length === 0 && !paymentSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Sua sacola está vazia</h2>
        <p className="text-gray-500 mb-8">Navegue pela loja e encontre seu próximo Apple.</p>
        <Link to="/catalog">
          <Button>Continuar Comprando</Button>
        </Link>
      </div>
    );
  }

  if (paymentSuccess) {
      return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 animate-fade-in text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
           <Lock size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pedido Confirmado!</h2>
        <p className="text-gray-500 mb-8 max-w-md">Obrigado pela sua compra. Enviamos um email de confirmação para {user?.email || 'seu email'}.</p>
        <Link to="/profile">
          <Button variant="outline">Ver meus pedidos</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
        alert("Por favor, faça login para continuar.");
        return;
    }
    setIsCheckingOut(true);
    // Simulate processing
    setTimeout(() => {
        setIsCheckingOut(false);
        setPaymentSuccess(true);
        clearCart();
    }, 2000);
  };

  return (
    <div className="bg-gray-50 dark:bg-apple-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Sua Sacola</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedColor}`} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.selectedColor} {item.selectedCapacity && `• ${item.selectedCapacity}`}</p>
                  <div className="mt-2 text-apple-blue font-medium">
                    Kz {item.price.toLocaleString('pt-AO')}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-500 hover:text-black dark:hover:text-white">
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-gray-500 hover:text-black dark:hover:text-white">
                        <Plus size={16} />
                      </button>
                   </div>
                   <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                     <Trash2 size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Resumo</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>Kz {cartTotal.toLocaleString('pt-AO')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Frete</span>
                  <span className="text-green-500">Grátis</span>
                </div>
                <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex justify-between font-bold text-xl text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>Kz {cartTotal.toLocaleString('pt-AO')}</span>
                </div>
                 <p className="text-xs text-gray-500 text-right mt-1">Em até 12x sem juros</p>
              </div>

              <div className="space-y-3">
                 <Button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2" disabled={isCheckingOut}>
                   {isCheckingOut ? 'Processando...' : <><CreditCard size={18} /> Finalizar Compra</>}
                 </Button>
                 <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                   <Lock size={12} /> Pagamento 100% Seguro
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
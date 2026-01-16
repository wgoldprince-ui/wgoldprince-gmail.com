import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, orders } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Acesse sua conta</h2>
        <Button onClick={() => navigate('/login')}>Entrar / Cadastrar</Button>
       </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-apple-black min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
           <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full ring-4 ring-gray-100 dark:ring-zinc-800" />
           <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
              <p className="text-gray-500 mb-4">{user.email}</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
                 Membro VIP
              </div>
           </div>
           <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
             <LogOut size={16} /> Sair
           </Button>
        </div>

        {/* Orders */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
           <Package size={24} className="text-apple-blue" /> Histórico de Pedidos
        </h2>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row justify-between mb-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
                   <div>
                     <span className="text-sm text-gray-500 block">Pedido</span>
                     <span className="font-mono font-medium dark:text-white">{order.id}</span>
                   </div>
                   <div className="mt-2 sm:mt-0">
                      <span className="text-sm text-gray-500 block">Data</span>
                      <span className="font-medium dark:text-white">{order.date}</span>
                   </div>
                   <div className="mt-2 sm:mt-0">
                      <span className="text-sm text-gray-500 block">Status</span>
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                        order.status === 'Entregue' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                   </div>
                </div>
                
                <div className="space-y-3">
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex items-center gap-4">
                       <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-gray-50 dark:bg-zinc-800 rounded-lg" />
                       <div className="flex-1">
                         <h4 className="text-sm font-semibold dark:text-white">{item.name}</h4>
                         <p className="text-xs text-gray-500">{item.selectedColor}</p>
                       </div>
                       <div className="text-sm font-medium dark:text-white">
                         Kz {item.price.toLocaleString('pt-AO')}
                       </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                   <div className="text-lg font-bold dark:text-white">
                      Total: Kz {order.total.toLocaleString('pt-AO')}
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
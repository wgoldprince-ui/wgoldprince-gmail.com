import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-apple-black flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold dark:text-white mb-2">Bem-vindo à Galeria Apple</h1>
           <p className="text-gray-500">Faça login para gerenciar seus pedidos.</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-apple-blue outline-none" placeholder="cliente@exemplo.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Senha</label>
            <input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-apple-blue outline-none" placeholder="••••••••" />
          </div>
          
          <Button className="w-full mt-6" onClick={handleLogin}>Entrar</Button>
          
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">Não tem uma conta? </span>
            <button className="text-sm font-medium text-apple-blue hover:underline">Criar conta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

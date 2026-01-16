import { Category, Product, Order } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    category: Category.IPHONE,
    price: 2499000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    colors: ['Titanium Natural', 'Titanium Blue', 'Titanium Black', 'Titanium White'],
    capacities: ['256GB', '512GB', '1TB'],
    description: 'O iPhone definitivo. Forjado em titânio de grau aeroespacial, com o chip A19 Pro mais poderoso já criado.',
    rating: 5.0,
    isNew: true,
    reviews: [
      { id: '1', user: 'Carlos Silva', rating: 5, comment: 'Simplesmente incrível. A bateria dura 2 dias!', date: '2024-10-15' }
    ],
    specs: {
      Tela: '6.9" Super Retina XDR',
      Chip: 'A19 Pro',
      Câmera: '48MP Pro System',
      Bateria: 'Até 33h de vídeo'
    }
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: Category.IPHONE,
    price: 1999000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    colors: ['Titanium Natural', 'Black'],
    capacities: ['128GB', '256GB', '512GB'],
    description: 'Potência e elegância. Capture momentos cinematográficos com o novo botão de captura dedicado.',
    rating: 4.9,
    isNew: true,
    reviews: [],
    specs: {
      Tela: '6.3" Super Retina XDR',
      Chip: 'A18 Pro',
      Câmera: '48MP Fusion',
      Bateria: 'Até 29h de vídeo'
    }
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    category: Category.OFFERS,
    price: 1199000,
    image: 'https://images.unsplash.com/photo-1695048133021-697017688c29?auto=format&fit=crop&q=80&w=800',
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    capacities: ['128GB', '256GB', '512GB'],
    description: 'Dynamic Island, câmera de 48MP e design resistente com vidro colorido por infusão.',
    rating: 4.8,
    reviews: [
      { id: '2', user: 'Ana Julia', rating: 5, comment: 'Amei a cor rosa, é muito delicada.', date: '2024-09-01' }
    ],
    specs: {
      Tela: '6.1" Super Retina XDR',
      Chip: 'A16 Bionic',
      Câmera: '48MP Main',
      Bateria: 'Até 20h de vídeo'
    }
  },
  {
    id: 'airpods-pro',
    name: 'AirPods Pro (2ª Geração)',
    category: Category.ACCESSORIES,
    price: 349000,
    image: 'https://images.unsplash.com/photo-1628210889224-53b2e308bb46?auto=format&fit=crop&q=80&w=800',
    colors: ['White'],
    description: 'Cancelamento Ativo de Ruído até 2x melhor. Áudio Espacial Personalizado e estojo MagSafe USB-C.',
    rating: 4.9,
    reviews: [],
    specs: {
      Audio: 'Chip H2',
      Bateria: 'Até 6h de áudio',
      Conexão: 'Bluetooth 5.3',
      Resistência: 'IP54'
    }
  },
  {
    id: 'magsafe-charger',
    name: 'Carregador MagSafe',
    category: Category.ACCESSORIES,
    price: 79000,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800',
    colors: ['White'],
    description: 'O jeito mais rápido de carregar sem fio. Alinhamento magnético perfeito para iPhones.',
    rating: 4.7,
    reviews: [],
    specs: {
      Potência: 'Até 15W',
      Conector: 'USB-C',
      Cabo: '1m',
      Compatibilidade: 'iPhone 12 ou posterior'
    }
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '#ORD-9982',
    date: '2024-05-20',
    total: 1199000,
    status: 'Entregue',
    items: [PRODUCTS[2] as any]
  }
];
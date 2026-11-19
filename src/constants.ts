export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: 'Vegetables' | 'Animals' | 'Eggs' ;
  image: string;
}

export const PRODUCTS: Product[] = [
  
  {
    id: '2',
    name: 'Chicken Fresh Eggs',
    description: 'Gold-yolk eggs from our free-range chickens. Fed with non-GMO grains.',
    price: 400.00,
    unit: 'dozen',
    category: 'Eggs',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Sheep',
    description: 'Pure, raw honey harvested from our local wildflower meadows.',
    price: 1200.00,
    unit: '16oz jar',
    category: 'Animals',
    image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&q=80&w=800',
  },
  
  {
    id: '5',
    name: ' Cabbage',
    description: 'Cabbage (Brassica oleracea) is a leafy green, red, or white vegetable that is commonly used in cooking. It has a dense head of leaves and a slightly peppery flavor. Cabbage is often used in salads, stir-fries, soups, and as a side dish.',
    price: 15.00,
    unit: 'lb',
    category: 'Vegetables',
    image: 'https://hub.suttons.co.uk/wp-content/uploads/2025/01/suttons.cabbage.greyhound.jpg',
  },
 
  {
    id: '7',
    name: 'Goat',
    description: 'Registered Nubian kids, known for high butterfat milk and friendly temperament.',
    price: 950.50,
    unit: '8oz',
    category: 'Animals',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=800',
  },
 
];

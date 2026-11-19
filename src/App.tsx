import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Mail, Leaf, Instagram,  Facebook, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from './constants';
import farmerImage from '../pictures/farmer.jpg';

import { Youtube } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOrderViaEmail = () => {
    const farmEmail = 'ryaamabunda@gmail.com';
    const subject = 'New Farm Product Order';
    const body = `Hello S.R.O.M Farm,\n\nI would like to place an order for the following items:\n\n${cart
      .map(item => `- ${item.name} (${item.quantity} ${item.unit}) - R${(item.price * item.quantity).toFixed(2)}`)
      .join('\n')}\n\nTotal: R${cartTotal.toFixed(2)}\n\nPlease let me know the next steps for payment and pickup/delivery.\n\nBest regards,\n[Your Name],\n[Your Contact Information]`;

    const mailtoUrl = `mailto:${farmEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-farm-cream/80 backdrop-blur-md border-b border-farm-olive/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="text-farm-olive w-8 h-8" />
            <span className="serif text-2xl font-bold text-farm-olive tracking-tight">S.R.O.M</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-farm-olive/70">
            <a href="#products" className="hover:text-farm-olive transition-colors">Shop</a>
            <a href="#about" className="hover:text-farm-olive transition-colors">Our Story</a>
            <a href="#contact" className="hover:text-farm-olive transition-colors">Contact</a>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-farm-olive hover:bg-farm-olive/5 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-farm-olive text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
              alt="Farm landscape" 
              className="w-full h-full object-cover brightness-75"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="serif text-6xl md:text-8xl text-white mb-6 leading-tight"
            >
              Fresh from our fields <br />
              <span className="italic">to your table.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light"
            >
              Experience the true taste of seasonal, organic produce grown with love and respect for the land.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href="#products" className="bg-white text-farm-olive px-10 py-4 rounded-full font-semibold text-lg hover:bg-farm-cream transition-all inline-flex items-center gap-2">
                Browse S.R.O.M <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="serif text-5xl text-farm-olive mb-4">S.R.O.M</h2>
              <p className="text-farm-olive/60 max-w-md">Our selection changes with the seasons. Everything is harvested at peak ripeness for maximum flavor.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                    ? 'bg-farm-olive text-white' 
                    : 'bg-white text-farm-olive border border-farm-olive/10 hover:border-farm-olive/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card group overflow-hidden"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-farm-olive text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="serif text-2xl text-farm-olive mb-1">{product.name}</h3>
                    <p className="text-farm-olive/50 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-farm-olive">
                        R{product.price.toFixed(2)} <span className="text-xs font-normal text-farm-olive/40">/ {product.unit}</span>
                      </span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 rounded-full bg-farm-cream text-farm-olive flex items-center justify-center hover:bg-farm-olive hover:text-white transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-farm-olive text-white py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={farmerImage}
                alt="Farmer working" 
                className="rounded-[40px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-farm-sage rounded-full flex items-center justify-center p-8 text-center rotate-12">
                <span className="serif text-farm-olive text-xl font-bold leading-tight">Grown with Love Since 2025</span>
              </div>
            </div>
            <div>
              <h2 className="serif text-5xl mb-8">Rooted in Tradition, Growing for the Future</h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                S.R.O.M FARM started as a small family garden and has grown into a community hub for organic farming. We believe that healthy soil leads to healthy plants,healthy animals, and healthy plants and animals lead to healthy people.
              </p>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Our sustainable practices ensure that we give back to the earth as much as we take. Every product you buy supports local biodiversity and traditional farming methods.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl serif mb-2">100%</div>
                  <div className="text-sm uppercase tracking-widest text-white/50">Organic Certified</div>
                </div>
                <div>
                  <div className="text-4xl serif mb-2">Local</div>
                  <div className="text-sm uppercase tracking-widest text-white/50">Community Focused</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-farm-cream border-t border-farm-olive/10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-farm-olive w-8 h-8" />
              <span className="serif text-3xl font-bold text-farm-olive tracking-tight">S.R.O.M</span>
            </div>
            <p className="text-farm-olive/60 max-w-sm mb-8">
              Join our newsletter for seasonal updates, recipes, and farm events.
            </p>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/channel/UCglgMLITIlCpz6pQ8q0gAZg" className="w-10 h-10 rounded-full border border-farm-olive/20 flex items-center justify-center text-farm-olive hover:bg-farm-olive hover:text-white transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/sromfarm" className="w-10 h-10 rounded-full border border-farm-olive/20 flex items-center justify-center text-farm-olive hover:bg-farm-olive hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-farm-olive mb-6 uppercase tracking-widest text-xs">Visit Us</h4>
            <address className="not-italic text-farm-olive/60 text-sm leading-loose">
              Giyani, Nkomo22B<br />
               Limpopo<br />
              Open Mon-Sun: 8am - 6pm
            </address>
          </div>

          <div>
            <h4 className="font-bold text-farm-olive mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <p className="text-farm-olive/60 text-sm leading-loose">
              S.R.O.M_farm@gmail.com<br />
              (+27) 71 413 1300
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-farm-olive/5 text-center text-farm-olive/30 text-xs">
          &copy; {new Date().getFullYear()} S.R.O.M FARM. All rights reserved.
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-farm-olive/10 flex justify-between items-center">
                <h2 className="serif text-3xl text-farm-olive">Your Basket</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-farm-cream rounded-full transition-colors">
                  <X className="w-6 h-6 text-farm-olive" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-farm-cream rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-10 h-10 text-farm-olive/20" />
                    </div>
                    <p className="text-farm-olive/40 serif text-xl">Your basket is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-farm-olive font-medium underline underline-offset-4"
                    >
                      Start Order
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" referrerPolicy="no-referrer" />
                        <div className="flex-grow">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium text-farm-olive">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-farm-olive/30 hover:text-red-500">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-farm-olive/50 mb-3">R{item.price.toFixed(2)} / {item.unit}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-farm-olive/10 rounded-full px-2 py-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-farm-olive text-farm-olive/40">
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-farm-olive">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-farm-olive text-farm-olive/40">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-farm-olive ml-auto">
                              R{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-farm-cream border-t border-farm-olive/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-farm-olive/60 font-medium">Subtotal</span>
                    <span className="text-2xl serif text-farm-olive font-bold">R{cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleOrderViaEmail}
                    className="w-full olive-button flex items-center justify-center gap-3 py-4"
                  >
                    <Mail className="w-5 h-5" />
                    Order via Email
                  </button>
                  <p className="text-[10px] text-center text-farm-olive/40 mt-4 uppercase tracking-widest">
                    We'll confirm your order and pickup details via email
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

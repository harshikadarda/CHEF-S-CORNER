import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Flame, 
  Coffee, 
  Leaf, 
  Timer, 
  IceCream, 
  Star, 
  Clock, 
  Users, 
  Heart, 
  Home, 
  Compass, 
  Plus, 
  User, 
  ChevronLeft, 
  Share2, 
  Bookmark,
  Camera,
  PlusCircle,
  Save,
  X,
  Check,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Recipe, View } from './types';
import { TRENDY_RECIPES, RECENT_RECIPES, CATEGORIES } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(['4']); // Default saved item
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>([]);

  const allRecipes = [...TRENDY_RECIPES, ...RECENT_RECIPES, ...customRecipes];

  const navigateToDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('detail');
  };

  const toggleSave = (id: string) => {
    setSavedRecipeIds(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const handleUpload = (newRecipe: Recipe) => {
    setCustomRecipes(prev => [newRecipe, ...prev]);
    setCurrentView('home');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <HomeView 
              onRecipeClick={navigateToDetail} 
              savedRecipeIds={savedRecipeIds}
              toggleSave={toggleSave}
              customRecipes={customRecipes}
            />
          </motion.div>
        )}
        {currentView === 'detail' && selectedRecipe && (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <RecipeDetailView 
              recipe={selectedRecipe} 
              onBack={() => setCurrentView('home')} 
              isSaved={savedRecipeIds.includes(selectedRecipe.id)}
              onToggleSave={() => toggleSave(selectedRecipe.id)}
            />
          </motion.div>
        )}
        {currentView === 'upload' && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <UploadView onBack={() => setCurrentView('home')} onUpload={handleUpload} />
          </motion.div>
        )}
        {currentView === 'saved' && (
          <motion.div 
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <SavedView 
              savedRecipes={allRecipes.filter(r => savedRecipeIds.includes(r.id))}
              onRecipeClick={navigateToDetail}
              onBack={() => setCurrentView('home')}
            />
          </motion.div>
        )}
        {['discover', 'profile'].includes(currentView) && (
          <motion.div 
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              {currentView === 'discover' && <Compass size={40} />}
              {currentView === 'profile' && <User size={40} />}
            </div>
            <h2 className="text-2xl font-bold capitalize mb-2">{currentView}</h2>
            <p className="text-slate-500">This section is coming soon! Explore our trendy recipes in the meantime.</p>
            <button 
              onClick={() => setCurrentView('home')}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-semibold"
            >
              Back to Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-primary/10 px-6 pb-6 pt-3 z-50">
        <div className="flex justify-between items-center">
          <NavButton 
            active={currentView === 'home'} 
            onClick={() => setCurrentView('home')} 
            icon={<Home size={24} />} 
            label="Home" 
          />
          <NavButton 
            active={currentView === 'discover'} 
            onClick={() => setCurrentView('discover')} 
            icon={<Compass size={24} />} 
            label="Discover" 
          />
          <button 
            onClick={() => setCurrentView('upload')}
            className="flex items-center justify-center -mt-12 size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 transform active:scale-90 transition-transform"
          >
            <Plus size={32} />
          </button>
          <NavButton 
            active={currentView === 'saved'} 
            onClick={() => setCurrentView('saved')} 
            icon={<Heart size={24} />} 
            label="Saved" 
          />
          <NavButton 
            active={currentView === 'profile'} 
            onClick={() => setCurrentView('profile')} 
            icon={<User size={24} />} 
            label="Profile" 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-slate-400 dark:text-primary/40'}`}
    >
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function HomeView({ 
  onRecipeClick, 
  savedRecipeIds, 
  toggleSave, 
  customRecipes 
}: { 
  onRecipeClick: (r: Recipe) => void, 
  savedRecipeIds: string[], 
  toggleSave: (id: string) => void,
  customRecipes: Recipe[]
}) {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const allRecipes = [...TRENDY_RECIPES, ...RECENT_RECIPES, ...customRecipes];

  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         recipe.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'popular') return matchesSearch;
    
    const matchesCategory = recipe.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const trendyDisplay = TRENDY_RECIPES.filter(r => 
    filteredRecipes.some(fr => fr.id === r.id)
  );

  const recentDisplay = [...RECENT_RECIPES, ...customRecipes].filter(r => 
    filteredRecipes.some(fr => fr.id === r.id)
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto hide-scrollbar">
      {/* Header */}
      <header className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <PlusCircle size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight tracking-tight">Chef's Corner</h1>
              <p className="text-xs text-primary/70 font-medium">Elevate your kitchen</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Bell size={20} />
            </button>
            <div className="size-10 rounded-full border-2 border-primary overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200" 
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary/60">
            <Search size={20} />
          </div>
          <input 
            className="block w-full pl-11 pr-4 py-3 bg-primary/10 border-none rounded-xl text-slate-900 dark:text-slate-100 placeholder-primary/40 focus:ring-2 focus:ring-primary transition-all outline-none" 
            placeholder="Search recipes, ingredients, or chefs" 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Categories with Scroll Arrows */}
      <div className="relative group px-4 py-4">
        <div className="flex items-center">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-1 z-10 size-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth"
          >
            {CATEGORIES.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 transition-all cursor-pointer ${activeCategory === cat.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-primary/10 text-slate-700 dark:text-slate-200'}`}
              >
                {cat.icon === 'Flame' && <Flame size={16} />}
                {cat.icon === 'Coffee' && <Coffee size={16} />}
                {cat.icon === 'Leaf' && <Leaf size={16} />}
                {cat.icon === 'Timer' && <Timer size={16} />}
                {cat.icon === 'IceCream' && <IceCream size={16} />}
                <p className="text-sm font-semibold">{cat.name}</p>
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-1 z-10 size-8 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} className="rotate-180" />
          </button>
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
          <Search size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No recipes found matching your search or category.</p>
          <button 
            onClick={() => {setSearchQuery(''); setActiveCategory('popular');}}
            className="mt-4 text-primary font-bold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* Trendy Recipes */}
          {trendyDisplay.length > 0 && (
            <section className="mt-4">
              <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-[22px] font-bold tracking-tight">Most Trendy Recipes</h2>
                <button className="text-primary text-sm font-semibold">See all</button>
              </div>
              <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar">
                {trendyDisplay.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => onRecipeClick(recipe)}
                    className="min-w-[280px] w-72 bg-white dark:bg-primary/5 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-primary/10 cursor-pointer active:scale-95 transition-transform"
                  >
                    <div className="relative h-48 w-full">
                      <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} referrerPolicy="no-referrer" />
                      <div className="absolute top-3 right-3 bg-background-dark/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star size={12} className="text-primary fill-primary" />
                        <span className="text-xs font-bold text-white">{recipe.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg leading-tight mb-2">{recipe.title}</h3>
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Recipes */}
          {recentDisplay.length > 0 && (
            <section className="mt-8 px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] font-bold tracking-tight">Recent Recipes</h2>
                <button className="text-primary text-sm font-semibold">See all</button>
              </div>
              <div className="flex flex-col gap-4">
                {recentDisplay.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => onRecipeClick(recipe)}
                    className="flex gap-4 bg-white dark:bg-primary/5 p-3 rounded-2xl border border-slate-100 dark:border-primary/10 cursor-pointer active:scale-98 transition-transform"
                  >
                    <div className="size-24 rounded-xl overflow-hidden shrink-0">
                      <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{recipe.category}</span>
                        <Heart size={18} className={recipe.id === '4' ? 'text-primary fill-primary' : 'text-slate-400'} />
                      </div>
                      <h3 className="font-bold leading-snug mb-1">{recipe.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{recipe.difficulty}</span>
                        <span className="size-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                        <span>{recipe.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* If we have filtered results but they don't fit into Trendy/Recent displays perfectly */}
          {trendyDisplay.length === 0 && recentDisplay.length === 0 && filteredRecipes.length > 0 && (
             <section className="mt-8 px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] font-bold tracking-tight">Search Results</h2>
              </div>
              <div className="flex flex-col gap-4">
                {filteredRecipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => onRecipeClick(recipe)}
                    className="flex gap-4 bg-white dark:bg-primary/5 p-3 rounded-2xl border border-slate-100 dark:border-primary/10 cursor-pointer active:scale-98 transition-transform"
                  >
                    <div className="size-24 rounded-xl overflow-hidden shrink-0">
                      <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{recipe.category}</span>
                        <Heart size={18} className={recipe.id === '4' ? 'text-primary fill-primary' : 'text-slate-400'} />
                      </div>
                      <h3 className="font-bold leading-snug mb-1">{recipe.title}</h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{recipe.difficulty}</span>
                        <span className="size-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                        <span>{recipe.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function RecipeDetailView({ 
  recipe, 
  onBack,
  isSaved,
  onToggleSave
}: { 
  recipe: Recipe, 
  onBack: () => void,
  isSaved: boolean,
  onToggleSave: () => void
}) {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `Check out this recipe: ${recipe.title}`,
      text: `I found this amazing recipe for ${recipe.title} on Chef's Corner!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (err) {
      // User might have cancelled share, which is fine
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto hide-scrollbar relative">
      {/* Toast Feedback */}
      <AnimatePresence>
        {showCopied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl text-sm font-medium"
          >
            <Check size={16} className="text-emerald-400" />
            Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Chef's Corner</h2>
        <button 
          onClick={handleShare}
          className="flex items-center justify-center rounded-full size-10 bg-primary/10 text-primary active:scale-90 transition-transform"
        >
          <Share2 size={20} />
        </button>
      </div>

      {/* Hero */}
      <div className="relative w-full aspect-[4/3] px-4 py-3">
        <div className="w-full h-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl shadow-lg relative">
          <img src={recipe.image} className="absolute inset-0 w-full h-full object-cover" alt={recipe.title} referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
          <div className="relative p-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-sm font-bold mb-2">
              <Clock size={14} />
              {recipe.time}
            </span>
          </div>
        </div>
      </div>

      {/* Title & Actions */}
      <div className="px-4 pt-6 pb-2 flex justify-between items-start">
        <div className="flex-1">
          <h1 className="tracking-tight text-3xl font-bold leading-tight">{recipe.title}</h1>
          <p className="text-primary font-medium mt-1">By {recipe.author}</p>
        </div>
        <button 
          onClick={onToggleSave}
          className={`flex items-center justify-center rounded-full size-12 shadow-lg shadow-primary/20 transition-colors ${isSaved ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}
        >
          <Bookmark size={24} className={isSaved ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="flex flex-wrap gap-3 p-4">
        <StatCard label="Difficulty" value={recipe.difficulty} />
        <StatCard label="Calories" value={recipe.calories || 'N/A'} />
        <StatCard label="Servings" value={recipe.servings} />
      </div>

      {/* Ingredients */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Ingredients</h3>
          <span className="text-sm font-medium text-primary">{recipe.ingredients.length} items</span>
        </div>
        <div className="space-y-3">
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/5">
              <span className="text-slate-700 dark:text-slate-300">{ing.name}</span>
              <span className="font-bold">{ing.amount}</span>
            </div>
          ))}
          {recipe.ingredients.length === 0 && (
            <p className="text-slate-400 text-sm italic">Ingredients list coming soon...</p>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-6">
        <h3 className="text-xl font-bold mb-6">Instructions</h3>
        <div className="space-y-8 relative">
          {recipe.instructions.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0 z-10">
                  {step.step}
                </div>
                {i < recipe.instructions.length - 1 && (
                  <div className="w-0.5 h-full bg-primary/20 -mt-1"></div>
                )}
              </div>
              <div className={i < recipe.instructions.length - 1 ? 'pb-6' : ''}>
                <h4 className="font-bold mb-1">{step.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
          {recipe.instructions.length === 0 && (
            <p className="text-slate-400 text-sm italic">Instructions coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl p-4 bg-primary/5 border border-primary/10">
      <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

function UploadView({ onBack, onUpload }: { onBack: () => void, onUpload: (r: Recipe) => void }) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Pro'>('Easy');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title) return;
    
    const newRecipe: Recipe = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      author: 'You',
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      time: time || '30 min',
      servings: servings || '2 people',
      difficulty,
      category: 'Recent',
      ingredients: [],
      instructions: [
        { step: 1, title: 'Getting Started', description: description || 'Start by preparing your ingredients.' }
      ]
    };
    
    onUpload(newRecipe);
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto hide-scrollbar">
      <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center">
          <X size={24} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Upload New Recipe</h2>
        <button className="text-primary text-sm font-bold leading-normal tracking-[0.015em] shrink-0">Drafts</button>
      </header>

      <main className="px-4 pt-4">
        <h3 className="text-lg font-bold mb-4">Dish Photo</h3>
        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer overflow-hidden">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Camera size={48} className="text-primary mb-3" />
            <p className="mb-2 text-sm font-semibold">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
          </div>
        </div>

        <div className="pt-8 space-y-6">
          <h3 className="text-lg font-bold">Recipe Details</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium px-1">Recipe Title</p>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl focus:ring-2 focus:ring-primary/50 border border-primary/20 bg-primary/5 h-14 placeholder:text-slate-400 p-4 outline-none" 
                placeholder="e.g. Grandma's Famous Lasagna" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium px-1">Cooking Time</p>
                <div className="relative">
                  <Clock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
                  <input 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-primary/20 bg-primary/5 h-14 pl-10 pr-4 outline-none" 
                    placeholder="45 mins" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-slate-300 text-sm font-medium px-1">Servings</p>
                <div className="relative">
                  <Users size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/60" />
                  <input 
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full rounded-xl border border-primary/20 bg-primary/5 h-14 pl-10 pr-4 outline-none" 
                    placeholder="4 people" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium px-1">Difficulty</p>
              <div className="flex gap-2">
                {(['Easy', 'Medium', 'Hard', 'Pro'] as const).map((d) => (
                  <button 
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 rounded-lg border font-semibold text-sm transition-colors ${difficulty === d ? 'border-primary/20 bg-primary/20 text-primary' : 'border-primary/10 bg-primary/5 text-slate-500'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium px-1">Description & Extra Info</p>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-primary/20 bg-primary/5 min-h-[120px] p-4 outline-none" 
                placeholder="Tell us about your dish, special techniques, or the story behind it..."
              />
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Ingredients</h3>
              <button className="text-primary flex items-center gap-1 font-semibold text-sm">
                <PlusCircle size={18} />
                Add Item
              </button>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-sm text-slate-400">
              Add first ingredient...
            </div>
          </div>
        </div>

        <div className="py-8">
          <button 
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <Save size={20} />
            Save to My Recipes
          </button>
        </div>
      </main>
    </div>
  );
}

function SavedView({ 
  savedRecipes, 
  onRecipeClick,
  onBack 
}: { 
  savedRecipes: Recipe[], 
  onRecipeClick: (r: Recipe) => void,
  onBack: () => void
}) {
  return (
    <div className="flex-1 pb-32 overflow-y-auto hide-scrollbar">
      <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between">
        <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Saved Recipes</h2>
        <div className="size-10"></div>
      </header>

      <div className="px-4 pt-4">
        {savedRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={64} className="text-slate-200 mb-4" />
            <p className="text-slate-500 font-medium">You haven't saved any recipes yet.</p>
            <button 
              onClick={onBack}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-semibold"
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {savedRecipes.map(recipe => (
              <div 
                key={recipe.id}
                onClick={() => onRecipeClick(recipe)}
                className="flex gap-4 bg-white dark:bg-primary/5 p-3 rounded-2xl border border-slate-100 dark:border-primary/10 cursor-pointer active:scale-98 transition-transform"
              >
                <div className="size-24 rounded-xl overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src={recipe.image} alt={recipe.title} referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{recipe.category}</span>
                    <Heart size={18} className="text-primary fill-primary" />
                  </div>
                  <h3 className="font-bold leading-snug mb-1">{recipe.title}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{recipe.difficulty}</span>
                    <span className="size-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                    <span>{recipe.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Search, Plus, Filter, SlidersHorizontal, ShoppingCart, Minus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";

// Dummy data for products
const products = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur, ayam, dan sayuran segar",
    price: 35000,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "Terlaris",
    category: "Makanan Utama",
    restaurant: "Warung Pak Jono"
  },
  {
    id: 2,
    name: "Ayam Bakar Madu",
    description: "Ayam bakar dengan saus madu spesial dan lalapan",
    price: 45000,
    rating: 4.7,
    reviewCount: 98,
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "Favorit",
    category: "Makanan Utama",
    restaurant: "Rumah Makan Sederhana"
  },
  {
    id: 3,
    name: "Sate Ayam",
    description: "Sate ayam dengan bumbu kacang khas Indonesia",
    price: 30000,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "Rekomendasi",
    category: "Makanan Ringan",
    restaurant: "Sate Madura Pak Slamet"
  },
  {
    id: 4,
    name: "Es Teh Manis",
    description: "Teh manis dingin dengan es batu yang menyegarkan",
    price: 10000,
    rating: 4.6,
    reviewCount: 87,
    image: "https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "Minuman",
    category: "Minuman",
    restaurant: "Kedai Minuman Segar"
  },
  {
    id: 5,
    name: "Mie Goreng Jawa",
    description: "Mie goreng dengan bumbu khas Jawa yang lezat",
    price: 28000,
    rating: 4.5,
    reviewCount: 112,
    image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Makanan Utama",
    restaurant: "Warung Mie Enak"
  },
  {
    id: 6,
    name: "Bakso Sapi Spesial",
    description: "Bakso daging sapi pilihan dengan kuah gurih",
    price: 32000,
    rating: 4.7,
    reviewCount: 134,
    image: "https://images.pexels.com/photos/4147875/pexels-photo-4147875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "Populer",
    category: "Makanan Utama",
    restaurant: "Bakso Pak Didi"
  },
  {
    id: 7,
    name: "Jus Alpukat",
    description: "Jus alpukat segar dengan susu kental manis",
    price: 15000,
    rating: 4.8,
    reviewCount: 78,
    image: "https://images.pexels.com/photos/775031/pexels-photo-775031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Minuman",
    restaurant: "Kedai Minuman Segar"
  },
  {
    id: 8,
    name: "Martabak Manis",
    description: "Martabak manis dengan berbagai topping pilihan",
    price: 50000,
    rating: 4.9,
    reviewCount: 189,
    image: "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "Best Seller",
    category: "Makanan Penutup",
    restaurant: "Martabak Nikmat"
  },
];

const categories = [
  { id: "makanan-utama", name: "Makanan Utama" },
  { id: "makanan-ringan", name: "Makanan Ringan" },
  { id: "minuman", name: "Minuman" },
  { id: "makanan-penutup", name: "Makanan Penutup" },
];

const restaurants = [
  { id: "warung-pak-jono", name: "Warung Pak Jono" },
  { id: "rumah-makan-sederhana", name: "Rumah Makan Sederhana" },
  { id: "sate-madura-pak-slamet", name: "Sate Madura Pak Slamet" },
  { id: "kedai-minuman-segar", name: "Kedai Minuman Segar" },
  { id: "warung-mie-enak", name: "Warung Mie Enak" },
  { id: "bakso-pak-didi", name: "Bakso Pak Didi" },
  { id: "martabak-nikmat", name: "Martabak Nikmat" },
];

// Cart type definitions
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductCatalog() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const kategori = searchParams.get("kategori");
    if (kategori) {
      setSelectedCategory(kategori);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }
    
    // Apply restaurant filter
    if (selectedRestaurants.length > 0) {
      result = result.filter((product) => 
        selectedRestaurants.includes(product.restaurant)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        result = result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, selectedRestaurants, sortBy]);

  // Cart functions
  const addToCart = (product: typeof products[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    toast.success("Produk ditambahkan ke keranjang");
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.success("Produk dihapus dari keranjang");
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    const message = `Halo, saya ingin memesan:%0A%0A${cart
      .map(item => `${item.name} (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}`)
      .join('%0A')}%0A%0ATotal: ${formatPrice(getTotalPrice())}%0A%0ATerima kasih!`;
    
    window.open(`https://wa.me/6289519128492?text=${message}`, '_blank');
  };

  const toggleRestaurant = (restaurantName: string) => {
    setSelectedRestaurants((prev) => {
      if (prev.includes(restaurantName)) {
        return prev.filter((r) => r !== restaurantName);
      } else {
        return [...prev, restaurantName];
      }
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedRestaurants([]);
    setSortBy("popularity");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-8">
          <div>
            <h3 className="font-medium mb-4">Kategori</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Button
                    variant={selectedCategory === category.name ? "default" : "ghost"}
                    className="justify-start px-3 py-1.5 h-auto text-sm w-full"
                    onClick={() => setSelectedCategory(
                      selectedCategory === category.name ? "" : category.name
                    )}
                  >
                    {category.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Restoran</h3>
            <div className="space-y-2">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={restaurant.id}
                    checked={selectedRestaurants.includes(restaurant.name)}
                    onCheckedChange={() => toggleRestaurant(restaurant.name)}
                  />
                  <label
                    htmlFor={restaurant.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {restaurant.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <Button variant="outline" className="w-full" onClick={resetFilters}>
            Reset Filter
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Keranjang
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Keranjang Belanja</SheetTitle>
                    <SheetDescription>
                      {cart.length === 0 ? "Keranjang belanja Anda kosong" : `${cart.length} item dalam keranjang`}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-8 space-y-6">
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between gap-4 pb-4 border-b"
                        >
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {cart.length > 0 && (
                      <div className="space-y-4">
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>{formatPrice(getTotalPrice())}</span>
                        </div>
                        <Button
                          className="w-full"
                          size="lg"
                          onClick={handleCheckout}
                        >
                          Pesan via WhatsApp
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                    <SheetDescription>
                      Pilih filter untuk menemukan menu yang sesuai.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-8">
                    <div>
                      <h3 className="font-medium mb-4">Kategori</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <Button
                              variant={selectedCategory === category.name ? "default" : "ghost"}
                              className="justify-start px-3 py-1.5 h-auto text-sm w-full"
                              onClick={() => setSelectedCategory(
                                selectedCategory === category.name ? "" : category.name
                              )}
                            >
                              {category.name}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Restoran</h3>
                      <div className="space-y-2">
                        {restaurants.map((restaurant) => (
                          <div key={restaurant.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-${restaurant.id}`}
                              checked={selectedRestaurants.includes(restaurant.name)}
                              onCheckedChange={() => toggleRestaurant(restaurant.name)}
                            />
                            <label
                              htmlFor={`mobile-${restaurant.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {restaurant.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <Button variant="outline" className="w-full" onClick={resetFilters}>
                      Reset Filter
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularitas</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                    <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Menampilkan {filteredProducts.length} hasil
              {selectedCategory && ` untuk kategori "${selectedCategory}"`}
              {searchQuery && ` dengan kata kunci "${searchQuery}"`}
            </p>
            
            {(selectedCategory || searchQuery || selectedRestaurants.length > 0) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Hapus Filter
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="border border-border rounded-lg overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-muted rounded animate-pulse w-1/4"></div>
                      <div className="h-6 bg-muted rounded animate-pulse w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Tidak ada hasil yang ditemukan</h3>
                  <p className="text-muted-foreground mb-6">
                    Tidak ada menu yang sesuai dengan filter yang dipilih.
                  </p>
                  <Button onClick={resetFilters}>Reset Filter</Button>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product) => (
                    <motion.div key={product.id} variants={cardVariants}>
                      <Card className="h-full overflow-hidden border-border/50 group hover:border-primary/50 transition-colors">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {product.badge && (
                            <Badge className="absolute top-3 right-3 bg-primary">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-muted-foreground">
                              {product.category}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span className="text-xs font-medium">{product.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {product.restaurant}
                          </p>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <span className="font-bold">{formatPrice(product.price)}</span>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => addToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Tambah
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
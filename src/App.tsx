import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useParallax } from "./hooks/useParallax";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Players from "./components/Players";
import News from "./components/News";
import Gallery from "./components/Gallery";
import Store from "./components/Store";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Cart from "./components/Cart";
import SuccessPage from "./components/SuccessPage";
import FloatingElements from "./components/FloatingElements";
import SignIn from "./components/SignIn";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import AdminPage from "./components/AdminPage";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize parallax engine
  const { addParallaxElement } = useParallax();

  useEffect(() => {
    // Add parallax elements after component mount
    addParallaxElement(".hero-background", {
      properties: { translateY: { scalar: 0.2 } },
      triggerOffset: 0,
      duration: "smooth",
    });

    addParallaxElement(".floating-elements", {
      properties: {
        translateY: { scalar: 0.3 },
        rotate: { scalar: 0.05 },
      },
      triggerOffset: 100,
      duration: "smooth",
    });

    addParallaxElement(".section-background", {
      properties: {
        translateY: { scalar: 0.15 },
        opacity: { from: 0.8, to: 1 },
      },
      triggerOffset: 200,
      duration: "smooth",
    });
  }, [addParallaxElement]);

  // Check if we're on the success page
  const isSuccessPage =
    window.location.pathname === "/success" ||
    window.location.search.includes("session_id");

  if (isSuccessPage) {
    return (
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-cream-light  transition-colors duration-300">
              <SuccessPage />
              <Toaster position="top-right" />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col overflow-x-clip w-full  transition-colors duration-300">
              <div className="floating-elements parallax-element fixed inset-0 pointer-events-none z-10">
                <FloatingElements />
              </div>
              <Navigation
                onCartOpen={() => setIsCartOpen(true)}
                onAuthOpen={() => setIsAuthModalOpen(true)}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    
                      <main className="relative flex-1 flex flex-col overflow-x-clip">
                        <div className="hero-background parallax-element">
                          <Hero />
                        </div>
                        <div className="section-background parallax-element">
                          <About />
                        </div>
                        <div className="section-background parallax-element">
                          <Players />
                        </div>
                        <div className="section-background parallax-element">
                          <News />
                        </div>
                        <div className="section-background parallax-element">
                          <Gallery />
                        </div>
                        <div className="section-background parallax-element">
                          <Store />
                        </div>
                        <div className="section-background parallax-element">
                          <Contact />
                        </div>
                      </main>
                    
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <div className="section-background parallax-element">
                      <SignIn />
                    </div>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <div className="section-background parallax-element">
                      <ProductPage />
                    </div>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <div className="section-background parallax-element">
                      <CartPage />
                    </div>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <div className="section-background parallax-element">
                      <AdminPage />
                    </div>
                  }
                />
              </Routes>
              <div className="section-background parallax-element">
                <Footer />
              </div>
              <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
              />
              <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onAuthRequired={() => {
                  setIsCartOpen(false);
                  setIsAuthModalOpen(true);
                }}
              />
              <Toaster position="top-right" />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
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
import CheckoutPage from "./components/CheckoutPage";
import GetStarted from "./components/GetStarted";
import ScrollHandler from "./components/ScrollHandler";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
            <ScrollHandler />
            <div className="min-h-screen flex flex-col overflow-x-clip w-full  transition-colors duration-300">
              <div className="floating-elements fixed inset-0 pointer-events-none z-10">
                <FloatingElements />
              </div>
              <Navigation
                onCartOpen={() => setIsCartOpen(true)}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <main className="relative flex-1 flex flex-col overflow-x-clip">
                      <div className="hero-background">
                        <Hero />
                      </div>
                      <div className="section-background">
                        <About />
                      </div>
                      <div className="section-background">
                        <Players />
                      </div>
                      <div className="section-background">
                        <News />
                      </div>
                      <div className="section-background">
                        <Gallery />
                      </div>
                      <div className="section-background">
                        <Store />
                      </div>
                      <div className="section-background">
                        <Contact />
                      </div>
                    </main>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <div className="section-background">
                      <SignIn />
                    </div>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <div className="section-background">
                      <ProductPage />
                    </div>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <div className="section-background">
                      <CartPage />
                    </div>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <div className="section-background">
                      <AdminPage />
                    </div>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <div className="section-background">
                      <CheckoutPage />
                    </div>
                  }
                />
                <Route
                  path="/get-started"
                  element={
                    <div className="section-background">
                      <GetStarted />
                    </div>
                  }
                />
              </Routes>
              <div className="section-background">
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

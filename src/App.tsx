import React, { useLayoutEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
// import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Players from "./components/Players";
import News from "./components/News";
import Gallery from "./components/Gallery";
import ClubProgramsSection from "./components/ClubProgramsSection";
import Store from "./components/Store";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Cart from "./components/Cart";
import SuccessPage from "./components/SuccessPage";
import FloatingElements from "./components/FloatingElements";
import SignIn from "./routes/SignIn";
import Product from "./routes/Product";
import Admin from "./routes/Admin";
import CheckoutPage from "./components/CheckoutPage";
import GetStarted from "./components/GetStarted";
import ScrollHandler from "./components/ScrollHandler";
import AllNews from "./routes/AllNews";
import NewsArticle from "./routes/NewsArticle";
import People from "./components/People";
import AllMatchesPage from "./routes/AllMatchesPage";
import { useLocation } from "react-router-dom";
import NewHome from "./routes/NewHome";
import Navbar from "./components/layout/Navbar";
import Navigation from "./components/Navigation";
import Shop from "./routes/Shop";
import AdminPage from "./components/AdminPage";

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
            <div className="min-h-screen flex flex-col  w-full  transition-colors duration-300">
              <div className="floating-elements fixed inset-0 pointer-events-none z-10">
                {/* <FloatingElements /> */}
              </div>
              <Navbar></Navbar>
              <Routes>
                
                <Route path="/shop" element={<Shop />} />
                <Route path="oldadmin" element={<AdminPage></AdminPage>} ></Route>
                <Route path="/home" element={<NewHome />} />
                <Route path="/" element={<NewHome />} />
                
                <Route path="/signin" element={<SignIn />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/admin" element={<Admin />} />
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
                {/* News routes */}
                <Route path="/news" element={<AllNews />} />
                <Route path="/news/:id" element={<NewsArticle />} />
                <Route path="/people" element={<People />} />
                <Route
                  path="/success"
                  element={<SuccessPage />}
                />
                <Route
                  path="/all-matches"
                  element={<AllMatchesPage />}
                />
              </Routes>
              {/* <div className="section-background">
                <Footer />
              </div> */}
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

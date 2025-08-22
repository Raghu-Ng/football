import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
// import Navigation from "./components/Navigation";
import AdminPage from "./components/AdminPage";
import AuthModal from "./components/AuthModal";
import Cart from "./routes/Cart";
import CheckoutPage from "./components/CheckoutPage";
import GetStarted from "./components/GetStarted";
import Navbar from "./components/layout/Navbar";
import People from "./components/People";
import ScrollHandler from "./components/ScrollHandler";
import SuccessPage from "./components/SuccessPage";
import Admin from "./routes/Admin";
import AllMatchesPage from "./routes/AllMatchesPage";
import AllNews from "./routes/AllNews";
import NewHome from "./routes/NewHome";
import NewsArticle from "./routes/NewsArticle";
import Product from "./routes/Product";
import Shop from "./routes/Shop";
import SignIn from "./routes/SignIn";
import Videos from "./routes/Videos";
import About from "./routes/Home/About";

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
                <Route path="about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="oldadmin" element={<AdminPage></AdminPage>} ></Route>
                <Route path="/home" element={<NewHome />} />
                <Route path="/" element={<NewHome />} />
                <Route  path="/videos" element={<Videos />}/>
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
              
              <Toaster position="top-right" />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

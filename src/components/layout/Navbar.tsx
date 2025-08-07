import React, { ReactNode, useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import { LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const NavLink = ({ children, onClick }: { children: ReactNode, onClick?: () => void }) => {
  return (
    <button className="h-full flex items-center justify-center px-4 relative group" onClick={onClick}>
      {children}
      <div className="absolute group-hover:h-[10px] h-0 transition-all duration-100 ease-in-out w-full bg-primary bottom-0 group-hover:opacity-100 opacity-0" ></div>
    </button>
  );
};

const NavButton = ({ children, onClick }: { children: ReactNode, onClick?: () => void }) => {
  return (
    <div className="group relative cursor-pointer" onClick={onClick}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[200%] group-hover:-translate-x-[150%] group-hover:opacity-100 opacity-0 transition-all h-1 w-6 bg-orange-400"></div>
      {children}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    getUser();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => getUser());
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  // Helper for menu modal navigation
  const handleMenuNav = (route: string) => {
    setOpen(false);
    navigate(route);
  };

  const scrollToHash = (hash: string) => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ scale: 0.98, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "tween", duration: 0.1, ease: "linear" }}
              className="bg-primary fixed size-full z-[1000] flex items-center justify-center"
            >
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center absolute top-0 right-0 size-[90px] bg-blue-700"
              >
                <X color="white"></X>
              </button>

              <div className="w-[80vw] h-fit text-white text-5xl tracking-tighter flex flex-col gap-6">
                <NavButton onClick={() => handleMenuNav('/newhome')}><button>Home</button></NavButton>
                <NavButton onClick={() => {
                  if (window.location.pathname === '/newhome' && '#about') {
                    setOpen(false);
                    navigate('/newhome#about');
                    setTimeout(() => scrollToHash('#about'), 10);
                  } else {
                    setOpen(false);
                    navigate('/newhome#about');
                  }
                }}><button>About</button></NavButton>
                <NavButton onClick={() => {
                  if (window.location.pathname === '/newhome' && '#players') {
                    setOpen(false);
                    navigate('/newhome#players');
                    setTimeout(() => scrollToHash('#players'), 10);
                  } else {
                    setOpen(false);
                    navigate('/newhome#players');
                  }
                }}><button>Players</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/news')}><button>News</button></NavButton>
                <NavButton onClick={() => {
                  if (window.location.pathname === '/newhome' && '#gallery') {
                    setOpen(false);
                    navigate('/newhome#gallery');
                    setTimeout(() => scrollToHash('#gallery'), 10);
                  } else {
                    setOpen(false);
                    navigate('/newhome#gallery');
                  }
                }}><button>Gallery</button></NavButton>
                <NavButton onClick={() => {
                  if (window.location.pathname === '/newhome' && '#store') {
                    setOpen(false);
                    navigate('/newhome#store');
                    setTimeout(() => scrollToHash('#store'), 10);
                  } else {
                    setOpen(false);
                    navigate('/newhome#store');
                  }
                }}><button>Store</button></NavButton>
                <NavButton onClick={() => {
                  if (window.location.pathname === '/newhome' && '#contact') {
                    setOpen(false);
                    navigate('/newhome#contact');
                    setTimeout(() => scrollToHash('#contact'), 10);
                  } else {
                    setOpen(false);
                    navigate('/newhome#contact');
                  }
                }}><button>Contact</button></NavButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex w-full h-[120px] top-0 sticky z-50 bg-white items-center">
        <button onClick={() => navigate("/newhome")} className="h-full shrink-0 aspect-square mx-4">
          <img src={Logo} alt="" />
        </button>
        <div className="mx-auto h-full text-2xl tracking-tighter  text-primary font-bold flex">
          <NavLink onClick={() => {
            if (window.location.pathname === '/newhome' && '#wins') {
              navigate('/newhome#wins');
              setTimeout(() => scrollToHash('#wins'), 10);
            } else {
              navigate('/newhome#wins');
            }
          }}><button>WINS</button></NavLink>
          <NavLink onClick={() => {
            if (window.location.pathname === '/newhome' && '#players') {
              navigate('/newhome#players');
              setTimeout(() => scrollToHash('#players'), 10);
            } else {
              navigate('/newhome#players');
            }
          }}><button>PLAYERS</button></NavLink>
          <NavLink onClick={() => {
            if (window.location.pathname === '/newhome' && '#store') {
              navigate('/newhome#store');
              setTimeout(() => scrollToHash('#store'), 10);
            } else {
              navigate('/newhome#store');
            }
          }}><button>SHOP</button></NavLink>
          <NavLink onClick={() => {
            if (window.location.pathname === '/newhome' && '#contact') {
              navigate('/newhome#contact');
              setTimeout(() => scrollToHash('#contact'), 10);
            } else {
              navigate('/newhome#contact');
            }
          }}><button>CONTACT</button></NavLink>
          <NavLink onClick={() => navigate('/news')}><button>LATEST</button></NavLink>
        </div>
        <div className="h-full w-fit flex">
          {user ? (
            <>
              <button
                className="h-full text-2xl font-bold flex gap-2 text-primary border-l-2 border-primary px-12 items-center justify-center bg-white"
              >
                {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
              </button>
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  setUser(null);
                  navigate('/newhome');
                }}
                className="h-full text-2xl font-bold flex gap-2 text-primary border-l-2 border-primary px-12 items-center justify-center bg-white"
              >
                <LogOut />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="h-full text-2xl font-bold flex gap-2 text-primary border-l-2 border-primary px-12 items-center justify-center bg-white"
            >
              SIGN IN
            </button>
          )}
          <button
            onClick={() => setOpen(true)}
            className="h-full shrink-0 aspect-square bg-primary flex items-center justify-center"
          >
            <Menu color="white"></Menu>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { ReactNode, useState, useEffect } from "react";
import Logo from "../../assets/images/logo.png";
import { LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // No need for effect, user is managed by context

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

              <div className="w-[80vw] h-fit text-white text-3xl tracking-tighter flex flex-col gap-6">
                <NavButton onClick={() => handleMenuNav('/newhome')}><button>Home</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/newhome?section=about')}><button>About</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/newhome?section=players')}><button>Players</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/news')}><button>News</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/newhome?section=gallery')}><button>Gallery</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/newhome?section=store')}><button>Store</button></NavButton>
                <NavButton onClick={() => handleMenuNav('/newhome?section=contact')}><button>Contact</button></NavButton>
                {/* Auth buttons for small screens */}
                <div className="flex md:hidden flex-col gap-4 mt-8">
                  {user ? (
                    <>
                      <button
                        className="text-xl font-bold flex gap-2 text-white border-t border-white pt-4 items-center justify-center bg-primary"
                        disabled
                      >
                        {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </button>
                      <button
                        onClick={async () => {
                          await signOut();
                          setOpen(false);
                          navigate('/newhome');
                        }}
                        className="text-xl font-bold flex gap-2 text-white border-t border-white pt-4 items-center justify-center bg-primary"
                      >
                        <LogOut /> Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate('/signin');
                      }}
                      className="text-lg font-bold flex gap-2 text-white border-t border-white pt-4 items-center justify-center bg-primary"
                    >
                      SIGN IN
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex overflow-hidden w-full h-[12vh] top-0  z-50 bg-white items-center">
        <button onClick={() => navigate("/newhome")} className="h-full shrink-0 aspect-square mx-4">
          <img src={Logo} alt="" />
        </button>
        <div className="mx-auto h-full  text-xl tracking-tighter  text-primary font-bold  hidden md:flex">
          <NavLink onClick={() => navigate('/newhome?section=wins')}><button>WINS</button></NavLink>
          <NavLink onClick={() => navigate('/newhome?section=players')}><button>PLAYERS</button></NavLink>
          <NavLink onClick={() => navigate('/shop')}><button>SHOP</button></NavLink>
          <NavLink onClick={() => navigate('/newhome?section=contact')}><button>CONTACT</button></NavLink>
          <NavLink onClick={() => navigate('/news')}><button>LATEST</button></NavLink>
        </div>
        <div className="h-full shrink-0 overflow-hidden w-fit flex ml-auto md:ml-0">
          {/* Auth buttons only on md and up */}
          <div className="hidden md:flex h-full w-fit whitespace-nowrap">
            {user ? (
              <>
                <button
                  className="h-full text-xl font-bold flex gap-2 text-primary border-l-2 border-primary px-12 items-center justify-center bg-white"
                >
                  {user.user_metadata?.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </button>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate('/newhome');
                  }}
                  className="h-full text-xl font-bold flex gap-2 text-primary border-l-2 border-primary px-12 items-center justify-center bg-white"
                >
                  <LogOut />
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/signin')}
                className="h-full text-lg font-bold flex gap-2 text-primary border-l-2 border-primary px-12 items-center justify-center bg-white"
              >
                SIGN IN
              </button>
            )}
          </div>
          {/* Menu button always visible */}
          <button
            onClick={() => setOpen(true)}
            className="h-full aspect-square shrink-0  bg-primary flex items-center justify-center"
          >
            <Menu color="white"></Menu>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

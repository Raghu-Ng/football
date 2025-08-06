import React, { ReactNode, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NavLink = ({ children }: { children: ReactNode }) => {
  return (
    <button className="h-full flex items-center justify-center px-4 relative group">
      {children}
      <div className="absolute group-hover:h-[10px] h-0 transition-all duration-100 ease-in-out w-full bg-primary bottom-0 group-hover:opacity-100 opacity-0" ></div>
    </button>
  );
};

const NavButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group relative cursor-pointer">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[200%] group-hover:-translate-x-[150%] group-hover:opacity-100 opacity-0 transition-all h-1 w-6 bg-orange-400"></div>
      {children}
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
                <NavButton>Home</NavButton>
                <NavButton>About</NavButton>
                <NavButton>Players</NavButton>
                <NavButton>News</NavButton>
                <NavButton>Gallery</NavButton>
                <NavButton>Store</NavButton>
                <NavButton>Contact</NavButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex w-full h-[120px] top-0 sticky z-50 bg-white items-center">
        <div className="h-full shrink-0 aspect-square mx-4">
          <img src={Logo} alt="" />
        </div>
        <div className="mx-auto h-full text-2xl tracking-tighter  text-primary font-bold flex">
          <NavLink>LATEST</NavLink>
          <NavLink>WINS</NavLink>
          <NavLink>PLAYERS</NavLink>
          <NavLink>SHOP</NavLink>
          <NavLink>CONTACT</NavLink>
        </div>
        <div className="h-full w-fit  flex">
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

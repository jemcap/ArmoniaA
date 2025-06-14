import { useState, useEffect, useRef } from "react";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 100,
  });
  const [velocity, setVelocity] = useState<{ x: number; y: number }>({
    x: 2,
    y: 2,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    let animationFrame: number;

    const move = () => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const { innerWidth, innerHeight } = window;

      const rect = dialog.getBoundingClientRect();

      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;

      if (newX <= 0 || newX + rect.width >= innerWidth) {
        setVelocity((v) => ({ ...v, x: -v.x }));
      }
      if (newY <= 0 || newY + rect.height >= innerHeight) {
        setVelocity((v) => ({ ...v, y: -v.y }));
      }
      setPosition((prev) => ({
        x: prev.x + velocity.x,
        y: prev.y + velocity.y,
      }));

      animationFrame = requestAnimationFrame(move);
    };
    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen, position, velocity]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <header className=" bg-transparent fixed h-16 flex flex-col justify-center w-full z-50">
      <nav className=" w-full">
        <div className=" align-element flex flex-row justify-between items-center">
          <div className="bg-black"></div>
          <div>
            <a href="/" className="flex justify-center">
              <img
                src="/armonia_a_logo.png"
                alt="Armonia A logo"
                className="w-40 lg:w-80  transition duration-200 "
              />
            </a>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <img
                src="/a_Mother_Spark_button.png"
                alt="a Mother Modal"
                className=" a-mother-spark-button cursor-pointer"
              />
            </DialogTrigger>
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsOpen(false)}
              >
                {isMobile ? (
                  <div
                    ref={dialogRef}
                    style={{
                      position: "fixed",
                      padding: "20px 10px",
                      color: "white",
                      zIndex: 50,
                      background: "#E63D3A",
                      boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    }}
                    className="w-screen h-screen"
                  >
                    <DialogHeader className="flex flex-row justify-between w-[92.5vw] items-center">
                      <DialogTitle className="mx-3 text-start text-sm">
                        5% of all proceeds go to a_Mother
                      </DialogTitle>
                        <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close"
                        className=" hover:bg-white/10 rounded transition"
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}
                        >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="6" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <line x1="6" y1="18" x2="18" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        </button>
                    </DialogHeader>
                    <DialogDescription className="relative h-full">
                      <img
                        src="/Logo.png"
                        alt=""
                        className="absolute bottom-0 w-[95%] mb-5 left-1/2 transform -translate-x-1/2"
                      />
                    </DialogDescription>
                  </div>
                ) : (
                  <div
                    ref={dialogRef}
                    style={{
                      position: "fixed",
                      padding: "20px 10px",
                      color: "white",
                      top: position.y,
                      left: position.x,
                      width: "550px",
                      height: "375px",
                      zIndex: 50,
                      background: "#E63D3A",
                      boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle className="mx-3">
                        5% of all proceeds go to a_Mother
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="relative h-full">
                      <img
                        src="/Logo.png"
                        alt=""
                        className="absolute bottom-0 w-[95%] mb-5 left-1/2 transform -translate-x-1/2"
                      />
                    </DialogDescription>
                  </div>
                )}
              </div>
            )}
          </Dialog>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

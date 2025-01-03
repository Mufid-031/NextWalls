import React, { useState, useRef, useEffect } from "react";

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean; align?: "start" | "end" }> = ({ children, asChild, align = "end" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>, {
      onClick: handleToggle,
      "aria-expanded": isOpen,
      "aria-haspopup": true,
    });
  }

  return (
    <div ref={triggerRef}>
      <button
        onClick={handleToggle}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
      </button>
      {isOpen && <DropdownMenuContent align={align} isOpen={isOpen}>{children}</DropdownMenuContent>}
    </div>
  );
};

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; align: "start" | "end"; isOpen?: boolean }> = ({ children, align, isOpen }) => {
  return (
    <div className={`absolute ${align === "start" ? "left-0" : "right-0"} ${isOpen ? "block" : "hidden"} w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
      {children}
    </a>
  );
};

export const DropdownMenuLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-3 text-sm font-medium text-gray-900">{children}</div>;
};

export const DropdownMenuSeparator: React.FC = () => {
  return <hr className="my-1 border-gray-200" />;
};

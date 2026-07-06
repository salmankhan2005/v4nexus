"use client";

import { useEffect, useState } from "react";

export default function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay before showing it so it doesn't clash with the splash screen immediately
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5500); // After splash screen ends
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/918428687001"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.031 0C5.405 0 .016 5.39.016 12.016c0 2.122.553 4.192 1.604 6.014L.045 24l6.113-1.604c1.763.966 3.766 1.478 5.873 1.478 6.626 0 12.015-5.39 12.015-12.016S18.657 0 12.031 0zm.001 21.902c-1.785 0-3.53-.478-5.06-1.385l-.363-.214-3.76 .986.999-3.665-.235-.373C2.564 15.65 2.013 13.856 2.013 12.016 2.013 6.495 6.51 2 12.032 2c5.522 0 10.017 4.495 10.017 10.016S17.554 21.902 12.032 21.902zm5.498-7.502c-.302-.151-1.786-.883-2.062-.985-.277-.101-.479-.151-.68.151-.202.302-.78 .985-.957 1.186-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.5-896-.802-1.501-1.792-1.677-2.094-.176-.302-.019-.465.132-.616.136-.136.302-.353.453-.53.151-.176.202-.302.302-.504.101-.202.05-.378-.025-.53-.076-.151-.68-1.64-.932-2.245-.246-.59-.496-.51-.68-.52-.176-.008-.378-.008-.579-.008-.202 0-.53.076-.807.378-.277.302-1.058 1.034-1.058 2.52s1.084 2.924 1.235 3.125c.151.202 2.13 3.253 5.158 4.558.72.311 1.282.497 1.721.636.724.23 1.384.197 1.904.12.584-.087 1.786-.73 2.037-1.436.252-.705.252-1.31.176-1.436-.076-.126-.277-.202-.579-.353z"/>
      </svg>
    </a>
  );
}

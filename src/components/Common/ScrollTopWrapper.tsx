import React from 'react'
import { useLocation } from "react-router";



interface ScrollTopWrapperProps {
    children: React.ReactNode;
  }

  const ScrollTopWrapper: React.FC<ScrollTopWrapperProps> = ({ children }: ScrollTopWrapperProps) => {
    const location = useLocation();

    React.useEffect(() => {
        const headerElement = document.getElementById("root");
        if (headerElement) {
            headerElement.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);
  
    return <>{children}</>;
};

export default ScrollTopWrapper
"use client";
import { ReactLenis } from "lenis/react";
import { type FC, useRef } from "react";

type LenisScrollProviderProps = {
  children: React.ReactNode;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);
  return (
    <ReactLenis ref={lenisRef} root>
      {children}
    </ReactLenis>
  );
};

export default LenisScrollProvider;

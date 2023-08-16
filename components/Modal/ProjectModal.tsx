"use client";

import { useCallback, useRef, memo, ReactNode } from "react";
import { useRouter } from "next/navigation";
import close from "../../public/close.svg";
import Image from "next/image";

export const ProjectModal = memo(function ProjectModal({
  children,
}: {
  children: ReactNode;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      router.push("/");
    },
    [router]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onDismiss(e);
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image src={close} width={17} height={17} alt="close" />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
});

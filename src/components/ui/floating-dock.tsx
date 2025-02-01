"use client";
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

interface FloatingDockProps {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  socialItems?: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}

export function FloatingDock({
  items,
  socialItems,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <FloatingDockDesktop
          items={items}
          socialItems={socialItems}
          className={cn(desktopClassName, "hidden md:flex")}
        />
        <FloatingDockDesktop
          items={items}
          socialItems={socialItems}
          className={cn(mobileClassName, "md:hidden flex scale-75")}
        />
      </div>
    </>
  );
}

const FloatingDockDesktop = ({
  items,
  socialItems,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  socialItems?: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl bg-gray-50 px-4 pb-3 pointer-events-auto",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </div>

      {socialItems && (
        <>
          <div className="w-px h-6 bg-neutral-200 mx-2" />
          <div className="flex items-center gap-2">
            {socialItems.map((item) => (
              <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

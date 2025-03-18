"use client";

import * as React from "react";
import {
  CircleDollarSign,
  Contact,
  FolderCode,
  House,
  Instagram,
  Menu,
  NotebookPen,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavigationBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed right-2 top-2 z-[5000]">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="rounded-xl bg-[#ffffffa1] text-black hover:bg-[#ffffffda]">
            Menu <Menu className="ml-2 inline-block" />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className="mx-4 border-none bg-transparent p-0 pb-5"
          //   style={{
          //     background:
          //       "radial-gradient(circle at 50% 110%, #0055aa 0%, #003366 40%, #000000 80%, #000000 100%)",
          //   }}
        >
          <DrawerClose className="absolute right-0 top-0 text-white">
            <X size={18} />
          </DrawerClose>
          <div className="mx-auto w-full max-w-sm p-0">
            <DrawerHeader className="flex-center flex-col gap-2">
              <DrawerTitle className="font-sans text-white">
                Ekashunyam 2.0
              </DrawerTitle>
              <DrawerDescription>Set Sail for Glory</DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col gap-2">
              <NavItem
                setOpen={setOpen}
                icon={<House />}
                label="Home"
                url="/"
              />
              <NavItem
                setOpen={setOpen}
                icon={<User />}
                label="Profile"
                url="/profile"
              />
              {/* <NavItem icon={<Map />} label="Events" url="/" /> */}
              <NavItem
                setOpen={setOpen}
                icon={<NotebookPen />}
                label="Register"
                url="/form/register"
              />
              {/* <NavItem icon={<BookOpenText />} label="Brochure" url="/" />
              <NavItem icon={<LocateFixed />} label="Map" url="/" /> */}
              <NavItem
                setOpen={setOpen}
                icon={<CircleDollarSign />}
                label="Contribute"
                url="/contribute"
              />
              <NavItem
                setOpen={setOpen}
                icon={<Contact />}
                label="Contact"
                url="/support"
              />
              <NavItem
                setOpen={setOpen}
                icon={<FolderCode />}
                label="Developers"
                url="/developers"
              />
              <NavItem
                setOpen={setOpen}
                icon={<Instagram />}
                label="Socials"
                url="https://www.instagram.com/ekashunyam_2k25?igsh=MTBjeTFxbDdtdzM0bQ=="
                target="_blank"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const NavItem = ({
  icon,
  label,
  url,
  target,
  className,
  setOpen,
}: {
  icon: React.ReactNode;
  label: string;
  url: string;
  target?: string;
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Link
    onClick={() => setOpen(false)}
    href={url}
    target={target || "_self"}
    className={cn(
      `flex w-full items-center justify-start gap-2 rounded-xl bg-[#111827c5] px-3 py-2 text-sm font-medium text-white transition-colors duration-100 ease-in hover:bg-[#03071256] hover:text-blue-200`,
      className,
    )}
  >
    {icon}
    {label}
  </Link>
);

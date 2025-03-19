"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home } from "lucide-react";

// Import shadcn components
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  // Fixed typo in "SURPRISE_EVENT"
  const events = [
    { name: "IT Manager", href: "/event/IT_MANAGER" },
    { name: "Dance", href: "/event/DANCE" },
    { name: "Coding", href: "/event/CODING" },
    { name: "Surprise Event", href: "/event/SURPIRZE_EVENT" },
    { name: "Gaming", href: "/event/GAMING" },
    { name: "Reel", href: "/event/REEL" },
    { name: "Hackathon", href: "/event/HACKATHON" },
    { name: "Quiz", href: "/event/QUIZ" },
  ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4 md:px-80">
        {/* Logo/Home Button */}
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="text-lg font-bold">Home</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Events
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                      <li key={event.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={event.href}
                            className={cn(
                              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
                              pathname === event.href
                                ? "bg-accent text-accent-foreground"
                                : "",
                            )}
                          >
                            {event.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs bg-white text-black"
            >
              <nav className="mt-6 flex flex-col gap-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <Home className="h-6 w-6" />
                  <span className="text-lg font-bold">Home</span>
                </Link>

                <div>
                  <h4 className="mb-2 font-medium">Events</h4>
                  <div className="flex flex-col space-y-1">
                    {events.map((event) => (
                      <Link
                        key={event.href}
                        href={event.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === event.href
                            ? "bg-accent text-accent-foreground"
                            : "",
                        )}
                      >
                        {event.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

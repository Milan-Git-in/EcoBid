"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/Components/ui/Navbar";
import { useState } from "react";
export function Header() {
  const navItems = [
    {
      name: "Biddings",
      link: "/bids",
    },
    {
      name: "List",
      link: "/getbiddings",
    },
    {
      name: "Purchase",
      link: "/bid",
    },
  ];

  const mobileNavItems = [
    {
      name: "Biddings",
      link: "/bids",
    },
    {
      name: "List",
      link: "/getbiddings",
    },
    {
      name: "Purchase",
      link: "/bid",
    },
    {
      name: "Login",
      link: "/login",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {/* Replace nested anchor with direct NavbarButton usage */}
          <NavbarButton variant="secondary" href="/login">
            Login
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {mobileNavItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown, Play, Building2 } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0D0D0B]">
              <span className="font-serif text-lg font-bold text-[#C9943A]">S</span>
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              SponsorBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#ai-matching" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              AI Matching
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Trust & Safety
            </Link>
            <Link href="/request-demo" className="text-sm font-medium text-[#C9943A] hover:text-[#C9943A]/80 transition-colors">
              Request a Demo
            </Link>
          </nav>

          {/* Desktop CTA Buttons - Simplified to 2 */}
          <div className="hidden md:flex items-center gap-3">
            {/* Get Started Dropdown - Secondary/Subtle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm gap-1.5 text-muted-foreground hover:text-foreground">
                  Get Started
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/creator/signup" className="flex items-center gap-2 cursor-pointer">
                    <Play className="h-4 w-4 text-[#C9943A]" />
                    <span>I'm a Creator</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/company/signup" className="flex items-center gap-2 cursor-pointer">
                    <Building2 className="h-4 w-4 text-[#C9943A]" />
                    <span>I'm a Company</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login Dropdown - Primary/Highlighted */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-sm gap-1.5 bg-[#0D0D0B] text-[#FAFAF7] hover:bg-[#0D0D0B]/90">
                  Log In
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/creator/login" className="flex items-center gap-2 cursor-pointer">
                    <Play className="h-4 w-4 text-[#C9943A]" />
                    <span>Creator Login</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/company/login" className="flex items-center gap-2 cursor-pointer">
                    <Building2 className="h-4 w-4 text-[#C9943A]" />
                    <span>Company Login</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#ai-matching" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Matching
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Trust & Safety
              </Link>
              <Link href="/request-demo" className="text-sm font-medium text-[#C9943A] hover:text-[#C9943A]/80 transition-colors">
                Request a Demo
              </Link>
              
              {/* Login Section */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Log In</p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" asChild className="justify-start gap-2">
                    <Link href="/creator/login">
                      <Play className="h-4 w-4 text-[#C9943A]" />
                      Creator Login
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start gap-2">
                    <Link href="/company/login">
                      <Building2 className="h-4 w-4 text-[#C9943A]" />
                      Company Login
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Get Started Section */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Get Started</p>
                <div className="flex flex-col gap-2">
                  <Button asChild className="justify-start gap-2 bg-[#0D0D0B] text-[#FAFAF7]">
                    <Link href="/creator/signup">
                      <Play className="h-4 w-4 text-[#C9943A]" />
                      I'm a Creator
                    </Link>
                  </Button>
                  <Button asChild className="justify-start gap-2 bg-[#C9943A] text-[#0D0D0B] hover:bg-[#C9943A]/90">
                    <Link href="/company/signup">
                      <Building2 className="h-4 w-4" />
                      I'm a Company
                    </Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

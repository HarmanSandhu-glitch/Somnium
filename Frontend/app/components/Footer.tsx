import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] font-mono text-gray-300 py-16">
      <div className="container  px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description */}
          {/* <div className="space-y-4">
            <p className="text-sm text-gray-400"></p>
          </div> */}

          {/* Download and Products */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Download</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Windows app
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Mac app
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Linux app
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Desktop app
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Web
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    App
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Software
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ecommerce
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms & conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Get in touch */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Get in touch</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Subscribe</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-white text-black"
                />
                <Button className="bg-[#6366f1] hover:bg-[#5558e6] text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2022 Glossy, All right reserved.
        </div>
      </div>
    </footer>
  );
}

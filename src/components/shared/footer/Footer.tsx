'use client'
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import bg from "@/assets/images/footerbg.png";
import logo from "@/assets/Logo2.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import Logo from "@/utils/Logo";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerData: FooterColumn[] = [
  {
    title: "Consultant",
    links: [
      { label: "How to open account", href: "#" },
      { label: "How to find work", href: "#" },
      { label: "Direct Contract", href: "#" },
      { label: "Enterprise", href: "#" },
    ],
  },
  {
    title: "Client",
    links: [
      { label: "Account", href: "#" },
      { label: "How to Hire", href: "#" },
      { label: "Consultant", href: "#" },
      { label: "Payment Information", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Help and support", href: "#" },
      { label: "Stories", href: "#" },
      { label: "Free agent Reviews", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Our Impact", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

function FooterColumn({ title, links }: FooterColumn) {
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-xl mb-6 text-white">{title}</h2>
      <ul className="space-y-4 mx-auto text-white">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="hover:underline ">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/chat')) {
    return
  }
  return (
    <footer
      style={{
        background: `#5633D1 url(${bg.src}) no-repeat center center`,
        backgroundSize: "cover",
      }}
      className="text-text_white "
    >
      <div className="container mx-auto pt-24 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {footerData.map((column, index) => (
            <FooterColumn key={index} {...column} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex gap-3 text-4xl mb-4 md:mb-0">
            <Link href="#" aria-label="Instagram">
              <RiInstagramFill className="bg-secondary text-white rounded-full  p-2" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="bg-white text-textColor-primary rounded-full p-2" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaXTwitter className="bg-white text-textColor-primary rounded-full  p-2" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="bg-white text-textColor-primary rounded-full  p-2" />
            </Link>
          </div>
          <div className="flex items-center gap-5 mr-20">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="flex items-center gap-2 text-white">
                  USD
                  <IoIosArrowDown />
                  <span className="sr-only">Select currency</span>
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <hr className="opacity-40 my-10" />
        <div className="flex flex-col md:flex-row justify-between items-center text-white">
          <div className="flex flex-col md:flex-row gap-5 items-center md:items-end mb-4 md:mb-0">
            <Image src={logo} alt="Luminor logo" height={50} width={100} />
            {/* <Logo /> */}
            <p className="">Copyright © luminor 2024. All rights reserved</p>
          </div>
          <div className="flex gap-5">
            <Link href="#" className="hover:underline hover:font-bold">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline hover:font-bold">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:underline hover:font-bold">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

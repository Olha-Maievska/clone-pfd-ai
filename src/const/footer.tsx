import { Facebook, Twitter, Youtube } from "lucide-react";

interface Social {
  label: string;
  href: string;
  icon: JSX.Element;
}

export const links = [
  {
    title: "Products",
    items: [
      {
        label: "User cares",
        href: "#",
      },
      {
        label: "Chrome extension",
        href: "#",
      },
      {
        label: "Blog",
        href: "#",
      },
      {
        label: "FAQ",
        href: "#",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "Learn",
        href: "#",
      },
      {
        label: "Docs",
        href: "#",
      },
      {
        label: "Community",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        label: "About",
        href: "#",
      },
      {
        label: "Team",
        href: "#",
      },
    ],
  },
];

export const socials: Social[] = [
  {
    label: "Twitter",
    href: "#",
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    label: "Facebook",
    href: "#",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    label: "Youtube",
    href: "#",
    icon: <Youtube className="w-5 h-5" />,
  },
];

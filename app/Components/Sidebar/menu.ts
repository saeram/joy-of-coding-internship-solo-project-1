import { CheckIcon, FileTextIcon, HomeIcon, StarIcon } from "@radix-ui/react-icons";

const menu = [
  { id: 1, label: "All Tasks", icon: HomeIcon, href: "/" },
  { id: 2, label: "Important", icon: StarIcon, href: "/important"},
  { id: 3, label: "In Progress", icon: FileTextIcon, href: "/inprogress" },
  { id: 4, label: "Completed", icon: CheckIcon, href: "/completed" },
];

export default menu;
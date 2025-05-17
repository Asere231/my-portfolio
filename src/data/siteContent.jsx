// Icons
import { LuBrainCircuit, LuContact, LuFileSpreadsheet } from "react-icons/lu";
import { FaPeopleGroup, FaRobot } from "react-icons/fa6";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { IoTerminalOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

export const ProjectsCarousel = dynamic(
  () => import("@/components/ProjectsCarousel.jsx"),
  { ssr: false }
);

// Project items
export const projectData = [
  {
    title: "NN and CNN Training",
    languages: "Python, PyTorch, Jupyter Notebook",
    description:
      "Trained various neural networks for image classification. Regular NNs for MNIST digit recognition, and CNNs for CIFAR-10 classification",
    link: "https://github.com/Asere231/Robot-Vision/blob/main/project2.ipynb",
    Icon: LuBrainCircuit,
  },
  {
    title: "GroupFinder",
    languages: "MERN Stack, Flutter",
    description:
      "Contributed to the development of a web and mobile app to help students join study groups in the university library.",
    link: "https://github.com/Asere231/GroupFinder",
    Icon: FaPeopleGroup,
  },
  {
    title: "ContactLinker",
    languages: "HTML, CSS, Bootstrap, LAMP Stack",
    description:
      "Contributed to the development responsive front-end page to support user-friendly contact management in a team web application.",
    link: "https://github.com/Asere231/lamp-crud-project",
    Icon: LuContact,
  },
  {
    title: "PL/0 Compiler",
    languages: "C, Compiler Design",
    description:
      "This project is a complete compiler for the PL/0 programming language, built over a sequence of assignments for my System Software course.",
    link: "https://github.com/Asere231/PL-0-Compiler",
    Icon: IoTerminalOutline,
  },
  {
    title: "RE-RASSOR: New Arm",
    languages: "ROS2, Gazebo, MoveIt2, Python, Ubuntu",
    description:
      "Contributed to the development of a robotic arm with 4 joints for a lunar rover in a year-long Senior Design project.",
    link: "https://github.com/Asere231",
    Icon: FaRobot,
  },
];

// Navbar items
export const itemsNavBar = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Contact items
export const itemsGlassIcons = [
  {
    icon: <FiLinkedin />,
    color: "blue",
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/bryananeyro/",
  },
  {
    icon: <FaGithub />,
    color: "grey",
    label: "GitHub",
    link: "https://github.com/Asere231?tab=repositories",
  },
  {
    icon: <FiMail />,
    color: "red",
    label: "Email",
    email: "brah0211@outlook.com",
  },
  {
    icon: <LuFileSpreadsheet />,
    color: "orange",
    label: "Resume",
    link: "https://www.linkedin.com/in/bryananeyro/",
  },
];

export const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

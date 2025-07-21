// Single-file Portfolio using Vite + React + Tailwind CSS
// -------------------------------------------------------
// Paste this as src/App.jsx in a fresh Vite React project that already has Tailwind configured.
// Make sure your tailwind setup includes the following in src/index.css:
//   @tailwind base;
//   @tailwind components;
//   @tailwind utilities;
// And tailwind.config.js content paths include ./index.html and ./src/**/*.{js,jsx,ts,tsx}
// -------------------------------------------------------

import { useState } from "react";
import { createPortal } from "react-dom";

// ------------------------------
// Data you can customize easily
// ------------------------------
const SITE = {
  name: "MyPortfolio",
  hero: {
    greeting: "Hi, I’m John!",
    subtext: "I’m a Web Developer passionate about design & code.",
    cta: "View My Work",
  },
  about: {
    heading: "About Me",
    body: `I'm an IT student who loves designing clean, friendly user interfaces and learning how to bring them to life with code. I enjoy working with HTML, CSS, and am growing my skills in JavaScript and React. When I'm not coding, you'll probably catch me listening to music or experimenting with new design ideas.`,
    skills: ["HTML", "CSS", "Tailwind", "React", "Figma", "Git"],
  },
  projects: [
    {
      title: "Portfolio Website",
      desc: "Personal website built with React & Tailwind.",
      link: "#",
      tags: ["React", "Tailwind"],
    },
    {
      title: "Todo App",
      desc: "Simple productivity app using React hooks.",
      link: "#",
      tags: ["React", "Hooks"],
    },
    {
      title: "Binhi UI Mockups",
      desc: "Early-stage UI concepts for a community platform.",
      link: "#",
      tags: ["UI", "Design"],
    },
  ],
  contact: {
    heading: "Contact",
    subtext: "Let’s work together or just say hi!",
    email: "johnhenrix@example.com", // replace w/ real
  },
  copyright: "2025 John Henrix Gillo. All rights reserved.",
};

// Utility: smooth scroll helper
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// ------------------------------
// Navbar
// ------------------------------
function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const NavLinks = ({ onClick }) => (
    <ul className="flex flex-col md:flex-row gap-6 md:gap-4 items-start md:items-center text-lg md:text-base">
      {navItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => {
              onClick?.();
              scrollToId(item.id);
            }}
            className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded px-1"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <button
          onClick={() => scrollToId("top")}
          className="text-xl font-bold tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded"
        >
          {SITE.name}
        </button>
        {/* Desktop */}
        <div className="hidden md:block">
          <NavLinks />
        </div>
        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded border border-gray-300 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Open menu"
        >
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
      </div>
      {open && <MobileMenu onClose={() => setOpen(false)} navItems={navItems} />}
    </nav>
  );
}

// Mobile slide-over menu rendered via portal so it sits at end of body
function MobileMenu({ onClose, navItems }) {
  const menu = (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="relative ml-auto h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-8 animate-slide-in-right">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            ✕
          </button>
        </div>
        <ul className="flex flex-col gap-4 text-lg">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onClose();
                  scrollToId(item.id);
                }}
                className="block w-full text-left hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  return createPortal(menu, document.body);
}

// ------------------------------
// Hero Section
// ------------------------------
function Hero() {
  const { greeting, subtext, cta } = SITE.hero;
  return (
    <section
      id="top"
      className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-24 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">{greeting}</h2>
      <p className="max-w-xl text-lg md:text-xl text-gray-600 mb-8">{subtext}</p>
      <button
        onClick={() => scrollToId("projects")}
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition"
      >
        {cta}
      </button>
    </section>
  );
}

// ------------------------------
// About Section
// ------------------------------
function About() {
  const { heading, body, skills } = SITE.about;
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">{heading}</h3>
        <p className="text-gray-700 mb-8 leading-relaxed">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-block px-4 py-1 text-sm font-medium border border-indigo-300 rounded-full bg-indigo-50 text-indigo-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// Projects Section
// ------------------------------
function Projects() {
  const items = SITE.projects;
  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-center">Projects</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.title}
              className="group relative p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{p.title}</h4>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  className="inline-block text-indigo-600 text-sm font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// Contact Section
// ------------------------------
function Contact() {
  const { heading, subtext, email } = SITE.contact;
  const [form, setForm] = useState({ name: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can wire this up to EmailJS, FormSubmit, or your own API.
    console.log("Contact form submitted", form);
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">{heading}</h3>
        <p className="text-gray-700 mb-10">{subtext}</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              rows="4"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition"
          >
            Send Message
          </button>
        </form>
        {sent && (
          <p className="mt-4 text-green-600 text-sm">Thanks! I'll get back to you soon.</p>
        )}
        <p className="mt-8 text-sm text-gray-500">
          Or email me directly at {" "}
          <a
            href={`mailto:${email}`}
            className="text-indigo-600 hover:underline"
          >
            {email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// ------------------------------
// Footer
// ------------------------------
function Footer() {
  return (
    <footer className="text-center p-6 bg-gray-100 text-sm text-gray-500 border-t border-gray-200">
      &copy; {SITE.copyright}
    </footer>
  );
}

// ------------------------------
// Back-to-top button
// ------------------------------
function BackToTop() {
  const [visible, setVisible] = useState(false);
  // track scroll
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y > 400 && !visible) setVisible(true);
      if (y <= 400 && visible) setVisible(false);
    });
  }
  if (!visible) return null;
  return (
    <button
      onClick={() => scrollToId("top")}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

// ------------------------------
// App Root
// ------------------------------
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

/* -------------------------------------------------------
OPTIONAL: add the following CSS (e.g., in src/index.css) for the slide-in menu animation.
You can copy-paste below after the tailwind directives.
----------------------------------------------------------
@layer utilities {
  .animate-slide-in-right {
    animation: slide-in-right 0.2s ease-out forwards;
  }
  @keyframes slide-in-right {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
}
*/

// Central site configuration — edit company facts here and they update everywhere.

export const site = {
  name: "EGY-KEN Builders",
  legalName: "EGY-KEN Builders Limited",
  tagline: "Engineering Excellence, Premium Finishes & Sustainable Construction",
  founded: 2018,
  // Used for SEO / metadataBase. Replace with the live domain when known.
  url: "https://egyken.co.ke",
  shortIntro:
    "A premier building, civil engineering and high-end construction firm in Nairobi — delivering complex residential, commercial and specialised sports infrastructure across East Africa.",
  metaDescription:
    "EGY-KEN Builders Limited — NCA 1 registered building & civil engineering contractor in Nairobi, Kenya. Premium residential, commercial and sports infrastructure, with materials sourced from Egypt & Turkey.",

  // Credentials / trust signals
  credentials: {
    nca: {
      number: "70683/8/0722",
      category: "NCA 1",
      note: "Top-tier category for Building Works",
    },
    kraPin: "P051727526N",
    permit: "Nairobi City County Single Business Permit (Activity Code 825)",
    fire: "Nairobi City County Fire Prevention Clearance (Plot No. 30/716)",
    osh: "Compliant with OSH (Occupational Safety & Health) site standards",
    company: "Registered Private Limited Company under the Kenya Companies Act, 2015",
  },

  // Contact
  address: {
    line: "Riverpoint A1, Kingara Close, Kingara Road",
    area: "Kilimani",
    city: "Nairobi",
    country: "Kenya",
  },
  phoneDisplay: "+254 725 250 157",
  phoneE164: "+254725250157",
  whatsapp: "254725250157",
  whatsappMessage:
    "Hello EGY-KEN Builders, I'd like to discuss a construction project.",
  email: "Egyken.builders04@gmail.com",
  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { day: "Saturday", time: "8:00 AM – 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  // Replace with the real embed/pin link when available.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Riverpoint+Kingara+Close+Kilimani+Nairobi",

  socials: {
    instagram: "#",
    linkedin: "#",
    facebook: "#",
  },

  // Headline numbers for the trust bar (count-up animated)
  stats: [
    { value: 8, suffix: "+", label: "Years' Experience" },
    { value: 20, suffix: "+", label: "Major Projects" },
    { value: 15, suffix: "+", label: "Corporate Clients" },
    { value: 120, suffix: "+", label: "Team Members" },
  ],

  values: [
    {
      title: "Precision & Quality",
      body: "Exceeding client and consultant expectations through rigorous quality control and flawless structural execution.",
    },
    {
      title: "Global Innovation, Local Delivery",
      body: "Sourcing industry-leading premium materials from Egypt and Turkey to enhance the longevity and aesthetics of local infrastructure.",
    },
    {
      title: "Integrity & Transparency",
      body: "Absolute corporate governance, transparent compliance and fair risk allocation across every joint venture and contract.",
    },
    {
      title: "Resilience & Agility",
      body: "Navigating complex logistical supply chains to keep project momentum uninterrupted under any market conditions.",
    },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;
export const telHref = `tel:${site.phoneE164}`;
export const mailHref = `mailto:${site.email}`;

// Portfolio projects. Real photography lives in /public and is wired via
// `cover` + `photos`. When a project has no photos yet, `seed` drives the
// on-brand placeholder art and `gallery` is how many placeholders show.

export type Category = "Residential" | "Commercial" | "Civil" | "Sports";

export type Project = {
  slug: string;
  name: string;
  location: string;
  city: string;
  category: Category;
  tags: string[];
  year: string;
  client: string;
  scope: string;
  highlights: { label: string; value: string }[];
  featured: boolean;
  /** Cover photograph (from /public) — used on cards and the detail hero. */
  cover?: string;
  /** What the cover shows, for screen readers. */
  coverAlt?: string;
  /** Gallery photographs in display order (cover is not repeated). */
  photos?: string[];
  seed: number;
  gallery: number;
};

export const projects: Project[] = [
  {
    slug: "riverpoint",
    name: "Riverpoint",
    location: "Kingara Close, Lavington",
    city: "Nairobi",
    category: "Residential",
    tags: ["Residential", "High-Rise", "Joinery"],
    year: "2025",
    client: "Elite Residential Developer",
    scope:
      "Full structural execution of three residential towers up to 16 floors, including basements, swimming pool, and the supply and installation of 1,250 premium doors.",
    highlights: [
      { label: "Towers", value: "3" },
      { label: "Floors", value: "16" },
      { label: "Premium doors", value: "1,250" },
    ],
    featured: true,
    cover: "/riverpoint-02.png",
    coverAlt:
      "Night concrete pour on a Riverpoint tower slab, rebar and crews against the Nairobi sunset",
    photos: ["/riverpoint-01.png", "/riverpoint-03.png", "/riverpoint-04.png"],
    seed: 1,
    gallery: 5,
  },
  {
    slug: "vinewood",
    name: "Vinewood",
    location: "Nairobi West",
    city: "Nairobi",
    category: "Commercial",
    tags: ["Mixed-Use", "Commercial", "Residential"],
    year: "Ongoing",
    client: "Joint-Venture Investment Group",
    scope:
      "Main contractor for a high-rise mixed-use development featuring multi-level parking, a commercial ground floor and 14 luxurious residential floors.",
    highlights: [
      { label: "Residential floors", value: "14" },
      { label: "Use", value: "Mixed" },
      { label: "Role", value: "Main contractor" },
    ],
    featured: true,
    cover: "/vinewood-cover.png",
    coverAlt:
      "Vinewood tower facade with timber-clad balconies and signage against a clear sky",
    photos: [
      "/vinewood-01.png",
      "/vinewood-02.png",
      "/vinewood-03.png",
      "/vinewood-04.png",
      "/vinewood-05.png",
    ],
    seed: 2,
    gallery: 4,
  },
  {
    slug: "wilma-towers",
    name: "Wilma Towers",
    location: "Elgeyo Marakwet Road, Kilimani",
    city: "Nairobi",
    category: "Residential",
    tags: ["Residential", "High-Rise", "Structural"],
    year: "2023",
    client: "Premium High-Rise Developer",
    scope:
      "Core structural engineering, advanced concrete works, masonry walling and external infrastructure layout for twin 17-floor luxury towers.",
    highlights: [
      { label: "Towers", value: "Twin" },
      { label: "Floors", value: "17" },
      { label: "Scope", value: "Structural" },
    ],
    featured: true,
    cover: "/wilma-cover.png",
    coverAlt:
      "Wilma Towers at dusk: amber-accented twin high-rise with lit balconies",
    photos: ["/wilma-01.png", "/wilma-02.png"],
    seed: 3,
    gallery: 5,
  },
  {
    slug: "parklands-padel-hub",
    name: "Parklands Padel & Sports Hub",
    location: "Parklands",
    city: "Nairobi",
    category: "Sports",
    tags: ["Sports", "Steel & Canopy", "Turnkey"],
    year: "2025",
    client: "Private Sports Club",
    scope:
      "Turnkey construction of 5 professional padel courts and club facilities, plus the fabrication of a large structural steel canopy with translucent waterproof fabric.",
    highlights: [
      { label: "Padel courts", value: "5" },
      { label: "Canopy", value: "Tensile steel" },
      { label: "Delivery", value: "Turnkey" },
    ],
    featured: true,
    cover: "/parklands-padel-cover.png",
    coverAlt:
      "Floodlit blue padel courts under a translucent canopy at dusk, Parklands",
    photos: [
      "/parklands-padel-01.png",
      "/parklands-padel-02.png",
      "/parklands-padel-03.png",
    ],
    seed: 4,
    gallery: 4,
  },
  {
    slug: "divine-suites",
    name: "Divine Suites",
    location: "Riverside",
    city: "Nairobi",
    category: "Commercial",
    tags: ["Commercial", "Facades", "Joinery"],
    year: "2024",
    client: "Luxury Corporate Developer",
    scope:
      "High-volume joinery contract for 1,200 premium doors, together with specialised structural curtain walling and architectural facade systems.",
    highlights: [
      { label: "Premium doors", value: "1,200" },
      { label: "Facade", value: "Curtain wall" },
      { label: "Enclave", value: "Riverside" },
    ],
    featured: false,
    cover: "/divine-facade.png",
    coverAlt:
      "Divine Suites courtyard facades with aluminium windows and patterned balustrades",
    photos: ["/divine-doors.png"],
    seed: 5,
    gallery: 4,
  },
  {
    slug: "nakuru-hospital-roof",
    name: "Nakuru Hospital Roof System",
    location: "Nakuru City",
    city: "Nakuru",
    category: "Civil",
    tags: ["Civil", "Healthcare", "Steel"],
    year: "2024",
    client: "Institutional Healthcare Provider",
    scope:
      "Heavy-duty structural steel engineering, fabrication and erection of large-span metal roofing trusses for critical medical wings.",
    highlights: [
      { label: "System", value: "Steel trusses" },
      { label: "Span", value: "Large" },
      { label: "Sector", value: "Healthcare" },
    ],
    featured: false,
    cover: "/nakuru-hospital.png",
    coverAlt:
      "Structural steel decking and beams over a hospital wing during erection",
    photos: ["/nakuru-hospital-01.png", "/nakuru-hospital-02.png"],
    seed: 6,
    gallery: 4,
  },
];

export const categories: ("All" | Category)[] = [
  "All",
  "Residential",
  "Commercial",
  "Civil",
  "Sports",
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// Portfolio projects. `seed` drives the on-brand placeholder artwork variety and
// `gallery` is how many images the detail page shows. Swap placeholders for real
// photos by adding a `cover`/`photos` path field and rendering them in BrandImage.

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
      "Full structural execution of three residential towers up to 16 floors — including basements, swimming pool, and the supply and installation of 1,250 premium doors.",
    highlights: [
      { label: "Towers", value: "3" },
      { label: "Floors", value: "16" },
      { label: "Premium doors", value: "1,250" },
    ],
    featured: true,
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

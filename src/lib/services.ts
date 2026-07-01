// Service offerings. `icon` maps to a lucide-react icon name (resolved in ServiceCard).

export type Service = {
  id: string;
  icon: string;
  title: string;
  summary: string;
  body: string;
  points: string[];
  /** Real photograph (served from /public). Falls back to BrandImage art when absent. */
  image?: string;
};

export const services: Service[] = [
  {
    id: "civil-structural",
    icon: "Building2",
    title: "Civil & Structural Engineering",
    summary:
      "Turnkey building construction, deep foundations and heavy-duty concrete frames.",
    body: "From excavation and deep foundations to full concrete structural frames, we deliver turnkey building construction engineered for resilience and built to international standards.",
    points: [
      "Deep foundations & excavation",
      "Reinforced concrete structural frames",
      "Turnkey building construction",
      "FIDIC-standard project management",
    ],
  },
  {
    id: "padel-courts",
    icon: "LandPlot",
    title: "Premium Padel Court Infrastructure",
    summary:
      "Turnkey importation and installation of Super Panorama padel courts from Egypt & Turkey.",
    body: "A specialised division delivering professional sports facilities — from laser-guided base construction to the installation of premium Super Panorama padel courts imported from Egypt and Turkey.",
    points: [
      "Laser-guided base construction",
      "Super Panorama court systems",
      "Specialist global procurement",
      "Complete club facility delivery",
    ],
    image: "/padel-court.png",
  },
  {
    id: "facades",
    icon: "PanelsTopLeft",
    title: "Advanced Architectural Facades",
    summary:
      "Structural glazing, acoustic curtain walling and high-spec aluminium profiles.",
    body: "Design, fabrication and installation of architectural facades — structural glazing, acoustic curtain walling and precision aluminium profiles that define a building's character and performance.",
    points: [
      "Structural glazing systems",
      "Acoustic curtain walling",
      "High-spec aluminium profiles",
      "In-house fabrication & installation",
    ],
  },
  {
    id: "joinery",
    icon: "DoorOpen",
    title: "Waterproof Doors & Joinery",
    summary:
      "High-volume, precision-installed 100% waterproof PVC composite frames & clad doors.",
    body: "High-volume procurement and precision installation of 100% waterproof PVC composite frames and clad door systems — proven at scale across our flagship residential towers.",
    points: [
      "100% waterproof PVC composites",
      "Clad door systems",
      "High-volume capacity (1,000+ units)",
      "Precision on-site fitting",
    ],
  },
  {
    id: "steel-canopies",
    icon: "Construction",
    title: "Steel Structures & Tensile Canopies",
    summary:
      "Heavy industrial steel trusses, roofing and translucent waterproof fabric covers.",
    body: "Engineering and erecting heavy industrial steel — trusses, large-span roofing and translucent waterproof tensile canopies for sports, healthcare and commercial facilities.",
    points: [
      "Large-span steel trusses",
      "Industrial roofing systems",
      "Translucent tensile fabric canopies",
      "Healthcare & sports infrastructure",
    ],
    image: "/steel-tensile-canopy.png",
  },
];

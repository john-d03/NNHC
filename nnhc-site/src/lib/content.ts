// Static content for the NNHC initiative site.
// Hoisted to module level (server-hoist-static-io). Plain typed objects, no I/O.

export const META = {
  title: "One Health · NNHC",
  tagline: "Care delivered closer to home, supported by the neighbourhood that surrounds it.",
  convenedBy: "IMA Cochin",
  // ISO 8601 with IST offset; format at render with Intl.DateTimeFormat
  labDateISO: "2026-04-25T10:30:00+05:30",
  venue: "IMA House, Cochin",
  status: "Vision endorsed at the Visioning Lab",
  version: "1.0",
} as const;

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});
const TIME_FMT = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export function formatLabDate(): string {
  return DATE_FMT.format(new Date(META.labDateISO));
}
export function formatLabTime(): string {
  return TIME_FMT.format(new Date(META.labDateISO));
}

export const NAV_SECTIONS = [
  { id: "vision", label: "Vision & Model" },
  { id: "tracks", label: "Mission" },
  { id: "roadmap", label: "Roadmap" },
  { id: "voices", label: "Voices" },
  { id: "challenges", label: "Challenges" },
  { id: "engage", label: "Engage" },
  { id: "faq", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
] as const;

export const PRINCIPLES = [
  {
    n: "01",
    title: "Home as the unit of care",
    body: "Healthcare is delivered closer to people’s homes, supported by trained caregivers and community networks.",
  },
  {
    n: "02",
    title: "Professional ownership",
    body: "Healthcare professionals take responsibility for defined communities, reviving the family doctor relationship.",
  },
  {
    n: "03",
    title: "Empowered communities",
    body: "Communities participate actively in care delivery, not merely as recipients but as co-creators.",
  },
  {
    n: "04",
    title: "Seamless coordination",
    body: "Technology enables coordination between stakeholders, integrating EMR, CMR, and open platforms.",
  },
  {
    n: "05",
    title: "Equitable access",
    body: "Healthcare remains equitable, accessible, and affordable, with cross-subsidy supporting vulnerable populations.",
  },
] as const;

export type StakeholderId = "hcp" | "lsg" | "neigh" | "sso" | "biz";

export const STAKEHOLDERS: {
  id: StakeholderId;
  label: string;
  group: string;
  body: string;
  members: string;
}[] = [
  {
    id: "hcp",
    label: "Health Care Professionals",
    group: "Clinical",
    body: "The clinical anchor of the network, organised by district and integrated through IMA.",
    members: "Medical doctors, specialist associations, dentists, nurses, therapists, technicians.",
  },
  {
    id: "lsg",
    label: "Local Self Government",
    group: "Governance",
    body: "Connects the network formally to public health infrastructure.",
    members: "District Panchayat, Municipal bodies, ASHA workers, Community Nurses, PHC Medical Officers, ward members.",
  },
  {
    id: "neigh",
    label: "Neighbourhood",
    group: "Community",
    body: "The day-to-day fabric of mutual support, where care is given and received among people who already know each other.",
    members: "Residents’ Associations and Flat Owners’ Associations.",
  },
  {
    id: "sso",
    label: "Social Service Organisations",
    group: "Social",
    body: "Carry decades of trust and experience in community work.",
    members: "Charitable trusts, palliative bodies, social service groups already embedded in care delivery.",
  },
  {
    id: "biz",
    label: "Foundations & Trade Associations",
    group: "Business",
    body: "Brought in as partners and co-creators rather than donors alone, with leaders sitting as ex-officio members of the SPV.",
    members: "Business-derived foundations and trade bodies.",
  },
];

export const THREE_STEPS = [
  { n: "01", title: "Identify care needs", body: "Map the actual care needs of each community, household by household. Move from assumption to evidence." },
  { n: "02", title: "Map existing services", body: "Inventory current healthcare, palliative, and community capacity already operating in the geography." },
  { n: "03", title: "Assess the gaps", body: "Identify gaps in care delivery, scheduling, and resource availability. The gap analysis becomes the brief." },
] as const;

export const TRACKS = [
  {
    n: "01",
    title: "Vision Lab & Concurrence from Community Leadership",
    summary:
      "Sponsors, trade body leaders, and IMA leaders convened to discuss and decide on moving forward, reaffirmed principles, and agreed on next steps.",
    output: "Formation of the Special Purpose Vehicle (SPV), led by IMA, with sponsors as core members and trade association leaders as ex-officio members.",
    points: [
      "Principles reaffirmed and design ideas shared.",
      "Trade associations awaiting clarity on actions and operating model.",
      "SPV converts intention into accountable structure.",
    ],
  },
  {
    n: "02",
    title: "Strategy Deployment & the 100-Day Action Plan",
    summary:
      "Coordination committee meetings across districts, beginning with Malappuram, Ernakulam, Kottayam, and Thiruvananthapuram.",
    output: "A unified dashboard capturing palliative + primary healthcare, donations, and quantity/quality gaps.",
    points: [
      "District meetings bring major donors, home-care heads, and trade leaders together.",
      "Roll out interface systems for identifying care seekers and raising resources.",
      "Care planning, scheduling, and family empowerment delivered by professionals.",
    ],
  },
  {
    n: "03",
    title: "Gap Assessment & Care Program Building",
    summary: "Coordination structures bring the medical fraternity into community health care across three layers.",
    output: "Initial deployment across 100 places in Kerala, pioneered at the district level.",
    points: [
      "Hospitals - specialist panels, super-specialist referral chains, bio-cluster model at district scale.",
      "Family Clinics - empowered with digital systems, escalation, home-care integration, logistics.",
      "Neighbourhood Systems - HCP coordination, psychosocial support, community engagement.",
    ],
  },
  {
    n: "04",
    title: "Capacity Building at IMA",
    summary: "Five concrete management capabilities developed as the operating core.",
    output: "An IMA capable of inspiring health, mentoring practitioners, and ensuring respite for caregivers.",
    points: [
      "Capacity Map of the State - hospitals around geographical converging points; outreach time as metric.",
      "Speciality Department Distribution - no patient or specialist travels more than 25 km.",
      "Information System - compassionate flow of patient information from home to specialist.",
      "Leadership Among Professionals - each practitioner becomes a social and strategic leader.",
      "Inventory Management - best medicines and materials, sourced statewide for critical cases.",
    ],
  },
  {
    n: "05",
    title: "Star Model · Building District Coordination Committees",
    summary: "Activate and integrate the five stakeholder groups at the district level.",
    output: "Functional district committees connecting government, corporate, trade, HCP, LSG, and neighbourhood layers.",
    points: [
      "Trade Associations - meet executive committees, collect district lists, assign two state leads.",
      "HCP Engagement - doctors, specialists, dentists, nurses, therapists, technicians coordinated by district.",
      "LSG Channel - engagement via District Panchayat Presidents and Municipal bodies.",
      "Neighbourhood Layer - Residents’ and Flat Owners’ Associations mapped and integrated.",
    ],
  },
] as const;

export const MILESTONES = [
  { n: "01", title: "Form District Coordination Committees", body: "Replicate the Kochi model across all districts. Each committee includes trade association leaders, community foundation leaders, and IMA leaders." },
  { n: "02", title: "Form the SPV", body: "Resolutions sought from IMA State and IMA Cochin to form an SPV, with foundation reps and trade leaders as ex-officio members." },
  { n: "03", title: "Anchor IMA District Leadership", body: "IMA district leaders nominate an anchor and team. Specialist association leaders form the basis of the specialist panel." },
  { n: "04", title: "Map Healthcare Gaps", body: "A district-by-district inventory of where care does not reach, falls short, or duplicates." },
  { n: "05", title: "Budget the Gaps", body: "Convert the gap inventory into financial requirements per district and care category." },
  { n: "06", title: "Mobilise Resources", body: "Secure the three resource categories required to operate: funds, people engagements, materials." },
  { n: "07", title: "Deploy to Build", body: "Convert resources into operational footprint: capacity, staffing, capability." },
  { n: "08", title: "Report Care Coverage", body: "Track operational performance: volume, efficiency, quality." },
  { n: "09", title: "Measure Societal Impact", body: "Track population indicators: poverty from out-of-pocket expense, dignity, children/elderly reach, death at home, reduction in unnecessary C-sections." },
] as const;

export const HUNDRED_DAY_PLAN = [
  { n: "01", title: "Identify a pilot location", body: "Diverse demographic representation; demonstrates the model across socio-economic strata." },
  { n: "02", title: "Map human resources & community networks", body: "Inventory of healthcare professionals, volunteers, and community institutions in the pilot geography." },
  { n: "03", title: "Build the digital infrastructure framework", body: "Coordination dashboard and EMR + CMR integration, leveraging Open Health Care Network." },
  { n: "04", title: "Develop training modules", body: "Training across the Star Model: HCPs, community workers, residents’ associations, trade volunteers." },
  { n: "05", title: "Form the multi-stakeholder coordination forum", body: "The formal forum that holds the model accountable across the five stakeholder groups." },
  { n: "06", title: "Design volunteer engagement & resource mobilisation", body: "Volunteer onboarding pathways, role definitions, and a structured resource mobilisation plan." },
] as const;

export const CHALLENGES = [
  {
    n: "01",
    title: "Revival of the Family Doctor & Preventive Care",
    points: [
      "Reintroduce the family doctor system despite current knowledge gaps.",
      "Develop curriculum and training programs.",
      "Introduce preventive consultations with appropriate fee models.",
      "Engage with IRDAI to align insurance with preventive healthcare.",
    ],
  },
  {
    n: "02",
    title: "Cost-Effective & Equitable Healthcare",
    points: [
      "Reduce financial burden on families; prevent healthcare-induced poverty.",
      "Complement the limitations of the government system.",
      "Cross-subsidy: those who can afford support those who cannot.",
      "Take leadership in driving systemic change.",
    ],
  },
  {
    n: "03",
    title: "Lifelong Health Systems through EMR",
    points: [
      "Establish health as a continuous, lifelong process.",
      "Lead adoption of Electronic Medical Records.",
      "Ensure continuity, coordination, and efficiency in care delivery.",
      "Use the EMR backbone to coordinate the entire Star Model.",
    ],
  },
] as const;

export const INSIGHTS = [
  { tag: "Community", title: "Strengthening community-based care", body: "Shift from institution-centric care to community and home-based models. Palliative care in Kerala cited as a strong example." },
  { tag: "Cohesion", title: "Rebuilding neighbourhood networks", body: "NNHC as an opportunity to rebuild social cohesion and mutual support inside communities." },
  { tag: "Prevention", title: "Promotive & preventive healthcare", body: "Embedding prevention into daily life - nutrition, activity, sleep, mental well-being. Bakery and hotel associations as touchpoints." },
  { tag: "Access", title: "Infrastructure & accessibility", body: "Builders Association committed to wheelchair access, wider doors and lifts, side rails - aligning urban development with care." },
  { tag: "Clinical", title: "Integration of healthcare professionals", body: "Active doctor involvement via IMA, stronger referrals, integrated community + institutional care, training young HCPs." },
  { tag: "Tech", title: "Leveraging technology for coordination", body: "Unified coordination dashboard, EMR + CMR integration, open-source platforms such as Open Health Care Network." },
  { tag: "People", title: "Volunteerism & universal contribution", body: "A large pool of volunteers exists. What is needed: structured engagement, capacity building, clear role definition." },
  { tag: "Funding", title: "Financial sustainability", body: "Sustainable models that avoid over-commercialisation. Multi-industry support assured. Cross-subsidy endorsed as guiding principle." },
  { tag: "Inclusion", title: "Inclusion of vulnerable populations", body: "Special attention to elderly, persons with chronic illness/disability, and children needing long-term rehabilitation." },
  { tag: "Youth", title: "Youth engagement", body: "Through awareness programs, volunteer opportunities, and educational integration. Young HCPs need community exposure." },
] as const;

export const VOICES = [
  { name: "Rajeev Sadanandan", role: "Former Health Secretary, Kerala", quote: "Reduce hospital dependency, control healthcare costs, and revive the family doctor system. The ideas resonate with the needs of the broader community.", group: "Policy" },
  { name: "Dr Junaid Rehman", role: "Chairman, IMA Arike", quote: "A revolutionary project. IMA Cochin is prepared to take on the challenges and lead it towards success.", group: "Clinical" },
  { name: "KT Kurien", role: "CEO & MP, Premji Invest", quote: "A timely intervention. Strong support, expressed via video message.", group: "Industry" },
  { name: "Binod Hariharan", role: "Chairman, Pallium India", quote: "The palliative care model proves community capability. Scale that participation across all of healthcare.", group: "Community" },
  { name: "Bodhish Thomas", role: "Director, OHC Network", quote: "Open Health Care Network can enable NNHC digitally. The success of palliative-care EMRs in Kerala is already proven.", group: "Tech" },
  { name: "Abdul Majeed", role: "Easy Cook", quote: "The “Ente Gramam” model - clustering 100 families into a functional unit - is a working precedent for neighbourhood-scale care.", group: "Community" },
  { name: "Dr Mathews Numpeli", role: "Healthcare leader", quote: "Build a structured system. Train professionals to support community care.", group: "Clinical" },
  { name: "Gibu P Mathew", role: "Builders Association of India", quote: "Wheelchair access, wider doors and lifts, side rails - building age-friendly infrastructure into our designs.", group: "Industry" },
  { name: "MG Praveen", role: "Community organiser", quote: "Many volunteers lack ownership. With guidance, they become active contributors.", group: "Community" },
  { name: "Boney Thomas", role: "Kochi Muziris Biennale", quote: "Enhance public visibility and engagement through digital platforms.", group: "Community" },
  { name: "Dr Varun", role: "Cardiologist, Andhra", quote: "Focus on unmet social determinants. Identify who needs what.", group: "Clinical" },
];

export const ENGAGE = [
  { for: "Healthcare Professional", actions: ["Join your IMA district anchor team.", "Nominate yourself for the district specialist panel.", "Mentor a younger colleague into community exposure.", "Pilot the family doctor relationship in your existing practice."] },
  { for: "Foundation or Donor", actions: ["Engage as a partnering core member, not a transactional donor.", "Co-design care programs with IMA leadership through the SPV.", "Sponsor a district’s gap-assessment and pilot deployment.", "Place a representative on the SPV core."] },
  { for: "Trade or Industry Association", actions: ["Convene your executive committee for an NNHC orientation.", "Share your district-level office bearer list.", "Identify community touchpoints inside your network.", "Nominate two leaders as ex-officio SPV members."] },
  { for: "Residents’ or Flat Owners’ Association", actions: ["Surface NNHC at your next association meeting.", "Map who in your block already needs care, formally or informally.", "Volunteer for a structured role.", "Connect to your district coordination committee."] },
  { for: "Local Government / Public Health", actions: ["Engage through District Panchayat President or municipal body.", "Align ASHA, Community Nurse, and PHC schedules with neighbourhood teams.", "Co-define ward-level care coverage targets.", "Use coordination dashboards for joint planning."] },
  { for: "Software, Data, Open Systems", actions: ["Contribute to Open Health Care Network.", "Help integrate EMR with Community Medical Records.", "Build dashboards the five stakeholder groups will actually use.", "Bring deployment lessons from palliative care into NNHC."] },
];

export const FAQS = [
  { q: "Which care seekers will the network serve at the start?", a: "Any kind of care seeker is welcome. Delivery extends from Home → Family Clinic → Hospital and includes specialised institutions for advanced care. Where capacity is constrained, requests enter a queue and are addressed as the network scales." },
  { q: "Who counts as a caregiver?", a: "Anyone who provides care: the care seeker themselves, relatives, friends, neighbours, and healthcare professionals visiting homes or working in institutions. The network coordinates this spectrum so each layer supports the next." },
  { q: "What forms a “community” in this model?", a: "A homogeneous group identified by a common thread of unity - geographical (a ward, a colony) or personal (shared identity, occupation, condition). Natural community boundaries are respected rather than overwritten with administrative ones." },
  { q: "How does the SPV relate to IMA and to sponsors?", a: "The SPV is led by IMA. Sponsors form the core; trade association leaders sit as ex-officio members. Medical leadership, philanthropic capital, and community-facing institutions hold accountability together." },
  { q: "Where will the pilot run?", a: "District coordination committees begin in Malappuram, Ernakulam, Kottayam, and Thiruvananthapuram. Initial deployment across 100 places in Kerala, pioneered at the district level." },
  { q: "How will technology be handled?", a: "Open Health Care Network as the open-source foundation. EMR + Community Medical Records integrated with a unified coordination dashboard. Kerala palliative-care EMR experience provides direct precedent." },
  { q: "How does the network avoid commercialisation of care?", a: "Cross-subsidy: those who can afford care contribute to support those who cannot. Industry support is in-kind contribution and partnership, not transactional service-buying. The SPV keeps medical leadership at the centre." },
];

export const GLOSSARY = [
  { term: "IMA", meaning: "Indian Medical Association. The largest body of medical doctors in India. NNHC is convened by IMA Cochin." },
  { term: "Arike", meaning: "IMA’s existing community palliative care initiative; demonstrates community capability for end-of-life care." },
  { term: "SPV", meaning: "Special Purpose Vehicle. The accountable legal entity that runs the mission, led by IMA." },
  { term: "HCP", meaning: "Health Care Professional. Doctors, dentists, nurses, therapists, technicians." },
  { term: "LSG", meaning: "Local Self Government. Panchayats, Municipal bodies, ASHA workers, Community Nurses, PHC Medical Officers." },
  { term: "SSO", meaning: "Social Service Organisations. Charitable trusts, palliative bodies, community service groups." },
  { term: "EMR / CMR", meaning: "Electronic Medical Records (clinical) and Community Medical Records (community-level) - integrated into one continuous view." },
  { term: "OHC Network", meaning: "Open Health Care Network. The open-source platform partner enabling the digital backbone of NNHC." },
  { term: "IRDAI", meaning: "Insurance Regulatory and Development Authority of India. Policy alignment needed for preventive-care insurance." },
  { term: "Ente Gramam", meaning: "Malayalam for “My Village”. A community model that clusters 100 families into a functional unit." },
  { term: "Family Clinic", meaning: "The neighbourhood-scale clinical unit between the home and the hospital." },
  { term: "Bio Cluster", meaning: "A district-level model organising hospitals, specialists, and logistics around natural geographic catchments." },
];

export const RESOURCING = [
  { title: "Leadership Team Cost", body: "Compensation and operating support for the core team accountable for delivering the mission across districts." },
  { title: "IMA Capacity Building", body: "Investment in the five capabilities under Track Four: capacity mapping, speciality distribution, information systems, leadership, inventory." },
  { title: "Operating Cost", body: "Recurring expenses for district coordination committees, family clinics, neighbourhood systems, and field operations." },
  { title: "Digital Infrastructure", body: "Build and maintenance of the coordination dashboard, EMR/CMR integration, and home-monitoring technology." },
  { title: "Patient Sponsorships", body: "Direct sponsorship of care for patients who cannot afford it, structured under the cross-subsidy principle." },
] as const;

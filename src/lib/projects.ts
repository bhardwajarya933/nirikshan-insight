export type RiskBand = "Normal" | "Needs Review" | "Suspicious" | "High Risk";

export type RiskReason = { points: number; title: string; description: string };
export type Evidence = {
  type: string;
  observedStatus: string;
  observation: string;
  date: string;
  mismatch: boolean;
};
export type Project = {
  id: number;
  name: string;
  district: string;
  state: string;
  category: string;
  sanction: number;
  expenditure: number;
  contractor: string;
  status: string;
  completionDate: string;
  lat: number;
  lng: number;
  riskScore: number;
  riskBand: RiskBand;
  reasons: RiskReason[];
  evidence?: Evidence;
};

const locations = [
  ["Chandipur", "Odisha", 21.47, 87.02], ["Gaya", "Bihar", 24.79, 85.00],
  ["Jaisalmer", "Rajasthan", 26.92, 70.90], ["Dharwad", "Karnataka", 15.46, 75.00],
  ["Wayanad", "Kerala", 11.69, 76.13], ["Dibrugarh", "Assam", 27.47, 94.91],
  ["Satara", "Maharashtra", 17.68, 73.99], ["Rewa", "Madhya Pradesh", 24.54, 81.30],
  ["Kangra", "Himachal Pradesh", 32.10, 76.27], ["Warangal", "Telangana", 17.97, 79.60],
  ["Tirunelveli", "Tamil Nadu", 8.71, 77.76], ["Nadia", "West Bengal", 23.47, 88.56],
  ["Kutch", "Gujarat", 23.73, 69.86], ["Amritsar", "Punjab", 31.63, 74.87],
  ["Nainital", "Uttarakhand", 29.39, 79.45], ["Jhansi", "Uttar Pradesh", 25.45, 78.57],
  ["Palamu", "Jharkhand", 24.03, 84.07], ["Bastar", "Chhattisgarh", 19.11, 81.95],
  ["South Goa", "Goa", 15.20, 74.10], ["Imphal East", "Manipur", 24.81, 93.94],
] as const;

const works = [
  ["Rural Road Development", "Roads"], ["Community Health Centre Upgrade", "Healthcare"],
  ["Government School Classroom Block", "Education"], ["Drinking Water Supply Scheme", "Water Supply"],
  ["Solar Street Lighting", "Energy"], ["Village Drainage Improvement", "Sanitation"],
  ["Public Library Construction", "Community Assets"], ["Primary Health Sub-Centre", "Healthcare"],
  ["Minor Irrigation Canal Restoration", "Irrigation"], ["Sports Ground Development", "Sports"],
] as const;
const contractors = ["Maa Durga Constructions", "Bharat Infra Projects", "Sahyadri Civil Works", "Eastern Buildcon", "Shakti Engineering Co.", "Jan Kalyan Contractors", "Northstar Infrastructure", "Pragati Rural Works"];
const scores = [87, 84, 82, 81, 79, 76, 58, 55, 49, 45, 39, 28, 26, 23, 21, 18, 16, 14, 12, 9, 7, 5, 4, 3, 2, 24, 19, 29, 34, 43, 63, 68, 72, 85, 88, 11, 13, 17, 22, 27, 31, 37, 47, 53, 59, 61, 8, 6, 15, 25];

export function getRiskBand(score: number): RiskBand {
  if (score >= 81) return "High Risk";
  if (score >= 61) return "Suspicious";
  if (score >= 31) return "Needs Review";
  return "Normal";
}

function defaultReasons(score: number): RiskReason[] {
  if (score >= 81) return [
    { points: 30, title: "Cost Anomaly", description: "Project cost is significantly higher than similar projects." },
    { points: 25, title: "Contractor Concentration", description: "Contractor handles an unusually large share of district projects." },
    { points: 20, title: "Excessive Delay", description: "Project is significantly overdue." },
    { points: Math.max(score - 75, 6), title: "AI Anomaly", description: "Multiple project attributes appear unusual." },
  ];
  if (score >= 61) return [
    { points: 24, title: "Schedule Variance", description: "Progress is behind the approved implementation schedule." },
    { points: 22, title: "Cost Pattern", description: "Expenditure differs from comparable district projects." },
    { points: score - 46, title: "AI Anomaly", description: "Combined project indicators require closer review." },
  ];
  return [{ points: score, title: score > 30 ? "Review Indicator" : "Routine Monitoring", description: score > 30 ? "One or more indicators merit an official document review." : "No significant anomalies found in the available records." }];
}

export const projects: Project[] = scores.map((riskScore, index) => {
  const location = locations[index % locations.length];
  const work = works[index % works.length];
  const sanction = 28 + ((index * 17) % 132);
  const status = index % 5 === 0 ? "Completed" : index % 4 === 0 ? "Delayed" : index % 3 === 0 ? "In Progress" : "Sanctioned";
  return {
    id: index + 1,
    name: `${work[0]} – ${location[0]}`,
    district: location[0], state: location[1], category: work[1],
    sanction, expenditure: Math.round(sanction * (status === "Completed" ? 0.97 : 0.42 + (index % 5) * 0.1)),
    contractor: contractors[index % contractors.length], status,
    completionDate: `202${4 + (index % 3)}-${String((index % 12) + 1).padStart(2, "0")}-15`,
    lat: location[2] + (Math.floor(index / locations.length) * 0.08),
    lng: location[3] + (Math.floor(index / locations.length) * 0.08),
    riskScore, riskBand: getRiskBand(riskScore), reasons: defaultReasons(riskScore),
  };
}).map((project, index) => index === 0 ? {
  ...project,
  name: "Rural Road Development – Chandipur",
  contractor: "Maa Durga Constructions",
  status: "Completed",
  sanction: 148,
  expenditure: 144,
  completionDate: "2024-03-31",
  reasons: [
    { points: 30, title: "Cost Anomaly", description: "Project cost is significantly higher than similar projects." },
    { points: 25, title: "Contractor Concentration", description: "Contractor handles an unusually large share of district projects." },
    { points: 20, title: "Excessive Delay", description: "Project is significantly overdue." },
    { points: 12, title: "AI Anomaly", description: "Multiple project attributes appear unusual." },
  ],
  evidence: {
    type: "Field Report", observedStatus: "No Work on Ground",
    observation: "Project marked completed in records, but construction was not found during field verification.",
    date: "08 Sep 2026", mismatch: true,
  },
} : project);

export const priorityProjects = [...projects].sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);
export const mapProjects = [...projects].sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);
export const formatCrore = (value: number) => `₹${value} lakh`;

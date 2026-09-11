import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useMemo, useState } from "react";
import {
  Alert, AppBar, Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, Divider, Drawer, IconButton, LinearProgress, List, ListItemButton, ListItemIcon,
  ListItemText, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Toolbar, Tooltip, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import evidenceImage from "@/assets/chandipur-field-evidence.jpg";
import { formatCrore, priorityProjects, projects, type Project } from "@/lib/projects";

const ProjectMap = lazy(() => import("@/components/ProjectMap"));
type View = "dashboard" | "map" | "risk" | "details";
const drawerWidth = 244;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Project Nirikshan | MPLADS Monitoring" },
    { name: "description", content: "Official AI-powered MPLADS project monitoring and inspection prioritisation dashboard." },
    { property: "og:title", content: "Project Nirikshan | MPLADS Monitoring" },
    { property: "og:description", content: "Official dashboard for explainable project risk analysis, mapping, and field evidence review." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const riskColor = (band: Project["riskBand"]) => ({
  "Normal": "success", "Needs Review": "warning", "Suspicious": "secondary", "High Risk": "error",
}[band] as "success" | "warning" | "secondary" | "error");

function RiskChip({ project }: { project: Project }) {
  return <Chip size="small" color={riskColor(project.riskBand)} label={project.riskBand} className="risk-chip" />;
}

function ProjectDialog({ project, open, onClose, onInspect }: { project: Project; open: boolean; onClose: () => void; onInspect: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box><Typography variant="overline">Project details</Typography><Typography variant="h5">{project.name}</Typography></Box>
        <IconButton onClick={onClose} aria-label="Close"><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box className="detail-grid">
          {[ ["District", `${project.district}, ${project.state}`], ["Category", project.category], ["Contractor", project.contractor], ["Sanction Amount", formatCrore(project.sanction)], ["Expenditure", formatCrore(project.expenditure)], ["Official Status", project.status] ].map(([label, value]) => <Box key={label}><Typography variant="caption" color="text.secondary">{label}</Typography><Typography fontWeight={600}>{value}</Typography></Box>)}
        </Box>
        <Paper className="risk-hero" elevation={0}>
          <Box><Typography variant="overline">AI risk score</Typography><Typography variant="h2" fontWeight={800}>{project.riskScore}<Typography component="span" variant="h6"> / 100</Typography></Typography></Box>
          <RiskChip project={project} />
        </Paper>
        <Typography variant="h6" sx={{ mt: 3, mb: 1.5 }}>Why was this project flagged?</Typography>
        <Box className="reason-grid">{project.reasons.map((reason) => <Card variant="outlined" key={reason.title}><CardContent><Typography color="error.main" fontWeight={800}>+{reason.points} {reason.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{reason.description}</Typography></CardContent></Card>)}</Box>
        <Alert severity="info" sx={{ mt: 3 }}><b>Risk score indicates projects requiring closer inspection.</b><br />It does not automatically establish fraud.</Alert>
      </DialogContent>
      <DialogActions><Button onClick={onClose}>Close</Button><Button variant="contained" onClick={onInspect} startIcon={<AssignmentOutlinedIcon />}>Open inspection view</Button></DialogActions>
    </Dialog>
  );
}

function Index() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [selected, setSelected] = useState<Project>(projects[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navItems = useMemo(() => [
    ["dashboard", "Dashboard", <DashboardOutlinedIcon />], ["map", "Project Map", <MapOutlinedIcon />],
    ["risk", "Risk Analysis", <WarningAmberOutlinedIcon />], ["details", "Project Details", <AssignmentOutlinedIcon />],
  ] as const, []);
  const navigate = (next: View) => { setView(next); setMobileOpen(false); };
  const openProject = (project: Project) => { setSelected(project); setDialogOpen(true); };
  const title = navItems.find(([key]) => key === view)?.[1] ?? "Dashboard";

  const drawer = <Box className="sidebar"><Box className="brand"><Box className="brand-mark"><VerifiedUserOutlinedIcon /></Box><Box><Typography variant="h6">Project Nirikshan</Typography><Typography variant="caption">MPLADS MONITORING</Typography></Box></Box><Divider /><List sx={{ px: 1.5, mt: 1 }}>{navItems.map(([key, label, icon]) => <ListItemButton key={key} selected={view === key} onClick={() => navigate(key)}><ListItemIcon>{icon}</ListItemIcon><ListItemText primary={label} /></ListItemButton>)}</List><Box className="official-badge"><VerifiedUserOutlinedIcon fontSize="small" /><Box><Typography variant="caption" fontWeight={700}>OFFICIAL USE ONLY</Typography><Typography variant="caption" display="block">Government monitoring interface</Typography></Box></Box></Box>;

  return <Box className="app-shell">
    <AppBar position="fixed" className="topbar" elevation={0}><Toolbar><IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" }, mr: 1 }} aria-label="Open navigation"><MenuIcon /></IconButton><Box><Typography variant="h6">{title}</Typography><Typography variant="caption" color="text.secondary">AI-powered MPLADS monitoring system</Typography></Box><Chip icon={<VerifiedUserOutlinedIcon />} label="Official Dashboard" variant="outlined" sx={{ ml: "auto", display: { xs: "none", sm: "flex" } }} /></Toolbar></AppBar>
    <Drawer variant={desktop ? "permanent" : "temporary"} open={desktop || mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}>{drawer}</Drawer>
    <Box component="main" className="main-content">
      {view === "dashboard" && <DashboardView onOpen={openProject} />}
      {view === "map" && <MapView onOpen={openProject} />}
      {view === "risk" && <RiskView selected={selected} onSelect={setSelected} onOpen={() => setDialogOpen(true)} />}
      {view === "details" && <DetailsView project={selected} />}
    </Box>
    <ProjectDialog project={selected} open={dialogOpen} onClose={() => setDialogOpen(false)} onInspect={() => { setDialogOpen(false); setView("details"); }} />
  </Box>;
}

function DashboardView({ onOpen }: { onOpen: (project: Project) => void }) {
  const kpis = [
    ["Total Projects", "50", <DashboardOutlinedIcon />, "Across 20 districts"], ["High Risk Projects", "6", <WarningAmberOutlinedIcon />, "Require inspection"],
    ["Projects Needing Review", "11", <SearchOutlinedIcon />, "Document review pending"], ["Citizen Mismatch Reports", "3", <AssignmentOutlinedIcon />, "Evidence attached"],
  ];
  return <Stack spacing={3}><Box><Typography variant="h4">MPLADS project overview</Typography><Typography color="text.secondary">National monitoring summary · Updated 11 Sep 2026</Typography></Box><Box className="kpi-grid">{kpis.map(([label, value, icon, note]) => <Card variant="outlined" key={String(label)}><CardContent className="kpi-card"><Box className="kpi-icon">{icon}</Box><Box><Typography variant="body2" color="text.secondary">{label}</Typography><Typography variant="h4" fontWeight={800}>{value}</Typography><Typography variant="caption" color="text.secondary">{note}</Typography></Box></CardContent></Card>)}</Box><Paper variant="outlined" className="table-panel"><Box className="section-heading"><Box><Typography variant="h5">Priority projects</Typography><Typography variant="body2" color="text.secondary">Projects ranked by AI risk score, highest first</Typography></Box><Chip label="10 projects" size="small" /></Box><ProjectTable rows={priorityProjects} onOpen={onOpen} /></Paper></Stack>;
}

function ProjectTable({ rows, onOpen }: { rows: Project[]; onOpen: (project: Project) => void }) {
  return <TableContainer><Table size="small" sx={{ minWidth: 1040 }}><TableHead><TableRow>{["Project Name", "District", "Category", "Sanction Amount", "Contractor", "Status", "Risk Score", "Risk Band"].map((head) => <TableCell key={head}>{head}</TableCell>)}</TableRow></TableHead><TableBody>{rows.map((project) => <TableRow hover key={project.id} onClick={() => onOpen(project)} sx={{ cursor: "pointer" }}><TableCell><Typography variant="body2" fontWeight={700}>{project.name}</Typography></TableCell><TableCell>{project.district}</TableCell><TableCell>{project.category}</TableCell><TableCell>{formatCrore(project.sanction)}</TableCell><TableCell>{project.contractor}</TableCell><TableCell>{project.status}</TableCell><TableCell><Typography fontWeight={800} color={`${riskColor(project.riskBand)}.main`}>{project.riskScore}</Typography></TableCell><TableCell><RiskChip project={project} /></TableRow>)}</TableBody></Table></TableContainer>;
}

function MapView({ onOpen }: { onOpen: (project: Project) => void }) {
  return <Stack spacing={2.5}><Box><Typography variant="h4">Project map</Typography><Typography color="text.secondary">Geographic view of the ten highest-priority projects</Typography></Box><Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>{(["Normal", "Needs Review", "Suspicious", "High Risk"] as const).map((band) => <Chip key={band} color={riskColor(band)} label={band} size="small" />)}</Stack><Paper variant="outlined" className="map-panel"><ClientOnly fallback={<Box className="map-loading">Loading project locations…</Box>}>{<Suspense fallback={<Box className="map-loading">Loading project locations…</Box>}><ProjectMap onSelect={onOpen} /></Suspense>}</ClientOnly></Paper></Stack>;
}

function RiskView({ selected, onSelect, onOpen }: { selected: Project; onSelect: (p: Project) => void; onOpen: () => void }) {
  return <Stack spacing={3}><Box><Typography variant="h4">AI risk analysis</Typography><Typography color="text.secondary">Review explainable indicators before prioritising an inspection</Typography></Box><Box className="risk-layout"><Paper variant="outlined" className="risk-list"><Typography variant="h6" sx={{ p: 2 }}>Highest-risk projects</Typography><Divider />{priorityProjects.slice(0, 6).map((p) => <ListItemButton key={p.id} selected={p.id === selected.id} onClick={() => onSelect(p)}><ListItemText primary={p.name} secondary={`${p.district} · ${p.status}`} /><Typography fontWeight={800} color={`${riskColor(p.riskBand)}.main`}>{p.riskScore}</Typography></ListItemButton>)}</Paper><Paper variant="outlined" className="analysis-panel"><Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}><Box><Typography variant="overline">Selected project</Typography><Typography variant="h5">{selected.name}</Typography><Typography color="text.secondary">{selected.district}, {selected.state}</Typography></Box><RiskChip project={selected} /></Stack><Box className="score-line"><Typography variant="h2" fontWeight={800}>{selected.riskScore}</Typography><Box flex={1}><Typography fontWeight={700}>AI risk score / 100</Typography><LinearProgress variant="determinate" value={selected.riskScore} color={riskColor(selected.riskBand)} sx={{ height: 10, borderRadius: 2, mt: 1 }} /></Box></Box><Divider sx={{ my: 2 }} />{selected.reasons.map((r) => <Box key={r.title} className="reason-row"><Typography fontWeight={800} color="error.main">+{r.points}</Typography><Box><Typography fontWeight={700}>{r.title}</Typography><Typography variant="body2" color="text.secondary">{r.description}</Typography></Box></Box>)}<Alert severity="info" sx={{ my: 2 }}>This score prioritises review; it does not establish fraud.</Alert><Button variant="contained" onClick={onOpen}>View full analysis</Button></Paper></Box></Stack>;
}

function DetailsView({ project }: { project: Project }) {
  const hasEvidence = Boolean(project.evidence);
  return <Stack spacing={3}><Box><Typography variant="h4">Official inspection view</Typography><Typography color="text.secondary">Project record, risk analysis, and available verification evidence</Typography></Box><Paper variant="outlined" className="inspection-header"><Box><Typography variant="overline">Project #{String(project.id).padStart(4, "0")}</Typography><Typography variant="h4">{project.name}</Typography><Typography color="text.secondary"><LocationOnOutlinedIcon fontSize="inherit" /> {project.district}, {project.state} · {project.category}</Typography></Box><Box className="inspection-score"><Typography variant="h3" fontWeight={800}>{project.riskScore}</Typography><RiskChip project={project} /></Box></Paper><Box className="inspection-grid"><Paper variant="outlined" className="info-panel"><Typography variant="h6">Project information</Typography><Divider sx={{ my: 2 }} />{[["Contractor", project.contractor], ["Sanction amount", formatCrore(project.sanction)], ["Expenditure", formatCrore(project.expenditure)], ["Official status", project.status], ["Completion date", project.completionDate]].map(([l, v]) => <Box className="info-row" key={l}><Typography color="text.secondary">{l}</Typography><Typography fontWeight={700}>{v}</Typography></Box>)}</Paper><Paper variant="outlined" className="info-panel"><Typography variant="h6">Risk explanation</Typography><Divider sx={{ my: 2 }} />{project.reasons.map((r) => <Box className="reason-row" key={r.title}><Typography fontWeight={800} color="error.main">+{r.points}</Typography><Box><Typography fontWeight={700}>{r.title}</Typography><Typography variant="body2" color="text.secondary">{r.description}</Typography></Box></Box>)}</Paper></Box><Box><Typography variant="overline" color="primary">Inspection evidence</Typography><Typography variant="h5">Verification Evidence</Typography><Typography color="text.secondary">Field and citizen-sourced reports available to authorised officials</Typography></Box>{hasEvidence && project.evidence ? <Paper variant="outlined" className="evidence-panel"><Box className="evidence-image"><img src={evidenceImage} alt="Field verification showing the unfinished rural road site at Chandipur" loading="lazy" width={1200} height={800} /><Box className="photo-label"><PhotoCameraOutlinedIcon fontSize="small" /> Field photograph · 08 Sep 2026</Box></Box><Box className="evidence-copy"><Chip color="error" icon={<WarningAmberOutlinedIcon />} label="STATUS MISMATCH" /><Typography variant="overline" sx={{ mt: 2 }}>Field report</Typography><Typography variant="h6">{project.evidence.observedStatus}</Typography><Typography color="text.secondary">{project.evidence.observation}</Typography><Divider sx={{ my: 2 }} /><Box className="status-compare"><Box><Typography variant="caption">OFFICIAL STATUS</Typography><Typography fontWeight={800}>{project.status}</Typography></Box><TrendingUpOutlinedIcon color="error" /><Box><Typography variant="caption">REPORTED GROUND STATUS</Typography><Typography fontWeight={800} color="error.main">{project.evidence.observedStatus}</Typography></Box></Box><Alert severity="error" sx={{ mt: 2 }}><b>Mismatch detected.</b> Prioritise this project for physical inspection.</Alert></Box></Paper> : <Alert severity="info">No mismatch evidence is attached to this project. Routine monitoring records remain available.</Alert>}</Stack>;
}

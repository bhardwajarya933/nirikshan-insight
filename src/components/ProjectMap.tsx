import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { formatCrore, mapProjects, type Project } from "@/lib/projects";

const colors: Record<Project["riskBand"], string> = {
  "Normal": "#2e7d32", "Needs Review": "#d6a800", "Suspicious": "#ed6c02", "High Risk": "#c62828",
};

export default function ProjectMap({ onSelect }: { onSelect: (project: Project) => void }) {
  return (
    <MapContainer center={[22.7, 79.3]} zoom={5} scrollWheelZoom className="project-map">
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {mapProjects.map((project) => (
        <CircleMarker key={project.id} center={[project.lat, project.lng]} radius={9} pathOptions={{ color: colors[project.riskBand], fillColor: colors[project.riskBand], fillOpacity: 0.9, weight: 3 }} eventHandlers={{ click: () => onSelect(project) }}>
          <Popup>
            <strong>{project.name}</strong><br />{project.district}<br />{formatCrore(project.sanction)}<br />{project.contractor}<br /><b>Risk: {project.riskScore}</b>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

import type { Metadata } from "next";
import EquipmentPreview from "@/components/EquipmentPreview";

export const metadata: Metadata = {
  title: "Container & Equipment",
  alternates: { canonical: "/container" },
};

export default function ContainerPreviewPage() {
  return <main><EquipmentPreview /></main>;
}

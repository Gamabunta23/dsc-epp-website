import type { Metadata } from "next";
import EquipmentPreview from "@/components/EquipmentPreview";

export const metadata: Metadata = {
  title: "Container – Designvorschau",
  robots: { index: false, follow: false },
};

export default function ContainerPreviewPage() {
  return <EquipmentPreview />;
}

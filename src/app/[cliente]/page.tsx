import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";
import { slugsValidos, clientesManifest } from "@/clientes/manifest";

interface Props {
  params: Promise<{ cliente: string }>;
}

export function generateStaticParams() {
  return clientesManifest.map((c) => ({ cliente: c.slug }));
}

export default async function ClientePage({ params }: Props) {
  const { cliente } = await params;

  if (!slugsValidos.has(cliente)) {
    notFound();
  }

  const htmlPath = join(process.cwd(), "src", "clientes", cliente, "index.html");

  let html: string;
  try {
    html = readFileSync(htmlPath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ all: "unset", display: "block" }}
    />
  );
}

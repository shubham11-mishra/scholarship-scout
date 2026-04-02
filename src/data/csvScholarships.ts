export interface SchoolScholarship {
  acara_id: string;
  name: string;
  suburb: string;
  postcode: string;
  sector: string;
  website_url: string;
  scholarship_url: string;
  scholarship_confidence: "high" | "medium" | "low" | "not_found";
  scholarship_note: string;
  checked_at: string;
}

export async function loadScholarshipsFromCSV(): Promise<SchoolScholarship[]> {
  const res = await fetch("/data/scholarships.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = values[i] || ""));
    return {
      acara_id: obj.acara_id,
      name: obj.name,
      suburb: obj.suburb,
      postcode: obj.postcode,
      sector: obj.sector,
      website_url: obj.website_url && obj.website_url !== "not_found" ? obj.website_url : "",
      scholarship_url: obj.scholarship_url || "",
      scholarship_confidence: (obj.scholarship_confidence || "not_found") as SchoolScholarship["scholarship_confidence"],
      scholarship_note: obj.scholarship_note,
      checked_at: obj.checked_at,
    };
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

export function getConfidenceBadge(c: SchoolScholarship["scholarship_confidence"]): { label: string; color: string } {
  switch (c) {
    case "high": return { label: "High Confidence", color: "bg-accent/20 text-accent" };
    case "medium": return { label: "Medium", color: "bg-gold/20 text-gold" };
    case "low": return { label: "Low", color: "bg-muted text-muted-foreground" };
    default: return { label: "Not Found", color: "bg-destructive/20 text-destructive" };
  }
}

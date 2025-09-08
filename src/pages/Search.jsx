import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { branches, rooms, students } from "@/lib/data";

export default function Search() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const title = "Search | HostelPro";
    const description = "Search students, rooms, and branches in HostelPro.";
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + "/search");
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { branches: [], rooms: [], students: [] };
    const q = query.toLowerCase();
    return {
      branches: branches.filter(b => b.name.toLowerCase().includes(q) || b.city.toLowerCase().includes(q)),
      rooms: rooms.filter(r => r.roomNumber.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)),
      students: students.filter(s => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)),
    };
  }, [query]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Search</h1>
        <p className="text-muted-foreground">Find students, rooms, and branches</p>
      </header>

      <section>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search across the system..."
            className="pl-9"
            aria-label="Global search"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Branches ({results.branches.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.branches.slice(0, 5).map((b) => (
              <div key={b.id} className="text-sm">
                <p className="font-medium text-foreground">{b.name}</p>
                <p className="text-muted-foreground">{b.city} • {b.address}</p>
              </div>
            ))}
            {query && results.branches.length === 0 && (
              <p className="text-sm text-muted-foreground">No branches found.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rooms ({results.rooms.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.rooms.slice(0, 5).map((r) => (
              <div key={r.id} className="text-sm">
                <p className="font-medium text-foreground">Room {r.roomNumber} • {r.type}</p>
                <p className="text-muted-foreground">Capacity {r.totalCapacity} • {r.status}</p>
              </div>
            ))}
            {query && results.rooms.length === 0 && (
              <p className="text-sm text-muted-foreground">No rooms found.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students ({results.students.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {results.students.slice(0, 5).map((s) => (
              <div key={s.id} className="text-sm">
                <p className="font-medium text-foreground">{s.name}</p>
                <p className="text-muted-foreground">ID {s.studentId} • {s.email}</p>
              </div>
            ))}
            {query && results.students.length === 0 && (
              <p className="text-sm text-muted-foreground">No students found.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

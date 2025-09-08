import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import { getDashboardStats } from "@/lib/data";
import { TrendingUp, Users, Bed, IndianRupee } from "lucide-react";

export default function Analytics() {
  const stats = getDashboardStats();

  useEffect(() => {
    const title = "Hostel Analytics Dashboard | HostelPro"; // <60 chars
    const description = "Hostel analytics overview: occupancy, revenue, and trends."; // <160 chars
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
    canonical.setAttribute("href", window.location.origin + "/analytics");
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Hostel Analytics Dashboard</h1>
        <p className="text-muted-foreground">Insights into occupancy, revenue, and student trends</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Students" value={stats.totalStudents} icon={Users} description="Total enrolled" />
        <StatCard title="Rooms" value={stats.totalRooms} icon={Bed} description="All branches" />
        <StatCard title="Occupancy" value={`${stats.occupancyRate}%`} icon={TrendingUp} description="Current rate" />
        <StatCard title="Revenue" value={`₹${(stats.monthlyRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} description="This month" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-md border border-border/50 bg-card text-muted-foreground flex items-center justify-center">
              Charts coming soon
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-md border border-border/50 bg-card text-muted-foreground flex items-center justify-center">
              Charts coming soon
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

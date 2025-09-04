import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";
import { getDashboardStats, branches } from "@/lib/data";
import {
  Building2,
  Bed,
  Users,
  TrendingUp,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const stats = getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your hostel management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Branches"
          value={stats.totalBranches}
          icon={Building2}
          description="Active hostel branches"
          trend={{ value: 12, label: "from last month", isPositive: true }}
        />
        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon={Bed}
          description="Across all branches"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          description="Currently residing"
          trend={{ value: 8, label: "from last month", isPositive: true }}
        />
        <StatCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          icon={TrendingUp}
          description="Current occupancy"
          className={stats.occupancyRate > 80 ? "border-success/50 bg-success-light" : ""}
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(stats.monthlyRevenue / 100000).toFixed(1)}L`}
          icon={IndianRupee}
          description="This month's collection"
          trend={{ value: 15, label: "from last month", isPositive: true }}
        />
        <StatCard
          title="Pending Payments"
          value={stats.pendingPayments}
          icon={AlertTriangle}
          description="Requires attention"
          className={stats.pendingPayments > 0 ? "border-warning/50 bg-warning-light" : ""}
        />
      </div>

      {/* Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.branchStats.map((branch) => (
              <div key={branch.branchId} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm">{branch.branchName}</h4>
                  <span className="text-sm text-muted-foreground">
                    {branch.occupancyRate}%
                  </span>
                </div>
                <Progress value={branch.occupancyRate} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{branch.availableRooms} rooms available</span>
                  <span>₹{(branch.revenue / 100000).toFixed(1)}L revenue</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New student enrolled</p>
                  <p className="text-xs text-muted-foreground">Arjun Singh - Downtown Branch</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Room maintenance completed</p>
                  <p className="text-xs text-muted-foreground">Room 205 - Tech Park Branch</p>
                </div>
                <span className="text-xs text-muted-foreground">5h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment reminder sent</p>
                  <p className="text-xs text-muted-foreground">3 students - University Campus</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
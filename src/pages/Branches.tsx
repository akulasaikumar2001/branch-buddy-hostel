import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { branches } from "@/lib/data";
import { 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  User, 
  TrendingUp,
  Bed,
  Users,
  Building2
} from "lucide-react";

export default function Branches() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "bg-success text-success-foreground";
    if (rate >= 70) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Branches</h1>
          <p className="text-muted-foreground">Manage your hostel branches</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Branch
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search branches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => {
          const occupancyRate = Math.round((branch.occupiedBeds / branch.totalBeds) * 100);
          
          return (
            <Card key={branch.id} className="hover:shadow-lg transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{branch.name}</CardTitle>
                  <Badge className={getOccupancyColor(occupancyRate)}>
                    {occupancyRate}% Full
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{branch.address}, {branch.city}</span>
                </div>

                {/* Contact */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{branch.contactNumber}</span>
                </div>

                {/* Manager */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  <span>{branch.managerName}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-semibold">{branch.totalRooms}</div>
                    <div className="text-xs text-muted-foreground">Rooms</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-semibold">{branch.occupiedBeds}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-semibold">
                      ₹{(branch.monthlyRevenue / 100000).toFixed(1)}L
                    </div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBranches.length === 0 && (
        <Card>
          <CardContent className="text-center py-10">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No branches found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria" : "Get started by adding your first branch"}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Branch
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rooms, branches, getBranchById } from "@/lib/data";
import { 
  Plus, 
  Search, 
  Bed, 
  Users, 
  Wifi,
  Snowflake,
  Bath,
  DollarSign,
  Settings
} from "lucide-react";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === "all" || room.branchId === selectedBranch;
    const matchesStatus = selectedStatus === "all" || room.status === selectedStatus;
    
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return "bg-success text-success-foreground";
      case 'full': return "bg-destructive text-destructive-foreground";
      case 'maintenance': return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'single': return "1";
      case 'double': return "2"; 
      case 'triple': return "3";
      case 'dormitory': return "4+";
      default: return "?";
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'ac': return <Snowflake className="h-3 w-3" />;
      case 'wifi': return <Wifi className="h-3 w-3" />;
      case 'attached bathroom':
      case 'private bathroom': return <Bath className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rooms</h1>
          <p className="text-muted-foreground">Manage rooms across all branches</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map(branch => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="full">Full</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => {
          const branch = getBranchById(room.branchId);
          
          return (
            <Card key={room.id} className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Room {room.roomNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">{branch?.name}</p>
                  </div>
                  <Badge className={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Room Type & Capacity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      {getTypeIcon(room.type)}
                    </div>
                    <div>
                      <div className="font-medium capitalize">{room.type} Room</div>
                      <div className="text-sm text-muted-foreground">
                        {room.currentOccupancy}/{room.totalCapacity} occupied
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-lg">₹{room.monthlyRent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </div>
                </div>

                {/* Occupancy Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Occupancy</span>
                    <span>{Math.round((room.currentOccupancy / room.totalCapacity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(room.currentOccupancy / room.totalCapacity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <div className="text-sm font-medium mb-2">Amenities</div>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs gap-1">
                        {getAmenityIcon(amenity)}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-10">
            <Bed className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No rooms found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedBranch !== "all" || selectedStatus !== "all" 
                ? "Try adjusting your search criteria" 
                : "Get started by adding your first room"
              }
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Room
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
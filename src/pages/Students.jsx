import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { students, branches, rooms, getBranchById } from "@/lib/data";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building2,
  Bed,
  Users
} from "lucide-react";

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.contactNumber.includes(searchTerm);
    const matchesBranch = selectedBranch === "all" || student.branchId === selectedBranch;
    const matchesStatus = selectedStatus === "all" || student.rentStatus === selectedStatus;
    
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return "bg-success text-success-foreground";
      case 'pending': return "bg-warning text-warning-foreground";
      case 'overdue': return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle2 className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'overdue': return <AlertCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage student profiles and payments</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => {
          const branch = getBranchById(student.branchId);
          const room = rooms.find(r => r.id === student.roomId);
          const daysSinceJoining = Math.floor((Date.now() - student.joiningDate.getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <Card key={student.id} className="hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <Badge className={getStatusColor(student.rentStatus)}>
                        {getStatusIcon(student.rentStatus)}
                        {student.rentStatus}
                      </Badge>
                    </div>
                    {student.studentId && (
                      <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{student.contactNumber}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{student.email}</span>
                  </div>
                </div>

                {/* Location Info */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{branch?.name}</div>
                      <div className="text-xs text-muted-foreground">Branch</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">Room {room?.roomNumber}</div>
                      <div className="text-xs text-muted-foreground">{room?.type}</div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">₹{student.rentAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Monthly Rent</div>
                    </div>
                  </div>
                  {student.lastPaymentDate && (
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {student.lastPaymentDate.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Last Payment</div>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {daysSinceJoining} days ago</span>
                  </div>
                  <div className="text-xs">
                    Emergency: {student.emergencyContact.name}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Payment History
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-10">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedBranch !== "all" || selectedStatus !== "all" 
                ? "Try adjusting your search criteria" 
                : "Get started by adding your first student"
              }
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  contactNumber: string;
  managerName: string;
  totalRooms: number;
  occupiedRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  monthlyRevenue: number;
  createdAt: Date;
}

export interface Room {
  id: string;
  branchId: string;
  roomNumber: string;
  type: 'single' | 'double' | 'triple' | 'dormitory';
  totalCapacity: number;
  currentOccupancy: number;
  monthlyRent: number;
  amenities: string[];
  status: 'available' | 'full' | 'maintenance';
}

export interface Student {
  id: string;
  name: string;
  studentId?: string;
  contactNumber: string;
  email: string;
  branchId: string;
  roomId: string;
  joiningDate: Date;
  rentAmount: number;
  rentStatus: 'paid' | 'pending' | 'overdue';
  lastPaymentDate?: Date;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  documents: {
    idProof: boolean;
    photo: boolean;
    agreement: boolean;
  };
}

export interface DashboardStats {
  totalBranches: number;
  totalRooms: number;
  totalStudents: number;
  occupancyRate: number;
  monthlyRevenue: number;
  pendingPayments: number;
  branchStats: {
    branchId: string;
    branchName: string;
    occupancyRate: number;
    revenue: number;
    availableRooms: number;
  }[];
}
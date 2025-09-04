import { Branch, Room, Student, DashboardStats } from '@/types';

// Sample data for demonstration
export const branches: Branch[] = [
  {
    id: '1',
    name: 'Downtown Branch',
    address: '123 Main Street',
    city: 'Mumbai',
    contactNumber: '+91 98765 43210',
    managerName: 'Rajesh Kumar',
    totalRooms: 50,
    occupiedRooms: 42,
    totalBeds: 150,
    occupiedBeds: 126,
    monthlyRevenue: 378000,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'University Campus Branch',
    address: '456 College Road',
    city: 'Delhi',
    contactNumber: '+91 87654 32109',
    managerName: 'Priya Sharma',
    totalRooms: 75,
    occupiedRooms: 68,
    totalBeds: 200,
    occupiedBeds: 180,
    monthlyRevenue: 540000,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Tech Park Branch',
    address: '789 IT Avenue',
    city: 'Bangalore',
    contactNumber: '+91 76543 21098',
    managerName: 'Amit Patel',
    totalRooms: 60,
    occupiedRooms: 45,
    totalBeds: 180,
    occupiedBeds: 135,
    monthlyRevenue: 405000,
    createdAt: new Date('2024-03-05'),
  },
];

export const rooms: Room[] = [
  {
    id: '1',
    branchId: '1',
    roomNumber: '101',
    type: 'triple',
    totalCapacity: 3,
    currentOccupancy: 3,
    monthlyRent: 9000,
    amenities: ['AC', 'WiFi', 'Study Table'],
    status: 'full',
  },
  {
    id: '2',
    branchId: '1',
    roomNumber: '102',
    type: 'double',
    totalCapacity: 2,
    currentOccupancy: 1,
    monthlyRent: 12000,
    amenities: ['AC', 'WiFi', 'Attached Bathroom'],
    status: 'available',
  },
  {
    id: '3',
    branchId: '2',
    roomNumber: '201',
    type: 'single',
    totalCapacity: 1,
    currentOccupancy: 1,
    monthlyRent: 15000,
    amenities: ['AC', 'WiFi', 'Private Bathroom', 'Balcony'],
    status: 'full',
  },
];

export const students: Student[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    studentId: 'CS2021001',
    contactNumber: '+91 99887 76655',
    email: 'arjun.singh@email.com',
    branchId: '1',
    roomId: '1',
    joiningDate: new Date('2024-01-15'),
    rentAmount: 3000,
    rentStatus: 'paid',
    lastPaymentDate: new Date('2024-08-01'),
    emergencyContact: {
      name: 'Vikram Singh',
      phone: '+91 98765 43210',
      relation: 'Father',
    },
    documents: {
      idProof: true,
      photo: true,
      agreement: true,
    },
  },
  {
    id: '2',
    name: 'Sneha Gupta',
    studentId: 'EC2021045',
    contactNumber: '+91 88776 65544',
    email: 'sneha.gupta@email.com',
    branchId: '2',
    roomId: '3',
    joiningDate: new Date('2024-02-20'),
    rentAmount: 15000,
    rentStatus: 'pending',
    emergencyContact: {
      name: 'Ravi Gupta',
      phone: '+91 87654 32109',
      relation: 'Father',
    },
    documents: {
      idProof: true,
      photo: true,
      agreement: true,
    },
  },
];

export const getDashboardStats = (): DashboardStats => {
  const totalBranches = branches.length;
  const totalRooms = branches.reduce((sum, branch) => sum + branch.totalRooms, 0);
  const totalStudents = students.length;
  const totalBeds = branches.reduce((sum, branch) => sum + branch.totalBeds, 0);
  const occupiedBeds = branches.reduce((sum, branch) => sum + branch.occupiedBeds, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);
  const monthlyRevenue = branches.reduce((sum, branch) => sum + branch.monthlyRevenue, 0);
  const pendingPayments = students.filter(s => s.rentStatus === 'pending' || s.rentStatus === 'overdue').length;

  const branchStats = branches.map(branch => ({
    branchId: branch.id,
    branchName: branch.name,
    occupancyRate: Math.round((branch.occupiedBeds / branch.totalBeds) * 100),
    revenue: branch.monthlyRevenue,
    availableRooms: branch.totalRooms - branch.occupiedRooms,
  }));

  return {
    totalBranches,
    totalRooms,
    totalStudents,
    occupancyRate,
    monthlyRevenue,
    pendingPayments,
    branchStats,
  };
};

export const getBranchById = (id: string) => branches.find(b => b.id === id);
export const getRoomsByBranchId = (branchId: string) => rooms.filter(r => r.branchId === branchId);
export const getStudentsByBranchId = (branchId: string) => students.filter(s => s.branchId === branchId);
export const getStudentsByRoomId = (roomId: string) => students.filter(s => s.roomId === roomId);
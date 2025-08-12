// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import {
//   Package,
//   Truck,
//   Users,
//   DollarSign,
//   TrendingUp,
//   TrendingDown,
//   Clock,
//   CheckCircle,
//   AlertTriangle,
//   Train
// } from "lucide-react";

// Removed old slider/tab navigation as requested

import { useEffect, useState } from "react";

// export default function AdminDashboard() {
//   // Mock data for admin dashboard
//   const stats = {
//     totalBookings: 1247,
//     activeDeliveries: 89,
//     totalUsers: 456,
//     totalRevenue: 125480.50,
//     monthlyGrowth: 12.5,
//     completionRate: 96.8,
//     averageDeliveryTime: 2.3
//   };

//   const transportStats = {
//     truck: { count: 756, percentage: 60.6 },
//     train: { count: 491, percentage: 39.4 }
//   };

//   const recentBookings = [
//     {
//       id: "BK1247",
//       customer: "John Smith",
//       from: "New York, NY",
//       to: "Boston, MA",
//       status: "In Transit",
//       amount: 150.00,
//       driver: "Mike Johnson",
//       mode: "truck"
//     },
//     {
//       id: "BK1246",
//       customer: "Sarah Wilson",
//       from: "Chicago, IL",
//       to: "Detroit, MI",
//       status: "Pending",
//       amount: 120.00,
//       driver: "Unassigned",
//       mode: "truck"
//     },
//     {
//       id: "BK1245",
//       customer: "Tech Corp",
//       from: "Los Angeles, CA",
//       to: "San Francisco, CA",
//       status: "Delivered",
//       amount: 200.00,
//       driver: "Train Schedule A",
//       mode: "train"
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Delivered": return "bg-success";
//       case "In Transit": return "bg-accent";
//       case "Pending": return "bg-warning";
//       default: return "bg-muted";
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Delivered": return <CheckCircle className="h-4 w-4" />;
//       case "In Transit": return <Clock className="h-4 w-4" />;
//       case "Pending": return <AlertTriangle className="h-4 w-4" />;
//       default: return <Package className="h-4 w-4" />;
//     }
//   };

//   // Fun greeting
//   const [greeting, setGreeting] = useState('');
//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting('Good morning');
//     else if (hour < 18) setGreeting('Good afternoon');
//     else setGreeting('Good evening');
//   }, []);

//   return (
//     <div className="space-y-6 min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 50%, #c7d2fe 100%)' }}>
//       {/* Confetti Animation */}
//       <div className="pointer-events-none fixed inset-0 z-50 flex justify-center items-start">
//         <span className="confetti-mascot" role="img" aria-label="party">🎉</span>
//       </div>
//       {/* Playful Mascot */}
//       <div className="absolute top-8 right-8 z-20 animate-bounce">
//         <span className="text-5xl select-none" title="CargoStream Mascot">🦄</span>
//       </div>
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 absolute -top-32 -left-32 animate-pulse" />
//         <div className="w-80 h-80 bg-blue-200 rounded-full blur-2xl opacity-30 absolute bottom-0 right-0 animate-pulse" />
//         <div className="w-60 h-60 bg-pink-200 rounded-full blur-2xl opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
//       </div>
//       <div className="relative z-10">
//         <AdminNavbar />
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-pink-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg">
//               {greeting}, Admin! <span className="ml-2">🚀</span>
//             </h1>
//             <p className="text-muted-foreground text-lg mt-1 italic animate-fade-in">
//               "Success is the sum of small efforts, repeated day in and day out."
//             </p>
//             <p className="text-muted-foreground text-base mt-2">
//               Manage your delivery platform operations with style and fun!
//             </p>
//           </div>
//           <div className="flex gap-2 mt-4 sm:mt-0">
//             <Button variant="outline" className="hover:scale-110 transition-transform hover:bg-indigo-100">Export Report</Button>
//             <Button className="bg-gradient-to-r from-indigo-500 via-pink-400 to-blue-500 text-white shadow-xl hover:scale-110 transition-transform">Manage Settings</Button>
//             <Button variant="outline" className="hover:scale-110 transition-transform hover:bg-pink-100" onClick={async () => {
//               // Send a test notification to the current admin
//               const token = localStorage.getItem('token');
//               if (!token) return;
//               const response = await fetch('http://localhost:5000/api/notifications', {
//                 method: 'POST',
//                 headers: {
//                   'Authorization': `Bearer ${token}`,
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   title: 'Test Notification',
//                   message: 'This is a test notification for admin.',
//                   type: 'system',
//                   priority: 'high'
//                 })
//               });
//               if (response.ok) {
//                 alert('Test notification sent! Check your notification bell.');
//               } else {
//                 alert('Failed to send test notification.');
//               }
//             }}>Send Test Notification �</Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Stats */}
//       <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="hover:scale-105 transition-transform duration-300 shadow-xl bg-white/80 backdrop-blur-md">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
//             <Package className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</div>
//             <p className="text-xs text-muted-foreground">
//               <span className="text-success flex items-center">
//                 <TrendingUp className="h-3 w-3 mr-1" />
//                 +{stats.monthlyGrowth}%
//               </span>
//               from last month
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="hover:scale-105 transition-transform duration-300 shadow-xl bg-white/80 backdrop-blur-md">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
//             <Truck className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.activeDeliveries}</div>
//             <p className="text-xs text-muted-foreground">Currently in transit</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:scale-105 transition-transform duration-300 shadow-xl bg-white/80 backdrop-blur-md">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalUsers}</div>
//             <p className="text-xs text-muted-foreground">Registered customers</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:scale-105 transition-transform duration-300 shadow-xl bg-white/80 backdrop-blur-md">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
//             <p className="text-xs text-muted-foreground">This month</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Performance Metrics */}
//       <div className="relative z-10 grid gap-6 lg:grid-cols-3">
//         <Card className="hover:scale-105 transition-transform duration-300 shadow-lg bg-white/80 backdrop-blur-md">
//           <CardHeader>
//             <CardTitle>Transport Mode Distribution</CardTitle>
//             <CardDescription>Breakdown by delivery method</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Truck className="h-4 w-4 mr-2 text-primary" />
//                   <span className="text-sm font-medium">Truck Delivery</span>
//                 </div>
//                 <span className="text-sm text-muted-foreground">{transportStats.truck.percentage}%</span>
//               </div>
//               <Progress value={transportStats.truck.percentage} className="h-2" />
//               <p className="text-xs text-muted-foreground">{transportStats.truck.count} deliveries</p>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <Train className="h-4 w-4 mr-2 text-accent" />
//                   <span className="text-sm font-medium">Train Freight</span>
//                 </div>
//                 <span className="text-sm text-muted-foreground">{transportStats.train.percentage}%</span>
//               </div>
//               <Progress value={transportStats.train.percentage} className="h-2" />
//               <p className="text-xs text-muted-foreground">{transportStats.train.count} deliveries</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:scale-105 transition-transform duration-300 shadow-lg bg-white/80 backdrop-blur-md">
//           <CardHeader>
//             <CardTitle>Performance Metrics</CardTitle>
//             <CardDescription>Key operational indicators</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-sm font-medium">Completion Rate</span>
//                 <span className="text-sm text-muted-foreground">{stats.completionRate}%</span>
//               </div>
//               <Progress value={stats.completionRate} className="h-2" />
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-sm font-medium">Avg. Delivery Time</span>
//                 <span className="text-sm text-muted-foreground">{stats.averageDeliveryTime} days</span>
//               </div>
//               <div className="text-xs text-muted-foreground">
//                 <span className="text-success">-0.2 days</span> vs last month
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:scale-105 transition-transform duration-300 shadow-lg bg-white/80 backdrop-blur-md">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Administrative tools</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <Button className="w-full" variant="outline" asChild>
//               <Link to="/admin/users">
//                 <Users className="mr-2 h-4 w-4" />
//                 Manage Users
//               </Link>
//             </Button>
//             <Button className="w-full" variant="outline" asChild>
//               <Link to="/admin/bookings">
//                 <Package className="mr-2 h-4 w-4" />
//                 View All Bookings
//               </Link>
//             </Button>
//             <Button className="w-full" variant="outline">
//               <DollarSign className="mr-2 h-4 w-4" />
//               Pricing Configuration
//             </Button>
//             <Button className="w-full" variant="outline" asChild>
//               <Link to="/admin/reports">
//                 <TrendingUp className="mr-2 h-4 w-4" />
//                 Generate Reports
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Bookings */}
//       <Card className="relative z-10 hover:scale-102 transition-transform duration-300 shadow-2xl bg-white/90 backdrop-blur-md">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Recent Bookings</CardTitle>
//               <CardDescription>Latest delivery requests and assignments</CardDescription>
//             </div>
//             <Button variant="outline" asChild>
//               <Link to="/admin/bookings">View All Bookings</Link>
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentBookings.map((booking, i) => (
//               <div
//                 key={booking.id}
//                 className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-blue-50/60 transition-colors shadow-sm group"
//                 style={{ animation: `fadeInUp 0.5s ${i * 0.1}s both` }}
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="bg-gradient-to-br from-indigo-200 to-blue-200 p-2 rounded-full group-hover:scale-110 transition-transform">
//                     {booking.mode === "truck" ?
//                       <Truck className="h-4 w-4 text-primary" /> :
//                       <Train className="h-4 w-4 text-primary" />
//                     }
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="font-medium">#{booking.id}</p>
//                       <Badge className={getStatusColor(booking.status)}>
//                         {getStatusIcon(booking.status)}
//                         <span className="ml-1">{booking.status}</span>
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{booking.customer}</p>
//                     <p className="text-xs text-muted-foreground">{booking.from} → {booking.to}</p>
//                   </div>
//                 </div>
//                 <div className="text-right mt-2 md:mt-0">
//                   <p className="font-medium text-lg">${booking.amount.toFixed(2)}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Driver: {booking.driver}
//                   </p>
//                   <div className="flex gap-1 mt-1">
//                     <Button size="sm" variant="outline" className="hover:bg-indigo-100">Edit</Button>
//                     <Button size="sm" variant="outline" className="hover:bg-blue-100">Assign</Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Fun CSS animation */}
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: none; }
//         }
//         .animate-gradient-x {
//           background-size: 200% 200%;
//           animation: gradient-x 3s ease-in-out infinite;
//         }
//         @keyframes gradient-x {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .confetti-mascot {
//           font-size: 2.5rem;
//           animation: confetti-float 2.5s infinite alternate cubic-bezier(.4,0,.2,1);
//         }
//         @keyframes confetti-float {
//           0% { transform: translateY(0) rotate(-10deg); }
//           100% { transform: translateY(40px) rotate(10deg); }
//         }
//         .animate-fade-in {
//           animation: fadeIn 2s;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// }













import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
// import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Truck,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  Train,
  Bell,
  Settings,
  Download,
  BarChart3,
  FileText,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";

function AdminNavbar() {
  const location = useLocation();
  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/bookings", label: "Bookings", icon: Package },
    { to: "/admin/reports", label: "Reports", icon: FileText },
    { to: "/admin/pricingRules", label: "Pricing", icon: DollarSign }
  ];

  return (
    <nav className="flex flex-wrap gap-2 md:gap-1 mb-8 p-1 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
      {navLinks.map(link => {
        const IconComponent = link.icon;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-[1.02] text-sm ${location.pathname === link.to
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
          >
            <IconComponent className="h-4 w-4" />
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// import { useEffect, useState } from "react";

export default function AdminDashboard() {

  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeDeliveries: 0,
    totalUsers: 0,
    totalRevenue: 0,
    truckCount: 0,
    trainCount: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [error, setError] = useState("");
  const [performance, setPerformance] = useState({
    completedToday: 0,
    pendingAssignments: 0,
    successRate: 0
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    fetchStats();
    fetchPerformance();
  }, []);

  const fetchPerformance = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/reports?reportType=performance", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setPerformance({
          completedToday: data.reportData.completedToday || 0,
          pendingAssignments: data.reportData.pendingAssignments || 0,
          successRate: data.reportData.successRate || 0
        });
      }
    } catch (err) {
      // ignore error for now
    }
  };

  const fetchStats = async () => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      // Bookings & revenue
      const bookingsRes = await fetch("http://localhost:5000/api/admin/reports?reportType=bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const bookingsData = await bookingsRes.json();
      if (!bookingsData.success) throw new Error(bookingsData.message || "Failed to fetch stats");
      const { totalBookings, totalRevenue, statusCounts, bookings } = bookingsData.reportData;
      // Users
      const usersRes = await fetch("http://localhost:5000/api/admin/reports?reportType=users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usersData = await usersRes.json();
      if (!usersData.success) throw new Error(usersData.message || "Failed to fetch users");
      const { totalUsers } = usersData.reportData;
      // Transport stats
      const truckCount = bookings.filter(b => b.modeOfTransport === "truck").length;
      const trainCount = bookings.filter(b => b.modeOfTransport === "train").length;
      setStats({
        totalBookings,
        activeDeliveries: statusCounts["In Transit"] || 0,
        totalUsers,
        totalRevenue,
        truckCount,
        trainCount,
      });
      setRecentBookings(bookings.slice(0, 5));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStats();
  };

  const LoadingSkeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8 space-y-6">
        {/* Removed AdminNavbar as requested */}

        {/* Professional Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {greeting}, Administrator
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome to your dashboard. Monitor and manage your delivery operations.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Removed Refresh button as requested */}
            {/* Removed Export Report and Settings buttons as requested */}
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-24" />
                  <LoadingSkeleton className="h-4 w-32" />
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalBookings}</div>
                  <p className="text-xs text-gray-500 mt-1">Total bookings</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Deliveries</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Truck className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-16" />
                  <LoadingSkeleton className="h-4 w-28" />
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.activeDeliveries}</div>
                  <p className="text-xs text-gray-500 mt-1">Active deliveries</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-20" />
                  <LoadingSkeleton className="h-4 w-24" />
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                  <p className="text-xs text-gray-500 mt-1">Total users</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-28" />
                  <LoadingSkeleton className="h-4 w-20" />
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <p className="text-xs text-gray-500 mt-1">Total revenue</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transport Distribution Pie Chart */}
          <Card className="hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Transport Distribution
              </CardTitle>
              <CardDescription>Breakdown by delivery method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  <LoadingSkeleton className="h-32 w-32" />
                </div>
              ) : (
                <Pie
                  data={{
                    labels: ['Truck', 'Train'],
                    datasets: [
                      {
                        data: [stats.truckCount, stats.trainCount],
                        backgroundColor: ['#3b82f6', '#a78bfa'],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: true, position: 'bottom' },
                    },
                    maintainAspectRatio: false,
                  }}
                  height={180}
                />
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics - Today's Operational Highlights */}
          <Card className="hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Today's Operational Highlights
              </CardTitle>
              <CardDescription>Performance Metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  <LoadingSkeleton className="h-8 w-24" />
                  <LoadingSkeleton className="h-8 w-24" />
                  <LoadingSkeleton className="h-8 w-24" />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Completed Today</span>
                    <span className="text-2xl font-bold text-green-600">{performance.completedToday}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Pending Assignments</span>
                    <span className="text-2xl font-bold text-yellow-600">{performance.pendingAssignments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Success Rate</span>
                    <span className="text-2xl font-bold text-blue-600">{performance.successRate}%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-purple-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Administrative tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                asChild
              >
                <Link to="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
              <Button
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                asChild
              >
                <Link to="/admin/bookings">
                  <Package className="mr-2 h-4 w-4" />
                  View Bookings
                </Link>
              </Button>
              <Button
                className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                asChild
              >
                <Link to="/admin/pricingRules">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pricing Configuration
                </Link>
              </Button>
              <Button
                className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white transition-colors duration-200"
                asChild
              >
                <Link to="/admin/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Reports
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity section removed as requested */}
      </div>
    </div>
  );
}
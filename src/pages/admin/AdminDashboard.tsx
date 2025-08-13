import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
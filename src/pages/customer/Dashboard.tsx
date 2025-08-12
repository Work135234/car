import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// Mock implementations for demo purposes
const useAuth = () => ({ user: { name: 'John Doe' } });
const useToast = () => ({
  toast: ({ title, description, variant }) => {
    alert(`${title}: ${description}`);
  }
});
const useNavigate = () => (path) => console.log('Navigate to:', path);
const Link = ({ to, children, ...props }) => (
  <button {...props} onClick={() => console.log('Navigate to:', to)}>
    {children}
  </button>
);
import {
  Package,
  Truck,
  MapPin,
  Clock,
  Plus,
  TrendingUp,
  DollarSign,
  Calendar,
  Bell,
  Filter,
  Eye,
  AlertCircle,
  RefreshCw,
  Search,
  CheckCircle,
  Timer,
  Star,
  Zap
} from "lucide-react";

interface Booking {
  id: string;
  from: string;
  to: string;
  status: string;
  date: string;
  amount: number;
  progress: number;
}

interface Stats {
  totalBookings: number;
  activeDeliveries: number;
  completedDeliveries: number;
  totalSpent: number;
}

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    activeDeliveries: 0,
    completedDeliveries: 0,
    totalSpent: 0
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, bookingsResponse] = await Promise.all([
        fetch('/api/bookings/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        fetch('/api/bookings/recent?limit=3', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        setRecentBookings(bookingsData);
      }

      setLastUpdated(new Date());
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
          icon: CheckCircle,
          bgColor: "from-green-50 to-emerald-50",
          borderColor: "border-green-200"
        };
      case "In Transit":
        return {
          color: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
          icon: Truck,
          bgColor: "from-blue-50 to-cyan-50",
          borderColor: "border-blue-200"
        };
      case "Pending":
        return {
          color: "bg-gradient-to-r from-orange-500 to-amber-500 text-white",
          icon: Timer,
          bgColor: "from-orange-50 to-amber-50",
          borderColor: "border-orange-200"
        };
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-slate-500 text-white",
          icon: Package,
          bgColor: "from-gray-50 to-slate-50",
          borderColor: "border-gray-200"
        };
    }
  };

  const handleViewBooking = (bookingId: string) => {
    navigate(`/tracking?id=${bookingId}`);
  };

  const handleCreateBooking = () => {
    navigate('/booking');
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const LoadingSkeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
      </div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  {getGreeting()}, {user?.name || 'Valued Customer'}!
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600">Track shipments and manage your deliveries</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 font-medium">Premium</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="hover:scale-105 transition-all duration-200 border-gray-300"
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/booking">
                <Plus className="mr-2 h-5 w-5" />
                New Booking
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-md">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-16" />
                  <LoadingSkeleton className="h-4 w-24" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalBookings || '-'}</div>
                  <div className="flex items-center text-xs mt-2">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-gray-500 ml-1">from last month</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Active Deliveries</CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-md">
                <Truck className="h-4 w-4 text-white animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-12" />
                  <LoadingSkeleton className="h-4 w-28" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">{stats.activeDeliveries || '-'}</div>
                  <p className="text-xs text-gray-500 mt-2">Currently in transit</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-md">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-16" />
                  <LoadingSkeleton className="h-4 w-20" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">{stats.completedDeliveries || '-'}</div>
                  <div className="flex items-center text-xs mt-2">
                    <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                    <span className="text-green-600 font-medium">98.5%</span>
                    <span className="text-gray-500 ml-1">success rate</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-md">
                <DollarSign className="h-4 w-4 text-white animate-bounce" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-2">
                  <LoadingSkeleton className="h-8 w-20" />
                  <LoadingSkeleton className="h-4 w-16" />
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-gray-900">
                    ${stats.totalSpent?.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">This year</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="group hover:scale-[1.01] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Recent Bookings
                </CardTitle>
                <CardDescription className="text-gray-600">Your latest shipment activities</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
                  <Link to="/tracking">View All</Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <LoadingSkeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <LoadingSkeleton className="h-5 w-3/4" />
                      <LoadingSkeleton className="h-4 w-1/2" />
                    </div>
                    <LoadingSkeleton className="h-10 w-24" />
                  </div>
                ))}
              </div>
            ) : recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking, index) => {
                  const statusConfig = getStatusConfig(booking.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={booking.id}
                      className={`group/item flex flex-col lg:flex-row lg:items-center justify-between p-6 border rounded-xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r ${statusConfig.bgColor} ${statusConfig.borderColor} hover:scale-[1.02]`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-2xl shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <StatusIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-lg text-gray-800">#{booking.id}</p>
                            <Badge className={`${statusConfig.color} border-0 px-3 py-1 shadow-sm font-medium`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium">{booking.from}</span>
                            <span className="mx-2">→</span>
                            <span className="font-medium">{booking.to}</span>
                          </div>
                          {booking.status === "In Transit" && (
                            <div className="mt-3 max-w-xs">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span className="font-medium">Delivery Progress</span>
                                <span className="font-bold">{booking.progress}%</span>
                              </div>
                              <div className="relative">
                                <Progress value={booking.progress} className="h-2 bg-gray-200" />
                                <div
                                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${booking.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-center lg:text-right space-y-3 min-w-[140px]">
                        <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${booking.amount.toFixed(2)}
                        </p>
                        <div className="flex items-center justify-center lg:justify-end text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <Button
                          onClick={() => handleViewBooking(booking.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                          size="sm"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Track Order
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Recent Bookings</h3>
                <p className="text-gray-500 mb-6">
                  Start by creating your first booking to see your shipment history here.
                </p>
                <Button
                  onClick={handleCreateBooking}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Booking
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
          <Card className="group hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center text-lg font-bold text-gray-900">
                <div className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mr-3 shadow-md">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                Create Booking
              </CardTitle>
              <CardDescription className="text-gray-600">
                Schedule a new delivery with instant pricing and real-time tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Button
                onClick={handleCreateBooking}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center text-lg font-bold text-gray-900">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mr-3 shadow-md">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                Track Shipment
              </CardTitle>
              <CardDescription className="text-gray-600">
                Real-time tracking with GPS updates and delivery notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/tracking">
                  <Eye className="mr-2 h-4 w-4" />
                  Track Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center text-lg font-bold text-gray-900">
                <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl mr-3 shadow-md">
                  <Bell className="h-5 w-5 text-white animate-pulse" />
                </div>
                Notifications
              </CardTitle>
              <CardDescription className="text-gray-600">
                Stay updated with delivery alerts and status changes
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => {
                  toast({
                    title: "Notifications Updated",
                    description: "All notifications have been marked as read.",
                    variant: "success"
                  });
                }}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Mark All Read (3)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
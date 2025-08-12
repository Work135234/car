import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  Users,
  Route,
  AlertTriangle,
  CheckCircle,
  Navigation,
  RefreshCw,
  Filter,
  Search,
  Settings,
  Bell,
  Calendar,
  TrendingUp,
  Timer,
  Phone,
  MessageSquare,
  Map,
  Activity
} from "lucide-react";

// Mock interfaces for TypeScript
interface Delivery {
  id: string;
  orderId: string;
  customer: string;
  origin: string;
  destination: string;
  status: 'assigned' | 'in_transit' | 'delivered' | 'delayed' | 'pending';
  driver: string;
  vehicle: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedTime: string;
  progress: number;
  value: number;
  distance: number;
  assignedTime: string;
}

interface DispatchStats {
  activeDeliveries: number;
  completedToday: number;
  availableDrivers: number;
  delayedDeliveries: number;
  avgDeliveryTime: number;
  onTimeRate: number;
}

// Mock data
const mockStats: DispatchStats = {
  activeDeliveries: 24,
  completedToday: 18,
  availableDrivers: 7,
  delayedDeliveries: 2,
  avgDeliveryTime: 2.4,
  onTimeRate: 94.2
};

const mockDeliveries: Delivery[] = [
  {
    id: "DEL001",
    orderId: "ORD-2024-001",
    customer: "TechCorp Ltd.",
    origin: "New York, NY",
    destination: "Boston, MA",
    status: "in_transit",
    driver: "John Smith",
    vehicle: "TRK-001",
    priority: "high",
    estimatedTime: "2h 15m",
    progress: 68,
    value: 1200.00,
    distance: 215,
    assignedTime: "08:30"
  },
  {
    id: "DEL002",
    orderId: "ORD-2024-002",
    customer: "RetailMax Inc.",
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    status: "delayed",
    driver: "Sarah Wilson",
    vehicle: "TRK-002",
    priority: "urgent",
    estimatedTime: "1h 45m",
    progress: 45,
    value: 850.00,
    distance: 280,
    assignedTime: "09:15"
  },
  {
    id: "DEL003",
    orderId: "ORD-2024-003",
    customer: "Global Supplies",
    origin: "Los Angeles, CA",
    destination: "San Diego, CA",
    status: "assigned",
    driver: "Mike Johnson",
    vehicle: "TRK-003",
    priority: "medium",
    estimatedTime: "3h 20m",
    progress: 0,
    value: 650.00,
    distance: 120,
    assignedTime: "10:00"
  }
];

export default function DispatcherDashboard() {
  const [stats, setStats] = useState<DispatchStats>(mockStats);
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
          icon: CheckCircle,
          bgColor: 'from-green-50 to-emerald-50',
          borderColor: 'border-green-200'
        };
      case 'in_transit':
        return {
          color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
          icon: Truck,
          bgColor: 'from-blue-50 to-cyan-50',
          borderColor: 'border-blue-200'
        };
      case 'delayed':
        return {
          color: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
          icon: AlertTriangle,
          bgColor: 'from-red-50 to-pink-50',
          borderColor: 'border-red-200'
        };
      case 'assigned':
        return {
          color: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white',
          icon: Clock,
          bgColor: 'from-orange-50 to-amber-50',
          borderColor: 'border-orange-200'
        };
      default:
        return {
          color: 'bg-gradient-to-r from-gray-500 to-slate-500 text-white',
          icon: Package,
          bgColor: 'from-gray-50 to-slate-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setLoading(false);
  };

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    setDeliveries(prev =>
      prev.map(delivery =>
        delivery.id === deliveryId
          ? { ...delivery, status: newStatus as any }
          : delivery
      )
    );
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    if (selectedFilter === 'all') return true;
    return delivery.status === selectedFilter;
  });

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
      </div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  {getGreeting()}, Dispatcher!
                </h1>
                <p className="text-gray-600 text-lg">Manage deliveries and coordinate logistics operations</p>
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
              className="hover:scale-105 transition-all duration-200"
              disabled={loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-200"
            >
              <Bell className="mr-2 h-4 w-4" />
              Alerts (3)
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Active Deliveries</CardTitle>
              <div className="p-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg shadow-md">
                <Truck className="h-4 w-4 text-white animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-gray-900">{stats.activeDeliveries}</div>
              <p className="text-xs text-blue-600 font-medium mt-2">Currently dispatched</p>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Today</CardTitle>
              <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-md">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-gray-900">{stats.completedToday}</div>
              <div className="flex items-center text-xs mt-2">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600 font-medium">+15%</span>
                <span className="text-gray-500 ml-1">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">Available Drivers</CardTitle>
              <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg shadow-md">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-gray-900">{stats.availableDrivers}</div>
              <p className="text-xs text-purple-600 font-medium mt-2">Ready for dispatch</p>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">On-Time Rate</CardTitle>
              <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-md">
                <Timer className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-gray-900">{stats.onTimeRate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.onTimeRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Real-Time Metrics
              </CardTitle>
              <CardDescription>Current operational performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Average Delivery Time</span>
                  <span className="text-lg font-bold text-blue-600">{stats.avgDeliveryTime}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Delayed Deliveries</span>
                  <span className="text-lg font-bold text-red-600">{stats.delayedDeliveries}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-400 to-pink-500 h-2 rounded-full w-1/6"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-green-600" />
                Route Optimization
              </CardTitle>
              <CardDescription>Delivery efficiency insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                <p className="text-sm text-gray-600">Route Efficiency</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-11/12"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-purple-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Dispatch management tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                <Package className="mr-2 h-4 w-4" />
                Assign New Delivery
              </Button>
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white transition-colors">
                <Map className="mr-2 h-4 w-4" />
                Optimize Routes
              </Button>
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                <Users className="mr-2 h-4 w-4" />
                Manage Drivers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Deliveries */}
        <Card className="group hover:scale-[1.01] transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Active Deliveries
                </CardTitle>
                <CardDescription>Monitor and manage ongoing deliveries</CardDescription>
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
            ) : (
              <div className="space-y-4">
                {filteredDeliveries.map((delivery, index) => {
                  const statusConfig = getStatusConfig(delivery.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={delivery.id}
                      className={`group/item flex flex-col xl:flex-row xl:items-center justify-between p-6 border rounded-xl transition-all duration-300 hover:shadow-lg bg-gradient-to-r ${statusConfig.bgColor} ${statusConfig.borderColor} hover:scale-[1.02]`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-4 mb-4 xl:mb-0 flex-1">
                        <div className="relative">
                          <div className="bg-white p-3 rounded-2xl shadow-md group-hover/item:scale-110 transition-transform duration-300">
                            <StatusIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          {delivery.priority === 'urgent' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-gray-800">#{delivery.id}</h3>
                            <Badge className={`${statusConfig.color} border-0 px-3 py-1 shadow-sm font-medium`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {delivery.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={`${getPriorityConfig(delivery.priority)} border px-2 py-1 text-xs font-medium`}>
                              {delivery.priority.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 mb-1">
                                <span className="font-medium">Customer:</span> {delivery.customer}
                              </p>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                <span className="font-medium">{delivery.origin}</span>
                                <span className="mx-2">→</span>
                                <span className="font-medium">{delivery.destination}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-600 mb-1">
                                <span className="font-medium">Driver:</span> {delivery.driver}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Vehicle:</span> {delivery.vehicle}
                              </p>
                            </div>
                          </div>

                          {delivery.status === 'in_transit' && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                <span className="font-medium">Delivery Progress</span>
                                <span className="font-bold">{delivery.progress}%</span>
                              </div>
                              <div className="relative">
                                <Progress value={delivery.progress} className="h-2 bg-gray-200" />
                                <div
                                  className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${delivery.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row xl:flex-col gap-3 xl:min-w-[160px]">
                        <div className="text-center xl:text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ${delivery.value.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">{delivery.distance} miles</p>
                          <div className="flex items-center justify-center xl:justify-end text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            ETA: {delivery.estimatedTime}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-200">
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all duration-200">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
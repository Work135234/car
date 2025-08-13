import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Edit, Trash2, Plus, Search, Shield, Truck, UserCheck } from "lucide-react";

export default function ManageUsers() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newUserRole, setNewUserRole] = useState("");

  const [users, setUsers] = useState([]);
  const [userBookings, setUserBookings] = useState({}); // { [userId]: bookingCount }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (result.success) {
          setUsers(result.users || []);
          // Fetch booking counts for each user
          const bookingsObj = {};
          await Promise.all((result.users || []).map(async (user) => {
            try {
              const bookingsRes = await fetch(`http://localhost:5000/api/admin/bookings?customerId=${user._id || user.id}`);
              const bookingsData = await bookingsRes.json();
              bookingsObj[user._id || user.id] = bookingsData.success ? bookingsData.pagination?.totalBookings || 0 : 0;
            } catch {
              bookingsObj[user._id || user.id] = 0;
            }
          }));
          setUserBookings(bookingsObj);
        } else {
          setError(result.message || 'Failed to fetch users');
        }
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-destructive";
      case "dispatcher": return "bg-accent";
      case "customer": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Shield className="h-3 w-3" />;
      case "dispatcher": return <Truck className="h-3 w-3" />;
      case "customer": return <User className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-success" : "bg-warning";
  };

  const handleRoleChange = (userId: string) => {
    if (newUserRole) {
      toast({
        title: "Role Updated",
        description: `User role has been updated to ${newUserRole}`,
      });
      setSelectedUser(null);
      setNewUserRole("");
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    toast({
      title: "User Deleted",
      description: `${userName} has been removed from the system`,
      variant: "destructive"
    });
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast({
      title: "Status Updated",
      description: `User status changed to ${newStatus}`,
    });
  };

  // Defensive: ensure users is always an array of objects
  const safeUsers = Array.isArray(users) ? users.filter(u => u && typeof u === 'object' && u.name && u.email && u.role) : [];
  const filteredUsers = safeUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" ||
      (user.role && user.role.toLowerCase() === roleFilter.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">
            View and manage user accounts and permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role && u.role.toLowerCase() === "customer").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Customers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispatchers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role && u.role.toLowerCase() === "dispatcher").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Drivers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role && u.role.toLowerCase() === "admin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              System administrators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="dispatcher">Dispatcher</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id || user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium flex items-center gap-2">
                      {user.name}
                      <div
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold bg-muted text-primary border border-primary/20 shadow-sm capitalize"
                        style={{ minWidth: 60, textAlign: 'center' }}
                      >
                        {user.role}
                      </div>
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Joined: {
                      user.createdAt && !isNaN(Date.parse(user.createdAt))
                        ? new Date(user.createdAt).toLocaleDateString()
                        : (user.createdAt ? user.createdAt : "Unknown")
                    } • Bookings: {typeof userBookings[user._id || user.id] === 'number' ? userBookings[user._id || user.id] : 0}
                  </p>
                </div>

                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedUser(user.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Edit details or change role for {user.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="role">Change Role</Label>
                          <Select value={newUserRole} onValueChange={setNewUserRole}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="customer">Customer</SelectItem>
                              <SelectItem value="dispatcher">Dispatcher</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => handleRoleChange(user.id)}
                          disabled={!newUserRole}
                        >
                          Change Role
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id, user.name)}
                        >
                          Delete User
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
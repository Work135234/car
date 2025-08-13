///////////////////////////////REPORTS PAGE////////////////////////////////////
// This page allows admins to generate and view reports on bookings and revenue.
///////////////////////////////PREVIOUS//////////////////////////////

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Download,
  TrendingUp,
  Package,
  DollarSign,
  Users
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const { toast } = useToast();

  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const validReportTypes = [
    { label: "Bookings Report", value: "bookings" },
    { label: "Revenue Report", value: "revenue" }
  ];

  const [reportType, setReportType] = useState(validReportTypes[0].value);
  const [statusFilter, setStatusFilter] = useState("all");
  const [transportFilter, setTransportFilter] = useState("all");

  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/admin/reports?reportType=${reportType}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        const result = await response.json();

        if (result.success) {
          setReportData(result.data || {});
        } else {
          setError(result.message || "Failed to fetch report");
        }
      } catch {
        setError("Failed to fetch report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportType]);

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: `${reportType} report has been generated successfully`
    });
  };

  const handleExportReport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting report in ${format.toUpperCase()} format...`
    });
  };

  if (loading) {
    return <p className="p-4 text-muted-foreground">Loading report...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground">
          Generate detailed reports and view business insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Bookings"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          value={reportData?.summary?.totalBookings ?? reportData?.totalBookings ?? 0}
          prefix=""
        />
        <SummaryCard
          title="Total Revenue"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          value={reportData?.summary?.totalRevenue ?? reportData?.totalRevenue ?? 0}
          prefix="$"
        />
        <SummaryCard
          title="Avg Order Value"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          value={
            typeof reportData?.summary?.averageOrderValue === "number"
              ? reportData.summary.averageOrderValue.toFixed(2)
              : typeof reportData?.averageOrderValue === "number"
                ? reportData.averageOrderValue.toFixed(2)
                : "0.00"
          }
          prefix="$"
        />
        <SummaryCard
          title="Completion Rate"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          value={`${reportData?.summary?.completionRate ?? reportData?.completionRate ?? 0}%`}
          prefix=""
        />
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>
            Select filters and parameters for your report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Report Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {validReportTypes.map((rt) => (
                    <SelectItem key={rt.value} value={rt.value}>
                      {rt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status Filter</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="transit">In Transit</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transport Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Transport Mode</label>
              <Select
                value={transportFilter}
                onValueChange={setTransportFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleGenerateReport}>Generate Report</Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("pdf")}
            >
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExportReport("excel")}
            >
              <Download className="mr-2 h-4 w-4" /> Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Breakdown of delivery statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData?.statusBreakdown?.length ? (
                reportData.statusBreakdown.map((item: any, idx: number) => {
                  // Defensive: If item is an object with _id, name, email, render as string
                  if (typeof item === 'object' && item !== null && ('_id' in item || 'name' in item || 'email' in item)) {
                    return (
                      <div key={item._id || idx} className="text-xs text-muted-foreground">
                        {JSON.stringify(item)}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={item.status || idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-sm font-medium">{String(item.status)}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{typeof item.count === 'object' ? '[object]' : item.count ?? 0}</div>
                        <div className="text-xs text-muted-foreground">
                          {typeof item.percentage === 'object' ? '[object]' : item.percentage ?? 0}%
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">No data</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transport Mode Revenue</CardTitle>
            <CardDescription>
              Revenue breakdown by transport type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData?.transportBreakdown?.length ? (
                reportData.transportBreakdown.map((item: any, idx: number) => {
                  if (typeof item === 'object' && item !== null && ('_id' in item || 'name' in item || 'email' in item)) {
                    return (
                      <div key={item._id || idx} className="text-xs text-muted-foreground">
                        {JSON.stringify(item)}
                      </div>
                    );
                  }
                  return (
                    <div key={item.mode || idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{String(item.mode)}</span>
                        <span className="text-sm">
                          {typeof item.revenue === 'object' ? '[object]' : `$${item.revenue?.toLocaleString() ?? "0"}`}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${typeof item.percentage === 'object' ? 0 : item.percentage ?? 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{typeof item.count === 'object' ? '[object]' : item.count ?? 0} bookings</span>
                        <span>{typeof item.percentage === 'object' ? '[object]' : item.percentage ?? 0}%</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">No data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* Small helper component for summary cards */
function SummaryCard({
  title,
  icon,
  value,
  prefix
}: {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  prefix: string;
}) {
  // Defensive: If value is an object, render JSON or fallback
  let displayValue = value;
  if (typeof value === 'object' && value !== null) {
    displayValue = '[object]';
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {displayValue}
        </div>
      </CardContent>
    </Card>
  );
}

"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Package,
  Clock,
  AlertCircle,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Truck,
  Filter,
  Eye,
  MessageSquare,
  Phone,
} from "lucide-react"

// Sample data
const incomingRequests = [
  {
    id: "REQ-001",
    company: "Green Valley Foods",
    type: "Catering Service",
    event: "Corporate Launch Event",
    date: "2024-01-15",
    location: "San Francisco, CA",
    budget: "$2,500 - $3,000",
    status: "pending",
    urgency: "high",
    description: "Need catering for 150 people, vegetarian options required",
  },
  {
    id: "REQ-002",
    company: "Tech Startup Hub",
    type: "Meal Prep Service",
    event: "Weekly Office Meals",
    date: "2024-01-20",
    location: "Palo Alto, CA",
    budget: "$1,200 - $1,500",
    status: "pending",
    urgency: "medium",
    description: "Healthy meal prep for 30 employees, 3 days per week",
  },
  {
    id: "REQ-003",
    company: "Artisan Bakery Co.",
    type: "Menu Development",
    event: "New Product Line",
    date: "2024-01-25",
    location: "Oakland, CA",
    budget: "$800 - $1,200",
    status: "reviewing",
    urgency: "low",
    description: "Help develop gluten-free pastry recipes",
  },
]

const shipmentsInProcess = [
  {
    id: "SHIP-001",
    company: "Bay Area Bistro",
    service: "Private Dining Setup",
    progress: 75,
    status: "In Transit",
    estimatedDelivery: "Today, 3:00 PM",
    location: "En route to San Jose",
    items: ["Cooking Equipment", "Ingredients", "Serving Ware"],
  },
  {
    id: "SHIP-002",
    company: "Coastal Cafe",
    service: "Catering Delivery",
    progress: 45,
    status: "Preparing",
    estimatedDelivery: "Tomorrow, 11:00 AM",
    location: "Kitchen - Final Prep",
    items: ["Appetizers", "Main Course", "Desserts"],
  },
  {
    id: "SHIP-003",
    company: "Mountain View Deli",
    service: "Equipment Rental",
    progress: 90,
    status: "Out for Delivery",
    estimatedDelivery: "Today, 1:30 PM",
    location: "5 minutes away",
    items: ["Commercial Mixer", "Food Warmers", "Serving Trays"],
  },
]

const msmeDirectory = [
  {
    id: "MSME-001",
    name: "Organic Harvest Co.",
    category: "Food Production",
    location: "Fresno, CA",
    employees: "15-25",
    rating: 4.8,
    services: ["Organic Produce", "Farm-to-Table", "Wholesale"],
    contact: "contact@organicharvest.com",
  },
  {
    id: "MSME-002",
    name: "Artisan Spice Works",
    category: "Specialty Ingredients",
    location: "Los Angeles, CA",
    employees: "5-10",
    rating: 4.9,
    services: ["Custom Spice Blends", "Bulk Spices", "Recipe Development"],
    contact: "info@artisanspice.com",
  },
  {
    id: "MSME-003",
    name: "Pacific Seafood Direct",
    category: "Seafood Supplier",
    location: "Monterey, CA",
    employees: "20-30",
    rating: 4.7,
    services: ["Fresh Seafood", "Frozen Products", "Custom Orders"],
    contact: "orders@pacificseafood.com",
  },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("requests")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Truck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">MSMEs Connected</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue This Month</p>
                  <p className="text-3xl font-bold text-gray-900">$24.5K</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Incoming Requests</TabsTrigger>
            <TabsTrigger value="shipments">Shipments in Process</TabsTrigger>
            <TabsTrigger value="msmes">Find MSMEs</TabsTrigger>
          </TabsList>

          {/* Incoming Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Requests from MSMEs</CardTitle>
                <CardDescription>Review and respond to new service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomingRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{request.company}</h3>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                            <AlertCircle className={`h-4 w-4 ${getUrgencyColor(request.urgency)}`} />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {request.type} • {request.event}
                          </p>
                          <p className="text-sm text-gray-700 mb-3">{request.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{request.budget}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {request.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {request.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipments Tab */}
          <TabsContent value="shipments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipments in Process</CardTitle>
                <CardDescription>Track your active deliveries and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {shipmentsInProcess.map((shipment) => (
                    <div key={shipment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{shipment.company}</h3>
                          <p className="text-sm text-gray-600 mb-2">{shipment.service}</p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{shipment.status}</Badge>
                            <span className="text-sm text-gray-500">{shipment.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">ETA: {shipment.estimatedDelivery}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-500">{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} className="h-2" />
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Items:</p>
                        <div className="flex flex-wrap gap-2">
                          {shipment.items.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Package className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Client
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Find MSMEs Tab */}
          <TabsContent value="msmes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find MSMEs</CardTitle>
                <CardDescription>Discover and connect with micro, small, and medium enterprises</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search MSMEs by name, category, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {msmeDirectory.map((msme) => (
                    <Card key={msme.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{msme.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{msme.category}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{msme.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xs ${i < Math.floor(msme.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {msme.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            {msme.employees} employees
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {msme.services.slice(0, 2).map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {msme.services.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{msme.services.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Connect
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

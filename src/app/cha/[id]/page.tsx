"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, Award, ChefHat, Calendar, Phone, Mail, MessageCircle, Shield, Clock } from "lucide-react"

export default function Component() {
  const params = useParams()
  const id = params?.id as string
  console.log("Profile ID:", id)
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/profiles/${id}`)
      const data = await res.json()
      console.log("Fetched Profile Data:", data)
      setProfileData(data.data)
    }
    if (id) fetchData()
  }, [id])

  if (!profileData) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32 mx-auto md:mx-0">
              <AvatarImage src={profileData.photo || "/placeholder.svg"} alt={profileData.name} />
              <AvatarFallback className="text-2xl">
                {profileData.name
                  .split(" ")
                  .map((n:string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-lg text-gray-600">{profileData.experience} yrs of experience</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(profileData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {profileData.rating} ({profileData.reviewCount || 0} reviews)
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{profileData.location}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button size="lg" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Book Now
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Mssagee
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About/Specialization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Specialization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{profileData.specialization}</p>
              </CardContent>
            </Card>

            {/* Service Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle>Service Capabilities</CardTitle>
                <CardDescription>What I can offer for your events and needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.services?.map((capability:string, index:number) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {capability}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* License Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Professional License
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">{profileData.license}</p>
                  <p className="text-xs text-blue-600 mt-1">Verified & Current</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Availability</h4>
                  <p className="text-sm text-green-600 font-medium">Available for bookings</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {profileData.languages?.map((lang:string, index:number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            

            {/* Contact Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

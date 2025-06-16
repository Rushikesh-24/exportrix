"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Component() {
  const [languages, setLanguages] = useState<string[]>([])
  const [serviceCapabilities, setServiceCapabilities] = useState<string[]>([])
  const [newLanguage, setNewLanguage] = useState("")
  const [newCapability, setNewCapability] = useState("")
  const { push } = useRouter()
  // 🔽 Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    license: "",
    specialization: "",
    location: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, experience: value })
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()])
      setNewLanguage("")
    }
  }

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((c) => c !== lang))
  }

  const addCapability = () => {
    if (newCapability.trim() && !serviceCapabilities.includes(newCapability.trim())) {
      setServiceCapabilities([...serviceCapabilities, newCapability.trim()])
      setNewCapability("")
    }
  }

  const removeCapability = (cap: string) => {
    setServiceCapabilities(serviceCapabilities.filter((c) => c !== cap))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/cha-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          languages,
          serviceCapabilities,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || "Something went wrong")
      push(`/cha/${data.id}`)
      
      // Optionally redirect: router.push('/dashboard') if you’re using next/navigation
      //push('/cha')
    } catch (err: any) {

    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">CHA Professional Registration</CardTitle>
            <CardDescription>Complete your profile to start offering your services</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Select value={formData.experience} onValueChange={handleSelectChange} required>
                  <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="16-20">16-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* License */}
              <div className="space-y-2">
                <Label htmlFor="license">Professional License</Label>
                <Input name="license" value={formData.license} onChange={handleChange} />
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label>Languages</Label>
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add a language"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
                  />
                  <Button type="button" onClick={addLanguage}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {languages.map((lang, i) => (
                    <Badge key={i} variant="secondary" className="flex items-center gap-1">
                      {lang}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeLanguage(lang)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div className="space-y-2">
                <Label>Service Capabilities *</Label>
                <div className="flex gap-2">
                  <Input
                    value={newCapability}
                    onChange={(e) => setNewCapability(e.target.value)}
                    placeholder="Add a service"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCapability())}
                  />
                  <Button type="button" onClick={addCapability}><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {serviceCapabilities.map((cap, i) => (
                    <Badge key={i} variant="outline" className="flex items-center gap-1">
                      {cap}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeCapability(cap)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specialization */}
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Textarea name="specialization" value={formData.specialization} onChange={handleChange} />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input name="location" value={formData.location} onChange={handleChange} required />
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">I agree to the <a href="#" className="text-blue-600">Terms</a> and <a href="#" className="text-blue-600">Privacy</a></Label>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg">Complete Registration</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

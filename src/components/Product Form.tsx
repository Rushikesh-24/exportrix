"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock function to generate HS code based on product details
const generateHSCode = (category: string, name: string) => {
  console.log(name)
  const categoryMap: Record<string, string> = {
    textiles: "50",
    electronics: "85",
    food: "16",
    handicrafts: "44",
    jewelry: "71",
    leather: "42",
  }

  const prefix = categoryMap[category] || "99"
  // Generate a random 6-digit code after the prefix
  const suffix = Math.floor(Math.random() * 900000 + 100000).toString()

  return `${prefix}.${suffix.substring(0, 2)}.${suffix.substring(2, 4)}.${suffix.substring(4, 6)}`
}

export function ProductForm() {
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [hsCode, setHsCode] = useState("")
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "" })
  const [weight, setWeight] = useState("")

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    if (productName && value) {
      setHsCode(generateHSCode(value, productName))
    }
  }

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value)
    if (e.target.value && category) {
      setHsCode(generateHSCode(category, e.target.value))
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Submission Form</CardTitle>
          <CardDescription>Enter your product details to get export documentation and HS code</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={handleProductNameChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textiles">Textiles & Garments</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="food">Food Products</SelectItem>
                    <SelectItem value="handicrafts">Handicrafts</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="leather">Leather Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hs-code">HS Code (Auto-generated)</Label>
                <Input
                  id="hs-code"
                  placeholder="HS Code will appear here"
                  value={hsCode}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Country of Origin</Label>
                <Select defaultValue="india">
                  <SelectTrigger id="origin">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="nepal">Nepal</SelectItem>
                    <SelectItem value="srilanka">Sri Lanka</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dimensions (cm)</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="Length"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                />
                <Input
                  placeholder="Width"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                />
                <Input
                  placeholder="Height"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea id="description" placeholder="Describe your product in detail" className="min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop product images here</p>
                <p className="text-xs text-muted-foreground mb-4">PNG, JPG or WEBP (max. 5MB)</p>
                <Button variant="outline" size="sm">
                  Select Files
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Submit Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


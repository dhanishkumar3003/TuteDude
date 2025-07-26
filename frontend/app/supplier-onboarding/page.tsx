"use client"

import { useState } from "react"
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle, MapPin, Phone, Mail, Building } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SupplierOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    businessType: "",
    categories: [],
    gstNumber: "",
    panNumber: "",
    bankAccount: "",
    ifscCode: "",
  })

  const totalSteps = 4
  const progressPercentage = (currentStep / totalSteps) * 100

  const categories = [
    "सब्जियां",
    "फल",
    "अनाज",
    "दालें",
    "मसाले",
    "तेल",
    "डेयरी प्रोडक्ट्स",
    "मांस",
    "मछली",
    "बेकरी आइटम्स",
    "पैकेज्ड फूड",
    "पेय पदार्थ",
  ]

  const pendingSuppliers = [
    {
      id: 1,
      name: "अग्रवाल ट्रेडर्स",
      owner: "राजेश अग्रवाल",
      location: "लाजपत नगर, दिल्ली",
      category: "सब्जियां",
      appliedDate: "2024-01-15",
      status: "दस्तावेज़ सत्यापन",
      phone: "+91 98765 43210",
      email: "rajesh@agarwaltraders.com",
      documents: {
        gst: "verified",
        pan: "verified",
        bank: "pending",
        license: "pending",
      },
    },
    {
      id: 2,
      name: "शर्मा स्पाइस मिल",
      owner: "सुनील शर्मा",
      location: "चांदनी चौक, दिल्ली",
      category: "मसाले",
      appliedDate: "2024-01-16",
      status: "फील्ड वेरिफिकेशन",
      phone: "+91 87654 32109",
      email: "sunil@sharmaspices.com",
      documents: {
        gst: "verified",
        pan: "verified",
        bank: "verified",
        license: "verified",
      },
    },
    {
      id: 3,
      name: "गुप्ता ग्रेन्स",
      owner: "अमित गुप्ता",
      location: "करोल बाग, दिल्ली",
      category: "अनाज",
      appliedDate: "2024-01-17",
      status: "एप्रूवल पेंडिंग",
      phone: "+91 76543 21098",
      email: "amit@guptaGrains.com",
      documents: {
        gst: "verified",
        pan: "verified",
        bank: "verified",
        license: "verified",
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "दस्तावेज़ सत्यापन":
        return "secondary"
      case "फील्ड वेरिफिकेशन":
        return "outline"
      case "एप्रूवल पेंडिंग":
        return "default"
      default:
        return "outline"
    }
  }

  const getDocumentStatus = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">व्यापारिक जानकारी</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="business-name">व्यापार का नाम *</Label>
                  <Input
                    id="business-name"
                    placeholder="जैसे: राम प्रोविजन स्टोर"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="owner-name">मालिक का नाम *</Label>
                  <Input
                    id="owner-name"
                    placeholder="जैसे: राम कुमार"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">फोन नंबर *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">ईमेल पता</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="business-type">व्यापार का प्रकार *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="व्यापार का प्रकार चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wholesaler">होलसेलर</SelectItem>
                      <SelectItem value="manufacturer">निर्माता</SelectItem>
                      <SelectItem value="distributor">वितरक</SelectItem>
                      <SelectItem value="retailer">रिटेलर</SelectItem>
                      <SelectItem value="farmer">किसान</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">पता और स्थान</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">पूरा पता *</Label>
                  <Textarea
                    id="address"
                    placeholder="दुकान/गोदाम का पूरा पता"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">शहर *</Label>
                    <Input
                      id="city"
                      placeholder="दिल्ली"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">राज्य *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="राज्य चुनें" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">दिल्ली</SelectItem>
                        <SelectItem value="haryana">हरियाणा</SelectItem>
                        <SelectItem value="uttar-pradesh">उत्तर प्रदेश</SelectItem>
                        <SelectItem value="punjab">पंजाब</SelectItem>
                        <SelectItem value="rajasthan">राजस्थान</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">पिन कोड *</Label>
                    <Input
                      id="pincode"
                      placeholder="110001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">प्रोडक्ट कैटेगरी</h3>
              <p className="text-sm text-gray-600 mb-4">आप कौन से प्रोडक्ट्स सप्लाई करते हैं? (एक से अधिक चुन सकते हैं)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            categories: [...formData.categories, category],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            categories: formData.categories.filter((c) => c !== category),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">कानूनी दस्तावेज़</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gst-number">GST नंबर</Label>
                  <Input
                    id="gst-number"
                    placeholder="07AAACH7409R1ZZ"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="pan-number">PAN नंबर *</Label>
                  <Input
                    id="pan-number"
                    placeholder="AAACH7409R"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">बैंक विवरण</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bank-account">बैंक अकाउंट नंबर *</Label>
                  <Input
                    id="bank-account"
                    placeholder="1234567890"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc-code">IFSC कोड *</Label>
                  <Input
                    id="ifsc-code"
                    placeholder="SBIN0001234"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">दस्तावेज़ अपलोड करें</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">GST सर्टिफिकेट</p>
                  <Button variant="outline" size="sm">
                    फाइल चुनें
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">PAN कार्ड</p>
                  <Button variant="outline" size="sm">
                    फाइल चुनें
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">बैंक पासबुक</p>
                  <Button variant="outline" size="sm">
                    फाइल चुनें
                  </Button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">व्यापार लाइसेंस</p>
                  <Button variant="outline" size="sm">
                    फाइल चुनें
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">आवेदन सफलतापूर्वक जमा हुआ!</h3>
              <p className="text-gray-600 mb-6">
                आपका आवेदन हमारी टीम के पास भेज दिया गया है। हम 2-3 कार्य दिवसों में आपसे संपर्क करेंगे।
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-3">अगले चरण:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>दस्तावेज़ सत्यापन (1-2 दिन)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>फील्ड वेरिफिकेशन (1 दिन)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>अकाउंट एक्टिवेशन</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                आवेदन ID: <span className="font-mono font-semibold">SUP2024001</span>
              </p>
              <Button asChild>
                <Link href="/dashboard">डैशबोर्ड पर जाएं</Link>
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">सप्लायर ऑनबोर्डिंग</h1>
              <p className="text-sm text-gray-600">नए आपूर्तिकर्ताओं का पंजीकरण और सत्यापन</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">नया रजिस्ट्रेशन</TabsTrigger>
            <TabsTrigger value="pending">पेंडिंग एप्लीकेशन</TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="space-y-6">
            {/* Progress Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">रजिस्ट्रेशन प्रगति</h3>
                  <span className="text-sm text-gray-600">
                    चरण {currentStep} / {totalSteps}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2 mb-4" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>व्यापारिक जानकारी</span>
                  <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>पता और कैटेगरी</span>
                  <span className={currentStep >= 3 ? "text-blue-600 font-medium" : ""}>दस्तावेज़</span>
                  <span className={currentStep >= 4 ? "text-blue-600 font-medium" : ""}>पूर्ण</span>
                </div>
              </CardContent>
            </Card>

            {/* Form Content */}
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    पिछला
                  </Button>
                  {currentStep < totalSteps ? (
                    <Button onClick={handleNext}>अगला</Button>
                  ) : (
                    <Button asChild>
                      <Link href="/dashboard">समाप्त</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>पेंडिंग एप्लीकेशन</CardTitle>
                <CardDescription>सत्यापन के लिए प्रतीक्षारत आपूर्तिकर्ता</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingSuppliers.map((supplier) => (
                    <Card key={supplier.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{supplier.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                <span>{supplier.owner}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{supplier.location}</span>
                              </div>
                              <Badge variant="outline">{supplier.category}</Badge>
                            </div>
                          </div>
                          <Badge variant={getStatusColor(supplier.status)}>{supplier.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold mb-3">संपर्क जानकारी</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{supplier.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{supplier.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>आवेदन: {new Date(supplier.appliedDate).toLocaleDateString("hi-IN")}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-semibold mb-3">दस्तावेज़ स्थिति</h5>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">GST सर्टिफिकेट</span>
                                {getDocumentStatus(supplier.documents.gst)}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">PAN कार्ड</span>
                                {getDocumentStatus(supplier.documents.pan)}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">बैंक विवरण</span>
                                {getDocumentStatus(supplier.documents.bank)}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">व्यापार लाइसेंस</span>
                                {getDocumentStatus(supplier.documents.license)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                          <Button size="sm">विवरण देखें</Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            दस्तावेज़ देखें
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Phone className="w-3 h-3 mr-1" />
                            कॉल करें
                          </Button>
                          {supplier.status === "एप्रूवल पेंडिंग" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                अप्रूव करें
                              </Button>
                              <Button size="sm" variant="destructive">
                                रिजेक्ट करें
                              </Button>
                            </>
                          )}
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

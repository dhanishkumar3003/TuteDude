"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Truck, CheckCircle, Clock, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/lib/language-context"

export default function TrackingPage() {
  const { t } = useLanguage()
  const [trackingId, setTrackingId] = useState("TRK001235")
  const [currentStep, setCurrentStep] = useState(2)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate progress updates
      setCurrentStep((prev) => (prev < 4 ? prev + 0.1 : prev))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const trackingSteps = [
    {
      id: 1,
      title: t("tracking.order_confirmed"),
      description: "Your order has been confirmed",
      time: "10:30 AM",
      date: "17 January 2024",
      completed: true,
    },
    {
      id: 2,
      title: t("tracking.packing"),
      description: "Your order is being packed",
      time: "11:15 AM",
      date: "17 January 2024",
      completed: true,
    },
    {
      id: 3,
      title: t("tracking.in_transit"),
      description: "Your order is out for delivery",
      time: "12:45 PM",
      date: "17 January 2024",
      completed: currentStep >= 3,
      active: currentStep >= 2 && currentStep < 4,
    },
    {
      id: 4,
      title: t("tracking.delivered"),
      description: "Your order has been delivered",
      time: "Expected: 2:30 PM",
      date: "17 January 2024",
      completed: currentStep >= 4,
    },
  ]

  const orderDetails = {
    orderId: "ORD002",
    supplier: "Sharma Spices",
    supplierPhone: "+91 98765 43210",
    deliveryPartner: "Rahul Kumar",
    deliveryPhone: "+91 87654 32109",
    estimatedDelivery: "2:30 PM",
    items: [
      { name: "Garam Masala", quantity: "2 kg", price: "₹640" },
      { name: "Coriander Powder", quantity: "3 kg", price: "₹360" },
      { name: "Turmeric Powder", quantity: "1 kg", price: "₹200" },
    ],
    totalAmount: "₹1,200",
    deliveryAddress: "123, Main Market, Karol Bagh, New Delhi - 110005",
  }

  const liveLocation = {
    currentLocation: "Near Rajouri Garden Metro Station",
    distanceRemaining: "2.5 km",
    timeRemaining: "15 minutes",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/orders">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("tracking.title")}</h1>
              <p className="text-sm text-gray-600">{t("tracking.description")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Tracking ID Input */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Input
                placeholder={t("tracking.tracking_id_placeholder")}
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button>{t("tracking.track_order")}</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  {t("tracking.live_location")}
                </CardTitle>
                <CardDescription>Your order is out for delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Map Placeholder */}
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Live map will be shown here</p>
                      <p className="text-sm text-gray-500">Current location: {liveLocation.currentLocation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">{t("tracking.distance_remaining")}</p>
                      <p className="text-lg font-semibold text-blue-600">{liveLocation.distanceRemaining}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">{t("tracking.expected_time")}</p>
                      <p className="text-lg font-semibold text-green-600">{liveLocation.timeRemaining}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      {t("tracking.call_delivery")}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t("tracking.message")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{t("tracking.order_status")}</CardTitle>
                <CardDescription>
                  {t("tracking.tracking_id")}: {trackingId}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-green-500 text-white"
                              : step.active
                                ? "bg-blue-500 text-white animate-pulse"
                                : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : step.active ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <span>{step.id}</span>
                          )}
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-12 mt-2 ${step.completed ? "bg-green-500" : "bg-gray-200"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{step.title}</h4>
                          {step.active && <Badge variant="secondary">In Progress</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                        <div className="text-xs text-gray-500">
                          {step.time} • {step.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{t("tracking.order_progress")}</span>
                    <span>{Math.round((currentStep / 4) * 100)}%</span>
                  </div>
                  <Progress value={(currentStep / 4) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>{t("tracking.order_summary")}</CardTitle>
                <CardDescription>Order ID: {orderDetails.orderId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Items</h4>
                  <div className="space-y-2">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} ({item.quantity})
                        </span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>{orderDetails.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t("tracking.delivery_address")}</h4>
                  <p className="text-sm text-gray-600">{orderDetails.deliveryAddress}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t("tracking.estimated_delivery")}</h4>
                  <p className="text-sm text-gray-600">Today by {orderDetails.estimatedDelivery}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t("tracking.contact_info")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t("tracking.supplier")}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{orderDetails.supplier}</span>
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t("tracking.delivery_partner")}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{orderDetails.deliveryPartner}</span>
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>{t("tracking.need_help")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("tracking.chat_support")}
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  {t("tracking.helpline")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

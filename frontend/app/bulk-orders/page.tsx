"use client"

import { useState } from "react"
import { ArrowLeft, Clock, Package, Plus, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/lib/language-context"

export default function BulkOrdersPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const { t } = useLanguage()

  const activeBulkOrders = [
    {
      id: "BULK001",
      title: "Onion - Bulk Order",
      category: "Vegetables",
      targetQuantity: "500 kg",
      currentQuantity: "320 kg",
      participants: 12,
      pricePerKg: "₹18",
      marketPrice: "₹25",
      savings: "28%",
      deadline: "2 days left",
      status: "Active",
      description: "Fresh onions, Grade A quality",
    },
    {
      id: "BULK002",
      title: "Basmati Rice - Bulk Order",
      category: "Grains",
      targetQuantity: "200 kg",
      currentQuantity: "180 kg",
      participants: 8,
      pricePerKg: "₹85",
      marketPrice: "₹110",
      savings: "23%",
      deadline: "5 days left",
      status: "Almost Complete",
      description: "Premium basmati rice, 1 year aged",
    },
    {
      id: "BULK003",
      title: "Garam Masala - Bulk Order",
      category: "Spices",
      targetQuantity: "50 kg",
      currentQuantity: "35 kg",
      participants: 15,
      pricePerKg: "₹320",
      marketPrice: "₹450",
      savings: "29%",
      deadline: "1 day left",
      status: "Active",
      description: "Homemade garam masala, pure spices",
    },
  ]

  const completedOrders = [
    {
      id: "BULK004",
      title: "Tomato - Bulk Order",
      quantity: "300 kg",
      participants: 10,
      finalPrice: "₹22/kg",
      savings: "₹2,400",
      completedDate: "3 days ago",
      status: "Completed",
    },
    {
      id: "BULK005",
      title: "Mustard Oil - Bulk Order",
      quantity: "100 liters",
      participants: 6,
      finalPrice: "₹140/liter",
      savings: "₹1,800",
      completedDate: "1 week ago",
      status: "Completed",
    },
  ]

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
              <h1 className="text-2xl font-bold text-gray-900">{t("nav.bulk_orders")}</h1>
              <p className="text-sm text-gray-600">{t("bulk_orders.subtitle")}</p>
            </div>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                {t("bulk_orders.create_new")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t("bulk_orders.create_new")}</DialogTitle>
                <DialogDescription>{t("bulk_orders.create_description")}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product">{t("bulk_orders.product_name")}</Label>
                  <Input id="product" placeholder={t("bulk_orders.product_placeholder")} />
                </div>
                <div>
                  <Label htmlFor="category">{t("bulk_orders.category")}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t("bulk_orders.select_category")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">{t("categories.vegetables")}</SelectItem>
                      <SelectItem value="grains">{t("categories.grains")}</SelectItem>
                      <SelectItem value="spices">{t("categories.spices")}</SelectItem>
                      <SelectItem value="oil">{t("categories.oil")}</SelectItem>
                      <SelectItem value="dairy">{t("categories.dairy")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">{t("bulk_orders.target_quantity")}</Label>
                  <Input id="quantity" placeholder={t("bulk_orders.quantity_placeholder")} />
                </div>
                <div>
                  <Label htmlFor="deadline">{t("bulk_orders.deadline")}</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div>
                  <Label htmlFor="description">{t("bulk_orders.description")}</Label>
                  <Textarea id="description" placeholder={t("bulk_orders.description_placeholder")} />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setShowCreateDialog(false)}>
                    {t("bulk_orders.create_order")}
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="p-6">
        {/* How it Works */}
        <Card className="mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Package className="w-5 h-5" />
              {t("bulk_orders.how_it_works")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h4 className="font-semibold mb-2">{t("bulk_orders.step1_title")}</h4>
                <p className="text-sm text-gray-600">{t("bulk_orders.step1_desc")}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h4 className="font-semibold mb-2">{t("bulk_orders.step2_title")}</h4>
                <p className="text-sm text-gray-600">{t("bulk_orders.step2_desc")}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h4 className="font-semibold mb-2">{t("bulk_orders.step3_title")}</h4>
                <p className="text-sm text-gray-600">{t("bulk_orders.step3_desc")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Bulk Orders */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t("bulk_orders.active_orders")}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeBulkOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.title}</CardTitle>
                      <CardDescription>{order.description}</CardDescription>
                    </div>
                    <Badge variant={order.status === "Almost Complete" ? "default" : "secondary"}>{order.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>
                        {t("bulk_orders.progress")}: {order.currentQuantity} / {order.targetQuantity}
                      </span>
                      <span className="text-green-600 font-semibold">
                        {order.savings} {t("bulk_orders.savings")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(Number.parseInt(order.currentQuantity) / Number.parseInt(order.targetQuantity)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Price Comparison */}
                  <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">{t("bulk_orders.bulk_price")}</p>
                      <p className="text-lg font-bold text-green-600">{order.pricePerKg}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("bulk_orders.market_price")}</p>
                      <p className="text-lg font-bold text-gray-400 line-through">{order.marketPrice}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>
                        {order.participants} {t("bulk_orders.members")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{order.deadline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">{t("bulk_orders.join_order")}</Button>
                    <Button variant="outline">{t("bulk_orders.view_details")}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Orders */}
        <div>
          <h2 className="text-xl font-bold mb-4">{t("bulk_orders.completed_orders")}</h2>
          <div className="space-y-4">
            {completedOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{order.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{order.quantity}</span>
                          <span>•</span>
                          <span>
                            {order.participants} {t("bulk_orders.members")}
                          </span>
                          <span>•</span>
                          <span>{order.completedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.finalPrice}</p>
                      <p className="text-sm text-green-600">
                        {order.savings} {t("bulk_orders.savings")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Empty State for New Users */}
        {activeBulkOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("bulk_orders.no_active_orders")}</h3>
            <p className="text-gray-600 mb-4">{t("bulk_orders.empty_state_desc")}</p>
            <Button onClick={() => setShowCreateDialog(true)}>{t("bulk_orders.create_first_order")}</Button>
          </div>
        )}
      </div>
    </div>
  )
}

// BulkOrdersPage.tsx
"use client"

import { useState, useEffect } from "react"
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
import { apiService } from '@/lib/api-service';

interface ActiveBulkOrder {
  id: string;
  title: string;
  category: string;
  targetQuantity: string;
  currentQuantity: string;
  participants: number;
  pricePerKg: string;
  marketPrice: string;
  savings: string;
  deadline: string;
  status: string;
  description: string;
}

interface CompletedOrder {
  id: string;
  title: string;
  quantity: string;
  participants: number;
  finalPrice: string;
  savings: string;
  completedDate: string;
  status: string;
}


export default function BulkOrdersPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [activeBulkOrders, setActiveBulkOrders] = useState<ActiveBulkOrder[]>([])
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([])

  const { t } = useLanguage()

  useEffect(() => {
  apiService
    .get<any[]>("activeBulkOrders")
    .then(setActiveBulkOrders)
    .catch((err) => console.error("Error fetching active bulk orders", err));

  apiService
    .get<any[]>("completedOrders")
    .then(setCompletedOrders)
    .catch((err) => console.error("Error fetching completed orders", err));
}, []);


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
        {/* Active Bulk Orders */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t("bulk_orders.active_orders")}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeBulkOrders.map((order: any) => (
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
            {completedOrders.map((order: any) => (
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
      </div>
    </div>
  )
}
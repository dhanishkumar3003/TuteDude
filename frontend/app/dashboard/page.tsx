"use client"

import { ArrowUpRight, Package, ShoppingCart, Star, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from 'react';
import api from "@/lib/api-service"

interface Stats {
  monthlySavings: number;
  totalOrders: number;
  activeSuppliers: number;
  averageRating: number;
  monthlySavingsPercentage : number;
  totalOrdersAdded : number;
  activeSuppliersAdded : number;
  averageRatingPercentage : number;
}


interface Supplier {

 "id" : number,
    "name" : string,
    "location" : string,
    "discount" : number,
    "rating" : number,
    "reviews" : number,
    "orderCategory":string,
    "minDelieveryTime" : number,
    "maxDeliveryTime": number,
    "minOrderPrice": number,
    "Specialities":  string[],
    "image" : string,
    "verified" : boolean,
    "totalOrders" : number
,
"savings" : number


}


interface FormattedSupplier {

 "id" : number,
    "name" : string,
    "location" : string,
    "discount" : string,
    "rating" : number,
    "reviews" : number,
    "category":string,
"deliveryTime" :string,
"minOrder" : string,
    "specialities":  string[],
    "image" : string,
"verified" : boolean,
  "totalOrders" : number
,
"savings" : number

}


export default function Dashboard() {
  const { t } = useLanguage()
const [stats, setStats] = useState<Stats>({
  monthlySavings: 0,
  totalOrders: 0,
  activeSuppliers: 0,
  averageRating: 0,
    monthlySavingsPercentage : 0,
  totalOrdersAdded : 0,
  activeSuppliersAdded : 0,
  averageRatingPercentage : 0
});
const [topSupplierData, setTopSupllierData] = useState<FormattedSupplier[]>([]);


useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await api.get<Stats>('/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  fetchStats();
 const fetchTopSuppliers = async () => {
    try {
      const response = await api.get<Supplier[]>('/topsuppliers');
     // console.log(response.data);
      if(response.data)
      {
        const foramtteddatas: FormattedSupplier[] = [];
        const datafromapi = response.data

        datafromapi.forEach((supplier)=>{
          var foramtspecialities = supplier.Specialities;
          foramtspecialities.forEach((text)=>{
            text = `items.${text.toLowerCase()}`;
          })

          var Formatsupplier = {
            "id" : supplier.id,
            "name" : supplier.name,
            "category" : t(`category.${supplier.orderCategory.toLowerCase()}`),
            "location" : t(`location.${supplier.location.toLowerCase()}`),
            "rating" : supplier.rating,
            "reviews" : supplier.reviews,
            "verified" : supplier.verified,
            "deliveryTime" : `${supplier.minDelieveryTime}-${supplier.maxDeliveryTime} ${t("delivery.hours")}`,
      "minOrder": `₹${supplier.minOrderPrice}`,
      "specialities": foramtspecialities,
      "discount": `${supplier.discount}% ${t("discount.text")}`,
      "image": supplier.image,
        "totalOrders" : supplier.totalOrders
,
"savings" : supplier.savings
           
          }

          foramtteddatas.push(Formatsupplier);
        })
//console.log(foramtteddatas)
setTopSupllierData(foramtteddatas);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  fetchTopSuppliers();






}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">VendorConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-orange-600 font-medium">
              {t("nav.dashboard")}
            </Link>
            <Link href="/suppliers" className="text-gray-600 hover:text-gray-900">
              {t("nav.suppliers")}
            </Link>
            <Link href="/orders" className="text-gray-600 hover:text-gray-900">
              {t("nav.orders")}
            </Link>
            <Link href="/bulk-orders" className="text-gray-600 hover:text-gray-900">
              {t("nav.bulk_orders")}
            </Link>
            <Link href="/inventory" className="text-gray-600 hover:text-gray-900">
              {t("nav.inventory")}
            </Link>
            <Link href="/payments" className="text-gray-600 hover:text-gray-900">
              {t("nav.payments")}
            </Link>
            <Link href="/tracking" className="text-gray-600 hover:text-gray-900">
              {t("nav.tracking")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("dashboard.welcome")}</h1>
          <p className="text-gray-600">{t("dashboard.welcome_desc")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.monthly_savings")}</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.monthlySavings}</div>
              <p className="text-xs text-gray-600">+{stats.monthlySavingsPercentage}% {t("stats.last_month")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.total_orders")}</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-gray-600">+{stats.totalOrdersAdded} {t("stats.this_month")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.active_suppliers")}</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSuppliers}</div>
              <p className="text-xs text-gray-600">{stats.activeSuppliersAdded} {t("stats.verified")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.average_rating")}</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-gray-600">{stats.averageRatingPercentage}% {t("stats.from_suppliers")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-red-500" />
                  {t("dashboard.low_stock_alert")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Onion</span>
                    <span className="text-sm text-red-600">5 kg left</span>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tomato</span>
                    <span className="text-sm text-red-600">3 kg left</span>
                  </div>
                  <Progress value={15} className="h-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Green Chili</span>
                    <span className="text-sm text-red-600">1 kg left</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
                <p className="text-sm text-gray-600 mt-4">3 {t("stats.items_low")}</p>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.recent_orders")}</CardTitle>
                <CardDescription>{t("stats.recent_orders_desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">ORD-001234</p>
                      <p className="text-sm text-gray-600">Ram Vegetables</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹2,450</p>
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        {t("status.delivered")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">ORD-001233</p>
                      <p className="text-sm text-gray-600">Sharma Spices</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹1,200</p>
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {t("status.in_transit")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">ORD-001232</p>
                      <p className="text-sm text-gray-600">Gupta Grains</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹3,800</p>
                      <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                        {t("status.processing")}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/orders">{t("common.view_all")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.top_suppliers")}</CardTitle>
                <CardDescription>{t("stats.top_suppliers_desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSupplierData.map((supplier, index) => (
  <div key={supplier.id || index} className="flex items-center gap-3">
    <Avatar className="h-10 w-10">
      <AvatarFallback>
        {supplier.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>

    <div className="flex-1">
      <p className="font-medium">{supplier.name}</p>
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-600">
          {supplier.rating} ({supplier.reviews} {t('reviews.text')})
        </span>
      </div>
    </div>

    <div className="text-right">
      <p className="text-sm font-medium">
        {supplier.totalOrders} {t('stats.orders')}
      </p>
      <p className="text-xs text-green-600">
        ₹{supplier.savings.toLocaleString()} {t('stats.savings')}
      </p>
    </div>
  </div>
))}

                  {/* <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>RV</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Ram Vegetables</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.9 (45 {t("reviews.text")})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">23 {t("stats.orders")}</p>
                      <p className="text-xs text-green-600">₹8,450 {t("stats.savings")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Sharma Spices</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.8 (32 {t("reviews.text")})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">18 {t("stats.orders")}</p>
                      <p className="text-xs text-green-600">₹3,200 {t("stats.savings")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>GG</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">Gupta Grains</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.7 (28 {t("reviews.text")})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">15 {t("stats.orders")}</p>
                      <p className="text-xs text-green-600">₹2,800 {t("stats.savings")}</p>
                    </div>
                  </div> */}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/suppliers">{t("common.view_all")}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.quick_actions")}</CardTitle>
                <CardDescription>{t("stats.quick_actions_desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link href="/suppliers">
                      <Users className="mr-2 h-4 w-4" />
                      {t("dashboard.find_suppliers")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/bulk-orders">
                      <Package className="mr-2 h-4 w-4" />
                      {t("dashboard.bulk_order")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/market-prices">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      {t("dashboard.market_prices")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/price-alerts">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      {t("dashboard.price_alerts")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/inventory">
                      <Package className="mr-2 h-4 w-4" />
                      {t("dashboard.manage_inventory")}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

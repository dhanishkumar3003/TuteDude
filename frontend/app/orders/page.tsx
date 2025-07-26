"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Download, Eye, Filter, Package, Search, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/lib/language-context"
import { useEffect } from 'react';
import { apiService } from '@/lib/api-service';

interface Item {
  name: string;
  quantity: string;
  price: string;
}

interface Order {
  id: string;
  supplier: string;
  items: Item[];
  totalAmount: string;
  status: string;
  orderDate: string;
  deliveryDate: string;
  paymentMethod: string;
  trackingId: string;
}

export default function OrdersPage() {
  const { t } = useLanguage()
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  useEffect(() => {
    apiService.get<Order[]>('/orders')
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case t("status.delivered"):
        return "default"
      case t("status.in_transit"):
        return "secondary"
      case t("status.processing"):
        return "outline"
      case t("status.cancelled"):
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              <h1 className="text-2xl font-bold text-gray-900">{t("orders.title")}</h1>
              <p className="text-sm text-gray-600">{t("orders.description")}</p>
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            {t("orders.download_report")}
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("dashboard.total_orders")}</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">105</div>
              <p className="text-xs text-gray-600">{t("stats.this_month")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("orders.pending_orders")}</CardTitle>
              <Truck className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-600">{t("orders.processing_transit")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("orders.total_spent")}</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,24,500</div>
              <p className="text-xs text-gray-600">{t("stats.this_month")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t("orders.average_order")}</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,185</div>
              <p className="text-xs text-gray-600">{t("orders.per_order")}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t("orders.search_placeholder")}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t("orders.status_filter")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("orders.all_status")}</SelectItem>
                  <SelectItem value={t("status.delivered")}>{t("status.delivered")}</SelectItem>
                  <SelectItem value={t("status.in_transit")}>{t("status.in_transit")}</SelectItem>
                  <SelectItem value={t("status.processing")}>{t("status.processing")}</SelectItem>
                  <SelectItem value={t("status.cancelled")}>{t("status.cancelled")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t("orders.time_filter")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("orders.all_time")}</SelectItem>
                  <SelectItem value="today">{t("orders.today")}</SelectItem>
                  <SelectItem value="week">{t("orders.this_week")}</SelectItem>
                  <SelectItem value="month">{t("orders.this_month")}</SelectItem>
                  <SelectItem value="quarter">{t("orders.this_quarter")}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                {t("suppliers.more_filters")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t("orders.order_history")}</CardTitle>
            <CardDescription>
              {filteredOrders.length} {t("orders.orders_found")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("orders.order_id")}</TableHead>
                    <TableHead>{t("orders.supplier")}</TableHead>
                    <TableHead>{t("orders.items")}</TableHead>
                    <TableHead>{t("orders.amount")}</TableHead>
                    <TableHead>{t("orders.status")}</TableHead>
                    <TableHead>{t("orders.order_date")}</TableHead>
                    <TableHead>{t("orders.action")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.name} ({item.quantity})
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{order.items.length - 2} {t("orders.more_items")}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{order.totalAmount}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString("hi-IN")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          {order.status === t("status.in_transit") && (
                            <Button size="sm" variant="outline">
                              <Truck className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("orders.no_orders_found")}</h3>
                <p className="text-gray-600">{t("orders.try_changing_filters")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, Smartphone, Wallet, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"

export default function PaymentsPage() {
  const { t } = useLanguage()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi")
  const [orderTotal] = useState(1250)

  const paymentMethods = [
    {
      id: "upi",
      name: t("payments.upi"),
      icon: <Smartphone className="w-5 h-5" />,
      description: "PhonePe, Google Pay, Paytm",
      processingFee: 0,
      popular: true,
    },
    {
      id: "wallet",
      name: t("payments.wallet"),
      icon: <Wallet className="w-5 h-5" />,
      description: "Paytm, MobiKwik, Amazon Pay",
      processingFee: 0,
    },
    {
      id: "card",
      name: t("payments.card"),
      icon: <CreditCard className="w-5 h-5" />,
      description: "Visa, Mastercard, RuPay",
      processingFee: 2,
    },
    {
      id: "cod",
      name: t("payments.cod"),
      icon: <CheckCircle className="w-5 h-5" />,
      description: t("payment.cod_description"),
      processingFee: 0,
    },
  ]

  const recentTransactions = [
    {
      id: "TXN001",
      orderId: "ORD001",
      amount: "₹850",
      method: "UPI",
      status: t("common.success"),
      date: "2024-01-16",
      supplier: "Ram Provision Store",
    },
    {
      id: "TXN002",
      orderId: "ORD002",
      amount: "₹1,200",
      method: "Cash",
      status: t("common.pending"),
      date: "2024-01-17",
      supplier: "Sharma Spices",
    },
    {
      id: "TXN003",
      orderId: "ORD003",
      amount: "₹2,100",
      method: "UPI",
      status: t("common.success"),
      date: "2024-01-17",
      supplier: "Gupta Grains",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case t("common.success"):
        return "default"
      case t("common.pending"):
        return "secondary"
      case t("common.error"):
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case t("common.success"):
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case t("common.pending"):
        return <Clock className="w-4 h-4 text-yellow-600" />
      case t("common.error"):
        return <AlertCircle className="w-4 h-4 text-red-600" />
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
              <h1 className="text-2xl font-bold text-gray-900">{t("payments.title")}</h1>
              <p className="text-sm text-gray-600">{t("payments.description")}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("payments.choose_method")}</CardTitle>
                <CardDescription>{t("payments.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {method.icon}
                          <div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                {method.name}
                              </Label>
                              {method.popular && <Badge variant="secondary">{t("payments.popular")}</Badge>}
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        {method.processingFee > 0 && (
                          <span className="text-sm text-gray-500">+{method.processingFee}% fee</span>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {/* Payment Details Form */}
                {selectedPaymentMethod === "upi" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <Label htmlFor="upi-id">UPI ID or Phone Number</Label>
                    <Input id="upi-id" placeholder={t("payment.upi_placeholder")} />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        PhonePe
                      </Button>
                      <Button variant="outline" size="sm">
                        Google Pay
                      </Button>
                      <Button variant="outline" size="sm">
                        Paytm
                      </Button>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "card" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="card-number">{t("payment.card_number")}</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <Label htmlFor="card-name">{t("payment.card_holder")}</Label>
                        <Input id="card-name" placeholder={t("user.name")} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">{t("payment.expiry_date")}</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" type="password" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "wallet" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <Label>{t("payment.select_wallet")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("payment.select_wallet")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paytm">Paytm Wallet</SelectItem>
                        <SelectItem value="mobikwik">MobiKwik</SelectItem>
                        <SelectItem value="amazon">Amazon Pay</SelectItem>
                        <SelectItem value="freecharge">FreeCharge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedPaymentMethod === "cod" && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">{t("payments.cod")}</span>
                    </div>
                    <p className="text-sm text-gray-600">{t("payment.cod_description")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("payments.order_summary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("payments.subtotal")}</span>
                    <span>₹{orderTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("payments.delivery_charge")}</span>
                    <span className="text-green-600">{t("payments.free")}</span>
                  </div>
                  {selectedPaymentMethod === "card" && (
                    <div className="flex justify-between">
                      <span>{t("payments.processing_fee")}</span>
                      <span>₹{Math.round(orderTotal * 0.02)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t("payments.total_amount")}</span>
                    <span>
                      ₹{selectedPaymentMethod === "card" ? orderTotal + Math.round(orderTotal * 0.02) : orderTotal}
                    </span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  {t("payments.pay_now")} ₹
                  {selectedPaymentMethod === "card" ? orderTotal + Math.round(orderTotal * 0.02) : orderTotal}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>{t("payments.secure_payment")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{t("payments.recent_transactions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(transaction.status)}
                        <div>
                          <p className="font-medium text-sm">{transaction.orderId}</p>
                          <p className="text-xs text-gray-600">{transaction.supplier}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{transaction.amount}</p>
                        <Badge variant={getStatusColor(transaction.status)} className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

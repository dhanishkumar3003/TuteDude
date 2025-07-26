"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"

export default function LoginPage() {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">VendorConnect</span>
          </div>
          <div className="flex justify-center mb-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">{t("login.welcome")}</CardTitle>
            <CardDescription className="text-gray-600">{t("login.description")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">{t("login.phone_tab")}</TabsTrigger>
                <TabsTrigger value="email">{t("login.email_tab")}</TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("login.phone_number")}</Label>
                  <Input id="phone" type="tel" placeholder={t("login.phone_placeholder")} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-phone">{t("login.password")}</Label>
                  <div className="relative">
                    <Input
                      id="password-phone"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("login.password_placeholder")}
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-phone" checked={rememberMe} onCheckedChange={setRememberMe} />
                    <Label htmlFor="remember-phone" className="text-sm text-gray-600">
                      {t("login.remember_me")}
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                    {t("login.forgot_password")}
                  </Link>
                </div>

                <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/dashboard">{t("login.login_button")}</Link>
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-500">{t("login.or")}</span>
                </div>

                <Button variant="outline" className="w-full h-12 bg-transparent">
                  {t("login.login_with_otp")}
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("login.email")}</Label>
                  <Input id="email" type="email" placeholder={t("login.email_placeholder")} className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-email">{t("login.password")}</Label>
                  <div className="relative">
                    <Input
                      id="password-email"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("login.password_placeholder")}
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-email" checked={rememberMe} onCheckedChange={setRememberMe} />
                    <Label htmlFor="remember-email" className="text-sm text-gray-600">
                      {t("login.remember_me")}
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                    {t("login.forgot_password")}
                  </Link>
                </div>

                <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/dashboard">{t("login.login_button")}</Link>
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray-500">{t("login.or")}</span>
                </div>

                <Button variant="outline" className="w-full h-12 bg-transparent">
                  {t("login.login_with_google")}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="text-center pt-4 border-t">
              <span className="text-sm text-gray-600">
                {t("login.no_account")}{" "}
                <Link href="/register" className="text-orange-600 hover:text-orange-700 font-medium">
                  {t("login.register")}
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>{t("login.account_description")}</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { ArrowLeft, Globe, Users, Settings, BarChart3, FileText, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export default function AdminDashboard() {
  const { t } = useLanguage()

  const adminModules = [
    {
      title: t("admin.translation_management"),
      description: "Manage language translations and localization",
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      href: "/admin/translations",
      stats: "150+ translations",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: t("admin.user_management"),
      description: "Manage vendors, suppliers, and admin users",
      icon: <Users className="w-8 h-8 text-green-600" />,
      href: "/admin/users",
      stats: "1,200+ users",
      color: "bg-green-50 border-green-200",
    },
    {
      title: t("admin.system_settings"),
      description: "Configure platform settings and preferences",
      icon: <Settings className="w-8 h-8 text-purple-600" />,
      href: "/admin/settings",
      stats: "25 settings",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: t("admin.analytics_reports"),
      description: "View platform analytics and generate reports",
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      href: "/admin/analytics",
      stats: "Real-time data",
      color: "bg-orange-50 border-orange-200",
    },
    {
      title: t("admin.content_management"),
      description: "Manage platform content and documentation",
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      href: "/admin/content",
      stats: "50+ pages",
      color: "bg-indigo-50 border-indigo-200",
    },
    {
      title: t("admin.security_permissions"),
      description: "Manage roles, permissions, and security settings",
      icon: <Shield className="w-8 h-8 text-red-600" />,
      href: "/admin/security",
      stats: "5 roles",
      color: "bg-red-50 border-red-200",
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
              <h1 className="text-2xl font-bold text-gray-900">{t("admin.title")}</h1>
              <p className="text-sm text-gray-600">{t("admin.description")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("admin.welcome")}</h2>
          <p className="text-gray-600">{t("admin.welcome_desc")}</p>
        </div>

        {/* Admin Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module) => (
            <Card key={module.title} className={`hover:shadow-lg transition-shadow cursor-pointer ${module.color}`}>
              <Link href={module.href}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {module.icon}
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription className="text-sm">{module.description}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{module.stats}</span>
                    <Button variant="ghost" size="sm">
                      Manage →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Translations</CardTitle>
                <Globe className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-600">2 languages supported</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <p className="text-xs text-gray-600">Uptime this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A+</div>
                <p className="text-xs text-gray-600">All checks passed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

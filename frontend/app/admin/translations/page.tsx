"use client"

import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  BarChart3,
  FileText,
  Globe,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations, type Translation } from "@/lib/translation-context"

export default function TranslationAdminPage() {
  const {
    translations,
    addTranslation,
    updateTranslation,
    deleteTranslation,
    searchTranslations,
    exportTranslations,
    importTranslations,
    getTranslationStats,
  } = useTranslations()

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [editingTranslation, setEditingTranslation] = useState<Translation | null>(null)
  const [importData, setImportData] = useState("")

  const [newTranslation, setNewTranslation] = useState({
    key: "",
    hindi: "",
    english: "",
    category: "",
    description: "",
    status: "active" as const,
  })

  const stats = getTranslationStats()

  const filteredTranslations = useMemo(() => {
    let filtered = translations

    if (searchTerm) {
      filtered = searchTranslations(searchTerm)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((t) => t.category === categoryFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter)
    }

    return filtered
  }, [translations, searchTerm, categoryFilter, statusFilter, searchTranslations])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "draft":
        return "secondary"
      case "deprecated":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "draft":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "deprecated":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const handleAddTranslation = () => {
    if (newTranslation.key && newTranslation.hindi && newTranslation.english && newTranslation.category) {
      addTranslation(newTranslation)
      setNewTranslation({
        key: "",
        hindi: "",
        english: "",
        category: "",
        description: "",
        status: "active",
      })
      setShowAddDialog(false)
    }
  }

  const handleEditTranslation = () => {
    if (editingTranslation) {
      updateTranslation(editingTranslation.id, editingTranslation)
      setEditingTranslation(null)
      setShowEditDialog(false)
    }
  }

  const handleImportTranslations = () => {
    try {
      const data = JSON.parse(importData)
      if (Array.isArray(data)) {
        importTranslations(data)
        setImportData("")
        setShowImportDialog(false)
      }
    } catch (error) {
      alert("Invalid JSON format")
    }
  }

  const openEditDialog = (translation: Translation) => {
    setEditingTranslation({ ...translation })
    setShowEditDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Translation Management</h1>
              <p className="text-sm text-gray-600">Manage language translations and localization</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportTranslations} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Translations</DialogTitle>
                  <DialogDescription>Paste JSON data to import translations</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste JSON data here..."
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    rows={10}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleImportTranslations}>Import</Button>
                    <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Translation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Translation</DialogTitle>
                  <DialogDescription>Create a new translation key for the platform</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="key">Translation Key *</Label>
                      <Input
                        id="key"
                        placeholder="e.g., nav.dashboard"
                        value={newTranslation.key}
                        onChange={(e) => setNewTranslation({ ...newTranslation, key: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newTranslation.category}
                        onValueChange={(value) => setNewTranslation({ ...newTranslation, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {stats.categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">+ New Category</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hindi">Hindi Text *</Label>
                      <Input
                        id="hindi"
                        placeholder="हिंदी में टेक्स्ट"
                        value={newTranslation.hindi}
                        onChange={(e) => setNewTranslation({ ...newTranslation, hindi: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="english">English Text *</Label>
                      <Input
                        id="english"
                        placeholder="English text"
                        value={newTranslation.english}
                        onChange={(e) => setNewTranslation({ ...newTranslation, english: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Optional description for context"
                      value={newTranslation.description}
                      onChange={(e) => setNewTranslation({ ...newTranslation, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newTranslation.status}
                      onValueChange={(value: "active" | "draft" | "deprecated") =>
                        setNewTranslation({ ...newTranslation, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="deprecated">Deprecated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddTranslation}>Add Translation</Button>
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="translations">Translations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Translations</CardTitle>
                  <Globe className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-gray-600">Across all categories</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                  <p className="text-xs text-gray-600">Ready for production</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Draft</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
                  <p className="text-xs text-gray-600">Pending review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Categories</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.categories.length}</div>
                  <p className="text-xs text-gray-600">Translation groups</p>
                </CardContent>
              </Card>
            </div>

            {/* Categories Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Categories Overview</CardTitle>
                <CardDescription>Translation distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.categories.map((category) => {
                    const categoryTranslations = translations.filter((t) => t.category === category)
                    const activeCount = categoryTranslations.filter((t) => t.status === "active").length
                    const percentage = (activeCount / categoryTranslations.length) * 100

                    return (
                      <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold capitalize">{category}</h4>
                            <p className="text-sm text-gray-600">
                              {categoryTranslations.length} translations • {activeCount} active
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">{percentage.toFixed(0)}%</div>
                          <div className="text-xs text-gray-500">completion</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="translations" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search translations..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {stats.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Translations Table */}
            <Card>
              <CardHeader>
                <CardTitle>Translations</CardTitle>
                <CardDescription>{filteredTranslations.length} translations found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Hindi</TableHead>
                        <TableHead>English</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTranslations.map((translation) => (
                        <TableRow key={translation.id}>
                          <TableCell className="font-mono text-sm">{translation.key}</TableCell>
                          <TableCell className="max-w-48 truncate">{translation.hindi}</TableCell>
                          <TableCell className="max-w-48 truncate">{translation.english}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {translation.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(translation.status)}
                              <Badge variant={getStatusColor(translation.status)}>{translation.status}</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {new Date(translation.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => openEditDialog(translation)}>
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteTranslation(translation.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Translation Analytics
                </CardTitle>
                <CardDescription>Insights and metrics about your translations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Translation Completeness</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active Translations</span>
                          <span>{((stats.active / stats.total) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(stats.active / stats.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Recent Activity</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Translations added today</span>
                          <span className="font-semibold">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Translations updated today</span>
                          <span className="font-semibold">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pending reviews</span>
                          <span className="font-semibold">{stats.draft}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Category Distribution</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stats.categories.map((category) => {
                        const count = translations.filter((t) => t.category === category).length
                        const percentage = (count / stats.total) * 100

                        return (
                          <div key={category} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{count}</div>
                            <div className="text-sm text-gray-600 capitalize">{category}</div>
                            <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Translation Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Translation</DialogTitle>
              <DialogDescription>Update the translation details</DialogDescription>
            </DialogHeader>
            {editingTranslation && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-key">Translation Key</Label>
                    <Input
                      id="edit-key"
                      value={editingTranslation.key}
                      onChange={(e) => setEditingTranslation({ ...editingTranslation, key: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Input
                      id="edit-category"
                      value={editingTranslation.category}
                      onChange={(e) => setEditingTranslation({ ...editingTranslation, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-hindi">Hindi Text</Label>
                    <Input
                      id="edit-hindi"
                      value={editingTranslation.hindi}
                      onChange={(e) => setEditingTranslation({ ...editingTranslation, hindi: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-english">English Text</Label>
                    <Input
                      id="edit-english"
                      value={editingTranslation.english}
                      onChange={(e) => setEditingTranslation({ ...editingTranslation, english: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editingTranslation.description || ""}
                    onChange={(e) => setEditingTranslation({ ...editingTranslation, description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingTranslation.status}
                    onValueChange={(value: "active" | "draft" | "deprecated") =>
                      setEditingTranslation({ ...editingTranslation, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEditTranslation}>Update Translation</Button>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

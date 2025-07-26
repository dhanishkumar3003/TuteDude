"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "hi" | "en"

interface Translation {
  id: string
  key: string
  hindi: string
  english: string
  category: string
  description?: string
  createdAt: string
  updatedAt: string
  status: "active" | "draft" | "deprecated"
}

interface TranslationContextType {
  translations: Translation[]
  addTranslation: (translation: Omit<Translation, "id" | "createdAt" | "updatedAt">) => void
  updateTranslation: (id: string, updates: Partial<Translation>) => void
  deleteTranslation: (id: string) => void
  getTranslationsByCategory: (category: string) => Translation[]
  searchTranslations: (query: string) => Translation[]
  exportTranslations: () => void
  importTranslations: (data: Translation[]) => void
  getTranslationStats: () => {
    total: number
    active: number
    draft: number
    deprecated: number
    categories: string[]
  }
}

// Extended translations with metadata
const defaultTranslations: Translation[] = [
  {
    id: "1",
    key: "nav.dashboard",
    hindi: "डैशबोर्ड",
    english: "Dashboard",
    category: "navigation",
    description: "Main dashboard navigation link",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "2",
    key: "nav.suppliers",
    hindi: "आपूर्तिकर्ता",
    english: "Suppliers",
    category: "navigation",
    description: "Suppliers page navigation link",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "3",
    key: "nav.orders",
    hindi: "ऑर्डर्स",
    english: "Orders",
    category: "navigation",
    description: "Orders page navigation link",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "4",
    key: "dashboard.welcome",
    hindi: "नमस्ते राजेश जी! 👋",
    english: "Hello Rajesh! 👋",
    category: "dashboard",
    description: "Welcome message on dashboard",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "5",
    key: "dashboard.monthly_savings",
    hindi: "इस महीने की बचत",
    english: "Monthly Savings",
    category: "dashboard",
    description: "Monthly savings card title",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "6",
    key: "common.search",
    hindi: "खोजें...",
    english: "Search...",
    category: "common",
    description: "Search input placeholder",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "7",
    key: "common.save",
    hindi: "सेव करें",
    english: "Save",
    category: "common",
    description: "Save button text",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "8",
    key: "payments.title",
    hindi: "पेमेंट्स",
    english: "Payments",
    category: "payments",
    description: "Payments page title",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "9",
    key: "inventory.title",
    hindi: "इन्वेंटरी मैनेजमेंट",
    english: "Inventory Management",
    category: "inventory",
    description: "Inventory page title",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
  {
    id: "10",
    key: "status.delivered",
    hindi: "डिलीवर हो गया",
    english: "Delivered",
    category: "status",
    description: "Order delivered status",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    status: "active",
  },
]

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Translation[]>(defaultTranslations)

  useEffect(() => {
    const savedTranslations = localStorage.getItem("vendorconnect-translations")
    if (savedTranslations) {
      try {
        const parsed = JSON.parse(savedTranslations)
        setTranslations(parsed)
      } catch (error) {
        console.error("Failed to parse saved translations:", error)
      }
    }
  }, [])

  const saveToStorage = (newTranslations: Translation[]) => {
    localStorage.setItem("vendorconnect-translations", JSON.stringify(newTranslations))
  }

  const addTranslation = (translation: Omit<Translation, "id" | "createdAt" | "updatedAt">) => {
    const newTranslation: Translation = {
      ...translation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const newTranslations = [...translations, newTranslation]
    setTranslations(newTranslations)
    saveToStorage(newTranslations)
  }

  const updateTranslation = (id: string, updates: Partial<Translation>) => {
    const newTranslations = translations.map((t) =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t,
    )
    setTranslations(newTranslations)
    saveToStorage(newTranslations)
  }

  const deleteTranslation = (id: string) => {
    const newTranslations = translations.filter((t) => t.id !== id)
    setTranslations(newTranslations)
    saveToStorage(newTranslations)
  }

  const getTranslationsByCategory = (category: string) => {
    return translations.filter((t) => t.category === category)
  }

  const searchTranslations = (query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return translations.filter(
      (t) =>
        t.key.toLowerCase().includes(lowercaseQuery) ||
        t.hindi.toLowerCase().includes(lowercaseQuery) ||
        t.english.toLowerCase().includes(lowercaseQuery) ||
        t.category.toLowerCase().includes(lowercaseQuery) ||
        (t.description && t.description.toLowerCase().includes(lowercaseQuery)),
    )
  }

  const exportTranslations = () => {
    const dataStr = JSON.stringify(translations, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `vendorconnect-translations-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importTranslations = (data: Translation[]) => {
    setTranslations(data)
    saveToStorage(data)
  }

  const getTranslationStats = () => {
    const total = translations.length
    const active = translations.filter((t) => t.status === "active").length
    const draft = translations.filter((t) => t.status === "draft").length
    const deprecated = translations.filter((t) => t.status === "deprecated").length
    const categories = [...new Set(translations.map((t) => t.category))]

    return { total, active, draft, deprecated, categories }
  }

  return (
    <TranslationContext.Provider
      value={{
        translations,
        addTranslation,
        updateTranslation,
        deleteTranslation,
        getTranslationsByCategory,
        searchTranslations,
        exportTranslations,
        importTranslations,
        getTranslationStats,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslations must be used within a TranslationProvider")
  }
  return context
}

export type { Translation }

"use client"

import { useState } from "react"
import { Eye, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "@/lib/translation-context"

interface TranslationPreviewProps {
  translationKey: string
}

export function TranslationPreview({ translationKey }: TranslationPreviewProps) {
  const { translations } = useTranslations()
  const [previewLanguage, setPreviewLanguage] = useState<"hi" | "en">("hi")

  const translation = translations.find((t) => t.key === translationKey)

  if (!translation) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <p className="text-red-600 text-sm">Translation key "{translationKey}" not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm">Translation Preview</CardTitle>
          </div>
          <Select value={previewLanguage} onValueChange={(value: "hi" | "en") => setPreviewLanguage(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Key: {translation.key}</div>
          <div className="font-medium">{previewLanguage === "hi" ? translation.hindi : translation.english}</div>
        </div>
        {translation.description && (
          <div className="text-xs text-gray-600">
            <strong>Context:</strong> {translation.description}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Globe className="w-3 h-3" />
          <span>Category: {translation.category}</span>
          <span>•</span>
          <span>Status: {translation.status}</span>
        </div>
      </CardContent>
    </Card>
  )
}

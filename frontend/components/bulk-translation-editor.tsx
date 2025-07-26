"use client"

import { useState } from "react"
import { Upload, Download, Save, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslations, type Translation } from "@/lib/translation-context"

export function BulkTranslationEditor() {
  const { translations, importTranslations, exportTranslations } = useTranslations()
  const [bulkData, setBulkData] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)

  const validateBulkData = (data: string) => {
    try {
      const parsed = JSON.parse(data)
      const newErrors: string[] = []

      if (!Array.isArray(parsed)) {
        newErrors.push("Data must be an array of translation objects")
      } else {
        parsed.forEach((item, index) => {
          if (!item.key) newErrors.push(`Item ${index + 1}: Missing 'key' field`)
          if (!item.hindi) newErrors.push(`Item ${index + 1}: Missing 'hindi' field`)
          if (!item.english) newErrors.push(`Item ${index + 1}: Missing 'english' field`)
          if (!item.category) newErrors.push(`Item ${index + 1}: Missing 'category' field`)
        })
      }

      setErrors(newErrors)
      setIsValid(newErrors.length === 0)
      return newErrors.length === 0
    } catch (error) {
      setErrors(["Invalid JSON format"])
      setIsValid(false)
      return false
    }
  }

  const handleBulkImport = () => {
    if (validateBulkData(bulkData)) {
      const parsed = JSON.parse(bulkData)
      const translationsWithMetadata: Translation[] = parsed.map((item: any) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: item.status || "active",
      }))
      importTranslations([...translations, ...translationsWithMetadata])
      setBulkData("")
      setErrors([])
    }
  }

  const generateTemplate = () => {
    const template = [
      {
        key: "example.key",
        hindi: "उदाहरण टेक्स्ट",
        english: "Example text",
        category: "example",
        description: "This is an example translation",
        status: "active",
      },
    ]
    setBulkData(JSON.stringify(template, null, 2))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Bulk Translation Editor
        </CardTitle>
        <CardDescription>Import or export multiple translations at once using JSON format</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateTemplate} size="sm">
            Generate Template
          </Button>
          <Button variant="outline" onClick={exportTranslations} size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Current
          </Button>
        </div>

        <Textarea
          placeholder="Paste JSON data here or click 'Generate Template' to see the format..."
          value={bulkData}
          onChange={(e) => {
            setBulkData(e.target.value)
            if (e.target.value) {
              validateBulkData(e.target.value)
            } else {
              setErrors([])
              setIsValid(true)
            }
          }}
          rows={12}
          className="font-mono text-sm"
        />

        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <div className="font-semibold">Validation Errors:</div>
                {errors.map((error, index) => (
                  <div key={index} className="text-sm">
                    • {error}
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button onClick={handleBulkImport} disabled={!bulkData || !isValid} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Import Translations
          </Button>
          <Button variant="outline" onClick={() => setBulkData("")}>
            Clear
          </Button>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <div className="font-semibold">JSON Format:</div>
          <div>• Each translation must have: key, hindi, english, category</div>
          <div>• Optional fields: description, status (active/draft/deprecated)</div>
          <div>• Use "Generate Template" to see the exact format</div>
        </div>
      </CardContent>
    </Card>
  )
}

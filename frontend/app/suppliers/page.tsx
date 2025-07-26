"use client"

import { useState } from "react"
import { ArrowLeft, Filter, MapPin, Search, Star, Truck, Verified } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"
import { useEffect } from 'react';
import api from "@/lib/api-service"

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
    "verified" : boolean



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
"verified" : boolean

}


export default function SuppliersPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

const [supplierData, setSupllierData] = useState<FormattedSupplier[]>([]);
  const [sortField, setSortField] = useState<keyof FormattedSupplier>('rating');

useEffect(() => {
  const fetchSuppliers = async () => {
    try {
      const response = await api.get<Supplier[]>('/suppliers');
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
           
          }

          foramtteddatas.push(Formatsupplier);
        })
//console.log(foramtteddatas)
setSupllierData(foramtteddatas);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  fetchSuppliers();
}, []);

  // const suppliers = [
  //   {
  //     id: 1,
  //     name: "Ram Provision Store",
  //     category: t("category.vegetables"),
  //     location: t("location.karol_bagh"),
  //     rating: 4.8,
  //     reviews: 156,
  //     verified: true,
  //     deliveryTime: `2-4 ${t("delivery.hours")}`,
  //     minOrder: "₹500",
  //     specialties: [t("items.onion"), t("items.tomato"), "Green Vegetables"],
  //     discount: `15% ${t("discount.text")}`,
  //     image: "/placeholder.svg?height=100&width=100",
  //   },
  //   {
  //     id: 2,
  //     name: "Sharma Spices",
  //     category: t("category.spices"),
  //     location: t("location.chandni_chowk"),
  //     rating: 4.7,
  //     reviews: 203,
  //     verified: true,
  //     deliveryTime: `1-2 ${t("delivery.hours")}`,
  //     minOrder: "₹300",
  //     specialties: [t("items.garam_masala"), t("items.coriander_powder"), t("items.turmeric_powder")],
  //     discount: `10% ${t("discount.text")}`,
  //     image: "/placeholder.svg?height=100&width=100",
  //   },
  //   {
  //     id: 3,
  //     name: "Gupta Grains",
  //     category: t("category.grains"),
  //     location: t("location.lajpat_nagar"),
  //     rating: 4.9,
  //     reviews: 89,
  //     verified: true,
  //     deliveryTime: `4-6 ${t("delivery.hours")}`,
  //     minOrder: "₹1000",
  //     specialties: [t("items.basmati_rice"), t("items.toor_dal"), "Wheat Flour"],
  //     discount: `20% ${t("discount.text")}`,
  //     image: "/placeholder.svg?height=100&width=100",
  //   },
  //   {
  //     id: 4,
  //     name: "Patel Oil Mill",
  //     category: t("category.oil"),
  //     location: t("location.connaught_place"),
  //     rating: 4.6,
  //     reviews: 134,
  //     verified: true,
  //     deliveryTime: `3-5 ${t("delivery.hours")}`,
  //     minOrder: "₹800",
  //     specialties: [t("items.mustard_oil"), "Sunflower Oil", t("items.ghee")],
  //     discount: `12% ${t("discount.text")}`,
  //     image: "/placeholder.svg?height=100&width=100",
  //   },
  //   {
  //     id: 5,
  //     name: "Khan Meat Supply",
  //     category: t("category.meat"),
  //     location: t("location.jama_masjid"),
  //     rating: 4.5,
  //     reviews: 67,
  //     verified: true,
  //     deliveryTime: `1-3 ${t("delivery.hours")}`,
  //     minOrder: "₹600",
  //     specialties: ["Chicken", "Mutton", "Fish"],
  //     discount: `8% ${t("discount.text")}`,
  //     image: "/placeholder.svg?height=100&width=100",
  //   },
  //   {
  //     id: 6,
  //     name: "Singh Dairy Farm",
  //     category: t("category.dairy"),
  //     location: t("location.gurgaon"),
  //     rating: 4.8,
  //     reviews: 198,
  //     verified: true,
  //     deliveryTime: `2-4 ${t("delivery.hours")}`,
  //     minOrder: "₹400",
  //     specialties: ["Milk", t("items.paneer"), t("items.curd")],
  //     discount: `18% ${t("discount.text")}`,
  //     image: "/placeholder.svg?height=100&width=100",
  //   },
  // ]

  const categories = [
    { value: "all", label: t("suppliers.all_categories") },
    { value: "vegetables", label: t("category.vegetables") },
    { value: "spices", label: t("category.spices") },
    { value: "grains", label: t("category.grains") },
    { value: "oil", label: t("category.oil") },
    { value: "meat", label: t("category.meat") },
    { value: "dairy", label: t("category.dairy") },
  ]

  const locations = [
    { value: "all", label: t("suppliers.all_locations") },
    { value: "delhi", label: "Delhi" },
    { value: "gurgaon", label: "Gurgaon" },
    { value: "noida", label: "Noida" },
    { value: "faridabad", label: "Faridabad" },
  ]

  const filteredSuppliers = supplierData.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialities.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || supplier.category.toLowerCase() === selectedCategory
    const matchesLocation = selectedLocation === "all" || supplier.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

const sortByField = <T,>(
  data: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
};


 const handleSortChange = (value : string) => {
     const selectedField = value as keyof FormattedSupplier;
     console.log(selectedField)
    setSortField(selectedField);
    var ascrOrDsc = 'asc';
    if(selectedField === "rating")
    {
      ascrOrDsc = 'desc';
    }

    const sorted = sortByField(supplierData, sortField, 'asc');
    setSupllierData(sorted);
  };

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
              <h1 className="text-2xl font-bold text-gray-900">{t("suppliers.title")}</h1>
              <p className="text-sm text-gray-600">{t("suppliers.description")}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t("suppliers.search_placeholder")}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder={t("suppliers.select_category")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder={t("suppliers.select_location")} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              {t("suppliers.more_filters")}
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredSuppliers.length} {t("suppliers.results_found")}
          </p>
          <Select value={sortField} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
    <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">{t("suppliers.sort_by_rating")}</SelectItem>
    {/* <SelectItem value="distance">{t("suppliers.sort_by_distance")}</SelectItem> */}
    <SelectItem value="minOrder">{t("suppliers.sort_by_price")}</SelectItem>
    {/* <SelectItem value="delivery">{t("suppliers.sort_by_delivery")}</SelectItem> */}
            </SelectContent>
          </Select>

        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">{supplier.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{supplier.name}</CardTitle>
                        {supplier.verified && <Verified className="w-4 h-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {supplier.location}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{supplier.discount}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{supplier.rating}</span>
                    <span className="text-sm text-gray-600">
                      ({supplier.reviews} {t("reviews.text")})
                    </span>
                  </div>
                  <Badge variant="outline">{supplier.category}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>{supplier.deliveryTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t("suppliers.min_order")} </span>
                    <span className="font-semibold">{supplier.minOrder}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">{t("suppliers.specialties")}</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.specialities.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {supplier.specialities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{supplier.specialities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    {t("suppliers.order_now")}
                  </Button>
                  <Button variant="outline" size="sm">
                    {t("suppliers.view_details")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredSuppliers.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              {t("suppliers.load_more")}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("suppliers.no_results")}</h3>
            <p className="text-gray-600 mb-4">{t("suppliers.no_results_desc")}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLocation("all")
              }}
            >
              {t("suppliers.clear_filters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"
import { ArrowRight, CheckCircle, Play, Star, Shield, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"

export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">VC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">VendorConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" asChild>
              <Link href="/login">{t("nav.login")}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("landing.title")} <br />
            <span className="text-orange-500">{t("landing.subtitle")}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("landing.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/login">
                {t("landing.get_started")} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Play className="mr-2 w-5 h-5" />
              {t("landing.watch_demo")}
            </Button>
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t("landing.problems_solutions")}</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Current Challenges */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-red-600">{t("landing.current_challenges")}</h3>
              <div className="space-y-4">
                {[t("landing.problem1"), t("landing.problem2"), t("landing.problem3"), t("landing.problem4")].map(
                  (problem, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                        <span className="text-red-600 text-sm">✗</span>
                      </div>
                      <p className="text-gray-700">{problem}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* With VendorConnect */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-green-600">{t("landing.with_vendorconnect")}</h3>
              <div className="space-y-4">
                {[t("landing.solution1"), t("landing.solution2"), t("landing.solution3"), t("landing.solution4")].map(
                  (solution, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                      <p className="text-gray-700">{solution}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t("landing.key_features")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t("landing.verified_suppliers")}</h3>
                <p className="text-gray-600">{t("landing.verified_desc")}</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t("landing.better_prices")}</h3>
                <p className="text-gray-600">{t("landing.better_prices_desc")}</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{t("landing.local_network")}</h3>
                <p className="text-gray-600">{t("landing.local_network_desc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t("landing.how_it_works")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: t("landing.register"), desc: t("landing.step1_desc") },
              { step: "2", title: t("landing.find_suppliers"), desc: t("landing.step2_desc") },
              { step: "3", title: t("landing.place_order"), desc: t("landing.step3_desc") },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t("landing.success_stories")}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t("landing.vendor1_quote")}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">RK</span>
                  </div>
                  <div>
                    <p className="font-semibold">{t("landing.vendor1_name")}</p>
                    <p className="text-sm text-gray-600">{t("landing.vendor1_role")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t("landing.vendor2_quote")}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">PS</span>
                  </div>
                  <div>
                    <p className="font-semibold">{t("landing.vendor2_name")}</p>
                    <p className="text-sm text-gray-600">{t("landing.vendor2_role")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-orange-500 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">{t("landing.start_today")}</h2>
          <p className="text-xl mb-8 opacity-90">{t("landing.cta_desc")}</p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/login">
              {t("landing.start_free")} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VC</span>
                </div>
                <span className="text-lg font-bold">VendorConnect</span>
              </div>
              <p className="text-gray-400">{t("footer.tagline")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    {t("footer.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    {t("footer.careers")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    {t("footer.contact")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("nav.help")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    {t("footer.help_center")}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    {t("footer.faq")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    {t("footer.privacy")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("language.select")}</h4>
              <div className="space-y-2">
                <button className="block text-gray-400 hover:text-white">{t("language.hindi")}</button>
                <button className="block text-gray-400 hover:text-white">{t("language.english")}</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VendorConnect. {t("footer.rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

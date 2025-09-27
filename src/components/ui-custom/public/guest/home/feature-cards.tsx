import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description:
      "Experience blazing-fast load times with our optimized infrastructure and cutting-edge technology stack that ensures your website performs at its peak.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Protect your business with bank-level security measures, SSL encryption, and regular security audits to keep your data and customers safe.",
  },
  {
    icon: Users,
    title: "Collaborative Workflow",
    description:
      "Work seamlessly with your team using our collaborative tools, real-time editing, and project management features designed for modern teams.",
  },
]

export function FeatureCards() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose Our Platform</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the powerful features that make our platform the perfect choice for your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

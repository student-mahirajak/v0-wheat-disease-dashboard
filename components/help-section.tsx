"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Camera, Leaf, Brain, AlertTriangle } from "lucide-react"

const faqs = [
  {
    question: "How do I take a good photo of a wheat leaf?",
    answer: "For best results, place the leaf on a plain background with good lighting. Avoid shadows and ensure the entire leaf is visible in the frame. Take the photo from directly above the leaf at a distance of about 30cm.",
    icon: Camera,
  },
  {
    question: "What diseases can this system detect?",
    answer: "Our CNN model can detect common wheat diseases including Leaf Rust (Puccinia triticina), Powdery Mildew (Blumeria graminis), Septoria Leaf Blotch, Yellow Rust, and can identify healthy leaves. The model is continuously being improved.",
    icon: Leaf,
  },
  {
    question: "How accurate is the AI detection?",
    answer: "Our deep learning model has been trained on thousands of wheat leaf images and achieves over 95% accuracy in controlled conditions. However, results should be used as guidance and verified by agricultural experts when possible.",
    icon: Brain,
  },
  {
    question: "What should I do if a disease is detected?",
    answer: "If a disease is detected, review the treatment recommendations provided. For severe cases, we recommend consulting with a local agricultural extension officer. Early detection and treatment can significantly reduce crop losses.",
    icon: AlertTriangle,
  },
]

const tips = [
  "Scan leaves from different parts of the field for comprehensive monitoring",
  "Regular scanning every 1-2 weeks helps catch diseases early",
  "Clean your camera lens before taking photos for clearer results",
  "Compare results over time to track disease progression",
]

export function HelpSection() {
  return (
    <Card className="overflow-hidden border-border/50 shadow-lg" id="help">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <HelpCircle className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Help & FAQ</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* FAQs */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-4 bg-muted/20"
                >
                  <AccordionTrigger className="text-sm text-left hover:no-underline py-3">
                    <div className="flex items-center gap-3">
                      <faq.icon className="h-4 w-4 text-primary shrink-0" />
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 pl-7">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Quick Tips */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Quick Tips for Better Results</h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-medium text-foreground mb-2">Need More Help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Contact our agricultural support team for personalized assistance.
              </p>
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground">Email:</span>
                <a href="mailto:support@leafguard.ai" className="text-primary hover:underline">
                  support@leafguard.ai
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

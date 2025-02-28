import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ContactForm from "@/components/contact/ContactForm";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon?: React.ReactNode;
  }>;
}

const ContactSection = ({
  title = "Get In Touch",
  subtitle = "Have a project in mind or want to discuss a collaboration? I'd love to hear from you!",
  email = "hello@example.com",
  phone = "+1 (555) 123-4567",
  location = "San Francisco, CA",
  socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/example" },
    { name: "GitHub", url: "https://github.com/example" },
    { name: "Twitter", url: "https://twitter.com/example" },
  ],
}: ContactSectionProps) => {
  return (
    <section className="w-full py-16 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full bg-card shadow-md border border-border/50">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href={`mailto:${email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">{location}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">Connect with me</h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
                      >
                        {link.icon || <ExternalLink className="mr-2 h-4 w-4" />}
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    I'm currently available for freelance work and
                    collaborations. Feel free to reach out if you have an
                    interesting project in mind!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Send Me a Message</h3>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and I'll get back to you as soon as
                possible.
              </p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

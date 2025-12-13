import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // In a real application, this would send the data to a backend
    try {
      // TODO: Implement API call to send contact form data
      // await sendContactForm(data);
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-border/50">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                Contact Us
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground mb-4 lg:mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/60 max-w-2xl mx-auto font-light leading-relaxed">
              We'd love to hear from you. Reach out to us with any questions or inquiries.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <Card className="border-border/40 shadow-[var(--shadow-soft)]">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl lg:text-3xl mb-2">Send us a Message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+27 (0) 11 123 4567"
                        {...register("phone")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="What is this regarding?"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-sm text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        rows={6}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium px-8 py-6 text-base lg:text-lg shadow-[var(--shadow-medium)] transition-all duration-300 hover:shadow-[var(--shadow-luxury)] hover:-translate-y-0.5 rounded-md"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6 lg:space-y-8">
                <Card className="border-border/40 shadow-[var(--shadow-soft)]">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl lg:text-2xl mb-2">Contact Information</CardTitle>
                    <CardDescription className="text-sm lg:text-base">
                      Visit us or reach out through any of these channels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5 lg:space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                        <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1.5 text-base lg:text-lg">Address</h3>
                        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                          123 Sandton Drive<br />
                          Sandton, Johannesburg<br />
                          2196, South Africa
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                        <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1.5 text-base lg:text-lg">Phone</h3>
                        <a href="tel:+27111234567" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base">
                          +27 (0) 11 123 4567
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                        <Mail className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1.5 text-base lg:text-lg">Email</h3>
                        <a href="mailto:info@afrikaeyewear.co.za" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base">
                          info@afrikaeyewear.co.za
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                        <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1.5 text-base lg:text-lg">Business Hours</h3>
                        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 9:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40 shadow-[var(--shadow-soft)]">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl lg:text-2xl mb-2">Management Team</CardTitle>
                    <CardDescription className="text-sm lg:text-base">
                      Reach out to our management team directly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm lg:text-base mb-1.5">General Manager</h4>
                        <a href="mailto:manager@afrikaeyewear.co.za" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base">
                          manager@afrikaeyewear.co.za
                        </a>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm lg:text-base mb-1.5">Sales Manager</h4>
                        <a href="mailto:sales@afrikaeyewear.co.za" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base">
                          sales@afrikaeyewear.co.za
                        </a>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm lg:text-base mb-1.5">Operations Manager</h4>
                        <a href="mailto:operations@afrikaeyewear.co.za" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base">
                          operations@afrikaeyewear.co.za
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40 shadow-[var(--shadow-soft)]">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl lg:text-2xl">Why Choose Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 lg:space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 font-semibold text-lg">✓</span>
                        <span className="text-muted-foreground text-sm lg:text-base">Proudly South African owned and operated</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 font-semibold text-lg">✓</span>
                        <span className="text-muted-foreground text-sm lg:text-base">Premium quality eyewear with local craftsmanship</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 font-semibold text-lg">✓</span>
                        <span className="text-muted-foreground text-sm lg:text-base">Expert fitting and consultation services</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary mt-0.5 font-semibold text-lg">✓</span>
                        <span className="text-muted-foreground text-sm lg:text-base">Fast and reliable delivery across South Africa</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;


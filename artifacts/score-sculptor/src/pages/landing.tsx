import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  LineChart, 
  BookOpen, 
  MessageSquare,
  CheckCircle2
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Score Sculptor Logo" className="w-9 h-9 object-contain" />
            <span className="font-semibold text-lg tracking-tight">Score Sculptor™</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/register">
              <Button className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide border border-primary/20 inline-block mb-6">
                Premium Credit Intelligence
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Shape Your Credit Future <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  With Precision.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                AI-powered credit monitoring, dispute organization, and financial education built for modern consumers. Take control of your financial destiny.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all bg-primary">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur border-border/50 hover:bg-muted/50">
                View Demo
              </Button>
            </motion.div>
          </div>

          {/* Hero Image/Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-primary/5" />
              {/* Abstract dashboard representation */}
              <div className="absolute inset-0 p-8 flex flex-col gap-6">
                <div className="h-12 w-full max-w-md bg-muted/50 rounded-lg" />
                <div className="flex gap-6 h-48">
                  <div className="w-1/3 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-4 border-primary/40 border-t-primary animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="w-2/3 bg-muted/30 rounded-xl" />
                </div>
                <div className="flex-1 bg-muted/20 rounded-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Intelligent Tools for Real Results</h2>
            <p className="text-muted-foreground text-lg">Everything you need to monitor, analyze, and improve your credit profile in one unified dashboard.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <LineChart className="w-8 h-8 text-primary" />,
                title: "Precision Monitoring",
                desc: "Track changes across your profile with intelligent alerts and deep analysis of your tradelines."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Dispute Organization",
                desc: "Manage disputes with an intuitive pipeline, AI-assisted templates, and progress tracking."
              },
              {
                icon: <BookOpen className="w-8 h-8 text-primary" />,
                title: "Financial Education",
                desc: "Level up your knowledge with our comprehensive learning modules covering FCRA and credit fundamentals."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium border border-blue-500/20">
                <MessageSquare className="w-4 h-4" />
                Meet Sculpt AI
              </div>
              <h2 className="text-4xl font-bold tracking-tight">Your personal credit intelligence assistant.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Get instant answers to complex credit questions. Sculpt AI is trained on FCRA guidelines, Metro 2 formatting, and credit repair strategies to guide your journey.
              </p>
              <ul className="space-y-4">
                {[
                  "Analyze negative items on your report",
                  "Suggest the best dispute strategy",
                  "Explain complex credit terminology"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-card border border-border/50 rounded-2xl shadow-2xl p-6 relative">
                <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Always Learning
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                    <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-sm text-sm">
                      How should I dispute a late payment that I believe is inaccurate?
                    </div>
                  </div>
                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tr-sm text-sm text-foreground/90">
                      Based on FCRA guidelines, you should first gather any proof of timely payment (bank statements, confirmation emails). Then, I can help you draft a direct dispute letter to the creditor...
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-xs text-center text-muted-foreground/60 border-t border-border/50 pt-4">
                  Educational Use Only. Score Sculptor does not provide legal advice.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg">Invest in your financial future with plans designed for your needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-2">Basic</h3>
              <div className="mb-6"><span className="text-4xl font-bold">$0</span><span className="text-muted-foreground">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Basic dashboard tracking</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Up to 2 active disputes</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Access to basic education modules</li>
              </ul>
              <Button className="w-full" variant="outline">Start Free</Button>
            </div>
            
            <div className="bg-card border-2 border-primary rounded-2xl p-8 shadow-xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold mb-2">Pro Sculptor</h3>
              <div className="mb-6"><span className="text-4xl font-bold">$19</span><span className="text-muted-foreground">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited dispute tracking</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Unlimited Sculpt AI access</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Premium templates & letters</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Full education hub access</li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">Upgrade to Pro</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to take control?</h2>
          <p className="text-xl text-muted-foreground mb-10">Join thousands of consumers who are actively sculpting their credit futures.</p>
          <Link href="/register">
            <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/20 bg-primary">
              Create Your Free Account
            </Button>
          </Link>
          <p className="mt-8 text-sm text-muted-foreground/60 max-w-xl mx-auto">
            Educational Use Only. Score Sculptor does not provide legal advice, and is not a credit repair organization. We provide tools for self-directed education and organization.
          </p>
        </div>
      </section>
      
      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Score Sculptor™. All rights reserved.</p>
      </footer>
    </div>
  );
}

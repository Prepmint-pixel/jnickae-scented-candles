import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProfile } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, Target, BookOpen } from "lucide-react";

const onboardingSchema = z.object({
  creditGoal: z.string().min(1, "Please select a goal"),
  educationLevel: z.string().min(1, "Please select your current knowledge level"),
});

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      creditGoal: "",
      educationLevel: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    try {
      await updateProfile.mutateAsync({ data: values });
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-8 border-b border-border/40">
            <CardTitle className="text-3xl font-bold tracking-tight">Set Your Baseline</CardTitle>
            <CardDescription className="text-lg mt-2">
              Help us personalize your Score Sculptor experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                
                <FormField
                  control={form.control}
                  name="creditGoal"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Target className="w-5 h-5" />
                        <FormLabel className="text-base">What is your primary financial goal?</FormLabel>
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {[
                            { value: "buy_home", label: "Buy a Home", desc: "Qualify for a mortgage with better rates" },
                            { value: "buy_car", label: "Buy a Car", desc: "Secure auto financing" },
                            { value: "repair_credit", label: "Repair Credit", desc: "Remove negative items & rebuild" },
                            { value: "max_score", label: "Maximize Score", desc: "Get into the 800+ club" },
                          ].map((option) => (
                            <FormItem key={option.value}>
                              <FormControl>
                                <RadioGroupItem value={option.value} className="peer sr-only" />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-transparent p-4 hover:bg-muted/50 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all">
                                <span className="font-semibold block w-full text-center mb-1">{option.label}</span>
                                <span className="text-xs text-muted-foreground text-center font-normal">{option.desc}</span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border/40" />

                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <BookOpen className="w-5 h-5" />
                        <FormLabel className="text-base">How well do you understand the FCRA and credit reporting?</FormLabel>
                      </div>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          {[
                            { value: "beginner", label: "Beginner", desc: "I'm new to credit concepts" },
                            { value: "intermediate", label: "Intermediate", desc: "I know the basics, but want to learn more" },
                            { value: "advanced", label: "Advanced", desc: "I understand Metro 2 and FCRA well" },
                          ].map((option) => (
                            <FormItem key={option.value}>
                              <FormControl>
                                <RadioGroupItem value={option.value} className="peer sr-only" />
                              </FormControl>
                              <FormLabel className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-transparent p-4 hover:bg-muted/50 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all">
                                <span className="font-semibold block w-full text-center mb-1">{option.label}</span>
                                <span className="text-xs text-muted-foreground text-center font-normal">{option.desc}</span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Saving..." : "Go to Dashboard"}
                    {!updateProfile.isPending && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

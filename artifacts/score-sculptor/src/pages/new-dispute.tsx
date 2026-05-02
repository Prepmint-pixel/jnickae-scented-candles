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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateDispute } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout";
import { ChevronLeft, Info, Send } from "lucide-react";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";

const disputeSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Please provide more details"),
  disputeType: z.enum(["bureau", "direct", "goodwill", "debt_validation"]),
  bureau: z.string().optional(),
  creditorName: z.string().min(2, "Creditor name is required"),
  accountNumber: z.string().min(4, "Account number is required"),
  reason: z.string().min(5, "Reason is required"),
});

export default function NewDispute() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createDispute = useCreateDispute();

  const form = useForm<z.infer<typeof disputeSchema>>({
    resolver: zodResolver(disputeSchema),
    defaultValues: {
      title: "",
      description: "",
      disputeType: "bureau",
      bureau: "",
      creditorName: "",
      accountNumber: "",
      reason: "",
    },
  });

  const selectedType = form.watch("disputeType");

  async function onSubmit(values: z.infer<typeof disputeSchema>) {
    try {
      const res = await createDispute.mutateAsync({ data: values });
      toast({
        title: "Dispute created",
        description: "Your dispute has been drafted and saved.",
      });
      setLocation(`/disputes/${res.id}`);
    } catch (error) {
      toast({
        title: "Error creating dispute",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/disputes">
          <Button variant="ghost" size="sm" className="mb-2 -ml-3 text-muted-foreground">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Dispute</h1>
          <p className="text-muted-foreground mt-1">Draft a new dispute letter or request.</p>
        </div>

        <Alert className="bg-muted/30 border-border/50 text-muted-foreground">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Educational Use Only. Score Sculptor automatically formats your letter based on FCRA guidelines, but does not guarantee results or provide legal advice.
          </AlertDescription>
        </Alert>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
          <CardHeader>
            <CardTitle>Dispute Details</CardTitle>
            <CardDescription>Fill out the information below to generate your document.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="disputeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dispute Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border/50">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bureau">Credit Bureau Dispute</SelectItem>
                            <SelectItem value="direct">Direct Creditor Dispute</SelectItem>
                            <SelectItem value="goodwill">Goodwill Adjustment Letter</SelectItem>
                            <SelectItem value="debt_validation">Debt Validation Request</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedType === "bureau" && (
                    <FormField
                      control={form.control}
                      name="bureau"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Credit Bureau</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-border/50">
                                <SelectValue placeholder="Select bureau" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Equifax">Equifax</SelectItem>
                              <SelectItem value="Experian">Experian</SelectItem>
                              <SelectItem value="TransUnion">TransUnion</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internal Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Experian Late Payment - Chase" {...field} className="bg-background/50 border-border/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="creditorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Creditor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Chase Bank" {...field} className="bg-background/50 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 123456789 (full or partial)" {...field} className="bg-background/50 border-border/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Dispute</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50 border-border/50">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Not my account">Not my account</SelectItem>
                          <SelectItem value="Account closed, reported as open">Account closed, reported as open</SelectItem>
                          <SelectItem value="Never late">Never late</SelectItem>
                          <SelectItem value="Balance is incorrect">Balance is incorrect</SelectItem>
                          <SelectItem value="Duplicate account">Duplicate account</SelectItem>
                          <SelectItem value="Other">Other (explain below)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Explanation</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide specific details about why this information is inaccurate..." 
                          className="min-h-[100px] bg-background/50 border-border/50 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                    disabled={createDispute.isPending}
                  >
                    {createDispute.isPending ? "Generating..." : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate Letter
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

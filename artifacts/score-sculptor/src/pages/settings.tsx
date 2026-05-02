import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateProfile } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Monitor, Save } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  creditGoal: z.string().optional(),
  educationLevel: z.string().optional(),
});

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const updateProfile = useUpdateProfile();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      creditGoal: user?.creditGoal || "",
      educationLevel: user?.educationLevel || "",
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      await updateProfile.mutateAsync({ data: values });
      toast({
        title: "Profile updated",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error saving your profile.",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        <div className="grid gap-8">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and goals.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 border-border/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-background/50 border-border/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <Input value={user?.email} disabled className="bg-muted/50 border-border/50 opacity-70" />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="creditGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Goal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background/50 border-border/50">
                                <SelectValue placeholder="Select a goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="buy_home">Buy a Home</SelectItem>
                              <SelectItem value="buy_car">Buy a Car</SelectItem>
                              <SelectItem value="repair_credit">Repair Credit</SelectItem>
                              <SelectItem value="max_score">Maximize Score</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                      disabled={updateProfile.isPending}
                    >
                      {updateProfile.isPending ? "Saving..." : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Score Sculptor looks on your device.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  className={`w-32 justify-start ${theme === "light" ? "bg-primary text-primary-foreground" : "bg-transparent border-border/50"}`}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  className={`w-32 justify-start ${theme === "dark" ? "bg-primary text-primary-foreground" : "bg-transparent border-border/50"}`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  className={`w-32 justify-start ${theme === "system" ? "bg-primary text-primary-foreground" : "bg-transparent border-border/50"}`}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  System
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

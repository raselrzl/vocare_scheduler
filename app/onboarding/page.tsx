import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingRoutePage() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="rounded-xs">
        <CardHeader>
            <CardTitle className="uppercase font-bold">Welcome to vocare</CardTitle>
            <CardDescription>Fill up the information</CardDescription>
        </CardHeader>
        <form>
            <CardContent className="flex flex-col gap-y-5 ">
            <div className="grid gap-y-2">
                <Label>Full Name</Label>
                <Input placeholder="jhon doe"/>
            </div>
            <div className="grid gap-y-2">
                <Label>Userame</Label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">vocare.com/</span>
                    <Input placeholder="jhon_doe" className="rounded-l-none"/>
                </div>
            </div>
        </CardContent>
              <CardFooter>
            <Button className="w-full mt-4">Submit</Button>
        </CardFooter>
        </form>
  
      </Card>
    </div>
  );
}
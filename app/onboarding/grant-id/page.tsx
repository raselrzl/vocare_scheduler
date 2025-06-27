import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingrouteTwo(){
    return(
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>You are Almost done</CardTitle>
                    <CardDescription>
                        We have to connect your calender to your account
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
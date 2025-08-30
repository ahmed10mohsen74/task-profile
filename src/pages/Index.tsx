import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, User, Shield, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Profile Palace
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Manage your account, view your products, and get instant support with our comprehensive client portal
            </p>
            <Link to="/profile">
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50 shadow-hover">
                Access Your Profile
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our client portal provides all the tools you need to manage your account and get support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-card hover:shadow-hover transition-smooth text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Profile Management</CardTitle>
              <CardDescription>
                Update your personal information and change passwords securely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-2 text-muted-foreground">
                <li>• Edit name and contact details</li>
                <li>• Secure password changes</li>
                <li>• Account verification</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-smooth text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Product Overview</CardTitle>
              <CardDescription>
                View all your purchased products and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-2 text-muted-foreground">
                <li>• Active product monitoring</li>
                <li>• Purchase history tracking</li>
                <li>• Status updates and alerts</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-hover transition-smooth text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <CardTitle>24/7 Support</CardTitle>
              <CardDescription>
                Get instant help through our AI-powered chatbot and human agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-left space-y-2 text-muted-foreground">
                <li>• Instant FAQ responses</li>
                <li>• Human agent escalation</li>
                <li>• Real-time assistance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link to="/profile">
            <Button size="lg" className="shadow-card">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Calendar, Shield, Download, RefreshCw } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock product data - in real app this would come from API
  const products = {
    "1": {
      id: 1,
      name: "Premium Analytics Suite",
      purchaseDate: "2024-01-15",
      status: "Active",
      description: "Advanced analytics and reporting tools",
      price: "$299.00",
      features: [
        "Real-time analytics dashboard",
        "Custom report generation",
        "Data export capabilities",
        "24/7 monitoring"
      ],
      expiryDate: "2025-01-15",
      licenseKey: "PAS-2024-XXXX-YYYY"
    },
    "2": {
      id: 2,
      name: "Cloud Storage Pro",
      purchaseDate: "2024-02-10",
      status: "Active",
      description: "100GB secure cloud storage solution",
      price: "$149.00",
      features: [
        "100GB secure storage",
        "File synchronization",
        "Version control",
        "Team collaboration"
      ],
      expiryDate: "2025-02-10",
      licenseKey: "CSP-2024-XXXX-ZZZZ"
    },
    "3": {
      id: 3,
      name: "AI Assistant License",
      purchaseDate: "2024-01-30",
      status: "Pending",
      description: "AI-powered productivity assistant",
      price: "$199.00",
      features: [
        "AI-powered assistance",
        "Task automation",
        "Smart scheduling",
        "Natural language processing"
      ],
      expiryDate: "2025-01-30",
      licenseKey: "Processing..."
    },
    "4": {
      id: 4,
      name: "Security Shield",
      purchaseDate: "2023-12-05",
      status: "Expired",
      description: "Enhanced security and protection tools",
      price: "$399.00",
      features: [
        "Advanced threat detection",
        "Real-time protection",
        "Security monitoring",
        "Vulnerability scanning"
      ],
      expiryDate: "2024-12-05",
      licenseKey: "SS-2023-XXXX-WWWW"
    }
  };

  const product = products[id as keyof typeof products];

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested product could not be found.</p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      Expired: "bg-red-100 text-red-800 border-red-200"
    };
    return variants[status as keyof typeof variants] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </div>
            <Badge className={getStatusBadge(product.status)}>
              {product.status}
            </Badge>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-blue-100">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-primary" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Purchase Date</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-sm">{new Date(product.purchaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="text-lg font-semibold text-primary mt-1">{product.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                  <p className="text-sm mt-1">{new Date(product.expiryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">License Key</label>
                  <p className="text-sm font-mono mt-1 bg-muted px-2 py-1 rounded">{product.licenseKey}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Features Included
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Available Actions</CardTitle>
              <CardDescription>
                Manage your product or get support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {product.status === "Active" && (
                  <>
                    <Button className="shadow-card">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resources
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Renew License
                    </Button>
                  </>
                )}
                {product.status === "Pending" && (
                  <Button variant="outline" className="shadow-card">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check Activation Status
                  </Button>
                )}
                {product.status === "Expired" && (
                  <Button className="shadow-card">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renew Product
                  </Button>
                )}
                <Button variant="outline">
                  Request Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
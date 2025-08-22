// pages/dashboard/CreditScoring.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Clock,
  Zap,
  Users,
  Building,
  Phone,
  Wallet,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Eye,
  Download,
  Share
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CreditScore {
  score: number;
  rating: string;
  factors: CreditFactor[];
  recommendations: string[];
  lastUpdated: Date;
  improvementTips: ImprovementTip[];
}

interface CreditFactor {
  name: string;
  weight: number;
  impact: 'positive' | 'negative' | 'neutral';
  value: number;
  trend: 'up' | 'down' | 'stable';
}

interface ImprovementTip {
  title: string;
  description: string;
  impact: number;
  timeframe: string;
  completed?: boolean;
}

interface LoanOffer {
  amount: number;
  interestRate: number;
  term: number;
  monthlyPayment: number;
  eligibility: 'high' | 'medium' | 'low';
  features: string[];
}

const CreditScoring = () => {
  const { toast } = useToast();
  const [creditScore, setCreditScore] = useState<CreditScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<number | null>(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);

  // Mock user data (in real app, this would come from backend)
  const userData = {
    airtimeSpend: 350,
    phoneTopUps: 12,
    simAge: 24, // months
    paymentConsistency: 0.85,
    savingsPattern: 0.7,
    transactionFrequency: 45,
    socialConnections: 8
  };

  useEffect(() => {
    // Simulate API call to calculate credit score
    const calculateCreditScore = async () => {
      setIsLoading(true);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockScore: CreditScore = {
        score: calculateMockScore(userData),
        rating: getRating(calculateMockScore(userData)),
        factors: [
          {
            name: "Airtime Spending",
            weight: 25,
            impact: userData.airtimeSpend > 300 ? 'positive' : 'negative',
            value: userData.airtimeSpend,
            trend: 'up'
          },
          {
            name: "Top-up Frequency",
            weight: 20,
            impact: userData.phoneTopUps > 10 ? 'positive' : 'negative',
            value: userData.phoneTopUps,
            trend: 'stable'
          },
          {
            name: "SIM Card Age",
            weight: 15,
            impact: userData.simAge > 12 ? 'positive' : 'negative',
            value: userData.simAge,
            trend: 'up'
          },
          {
            name: "Payment Consistency",
            weight: 30,
            impact: userData.paymentConsistency > 0.8 ? 'positive' : 'negative',
            value: userData.paymentConsistency * 100,
            trend: userData.paymentConsistency > 0.85 ? 'up' : 'down'
          },
          {
            name: "Savings Pattern",
            weight: 10,
            impact: userData.savingsPattern > 0.6 ? 'positive' : 'negative',
            value: userData.savingsPattern * 100,
            trend: 'stable'
          }
        ],
        recommendations: [
          "Increase your airtime spending consistency",
          "Maintain regular top-up patterns",
          "Consider setting up automatic savings",
          "Build longer transaction history"
        ],
        lastUpdated: new Date(),
        improvementTips: [
          {
            title: "Regular Airtime Usage",
            description: "Maintain consistent airtime spending above R300 monthly",
            impact: 15,
            timeframe: "1 month",
            completed: userData.airtimeSpend > 300
          },
          {
            title: "Frequent Top-ups",
            description: "Aim for at least 15 top-ups per month",
            impact: 12,
            timeframe: "2 weeks",
            completed: userData.phoneTopUps >= 15
          },
          {
            title: "Payment Consistency",
            description: "Maintain 90%+ on-time payment rate",
            impact: 20,
            timeframe: "3 months",
            completed: userData.paymentConsistency >= 0.9
          }
        ]
      };

      setCreditScore(mockScore);
      generateLoanOffers(mockScore.score);
      setIsLoading(false);
    };

    calculateCreditScore();
  }, []);

  const calculateMockScore = (data: any): number => {
    let score = 500; // Base score
    
    // Airtime spending (max +150)
    score += Math.min(data.airtimeSpend / 5, 150);
    
    // Top-up frequency (max +100)
    score += Math.min(data.phoneTopUps * 8, 100);
    
    // SIM age (max +100)
    score += Math.min(data.simAge * 4, 100);
    
    // Payment consistency (max +150)
    score += data.paymentConsistency * 150;
    
    // Savings pattern (max +100)
    score += data.savingsPattern * 100;
    
    return Math.min(Math.round(score), 850);
  };

  const getRating = (score: number): string => {
    if (score >= 750) return "Excellent";
    if (score >= 650) return "Good";
    if (score >= 550) return "Fair";
    if (score >= 450) return "Poor";
    return "Very Poor";
  };

  const generateLoanOffers = (score: number) => {
    const offers: LoanOffer[] = [];
    
    if (score >= 700) {
      offers.push({
        amount: 10000,
        interestRate: 8.5,
        term: 12,
        monthlyPayment: 874,
        eligibility: 'high',
        features: ["Instant approval", "No collateral", "Flexible repayment"]
      });
    }
    
    if (score >= 600) {
      offers.push({
        amount: 5000,
        interestRate: 12.5,
        term: 6,
        monthlyPayment: 862,
        eligibility: 'high',
        features: ["Quick disbursement", "Mobile wallet access", "24/7 support"]
      });
    }
    
    if (score >= 500) {
      offers.push({
        amount: 2000,
        interestRate: 15.0,
        term: 3,
        monthlyPayment: 696,
        eligibility: 'medium',
        features: ["No paperwork", "Same-day funding", "SMS alerts"]
      });
    }
    
    // Basic offer for lower scores
    offers.push({
      amount: 500,
      interestRate: 18.0,
      term: 1,
      monthlyPayment: 515,
      eligibility: 'low',
      features: ["Build credit history", "No bank account needed", "USSD access"]
    });

    setLoanOffers(offers);
  };

  const handleApplyForLoan = (offerIndex: number) => {
    const offer = loanOffers[offerIndex];
    setSelectedLoan(offerIndex);
    
    toast({
      title: "Loan Application Started",
      description: `Applying for R${offer.amount} loan at ${offer.interestRate}% interest`
    });
  };

  const handleShareScore = () => {
    toast({
      title: "Credit Score Shared",
      description: "Your credit score has been shared with selected partners"
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your credit report has been downloaded successfully"
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Credit Scoring</h1>
          <p className="text-muted-foreground">Analyzing your financial behavior...</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!creditScore) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Credit Scoring</h1>
          <p className="text-muted-foreground">Unable to load credit score</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Credit Scoring</h1>
        <p className="text-muted-foreground">
          Real-time credit assessment using alternative data for the unbanked
        </p>
      </div>

      {/* Main Credit Score Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Your Credit Score
          </CardTitle>
          <CardDescription>
            Updated {creditScore.lastUpdated.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">
              {creditScore.score}
            </div>
            <Badge 
              variant="secondary" 
              className={`text-lg px-4 py-2 ${
                creditScore.rating === 'Excellent' ? 'bg-green-100 text-green-800' :
                creditScore.rating === 'Good' ? 'bg-blue-100 text-blue-800' :
                creditScore.rating === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {creditScore.rating}
            </Badge>
            
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>300</span>
                <span>850</span>
              </div>
              <Progress value={(creditScore.score - 300) / (850 - 300) * 100} className="h-3" />
            </div>

            <div className="flex gap-2 justify-center pt-4">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" onClick={handleShareScore}>
                <Share className="w-4 h-4 mr-2" />
                Share Score
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Credit Factors
            </CardTitle>
            <CardDescription>
              How different factors influence your score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditScore.factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      factor.impact === 'positive' ? 'bg-green-100 text-green-600' :
                      factor.impact === 'negative' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {factor.impact === 'positive' ? <ArrowUp className="w-4 h-4" /> :
                       factor.impact === 'negative' ? <ArrowDown className="w-4 h-4" /> :
                       <Clock className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{factor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof factor.value === 'number' ? factor.value.toFixed(0) : factor.value}
                        {factor.name.includes('Percentage') ? '%' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{factor.weight}%</p>
                    <p className="text-xs text-muted-foreground">Weight</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showDetailedAnalysis ? 'Hide Detailed Analysis' : 'Show Detailed Analysis'}
            </Button>

            {showDetailedAnalysis && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-3">How Your Score is Calculated:</h4>
                <div className="space-y-2 text-sm">
                  <p>• <strong>Airtime Spending:</strong> Regular spending shows financial stability</p>
                  <p>• <strong>Top-up Frequency:</strong> Consistent top-ups indicate reliable income</p>
                  <p>• <strong>SIM Card Age:</strong> Longer history demonstrates stability</p>
                  <p>• <strong>Payment Consistency:</strong> On-time payments build trust</p>
                  <p>• <strong>Savings Pattern:</strong> Regular savings show financial discipline</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Improvement Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Improvement Tips
            </CardTitle>
            <CardDescription>
              Actions to improve your credit score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditScore.improvementTips.map((tip, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    {tip.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{tip.title}</h4>
                        <Badge variant="outline" className="bg-blue-50">
                          +{tip.impact} pts
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{tip.timeframe}</span>
                        {tip.completed ? (
                          <Badge variant="secondary" className="text-green-600">
                            Completed
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loan Offers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Available Loan Offers
          </CardTitle>
          <CardDescription>
            Personalized loan options based on your credit score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loanOffers.map((offer, index) => (
              <Card key={index} className={`text-center ${
                offer.eligibility === 'high' ? 'border-green-200 bg-green-50' :
                offer.eligibility === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                'border-red-200 bg-red-50'
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">R{offer.amount}</CardTitle>
                  <CardDescription>
                    {offer.term} month{offer.term > 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">
                      {offer.interestRate}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      R{offer.monthlyPayment}/month
                    </p>
                    
                    <Badge
                      variant={
                        offer.eligibility === 'high' ? 'default' :
                        offer.eligibility === 'medium' ? 'secondary' : 'outline'
                      }
                      className={
                        offer.eligibility === 'high' ? 'bg-green-100 text-green-800' :
                        offer.eligibility === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {offer.eligibility.toUpperCase()} eligibility
                    </Badge>

                    <div className="mt-3">
                      <Button
                        onClick={() => handleApplyForLoan(index)}
                        disabled={selectedLoan === index}
                        className="w-full"
                        variant={offer.eligibility === 'high' ? 'default' : 'outline'}
                      >
                        {selectedLoan === index ? 'Applied' : 'Apply Now'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Why these offers?</h4>
            <p className="text-sm text-muted-foreground">
              Your credit score of {creditScore.score} qualifies you for these personalized loan options. 
              Higher scores typically receive better interest rates and larger loan amounts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Alternative Data Sources
          </CardTitle>
          <CardDescription>
            We use multiple data points to build your credit profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Phone className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <h4 className="font-semibold">Airtime Usage</h4>
              <p className="text-sm text-muted-foreground">Regular spending patterns</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <h4 className="font-semibold">Top-up History</h4>
              <p className="text-sm text-muted-foreground">Consistent recharge behavior</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Calendar className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <h4 className="font-semibold">SIM Age</h4>
              <p className="text-sm text-muted-foreground">Account longevity</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <Users className="w-8 h-8 mx-auto text-orange-600 mb-2" />
              <h4 className="font-semibold">Social Data</h4>
              <p className="text-sm text-muted-foreground">Network patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
        <CardHeader>
          <CardTitle>Benefits of Good Credit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Better Loan Terms
              </h4>
              <p className="text-sm">Lower interest rates and higher loan amounts</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Faster Approval
              </h4>
              <p className="text-sm">Quick loan processing and instant decisions</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Financial Access
              </h4>
              <p className="text-sm">Access to more financial products and services</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Building History
              </h4>
              <p className="text-sm">Establish credit history without traditional banking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditScoring;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, Clock, DollarSign, Globe, Send, TrendingDown, CheckCircle, AlertCircle } from "lucide-react";

interface Transaction {
  id: string;
  recipient: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  status: "pending" | "completed" | "failed";
  date: string;
  fees: number;
  exchangeRate: number;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  fees: number;
  provider: string;
  deliveryTime: string;
}

const CrossBorderPayments = () => {
  const { toast } = useToast();
  
  const [sendAmount, setSendAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("ZAR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      recipient: "John Ochieng",
      amount: 500,
      fromCurrency: "ZAR",
      toCurrency: "KES",
      status: "completed",
      date: "2024-01-15",
      fees: 25,
      exchangeRate: 7.2
    },
    {
      id: "2", 
      recipient: "Sarah Kwame",
      amount: 1000,
      fromCurrency: "ZAR",
      toCurrency: "GHS",
      status: "pending",
      date: "2024-01-14",
      fees: 45,
      exchangeRate: 2.1
    }
  ]);

  const [exchangeRates] = useState<ExchangeRate[]>([
    { from: "ZAR", to: "USD", rate: 0.054, fees: 3.5, provider: "Mukuru", deliveryTime: "5-10 min" },
    { from: "ZAR", to: "KES", rate: 7.2, fees: 2.8, provider: "Chipper Cash", deliveryTime: "2-5 min" },
    { from: "ZAR", to: "NGN", rate: 41.2, fees: 3.2, provider: "MTN MoMo", deliveryTime: "1-3 min" },
    { from: "ZAR", to: "GHS", rate: 2.1, fees: 4.1, provider: "Remitly", deliveryTime: "10-15 min" }
  ]);

  const currentRate = exchangeRates.find(rate => rate.from === fromCurrency && rate.to === toCurrency);
  const convertedAmount = sendAmount ? (parseFloat(sendAmount) * (currentRate?.rate || 1)).toFixed(2) : "0";
  const totalFees = sendAmount ? (parseFloat(sendAmount) * (currentRate?.fees || 0) / 100).toFixed(2) : "0";

  const handleSendMoney = () => {
    if (!sendAmount || !recipientName || !recipientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Transfer Initiated",
      description: `Sending ${sendAmount} ${fromCurrency} to ${recipientName}. You'll receive a confirmation shortly.`,
    });

    // Reset form
    setSendAmount("");
    setRecipientName("");
    setRecipientPhone("");
  };

  const getCurrencyFlag = (currency: string) => {
    const flags: { [key: string]: string } = {
      "ZAR": "🇿🇦",
      "USD": "🇺🇸", 
      "KES": "🇰🇪",
      "NGN": "🇳🇬",
      "GHS": "🇬🇭",
      "UGX": "🇺🇬"
    };
    return flags[currency] || "💱";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "pending":
        return <Clock className="w-4 h-4 text-warning" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Cross-Border Payments
          </h1>
          <p className="text-muted-foreground">
            AI-powered remittance optimizer for the best rates across Africa
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          <Globe className="w-4 h-4 mr-2" />
          6 Countries Supported
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Send className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">R12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Fees Saved</p>
                <p className="text-2xl font-bold">R234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Transfers</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Speed</p>
                <p className="text-2xl font-bold">4 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Money</TabsTrigger>
          <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Send Money Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>Transfer money across African countries instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>From</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ZAR">{getCurrencyFlag("ZAR")} ZAR - South African Rand</SelectItem>
                        <SelectItem value="USD">{getCurrencyFlag("USD")} USD - US Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>To</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KES">{getCurrencyFlag("KES")} KES - Kenyan Shilling</SelectItem>
                        <SelectItem value="NGN">{getCurrencyFlag("NGN")} NGN - Nigerian Naira</SelectItem>
                        <SelectItem value="GHS">{getCurrencyFlag("GHS")} GHS - Ghanaian Cedi</SelectItem>
                        <SelectItem value="USD">{getCurrencyFlag("USD")} USD - US Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Send</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                  />
                </div>

                {currentRate && sendAmount && (
                  <Card className="bg-muted/20">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Exchange Rate:</span>
                          <span>1 {fromCurrency} = {currentRate.rate} {toCurrency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount to be received:</span>
                          <span className="font-semibold">{convertedAmount} {toCurrency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fees:</span>
                          <span>{totalFees} {fromCurrency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total to pay:</span>
                          <span className="font-semibold">{(parseFloat(sendAmount) + parseFloat(totalFees)).toFixed(2)} {fromCurrency}</span>
                        </div>
                        <div className="flex justify-between text-success">
                          <span>Delivery time:</span>
                          <span>{currentRate.deliveryTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="recipient-name">Recipient Name</Label>
                  <Input
                    id="recipient-name"
                    placeholder="John Doe"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient-phone">Recipient Phone Number</Label>
                  <Input
                    id="recipient-phone"
                    placeholder="+254 123 456 789"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                </div>

                <Button onClick={handleSendMoney} className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send {sendAmount} {fromCurrency}
                </Button>
              </CardContent>
            </Card>

            {/* Best Rate Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Best Rate Comparison</CardTitle>
                <CardDescription>AI-powered rate optimization across providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exchangeRates
                    .filter(rate => rate.from === fromCurrency)
                    .sort((a, b) => a.fees - b.fees)
                    .map((rate, index) => (
                      <div key={`${rate.to}-${rate.provider}`} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getCurrencyFlag(rate.to)}</span>
                              <span className="font-semibold">{rate.to}</span>
                              {index === 0 && (
                                <Badge variant="secondary" className="text-xs">Best Rate</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{rate.provider}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">1 {fromCurrency} = {rate.rate} {rate.to}</p>
                            <p className="text-sm text-muted-foreground">Fee: {rate.fees}%</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-success">⚡ {rate.deliveryTime}</span>
                          <Button size="sm" variant="outline">Select</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exchangeRates.map((rate) => (
              <Card key={`${rate.from}-${rate.to}-${rate.provider}`}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{getCurrencyFlag(rate.from)}</span>
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>{getCurrencyFlag(rate.to)}</span>
                    <span className="text-sm font-normal">{rate.from} → {rate.to}</span>
                  </CardTitle>
                  <CardDescription>{rate.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span className="font-semibold">{rate.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee:</span>
                      <span>{rate.fees}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Speed:</span>
                      <span className="text-success">{rate.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent cross-border transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(transaction.status)}
                          <span className="font-semibold">{transaction.recipient}</span>
                          <Badge variant={transaction.status === "completed" ? "secondary" : transaction.status === "pending" ? "outline" : "destructive"}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {transaction.amount} {transaction.fromCurrency} → {(transaction.amount * transaction.exchangeRate).toFixed(2)} {transaction.toCurrency}
                        </p>
                        <p className="text-sm text-muted-foreground">Fee: {transaction.fees} {transaction.fromCurrency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrossBorderPayments;
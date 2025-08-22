import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  GraduationCap, 
  Shield, 
  Brain, 
  MessageCircle, 
  Mic, 
  CheckCircle, 
  AlertTriangle,
  Trophy,
  Star,
  Forward,
  BookOpen,
  Users,
  TrendingUp,
  Upload,
  Send,
  X
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ScamAnalysisResult {
  isScam: boolean;
  confidence: number;
  scamType?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
  recommendedAction: string;
  detectedPatterns: string[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ScamEducationLesson {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  category: string;
  completed?: boolean;
  reward: number;
  quiz?: QuizQuestion[];
  sections?: {
    title: string;
    content: string;
  }[];
}

interface UserProgress {
  completedLessons: string[];
  badges: string[];
  totalPoints: number;
  scamDetectionCount: number;
  level: number;
}

interface ScamReport {
  type: string;
  description: string;
  contactInfo: string;
  evidence: File | null;
}

const AntiScamCoach = () => {
  const { toast } = useToast();
  const [messageToAnalyze, setMessageToAnalyze] = useState("");
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [isReportingScam, setIsReportingScam] = useState(false);
  const [isCommunityChatOpen, setIsCommunityChatOpen] = useState(false);
  const [scamReport, setScamReport] = useState<ScamReport>({
    type: '',
    description: '',
    contactInfo: '',
    evidence: null
  });
  const [selectedLesson, setSelectedLesson] = useState<ScamEducationLesson | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLessons: ['lesson-001'],
    badges: ['beginner-detective'],
    totalPoints: 150,
    scamDetectionCount: 7,
    level: 2
  });

  const [lessons] = useState<ScamEducationLesson[]>([
    {
      id: 'lesson-001',
      title: 'Introduction to Common Scams',
      content: 'Learn how to identify and avoid the most common financial scams targeting African communities.',
      difficulty: 'beginner',
      duration: 5,
      category: 'general',
      completed: true,
      reward: 10,
      sections: [
        {
          title: 'What are Financial Scams?',
          content: 'Financial scams are deceptive schemes designed to trick you into giving away money or personal information. Scammers often pretend to be from legitimate organizations like banks, government agencies, or well-known companies.'
        },
        {
          title: 'Common Red Flags',
          content: '• Urgent requests for money\n• Requests for personal information\n• Too-good-to-be-true offers\n• Pressure to act immediately\n• Unsolicited contact from "official" sources'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'Which of these is a common red flag for scams?',
          options: [
            'Urgent requests for money',
            'Official-looking logos',
            'Professional language',
            'Clear contact information'
          ],
          correctAnswer: 0,
          explanation: 'Scammers often create urgency to pressure you into acting without thinking.'
        },
        {
          id: 'q2',
          question: 'What should you do if you receive an unsolicited request for money?',
          options: [
            'Send the money immediately',
            'Verify through official channels',
            'Ignore all safety concerns',
            'Share your bank details'
          ],
          correctAnswer: 1,
          explanation: 'Always verify unexpected requests through official contact methods you trust.'
        }
      ]
    },
    {
      id: 'lesson-002',
      title: 'Spotting Phishing Attempts',
      content: 'Learn how to identify and avoid phishing scams that try to steal your personal information.',
      difficulty: 'intermediate',
      duration: 8,
      category: 'phishing',
      reward: 15,
      sections: [
        {
          title: 'What is Phishing?',
          content: 'Phishing is when scammers send fake emails or messages that look like they\'re from real companies to steal your passwords, credit card numbers, or other sensitive information.'
        },
        {
          title: 'How to Spot Phishing',
          content: '• Check the sender\'s email address carefully\n• Look for spelling and grammar mistakes\n• Hover over links to see the real URL\n• Be wary of urgent or threatening language\n• Never enter passwords from email links'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What is the main goal of phishing scams?',
          options: [
            'To sell you products',
            'To steal personal information',
            'To provide customer service',
            'To share important updates'
          ],
          correctAnswer: 1,
          explanation: 'Phishing scams aim to trick you into revealing sensitive information like passwords or bank details.'
        },
        {
          id: 'q2',
          question: 'How can you verify a suspicious email?',
          options: [
            'Click all links to check',
            'Contact the company directly using official channels',
            'Reply to the email asking for verification',
            'Forward it to all your contacts'
          ],
          correctAnswer: 1,
          explanation: 'Always use official contact methods from the company\'s website, not the suspicious email.'
        }
      ]
    },
    {
      id: 'lesson-003',
      title: 'Romance Scam Awareness',
      content: 'Learn how to recognize and avoid romance scams that prey on emotions for financial gain.',
      difficulty: 'intermediate',
      duration: 7,
      category: 'romance',
      reward: 15,
      sections: [
        {
          title: 'What are Romance Scams?',
          content: 'Romance scams occur when criminals create fake profiles on dating sites or social media to form romantic relationships and eventually ask for money.'
        },
        {
          title: 'Warning Signs',
          content: '• Quick declarations of love\n• Stories of emergencies or hardships\n• Requests for money for travel, medical expenses, or other emergencies\n• Refusal to meet in person or video chat\n• Pressure to keep the relationship secret'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What is a common tactic in romance scams?',
          options: [
            'Asking to meet your family immediately',
            'Sending you expensive gifts first',
            'Creating emergencies that require money',
            'Introducing you to all their friends'
          ],
          correctAnswer: 2,
          explanation: 'Scammers often create fake emergencies to pressure you into sending money quickly.'
        }
      ]
    },
    {
      id: 'lesson-004',
      title: 'Lottery & Prize Scams',
      content: 'Learn how to identify fake lottery and prize-winning scams.',
      difficulty: 'beginner',
      duration: 6,
      category: 'lottery',
      reward: 12,
      sections: [
        {
          title: 'How Lottery Scams Work',
          content: 'Scammers contact you claiming you\'ve won a prize or lottery, but require you to pay fees or taxes upfront to receive your "winnings."'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What should you do if you "win" a lottery you never entered?',
          options: [
            'Pay the processing fees to claim your prize',
            'Ignore it and never send money',
            'Share your bank details to receive funds',
            'Provide your ID for verification'
          ],
          correctAnswer: 1,
          explanation: 'Legitimate lotteries never ask for upfront payments to claim prizes.'
        }
      ]
    },
    {
      id: 'lesson-005',
      title: 'Bank Impersonation Scams',
      content: 'Learn how to spot fake bank officials and protect your accounts.',
      difficulty: 'advanced',
      duration: 10,
      category: 'impersonation',
      reward: 20,
      sections: [
        {
          title: 'How Bank Impersonation Works',
          content: 'Scammers pretend to be from your bank, claiming there\'s suspicious activity and asking you to "verify" your account details or transfer money to a "safe account."'
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What should you do if someone claiming to be from your bank asks for your PIN?',
          options: [
            'Provide it immediately',
            'Never share your PIN with anyone',
            'Ask them to confirm your PIN first',
            'Share it if they sound professional'
          ],
          correctAnswer: 1,
          explanation: 'Banks will never ask for your full PIN or password over the phone.'
        }
      ]
    }
  ]);

  const scamStats = [
    { type: 'Phishing', count: 3, trend: 'up' },
    { type: 'Lottery', count: 2, trend: 'down' },
    { type: 'Romance', count: 1, trend: 'stable' },
    { type: 'Impersonation', count: 1, trend: 'up' }
  ];

  const handleAnalyzeMessage = async () => {
    if (!messageToAnalyze.trim()) {
      toast({
        title: "Please enter a message",
        description: "Type or paste the suspicious message you want to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAnalysis: ScamAnalysisResult = {
        isScam: Math.random() > 0.5,
        confidence: Math.floor(Math.random() * 40) + 60,
        scamType: ['phishing', 'lottery', 'romance', 'impersonation'][Math.floor(Math.random() * 4)],
        riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
        explanation: "This message shows characteristics of known scam patterns.",
        recommendedAction: "Do not respond and delete the message.",
        detectedPatterns: ['Urgency keywords', 'Financial requests', 'Suspicious links']
      };

      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);

      if (mockAnalysis.isScam) {
        setUserProgress(prev => ({
          ...prev,
          scamDetectionCount: prev.scamDetectionCount + 1,
          totalPoints: prev.totalPoints + 5
        }));
      }

      toast({
        title: mockAnalysis.isScam ? "🚨 Scam Detected!" : "✅ Message Appears Safe",
        description: `Analysis completed with ${mockAnalysis.confidence}% confidence`
      });
    }, 2000);
  };

  const handleVoiceFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an audio file
      if (!file.type.startsWith('audio/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file",
          variant: "destructive"
        });
        return;
      }

      setVoiceFile(file);
      toast({
        title: "Voice message uploaded",
        description: "Click 'Analyze Voice Message' to check for scams"
      });
    }
  };

  const handleAnalyzeVoiceMessage = async () => {
    if (!voiceFile) {
      toast({
        title: "No voice message",
        description: "Please upload a voice message first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate voice analysis
    setTimeout(() => {
      const mockAnalysis: ScamAnalysisResult = {
        isScam: Math.random() > 0.6, // Higher chance for voice scams
        confidence: Math.floor(Math.random() * 30) + 65,
        scamType: 'voice_phishing',
        riskLevel: 'high',
        explanation: "This voice message contains patterns commonly used in voice phishing scams.",
        recommendedAction: "Do not call back or provide any information. Block the number.",
        detectedPatterns: ['Urgent tone', 'Financial requests', 'Emergency situation mentioned']
      };

      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      setVoiceFile(null);

      if (mockAnalysis.isScam) {
        setUserProgress(prev => ({
          ...prev,
          scamDetectionCount: prev.scamDetectionCount + 1,
          totalPoints: prev.totalPoints + 8 // More points for voice scam detection
        }));
      }

      toast({
        title: mockAnalysis.isScam ? "🚨 Voice Scam Detected!" : "✅ Voice Message Appears Safe",
        description: `Voice analysis completed with ${mockAnalysis.confidence}% confidence`
      });
    }, 3000);
  };

  const handleReportScam = () => {
    setIsReportingScam(true);
  };

  const handleSubmitScamReport = async () => {
    if (!scamReport.type || !scamReport.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate report submission
    setTimeout(() => {
      toast({
        title: "✅ Scam Report Submitted",
        description: "Thank you for helping protect the community! You earned 10 points."
      });

      setUserProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + 10
      }));

      setScamReport({
        type: '',
        description: '',
        contactInfo: '',
        evidence: null
      });
      setIsReportingScam(false);
    }, 1500);
  };

  const handleCommunityChat = () => {
    setIsCommunityChatOpen(true);
    toast({
      title: "Community Chat",
      description: "Connecting you with other users for scam discussions..."
    });
  };

  const handleStartLesson = (lesson: ScamEducationLesson) => {
    setSelectedLesson(lesson);
    setCurrentQuizIndex(0);
    setUserAnswers([]);
    setQuizScore(0);
  };

  const handleAnswerQuestion = (answerIndex: number) => {
    if (!selectedLesson?.quiz) return;

    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);

    // Check if answer is correct
    const currentQuestion = selectedLesson.quiz[currentQuizIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setQuizScore(prev => prev + 1);
    }

    // Move to next question or finish quiz
    if (currentQuizIndex < selectedLesson.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      // Quiz completed
      const passed = quizScore >= selectedLesson.quiz.length * 0.7; // 70% to pass
      if (passed) {
        setUserProgress(prev => ({
          ...prev,
          completedLessons: [...prev.completedLessons, selectedLesson.id],
          totalPoints: prev.totalPoints + selectedLesson.reward
        }));
        
        toast({
          title: "🎉 Lesson Completed!",
          description: `You earned ${selectedLesson.reward} points! Score: ${quizScore}/${selectedLesson.quiz.length}`
        });
      } else {
        toast({
          title: "Try Again",
          description: `Score: ${quizScore}/${selectedLesson.quiz.length}. You need 70% to pass.`,
          variant: "destructive"
        });
      }
    }
  };

  const handleRetryQuiz = () => {
    setCurrentQuizIndex(0);
    setUserAnswers([]);
    setQuizScore(0);
  };

  const handleCloseLesson = () => {
    setSelectedLesson(null);
    setCurrentQuizIndex(0);
    setUserAnswers([]);
    setQuizScore(0);
  };

  const availableLessons = lessons.filter(lesson => 
    !userProgress.completedLessons.includes(lesson.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Anti-Scam AI Coach</h1>
        <p className="text-muted-foreground">
          Your friendly financial guardian that helps you detect and avoid scams
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Scams Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{userProgress.scamDetectionCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Total protected</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Points Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userProgress.totalPoints}</div>
            <p className="text-sm text-muted-foreground mt-1">Learning rewards</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Lessons Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{userProgress.completedLessons.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Of {lessons.length} total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Detective Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">Level {userProgress.level}</div>
            <Progress value={(userProgress.completedLessons.length / lessons.length) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Check Suspicious Messages
            </CardTitle>
            <CardDescription>
              Paste any suspicious message and I'll analyze it for scams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Paste suspicious message here..."
                value={messageToAnalyze}
                onChange={(e) => setMessageToAnalyze(e.target.value)}
                className="h-20 resize-none"
              />
              <Button 
                onClick={handleAnalyzeMessage} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Analyze Message
                  </>
                )}
              </Button>
            </div>

            {analysisResult && (
              <div className={`p-4 rounded-lg border-2 ${
                analysisResult.isScam 
                  ? 'border-destructive bg-destructive/10' 
                  : 'border-green-500 bg-green-50 dark:bg-green-900/20'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {analysisResult.isScam ? (
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <h3 className="font-semibold">
                    {analysisResult.isScam ? '🚨 Potential Scam Detected' : '✅ Message Appears Safe'}
                  </h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><strong>Confidence:</strong> {analysisResult.confidence}%</p>
                  {analysisResult.scamType && (
                    <p><strong>Type:</strong> {analysisResult.scamType}</p>
                  )}
                  <p><strong>Risk Level:</strong> 
                    <Badge variant={
                      analysisResult.riskLevel === 'critical' ? 'destructive' :
                      analysisResult.riskLevel === 'high' ? 'default' :
                      analysisResult.riskLevel === 'medium' ? 'secondary' : 'outline'
                    } className="ml-2">
                      {analysisResult.riskLevel.toUpperCase()}
                    </Badge>
                  </p>
                  <p><strong>Explanation:</strong> {analysisResult.explanation}</p>
                  <p><strong>Action:</strong> {analysisResult.recommendedAction}</p>
                  
                  {analysisResult.detectedPatterns.length > 0 && (
                    <div>
                      <strong>Patterns Detected:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {analysisResult.detectedPatterns.map((pattern, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {pattern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice Message Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Voice Message Analysis
            </CardTitle>
            <CardDescription>
              Upload and analyze voice messages for potential scam patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 border-2 border-dashed rounded-lg text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleVoiceFileUpload}
                accept="audio/*"
                className="hidden"
              />
              
              {voiceFile ? (
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
                  <p className="font-medium mb-2">{voiceFile.name}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {(voiceFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      Change File
                    </Button>
                    <Button 
                      onClick={handleAnalyzeVoiceMessage}
                      disabled={isAnalyzing}
                      size="sm"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Voice Message'}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Click to upload a voice message or forward audio from your messages
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Voice Message
                  </Button>
                </>
              )}
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Voice Scam Warning Signs:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Urgent requests for money</li>
                <li>• Claims of emergencies</li>
                <li>• Requests for secrecy</li>
                <li>• Unknown numbers asking for help</li>
                <li>• Pressure to act immediately</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Center */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Scam Education Center
          </CardTitle>
          <CardDescription>
            Learn about different scam types and how to protect yourself
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons
              .filter(lesson => !userProgress.completedLessons.includes(lesson.id))
              .slice(0, showAllCourses ? undefined : 2)
              .map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{lesson.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {lesson.difficulty}
                      </Badge>
                      <span>• {lesson.duration} min</span>
                      <span>• {lesson.reward} points</span>
                      <span>• {lesson.quiz?.length || 0} questions</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {lesson.content}
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => handleStartLesson(lesson)}
                      className="w-full"
                    >
                      Start Lesson
                    </Button>
                  </CardContent>
                </Card>
              ))
            }

            {showAllCourses && lessons
              .filter(lesson => userProgress.completedLessons.includes(lesson.id))
              .map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      {lesson.title}
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs bg-green-50">
                        Completed
                      </Badge>
                      <span>• {lesson.duration} min</span>
                      <span>• Earned {lesson.reward} points</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {lesson.content}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStartLesson(lesson)}
                      className="w-full"
                    >
                      Review Lesson
                    </Button>
                  </CardContent>
                </Card>
              ))
            }
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? 'Show Less Courses' : `View All Courses (${lessons.length})`}
          </Button>
        </CardContent>
      </Card>

      {/* Scam Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Scam Detection Statistics</CardTitle>
          <CardDescription>
            Overview of scams detected in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {scamStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stat.count}</div>
                <p className="text-sm font-medium">{stat.type} Scams</p>
                <Badge 
                  variant={stat.trend === 'up' ? 'destructive' : stat.trend === 'down' ? 'default' : 'outline'}
                  className="text-xs mt-1"
                >
                  {stat.trend === 'up' ? '↗ Increasing' : stat.trend === 'down' ? '↘ Decreasing' : '→ Stable'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Features */}
      <Card className="bg-gradient-to-br from-secondary/20 to-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Community Protection
          </CardTitle>
          <CardDescription>
            Help protect others by reporting scams and joining the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Recent Community Reports</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-background/50 rounded">
                  <span>Fake bank SMS</span>
                  <Badge variant="destructive">12 reports</Badge>
                </div>
                <div className="flex justify-between p-2 bg-background/50 rounded">
                  <span>Lottery scam call</span>
                  <Badge variant="destructive">8 reports</Badge>
                </div>
                <div className="flex justify-between p-2 bg-background/50 rounded">
                  <span>Phishing email</span>
                  <Badge variant="destructive">15 reports</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={handleReportScam}
                className="w-full"
              >
                <Shield className="w-4 h-4 mr-2" />
                Report a Scam
              </Button>
              <Button 
                onClick={handleCommunityChat}
                variant="outline" 
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Community
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scam Reporting Modal */}
      {isReportingScam && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Report a Scam</span>
                <Button variant="ghost" size="sm" onClick={() => setIsReportingScam(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Help protect others by reporting suspicious activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Scam Type *</label>
                <select
                  value={scamReport.type}
                  onChange={(e) => setScamReport({...scamReport, type: e.target.value})}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select scam type</option>
                  <option value="phishing">Phishing</option>
                  <option value="lottery">Lottery Scam</option>
                  <option value="romance">Romance Scam</option>
                  <option value="impersonation">Impersonation</option>
                  <option value="investment">Investment Scam</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Describe what happened..."
                  value={scamReport.description}
                  onChange={(e) => setScamReport({...scamReport, description: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Information</label>
                <Input
                  placeholder="Phone number, email, or other contact info"
                  value={scamReport.contactInfo}
                  onChange={(e) => setScamReport({...scamReport, contactInfo: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Evidence (Optional)</label>
                <Input
                  type="file"
                  onChange={(e) => setScamReport({...scamReport, evidence: e.target.files?.[0] || null})}
                  accept="image/*,audio/*,video/*,.pdf"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsReportingScam(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitScamReport}
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Community Chat Modal */}
      {isCommunityChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Chat
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsCommunityChatOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                Connect with other users to discuss scam prevention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Community Features:</h4>
                <ul className="text-sm space-y-2">
                  <li>• Real-time chat with other users</li>
                  <li>• Share scam experiences and warnings</li>
                  <li>• Get advice from scam prevention experts</li>
                  <li>• Join topic-specific discussion groups</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCommunityChatOpen(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Community Chat",
                      description: "Connecting you to the community network..."
                    });
                    setTimeout(() => setIsCommunityChatOpen(false), 2000);
                  }}
                  className="flex-1"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedLesson.title}</span>
                <Button variant="ghost" size="sm" onClick={handleCloseLesson}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                {selectedLesson.difficulty} • {selectedLesson.duration} min • {selectedLesson.reward} points
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentQuizIndex < (selectedLesson.quiz?.length || 0) ? (
                // Quiz in progress
                <>
                  <div className="text-center mb-4">
                    <Badge variant="secondary">
                      Question {currentQuizIndex + 1} of {selectedLesson.quiz?.length}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold">
                    {selectedLesson.quiz?.[currentQuizIndex]?.question}
                  </h3>

                  <div className="space-y-3">
                    {selectedLesson.quiz?.[currentQuizIndex]?.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto py-3 text-left"
                        onClick={() => handleAnswerQuestion(index)}
                      >
                        <span className="flex-1">{option}</span>
                      </Button>
                    ))}
                  </div>
                </>
              ) : userAnswers.length > 0 ? (
                // Quiz completed - show results
                <>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      quizScore >= (selectedLesson.quiz?.length || 0) * 0.7 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {quizScore}/{(selectedLesson.quiz?.length || 0)} Correct
                    </div>
                    <p className="text-muted-foreground mt-2">
                      {quizScore >= (selectedLesson.quiz?.length || 0) * 0.7 
                        ? 'Congratulations! You passed the quiz.'
                        : 'You need 70% to pass. Try again!'
                      }
                    </p>
                  </div>

                  {selectedLesson.quiz?.map((question, index) => (
                    <div key={question.id} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{question.question}</h4>
                      <p className={`mt-2 ${
                        userAnswers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Your answer: {question.options[userAnswers[index]]}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {question.explanation}
                      </p>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCloseLesson}
                      className="flex-1"
                    >
                      Close
                    </Button>
                    {quizScore < (selectedLesson.quiz?.length || 0) * 0.7 && (
                      <Button
                        onClick={handleRetryQuiz}
                        className="flex-1"
                      >
                        Try Again
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                // Lesson content
                <>
                  {selectedLesson.sections?.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                      {index < (selectedLesson.sections?.length || 0) - 1 && <hr className="my-4" />}
                    </div>
                  ))}

                  {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                    <Button
                      onClick={() => setCurrentQuizIndex(0)}
                      className="w-full"
                    >
                      Start Quiz ({selectedLesson.quiz.length} questions)
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AntiScamCoach;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DebugModeToggle } from "@/components/DebugModeToggle";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";

import { AdBlockDetector } from "@/components/AdBlockDetector";
import Index from "./pages/Index";
import UnitDetail from "./pages/UnitDetail";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import CourseChallenge from "./pages/CourseChallenge";
import CourseChallengePresetBuilder from "./pages/CourseChallengePresetBuilder";
import ViewAllQuestions from "./pages/ViewAllQuestions";
import PresetBuilder from "./pages/PresetBuilder";
import MathCategory from "./pages/categories/MathCategory";
import EnglishCategory from "./pages/categories/EnglishCategory";
import ScienceCategory from "./pages/categories/ScienceCategory";
import SocialCategory from "./pages/categories/SocialCategory";
import OtherCategory from "./pages/categories/OtherCategory";
import CustomUnitsCategory from "./pages/categories/CustomUnitsCategory";
import CustomTopicEditor from "./pages/CustomTopicEditor";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PasswordPage from "./pages/PasswordPage";
import TestsPage from "./pages/TestsPage";
import TestsUnitDetail from "./pages/TestsUnitDetail";
import DataStatistics from "./pages/DataStatistics";
import DataProof from "./pages/DataProof";
import UpdateTracker from "./pages/UpdateTracker";
import HowToUse from "./pages/HowToUse";
import Mentions from "./pages/Contributors";
import { TESTS_ENABLED } from "@/data/real-tests/password-config";
import AdblockBlocked from "./pages/AdblockBlocked";
import CustomUnitChallenge from "./pages/CustomUnitChallenge";
import CustomUnitChallengePresetBuilder from "./pages/CustomUnitChallengePresetBuilder";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ScrollToTop } from "@/components/ScrollToTop";
import QuestionGenerator from "./pages/QuestionGenerator";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Ad placeholders rendered first so they sit underneath page content in DOM order */}
        <AdPlaceholder position="sidebar-left" />
        <AdPlaceholder position="sidebar-right" />
        <ThemeToggle />
        <DebugModeToggle />
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/practicehub/">
          <ScrollToTop />
          <PageViewTracker />
          <AdBlockDetector />
          <CookieConsentBanner />
          <TermsOfServiceModal />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blocked" element={<AdblockBlocked />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/data" element={<DataStatistics />} />
            <Route path="/data/proof" element={<DataProof />} />
            <Route path="/updates" element={<UpdateTracker />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/contributors" element={<Mentions />} />
            <Route path="/mentions" element={<Mentions />} />
            {TESTS_ENABLED && (
              <>
                <Route path="/password" element={<PasswordPage />} />
                <Route path="/tests" element={<TestsPage />} />
                <Route path="/tests/unit/:subject/:unitId" element={<TestsUnitDetail />} />
                <Route path="/tests/view-all/:subject/:unitId" element={<ViewAllQuestions />} />
                <Route path="/tests/quiz/:subject/:unitId/:quizType" element={<Quiz />} />
                <Route path="/tests/course-challenge/:subject" element={<CourseChallenge />} />
                <Route path="/tests/course-challenge/:subject/preset-builder" element={<CourseChallengePresetBuilder />} />
              </>
            )}
            <Route path="/category/math" element={<MathCategory />} />
            <Route path="/category/english" element={<EnglishCategory />} />
            <Route path="/category/science" element={<ScienceCategory />} />
            <Route path="/category/social" element={<SocialCategory />} />
            <Route path="/category/other" element={<OtherCategory />} />
            <Route path="/category/custom" element={<CustomUnitsCategory />} />
            <Route path="/custom-topic/:unitId/:topicId" element={<CustomTopicEditor />} />
            <Route path="/question-generator" element={<QuestionGenerator />} />
            <Route path="/unit/:subject/:unitId" element={<UnitDetail />} />
            <Route path="/unit/:subject/:unitId/view-all" element={<ViewAllQuestions />} />
            <Route path="/view-all/:subject/:unitId" element={<ViewAllQuestions />} />
            <Route path="/unit/:subject/:unitId/preset-builder" element={<PresetBuilder />} />
            <Route path="/unit/:subject/:unitId/quiz/:quizType" element={<Quiz />} />
            <Route path="/course-challenge/:subject" element={<CourseChallenge />} />
            <Route path="/course-challenge/:subject/preset-builder" element={<CourseChallengePresetBuilder />} />
            <Route path="/custom-unit/:unitId" element={<CustomUnitChallenge />} />
            <Route path="/custom-unit/:unitId/preset-builder" element={<CustomUnitChallengePresetBuilder />} />
            <Route path="/quiz/:subject/:unitId/:quizType" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

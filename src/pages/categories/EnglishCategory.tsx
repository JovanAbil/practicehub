import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Lock, School, ChevronDown, ChevronRight, FolderPlus, ArrowRight } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { NeededCoursesPopup } from '@/components/NeededCoursesPopup';
import { usePopupCooldown } from '@/hooks/usePopupSettings';
import { SchoolSelector } from '@/components/SchoolSelector';
import { getSelectedSchool, SCHOOLS } from '@/data/schools-config';
import { englishApCourses, englishSchoolCourses, CourseEntry } from '@/data/category-courses';

const EnglishCategory = () => {
  const shouldShowPopup = usePopupCooldown('english');
  const [showNeededCourses, setShowNeededCourses] = useState(false);
  const [showSchoolSelector, setShowSchoolSelector] = useState(false);
  const [openSchools, setOpenSchools] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (SCHOOLS.length > 1 && !getSelectedSchool()) setShowSchoolSelector(true);
  }, []);

  useEffect(() => {
    if (shouldShowPopup) setShowNeededCourses(true);
  }, [shouldShowPopup]);

  const selectedSchool = getSelectedSchool();
  const schoolCourses: { schoolName: string; courses: CourseEntry[] }[] = [];
  if (selectedSchool && englishSchoolCourses[selectedSchool.id]) {
    schoolCourses.push({ schoolName: selectedSchool.name, courses: englishSchoolCourses[selectedSchool.id] });
  } else {
    Object.entries(englishSchoolCourses).forEach(([schoolId, courses]) => {
      const school = SCHOOLS.find(s => s.id === schoolId);
      if (school) schoolCourses.push({ schoolName: school.name, courses });
    });
  }

  const toggleSchool = (name: string) => {
    setOpenSchools(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const renderCourseSection = (course: CourseEntry) => {
    if (course.comingSoon) {
      return (
        <div key={course.id} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-display font-bold">{course.name}</h2>
            <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">Coming Soon</span>
          </div>
          <Card className="p-12 text-center border-dashed">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Units Coming Soon</h3>
            <p className="text-muted-foreground">English units are being developed.</p>
          </Card>
        </div>
      );
    }
    return (
      <div key={course.id} className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">{course.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {course.units.map((unit) => (
            <Link key={unit.id} to={`/unit/${course.subject}/${unit.id}`}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-english group bg-english/5 h-full">
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{unit.name}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SchoolSelector isOpen={showSchoolSelector} onClose={() => setShowSchoolSelector(false)} />
      <NeededCoursesPopup category="english" isOpen={showNeededCourses} onClose={() => setShowNeededCourses(false)} />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
        </Link>

        <div className="flex items-center gap-4 mb-8 cursor-pointer group" onClick={() => setShowNeededCourses(true)}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-english/10 group-hover:bg-english/20 transition-colors">
            <BookOpen className="w-7 h-7 text-english" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-english group-hover:underline">English</h1>
            <p className="text-muted-foreground">Literature, Writing, and Language Arts</p>
          </div>
        </div>

        {/* AP / Universal Courses */}
        {englishApCourses.map(renderCourseSection)}

        {/* School-Specific Courses (Collapsible) */}
        {schoolCourses.map(({ schoolName, courses }) => (
          <div key={schoolName} className="mb-6">
            <button
              onClick={() => toggleSchool(schoolName)}
              className="flex items-center gap-2 w-full text-left py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {openSchools[schoolName] ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )}
              <School className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-display font-semibold text-muted-foreground">{schoolName}</h2>
            </button>
            {openSchools[schoolName] && (
              <div className="mt-4">
                {courses.map(renderCourseSection)}
              </div>
            )}
          </div>
        ))}

        {/* Custom Units Redirect */}
        <Card className="p-6 border-2 border-dashed border-other/30 bg-other/5 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FolderPlus className="h-6 w-6 text-other" />
              <div>
                <h3 className="font-semibold">Don't see what you need?</h3>
                <p className="text-sm text-muted-foreground">Create your own custom question banks for any English topic.</p>
              </div>
            </div>
            <Link to="/category/custom">
              <Button variant="outline" className="border-other text-other hover:bg-other hover:text-other-foreground">
                Custom Units <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <div className="mt-8"><AdPlaceholder position="bottom" /></div>
      </div>
      <Footer />
    </div>
  );
};

export default EnglishCategory;

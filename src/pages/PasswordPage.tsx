import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ArrowLeft } from 'lucide-react';
import { TESTS_PASSWORD } from '@/data/real-tests/password-config';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const SESSION_KEY = 'tests-authenticated';

export const isTestsAuthenticated = (): boolean => {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
};

const PasswordPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isTestsAuthenticated()) {
      navigate('/tests', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TESTS_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      toast.success('Access granted');
      navigate('/tests', { replace: true });
    } else {
      toast.error('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link to="/" className="absolute top-6 left-6">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
      <Card className="p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold">Real Tests Access</h1>
          <p className="text-sm text-muted-foreground text-center">
            Enter the password to access real test materials
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <Button type="submit" className="w-full">
            Unlock
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PasswordPage;

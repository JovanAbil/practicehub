import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { School } from 'lucide-react';
import { SCHOOLS, getSelectedSchool, setSelectedSchool, SchoolConfig } from '@/data/schools-config';

interface SchoolSelectorProps {
  isOpen: boolean;
  onClose: (school: SchoolConfig | null) => void;
}

export const SchoolSelector = ({ isOpen, onClose }: SchoolSelectorProps) => {
  const handleSelect = (school: SchoolConfig) => {
    setSelectedSchool(school.id);
    onClose(school);
  };

  if (SCHOOLS.length === 0) return null;

  // If only one school, auto-select it
  if (SCHOOLS.length === 1) {
    const school = SCHOOLS[0];
    const existing = getSelectedSchool();
    if (!existing) {
      setSelectedSchool(school.id);
    }
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(null); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <School className="h-5 w-5 text-primary" />
            Choose Your School
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Select which school you're studying for to see relevant courses and popups.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          {SCHOOLS.map((school) => (
            <Button
              key={school.id}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => handleSelect(school)}
            >
              <School className="mr-3 h-4 w-4 shrink-0" />
              <span className="font-medium">{school.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

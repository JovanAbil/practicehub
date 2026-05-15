import { useState, useEffect } from 'react';
import { Question } from '@/types/quiz';

const STORAGE_KEY = 'quiz-presets';

export interface Preset {
  id: string;
  name: string;
  subject: string;
  unitId: string;
  questionIds: string[];
  createdAt: number;
  updatedAt: number;
}

interface AllPresets {
  [key: string]: Preset; // key is preset.id
}

export const usePresets = () => {
  const [presets, setPresets] = useState<AllPresets>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPresets(JSON.parse(stored));
      } catch {
        console.error('Failed to parse presets from storage');
      }
    }
  }, []);

  // Save to localStorage
  const saveToStorage = (data: AllPresets) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setPresets(data);
  };

  // Generate unique ID
  const generateId = () => {
    return `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Create a new preset
  const createPreset = (name: string, subject: string, unitId: string, questionIds: string[]): Preset => {
    const newPreset: Preset = {
      id: generateId(),
      name,
      subject,
      unitId,
      questionIds,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newPresets = { ...presets, [newPreset.id]: newPreset };
    saveToStorage(newPresets);
    return newPreset;
  };

  // Update an existing preset
  const updatePreset = (presetId: string, questionIds: string[], name?: string) => {
    if (!presets[presetId]) return;

    const updatedPreset: Preset = {
      ...presets[presetId],
      questionIds,
      name: name || presets[presetId].name,
      updatedAt: Date.now(),
    };

    const newPresets = { ...presets, [presetId]: updatedPreset };
    saveToStorage(newPresets);
  };

  // Delete a preset
  const deletePreset = (presetId: string) => {
    const newPresets = { ...presets };
    delete newPresets[presetId];
    saveToStorage(newPresets);
  };

  // Get presets for a specific subject/unit
  const getPresetsForUnit = (subject: string, unitId: string): Preset[] => {
    return Object.values(presets).filter(
      p => p.subject === subject && p.unitId === unitId
    );
  };

  // Get all presets for a subject
  const getPresetsForSubject = (subject: string): Preset[] => {
    return Object.values(presets).filter(p => p.subject === subject);
  };

  // Get a single preset by ID
  const getPreset = (presetId: string): Preset | undefined => {
    return presets[presetId];
  };

  // Get all presets
  const getAllPresets = (): Preset[] => {
    return Object.values(presets);
  };

  return {
    createPreset,
    updatePreset,
    deletePreset,
    getPresetsForUnit,
    getPresetsForSubject,
    getPreset,
    getAllPresets,
  };
};

export default usePresets;

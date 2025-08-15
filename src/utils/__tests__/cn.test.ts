/// <reference types="vitest/globals" />

import { cn } from '../cn';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn('base', isActive && 'conditional', isDisabled && 'hidden')).toBe('base conditional');
  });

  it('filters out falsy values', () => {
    expect(cn('base', null, undefined, '', 'active')).toBe('base active');
  });

  it('handles arrays and objects', () => {
    expect(cn(['base', 'extra'], { active: true, disabled: false })).toBe('base extra active');
  });
});

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types';

const DEFAULT_CONTENT: SiteContent = {
  home: {
    hero: {
      titleLine1: "Sanctuary of",
      titleLine2: "Shadows",
      subtitle: "Metropolitan sanctuary of architectural significance and bespoke hospitality. Where brutalism meets velvet.",
      backgroundImage: "https://images.unsplash.com/photo-1590430344210-49a36bd109be?q=80&w=3000&auto=format&fit=crop",
      estDate: "Est. MCMXXIV"
    }
  },
  about: {
    titleLine1: "An Icon",
    titleLine2: "Reimagined",
    philosophyQuote: "Luxury is not about abundance. It is about the absence of vulgarity and the presence of silence.",
    heritageText: "We didn't just restore a building. We resurrected a soul. The Obsidian Retreat stands as a testament to the city's industrial past, polished into a gem of modern hospitality."
  },
  services: {
    items: [
      {
        id: '01',
        title: 'The Onyx Spa',
        subtitle: 'Wellness & Restoration',
        description: 'A subterranean sanctuary featuring thermal baths, cryotherapy chambers, and ancient mineral treatments designed to reset the body\'s natural rhythm.',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: '02',
        title: 'Rooftop Dining',
        subtitle: 'Michelin Star Gastronomy',
        description: 'Avant-garde culinary artistry led by Chef Marco Pierre. Dining under the stars in a glass atrium overlooking the metropolis skyline.',
        image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop'
      }
    ]
  }
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);

  useEffect(() => {
    const stored = localStorage.getItem('obsidian_site_content');
    if (stored) {
      setContent(JSON.parse(stored));
    }
  }, []);

  const updateContent = (section: keyof SiteContent, data: any) => {
    const newContent = { ...content, [section]: { ...content[section], ...data } };
    setContent(newContent);
    localStorage.setItem('obsidian_site_content', JSON.stringify(newContent));
  };

  const resetContent = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.setItem('obsidian_site_content', JSON.stringify(DEFAULT_CONTENT));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
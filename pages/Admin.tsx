import React from 'react';
import { Lock } from 'lucide-react';

const Admin: React.FC = () => {
  return (
    <main className="bg-obsidian min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-12 text-center">
         <Lock className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1} />
         <h1 className="font-serif text-3xl text-white mb-4">Access Restricted</h1>
         <p className="text-paper/60 text-sm font-light">
            The Content Management System has been disabled for this visual deployment.
         </p>
      </div>
    </main>
  );
};

export default Admin;
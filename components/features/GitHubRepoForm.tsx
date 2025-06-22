
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { generateProjectDescriptionFromGitHub } from '../../services/geminiService';
import { Project } from '../../types';

interface GitHubRepoFormProps {
  onProjectGenerated: (project: Project) => void;
}

const GitHubRepoForm: React.FC<GitHubRepoFormProps> = ({ onProjectGenerated }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if API_KEY is configured (mainly for UI feedback)
  // The actual functional check is within geminiService.ts
  const isApiKeyConfigured = !(typeof process.env.API_KEY !== 'string' || process.env.API_KEY.trim() === '');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!repoUrl.trim()) {
      setError('GitHub repository URL cannot be empty.');
      return;
    }
    try {
      new URL(repoUrl);
      if (!repoUrl.includes('github.com')) {
        throw new Error('Invalid URL');
      }
    } catch (_) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/owner/repo).');
      return;
    }

    if (!isApiKeyConfigured) {
        setError('Gemini API key is not configured. Project generation is disabled. Please check environment setup.');
        return;
    }

    setIsLoading(true);
    try {
      const generatedData = await generateProjectDescriptionFromGitHub(repoUrl);
      const newProject: Project = {
        ...generatedData,
        id: `generated-${Date.now()}`, 
        imageUrl: `https://picsum.photos/seed/${encodeURIComponent(generatedData.name)}/600/400?grayscale`, 
      };
      onProjectGenerated(newProject);
      setSuccessMessage(`Project "${newProject.name}" generated and added!`);
      setRepoUrl(''); 
    } catch (err: any) {
      console.error("Error in GitHubRepoForm:", err);
      setError(err.message || 'An unexpected error occurred during project generation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-8 p-6 bg-card-light dark:bg-card-dark rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Add Project via GitHub</h3>
      <p className="text-sm text-text-light/80 dark:text-text-dark/80 mb-4">
        Enter a public GitHub repository URL. We'll use Gemini AI to generate a project name, description, and tags.
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          type="url"
          id="githubUrl"
          label="GitHub Repository URL"
          placeholder="https://github.com/your-username/your-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={isLoading}
          error={error?.includes('URL') ? error : undefined}
        />
        <Button type="submit" isLoading={isLoading} disabled={isLoading || !isApiKeyConfigured} className="w-full sm:w-auto">
          {isLoading ? 'Generating...' : 'Generate Project Info'}
        </Button>
      </form>
      {error && !error.includes('URL') && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {successMessage && <p className="mt-3 text-sm text-green-500">{successMessage}</p>}
       {!isApiKeyConfigured && (
         <p className="mt-4 text-xs text-amber-600 dark:text-amber-400 p-3 bg-amber-50 dark:bg-amber-900/50 rounded-md">
           <strong>Note:</strong> A valid Gemini API key (process.env.API_KEY) was not detected or is not a valid string. Project generation will not work without it. This message is for development guidance.
         </p>
       )}
    </div>
  );
};

export default GitHubRepoForm;

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { fetchTools } from '../supabase';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
}

function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    const filtered = tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTools(filtered);
  }, [searchTerm, tools]);

  async function loadTools() {
    setIsLoading(true);
    try {
      const data = await fetchTools();
      setTools(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching tools:', err);
      setError('Failed to fetch AI tools. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search AI tools..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {isLoading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
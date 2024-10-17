import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
}

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{tool.name}</h2>
        <p className="text-gray-600 mb-4">{tool.description}</p>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {tool.category}
          </span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            Visit <ExternalLink className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
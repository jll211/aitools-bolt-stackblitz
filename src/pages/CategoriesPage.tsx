import React, { useState, useEffect } from 'react';
import { fetchTools } from '../supabase';
import { Link } from 'react-router-dom';

interface CategoryCount {
  category: string;
  count: number;
}

function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setIsLoading(true);
    try {
      const tools = await fetchTools();
      const categoryCounts = tools.reduce((acc: { [key: string]: number }, tool) => {
        acc[tool.category] = (acc[tool.category] || 0) + 1;
        return acc;
      }, {});

      const sortedCategories = Object.entries(categoryCounts)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 16);

      setCategories(sortedCategories);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Top AI Tool Categories</h1>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.category}
              to={`/?category=${encodeURIComponent(category.category)}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold mb-2">{category.category}</h2>
              <p className="text-gray-600">{category.count} tools</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
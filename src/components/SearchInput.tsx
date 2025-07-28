import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';
import { apiCall } from '../api/apiCall';
import DASHBOARD_ENDPOINTS from '../api/endPoints';

interface SearchResult {
  id: string;
  postTitle: string;
  postType: string;
  productType: string;
}

interface SearchInputProps {
  onSearch: (query: string) => void;
  onResultSelect: (selectedPosts: string[]) => void;
  selectedProduct: string;
  apiParams: {
    productType: string;
    startDate?: string;
    endDate?: string;
  };
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onResultSelect,
  selectedProduct,
  apiParams
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSearchResults = async () => {
    if (debouncedQuery.length > 0) {
      setIsLoading(true);
      try {
        const response = await apiCall({
          endpoint: DASHBOARD_ENDPOINTS.SEARCH_POSTS,
          method: 'POST',
          data: {
            keyword: debouncedQuery,
            productType: apiParams.productType,
            startDate: apiParams.startDate,
            endDate: apiParams.endDate
          }
        });
        setResults(response || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  // Effect for search query changes
  useEffect(() => {
    fetchSearchResults();
  }, [debouncedQuery, apiParams]); // Update dependency to include all apiParams

  // Effect to clear and refresh search when params change
  useEffect(() => {
    setSelectedItems(new Set()); // Clear selections when params change
    if (query) { // Only refresh if there's an active search
      fetchSearchResults();
    }
  }, [apiParams]); // Update dependency to include all apiParams

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
  };

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    onResultSelect(Array.from(newSelected));
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedItems(new Set());
    onResultSelect([]);
  };

  const truncateText = (text: string, maxLength: number = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onClick={() => {
            if (results.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={`Search posts...`}
          className="w-full md:w-70  h-[46px] px-10 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-medium"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-gray-200"
          >
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : results.length > 0 ? (
                results.map((result) => (
                  <motion.div
                    key={result.id}
                    className="group relative flex items-center p-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    onClick={() => toggleItem(result.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border ${selectedItems.has(result.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'} flex items-center justify-center`}>
                          {selectedItems.has(result.id) && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <p className="text-sm text-gray-700 truncate group-hover:text-blue-600" title={result.postTitle}>
                            {truncateText(result.postTitle)}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {result.postType}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {result.productType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : query ? (
                <div className="p-4 text-center text-gray-500">No results found</div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
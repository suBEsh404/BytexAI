export default function FilterBar({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Rated' }
  ]

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-dark-card text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-primary"
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-border transition"
      >
        Previous
      </button>
      <span className="text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-border transition"
      >
        Next
      </button>
    </div>
  )
}

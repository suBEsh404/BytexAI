import RatingStars from './RatingStars'

export default function ReviewItem({ review, onDelete, currentUserId }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
            {review.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-gray-900 dark:text-white font-semibold">{review.userName}</h4>
              <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">{review.userRole}</span>
            </div>
            <RatingStars rating={review.rating} size="sm" />
            <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {currentUserId === review.userId && onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-400 hover:text-red-300 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

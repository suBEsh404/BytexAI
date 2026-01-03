const mockReviews = [
  {
    id: 1,
    projectId: 1,
    userId: 2,
    userName: 'John Doe',
    userRole: 'user',
    rating: 5,
    comment: 'Amazing AI tool! Very intuitive and powerful.',
    createdAt: '2024-01-15',
    flags: { reported: false, spam: false, abusive: false },
    isHidden: false
  },
  {
    id: 2,
    projectId: 1,
    userId: 3,
    userName: 'Jane Smith',
    userRole: 'developer',
    rating: 4,
    comment: 'Great project, could use more features.',
    createdAt: '2024-01-14',
    flags: { reported: true, spam: false, abusive: false },
    isHidden: false
  },
  {
    id: 3,
    projectId: 2,
    userId: 4,
    userName: 'Alice Johnson',
    userRole: 'user',
    rating: 3,
    comment: 'This tool is okay, but has some bugs.',
    createdAt: '2024-01-13',
    flags: { reported: false, spam: true, abusive: false },
    isHidden: false
  },
  {
    id: 4,
    projectId: 2,
    userId: 5,
    userName: 'Bob Wilson',
    userRole: 'developer',
    rating: 2,
    comment: 'Terrible experience! Do not use this.',
    createdAt: '2024-01-12',
    flags: { reported: false, spam: false, abusive: true },
    isHidden: true
  }
]

export const reviewService = {
  getProjectReviews: async (projectId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockReviews.filter(r => r.projectId === parseInt(projectId))
  },

  createReview: async (projectId, reviewData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newReview = {
      id: Date.now(),
      projectId: parseInt(projectId),
      ...reviewData,
      createdAt: new Date().toISOString()
    }
    mockReviews.push(newReview)
    return newReview
  },

  deleteReview: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const index = mockReviews.findIndex(r => r.id === reviewId)
    if (index > -1) mockReviews.splice(index, 1)
    return true
  },

  getAllReviews: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [...mockReviews]
  },

  warnUser: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // In a real app, this would send a warning notification to the user
    console.log(`Warning sent to user ${userId}`)
    return true
  },

  hideReview: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const review = mockReviews.find(r => r.id === reviewId)
    if (review) {
      review.isHidden = true
    }
    return true
  },

  restoreReview: async (reviewId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const review = mockReviews.find(r => r.id === reviewId)
    if (review) {
      review.isHidden = false
    }
    return true
  }
}

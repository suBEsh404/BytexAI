const mockReports = [
  {
    id: 1,
    type: 'Review',
    reason: 'Inappropriate content',
    description: 'Review contains offensive language and personal attacks.',
    reportedItemId: 1,
    reportedItemTitle: 'AI Content Generator Review',
    reporterId: 5,
    reporterName: 'Sarah Davis',
    status: 'Pending',
    createdAt: '2024-01-20T10:30:00Z',
    priority: 'High'
  },
  {
    id: 2,
    type: 'User',
    reason: 'Spam',
    description: 'User is posting spam messages and fake reviews.',
    reportedItemId: 6,
    reportedItemTitle: 'Mike Johnson',
    reporterId: 7,
    reporterName: 'Emma Wilson',
    status: 'Pending',
    createdAt: '2024-01-19T14:15:00Z',
    priority: 'Medium'
  },
  {
    id: 3,
    type: 'Project',
    reason: 'Copyright infringement',
    description: 'Project appears to be using copyrighted material without permission.',
    reportedItemId: 3,
    reportedItemTitle: 'Image Processor Tool',
    reporterId: 8,
    reporterName: 'David Brown',
    status: 'Resolved',
    createdAt: '2024-01-18T09:45:00Z',
    priority: 'High'
  },
  {
    id: 4,
    type: 'Review',
    reason: 'False information',
    description: 'Review contains misleading information about the product.',
    reportedItemId: 2,
    reportedItemTitle: 'Data Analytics Tool Review',
    reporterId: 9,
    reporterName: 'Lisa Chen',
    status: 'Dismissed',
    createdAt: '2024-01-17T16:20:00Z',
    priority: 'Low'
  },
  {
    id: 5,
    type: 'User',
    reason: 'Harassment',
    description: 'User is harassing other community members.',
    reportedItemId: 10,
    reportedItemTitle: 'Alex Rodriguez',
    reporterId: 11,
    reporterName: 'Maria Garcia',
    status: 'Pending',
    createdAt: '2024-01-16T11:10:00Z',
    priority: 'High'
  }
]

export const reportsService = {
  getAllReports: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [...mockReports]
  },

  resolveReport: async (reportId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const report = mockReports.find(r => r.id === reportId)
    if (report) {
      report.status = 'Resolved'
    }
    return true
  },

  dismissReport: async (reportId) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const report = mockReports.find(r => r.id === reportId)
    if (report) {
      report.status = 'Dismissed'
    }
    return true
  },

  takeAction: async (reportId, action) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // In a real app, this would perform the specified action (block user, delete content, etc.)
    console.log(`Taking action: ${action} for report ${reportId}`)
    const report = mockReports.find(r => r.id === reportId)
    if (report) {
      report.status = 'Action Taken'
    }
    return true
  }
}

import AdminSidebar from './AdminSidebar'

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#EFF6FF] dark:bg-[#020617]">
      <AdminSidebar />
      <main className="flex-1 ml-16 md:ml-64 transition-all duration-300 ease-in-out">
        <div className="p-6 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AdminLayout

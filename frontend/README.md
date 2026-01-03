STEP 1: Install Dependencies

                    cd frontend

                    npm install 

STEP 2: Start Server                                            
  
                     npm run dev 


//////////////////////////////////////////////////////
Test each page loads without errors:

1. [ ] `/` - HomePage
2. [ ] `/projects` - ExplorePage
3. [ ] `/projects/1` - ProjectDetailPage (project 1)
4. [ ] `/projects/2` - ProjectDetailPage (project 2)
5. [ ] `/login` - LoginPage
6. [ ] `/signup` - SignupPage
7. [ ] `/forgot-password` - ForgotPasswordPage
8. [ ] `/reset-password/test123` - ResetPasswordPage
9. [ ] `/profile` - ProfilePage
10. [ ] `/bookmarks` - BookmarksPage
11. [ ] `/developer/dashboard` - DeveloperDashboard
12. [ ] `/developer/projects/new` - UploadProject
13. [ ] `/developer/projects/1/edit` - ManageProjects
14. [ ] `/developer/profile/1` - DeveloperProfile
15. [ ] `/projects/1/analysis` - ProjectAnalysis
16. [ ] `/projects/1/suggestions` - AISuggestion
17. [ ] `/help` - HelpPage
18. [ ] `/chat` - ChatPage
19. [ ] `/invalid-url` - NotFoundPage

//////////////////////////////////////////////////////

Bytexai.com/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── HelpPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── ProjectDetailPage.jsx
│   │   │   ├── BookmarksPage.jsx
│   │   │   └── (other pages...)
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── RatingStars.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   └── apiClient.js
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   ├── logo.png
│   │   └── vite.svg
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
 
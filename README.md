# Admin Dashboard

This project is a responsive admin dashboard featuring a central modal for actions (like adding users), a dynamic data table, and seamless integration of a sidebar and navbar for easy navigation. I wanted to add an
auditing feature but couldn't due to ongoing exams. But I tried to include stuff I could with the time I had.

## Features
- **Responsive Design**: Works well on all screen sizes.
- **Sidebar Navigation**: Easily toggle the sidebar to access key sections.
- **Navbar**: Includes action buttons to trigger modals or key functionalities.
- **Modal**: Centrally aligned modal triggered by navbar or sidebar buttons.
- **Dynamic Data Table**:
  - Displays user data fetched from the backend.
  - Includes "Edit" and "Delete" actions for each row.
- **Context API**:
  - Centralized state management for user data and modal visibility.
  - Simplifies prop drilling and enhances reusability.

---

## Technologies Used
- **Frontend**: React, TailwindCSS
- **State Management**: Context API
- **Icons**: `react-icons`
- **Backend Integration**: Fetch API (or Axios)
- **Styling**: Responsive and clean UI with TailwindCSS

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dhawal19/VRV-Security-Frontend-Intern-Assignment-Dhawal-Arora.git
   cd VRV-Security-Frontend-Intern-Assignment-Dhawal-Arora
   ```
   Feel free to rename this folder to a shorter name ;)

2. **Install dependencies**
   - Go to each folder API and client using the command:
   ```bash
   cd folder_name
   ```
   - Replace folder_name with API and client
   - Execute the command:
   ```bash
   npm install
   ```
3. **Run both services**:
    - Use the command:
    ```bash
    npm run dev
    ```
    - Go to each of the folders and run this command.
4. The backend will be available at **localhost:3000** and the frontend will be available at **localhost:5173**

---

## Usage

### Adding Users
1. Navigate to the **Add User** button located in the navbar or sidebar.
2. Click the button to open the **Add User Modal**.
3. Fill in the user details in the modal form.
4. Submit the form to add the user to the database.
5. The data table will refresh automatically to display the newly added user.

---

### Editing Users
1. Locate the user you want to edit in the data table.
2. Click the **Edit** button in the "Actions" column for that user.
3. The user’s row will become editable, allowing you to modify the fields.
4. Save the changes to update the user in the database.
5. The table will refresh to reflect the updated information.

---

### Deleting Users
1. Locate the user you want to delete in the data table.
2. Click the **Delete** button (trash icon) in the "Actions" column for that user.
3. Confirm the deletion that appears in the prompt.
4. The user will be removed from the database, and the table will refresh to reflect the changes.

---

### Sidebar Navigation
- Use the sidebar to navigate between different sections of the admin dashboard.
- The active section is highlighted for easier identification.

---

### Modal Behavior
- The modal is triggered by buttons in the navbar or sidebar.
- It appears in the centre of the screen and is responsive to all screen sizes.
- Close the modal by clicking the close button or clicking outside the modal.

---

### Table Data
- The table dynamically fetches data from the backend using the Context API.
- Data refreshes automatically after adding, editing, or deleting a user.
- If needed, manually reload the table by refreshing the page.

---

### Responsive Design
- The admin dashboard is fully responsive and works seamlessly across devices.
- The layout adjusts dynamically for smaller screens to provide an optimal user experience.

Prompt: Implement Advanced Filtering and UI Upgrades for Admin Panel
Project Context: This is for the "i-consult" doctor booking application, specifically targeting the admin panel built with React.

Overall Goal: Enhance the admin's ability to view and manage appointments by implementing two major feature upgrades: one on the main Dashboard and another on the All Appointments page.

Feature 1: Upgrade the "Latest Bookings" on the Dashboard Page
File to Modify: demo-main/admin/src/pages/Admin/Dashboard.jsx

Current State: The "Latest Bookings" box shows all appointments without any filtering or pagination.

Required Changes:

Default Date Filtering:

By default, this section should only display appointments scheduled for the current date and all future dates. Past appointments should not be shown here.

Pagination:

Display a maximum of 10 appointments per page.

Add "Next" and "Previous" buttons below the list to navigate through the pages of upcoming appointments.

Custom Date Filter:

Add a date picker input field above the appointments list.

By default, this field should display today's date.

When the admin selects a specific date from this picker, the list should update to show only the appointments scheduled for that single selected date.

Feature 2: Implement a Multi-Stage Filtering System on the "All Appointments" Page
File to Modify: demo-main/admin/src/pages/Admin/AllAppointments.jsx

Current State: This page displays all appointments in a single, unfiltered list.

Required Changes:

Implement a new filtering UI with the following logic:

Primary Filter Choice:

Add a primary dropdown menu with two options: "Filter by Date" and "Filter by Doctor". The UI below this dropdown will change based on the selection.

If "Filter by Date" is selected:

Display a card with two date input fields: "From Date" and "To Date".

Logic:

If the admin selects only a "From Date", the list should show all appointments on that specific date.

If the admin selects both a "From Date" and a "To Date", the list should show all appointments within that date range (inclusive).

If "Filter by Doctor" is selected:

Display a card with two filter controls:

A searchable select dropdown to choose a doctor's name.

Two optional date input fields: "From Date" and "To Date".

Logic:

If the admin only selects a doctor's name, the list should show all appointments (past, present, and future) for that specific doctor.

If the admin selects a doctor AND only a "From Date", the list should show all appointments for that doctor on that specific date.

If the admin selects a doctor AND a "From Date" AND a "To Date", the list should show all appointments for that doctor within that specific date range.
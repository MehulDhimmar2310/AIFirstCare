# Feature Requirement: Insurance Claim Portal System

**Received From:**  
Client - Insurance Company

**Summary:**  
Develop a comprehensive web-based insurance claim management portal with role-based access control for different user types (Super Admin, Admin, Staff, Hospital). The system will handle complete claim lifecycle from patient admission to payment settlement with reporting and master data management capabilities.

## Raw Requirements:

### User Panel Structure

#### Public Access
* **One Web Page for Claim Status Search**
  * Search by Hospital Name
  * Search by Patient Name / Policy Number / Claim Number

#### Authentication System
* **Login via Email & Password for:**
  * Super Admin
  * Admin  
  * Staff
  * Hospital

### Dashboard Requirements

#### Hospital Dashboard (View Only)
* Number of Claims
* Completed Claims Count
* In Process Claims Count

#### Staff, Admin & Super Admin Dashboard
* Number of Claims
* Completed Claims Count
* In Process Claims Count
* Number of Hospitals
* Claim Stage Process Overview
* Number of Patient Admit Files
* Number of Discharge Files
* Number of File Submit & File Receive
* Number of Payment Settlement Files

### Master Data Management

#### Service Master
* **View Services List**
* **CRUD Operations (View/Add/Update/Delete):**
  * Service Name
  * Claim Price/File Range Options:
    * Fixed Price
    * Price On Service
  * **Pricing Structure Example:**
    * 1 to 1,00,000 Rs = 2000 Rs (Our Claim File Charge)
    * Every additional 1 lakh above = 1000 Rs additional charges

#### Hospital Master
* **View Hospital List**
* **CRUD Operations (View/Add/Update/Delete):**
  * Name
  * Address
  * Mobile Number
  * Email ID
  * Dr. Name (Multiple Selection)
  * Select Service (Multiple Selection)
  * **Reference Information:**
    * Name
    * Mobile Number
    * Commission/Price (Fixed or Percentage %)

#### TPA Master
* **CRUD Operations (View/Add/Update/Delete):**
  * Name
  * Mobile Number
  * Address
* **TPA List View**

#### Insurance Company Master
* **View Insurance List**
* **CRUD Operations (View/Add/Update/Delete):**
  * Name
  * Address
  * Mobile Number
  * Email ID

### Operational Modules

#### Courier Sticker Generation
* Hospital Name
* **Sticker Selection (Choose Any One):**
  * Insurance Company
  * TPA Name
* Address
* Patient Name
* Claim Number

#### Claim User Management
* Select TPA
* Service Charge (Editable)

#### Patient Admit Module
* Month & Other Field Entry
* Sample Excel for All Fields
* **Document Upload:**
  * Multiple Document Support
  * Add/Update/Delete Operations
  * Supported Formats: PDF, Images

#### Discharge Module
* **Bill Generation Options:**
  * **If Yes:** Hospital Final Bill Entry
  * **If No:** Bypass Process
* **Document Upload:**
  * Multiple Document Support
  * Add/Update/Delete Operations
  * Supported Formats: PDF, Images

#### File Submit & File Receive Module
* **Online Data Entry**
* **Offline Process:**
  * Courier Date
  * Company Name
  * Docket Number
* **Document Upload:**
  * Multiple Document Support
  * Add/Update/Delete Operations
  * Supported Formats: PDF, Images

#### Payment Settlement Module
* Total Amount
* Discount
* TPS
* Bank Amount
* Date
* **Document Upload:**
  * Multiple Document Support
  * Add/Update/Delete Operations
  * Supported Formats: PDF, Images

**Note:** All above processes should show date tracking

### Billing & Financial Management

#### Hospital Bill Generation
* Select Hospital
* List of Hospital Bills
* **Filtering Options:**
  * Monthly
  * From Date To Date
* Generate Bill (Sample Bill Attached)
* **Payment Status:**
  * Pending (Default)
  * Received
* Auto Add Our Expenses
* Reference Commission

### Reporting System

#### Hospital Reports
* **Total Claims:**
  * Monthly
  * Date-wise
  * Party-wise
  * Export: Excel & PDF
* Outstanding Reports
* Payment Party-wise Reports
* TDS Reports
* **Other Reports:**
  * Sales
  * Expenses
  * Transactions
  * Reference Commission
  * Claim Settlement Pending

### Expense & Income Management
* **CRUD Operations (View/Add/Update/Delete)**
* Show Balance

### Employee Management

#### Employee Master
* **CRUD Operations (View/Add/Update/Delete)**
* **Role Assignment:**
  * Staff (Default)
  * Admin
* Employee List

#### Employee Salary Calculation
* Total Attendance Days
* Total Salary
* Pay Slip Generation
* **Salary Components:**
  * Overtime
  * Sunday/Holiday Extra
  * CL, PL, SL
  * Other Salary Calculations with Expenses

### Communication System

#### Reminder & Transaction Messages
* **Communication Channels:**
  * SMS Messages
  * WhatsApp

## Role-Based Access Control

### Super Admin Access
* **Full System Access**

### Admin Access
* Hospital Master
* Insurance Company Master
* Claim User Status and Details
* Reports

### Staff Access
* Claim User Management
* Courier Sticker
* Claim Related Reports

### Hospital Access
* **View Only Access**
* Hospital Related Reports

## Technical Requirements
* Web-based application
* Role-based authentication system
* Document upload and management system
* Excel import/export functionality
* PDF generation capabilities
* SMS and WhatsApp integration
* Multi-user concurrent access support

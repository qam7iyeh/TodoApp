# 📝 To-Do Task Manager

A small full-stack application that allows users to create, update, delete, and manage to-do tasks efficiently.

---

## 🚀 Features

- ➕ Create, ✏️ Update, and ❌ Delete tasks  
- ✅ Mark tasks as done
- ⚠️ Validation: Tasks must be **longer than 10 characters**, otherwise an error message is displayed
- ⏰ Deadline support: Tasks can have a defined deadline — overdue tasks are **highlighted in red**
- 🧾 Tasks are displayed in a clean **table view**
- 💾  using SQL Server as storage

---

## 🧠 Tech Stack

### 🖥️ Backend
- **Framework:** .NET 10.0  
- **Database:** SQL Server  
- **Language:** C#

#### First Clone the Repo
git clone https://github.com/qam7iyeh/TodoApp

#### ▶️ How to Run the Backend
dotnet restore  
dotnet build  
dotnet ef database update  
dotnet run

#### ▶️ How to Run the frontend

   cd .\todo-frontend\
   npm install .  
   npm run dev

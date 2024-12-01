# GymDominator (Users)

[![GymDominator](https://img.shields.io/badge/version-1.0.0-brightgreen)]()  
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)  
[![Cloudflare Workers](https://img.shields.io/badge/Backend-Cloudflare%20Workers-orange)](https://workers.cloudflare.com/)  
[![Prisma](https://img.shields.io/badge/Database-Prisma-blue)](https://www.prisma.io/)  

GymDominator (Users) is a user-focused platform designed to enhance the gym-going experience by providing personalized dashboards, workout plans, and attendance tracking. Built with modern web technologies, this application ensures a seamless and engaging user interface that makes managing gym memberships intuitive and efficient.

---

## **Features**

### **Personalized Dashboard**  
- Access a custom dashboard tailored to each user's fitness goals and progress.  
- View personalized workout and diet plans assigned by your trainer.  

### **QR-based Attendance System**  
- Trainers generate a unique QR code daily for gym members to scan.  
- This system ensures secure attendance tracking and gate entry validation.  

### **Workout Guide**  
- Access a complete workout guide with:  
  - Exercise forms  
  - Video tutorials  
  - Descriptions and benefits  

### **Trainer Interaction**  
- Users can see their assigned trainer’s details.  
- Enables direct interaction with trainers for feedback and guidance.  

---

## **Technology Stack**

- **Frontend:**  
  - React with TypeScript  
  - ShadCN for UI components  
  - Tailwind CSS for styling  
  - Framer Motion for animations  

- **Validation:**  
  - Zod for type validation  

- **State Management:**  
  - Recoil for efficient state handling  

- **Backend:**  
  - Shared with the admin platform  
  - Built using Hono  
  - Deployed on Cloudflare Workers  

- **Images:**  
  - Managed via Cloudinary  

- **Database:**  
  - Cloudflare's serverless D1 database integrated with Prisma ORM  

---

## **Screenshots**

### **User Dashboard**  
_Experience a personalized gym journey through the user dashboard._  

**User Dashboard Image 1**  
![User Dashboard Screenshot 1](/public/user-1.png)  

**User Dashboard Image 2**  
![User Dashboard Screenshot 2](/public/user-2.png)  

---

## **How to Run Locally**

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/gymdominator-user.git
   cd gymdominator-user

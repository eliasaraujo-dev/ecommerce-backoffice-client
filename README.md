# 🛒 E-commerce Backoffice Web Client

A robust Single Page Application (SPA) designed as an administrative dashboard to manage an E-commerce ecosystem, featuring inventory control, order flow management, and secure authentication.

This project is built with a strong focus on **Software Architecture** and **Scalability**. It implements a *Feature-Based Architecture* to strictly separate business domain responsibilities, preparing the front-end to seamlessly consume complex RESTful APIs.

## 🚀 Tech Stack & Tools

* **Core:** React 18 + TypeScript (Strict typing based on DTO contracts)
* **Build Tool:** Vite + SWC (High-performance compilation)
* **HTTP Client:** Axios (Singleton pattern with Interceptors for JWT injection)
* **Architecture:** Feature-Based Domain Design

## 🏗️ Project Architecture (Under the Hood)

The source code follows a highly modular structure, aiming for enterprise-level maintainability:

- `src/core/`: Global network configurations, Singleton API services, and Route Guards.
- `src/features/`: Isolated business modules (`auth`, `inventory`, `orders`).
- `src/shared/`: Generic UI components (Design System) and TypeScript Models/Interfaces.

## ⚙️ Running Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/ecommerce-admin-web.git](https://github.com/your-username/ecommerce-admin-web.git)
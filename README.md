This project was built as part of the online course by [Code4Startup.](https://code4startup.com/ai_saas/)

I followed the course to learn how to build AI-powered SaaS products using modern tools and best practices. The core implementation is based on the course, with some customizations and extensions.

Chat with PDF is an AI-powered SaaS application that enables users to upload PDF documents and engage in real-time conversations with them using integrated large language models (LLMs). It's a complete end-to-end project built with modern web technologies, vector databases, and serverless infrastructure.

### Project Structure

├── public/  
├── src/  
	     ├── actions/            # Server actions (Next.js 13+)  
	     ├── app/                # App directory (routes, layouts, etc.)  
	     ├── components/         # Reusable UI components  
	     ├── const/              # Static constants and configuration  
	     ├── lib/                # Utility libraries and integrations (e.g., OpenAI, PDF parsing, Pinecone)  
	     └── middleware.ts       # Middleware for auth, logging, etc.  
├── prisma/                 # Prisma schema and DB migrations  
├── .env                    # Environment variables (not committed)  
├── README.md               # Project documentation  
├── package.json            # Project metadata and dependencies  

### Features

📤 Upload and parse any PDF  
💬 Real-time Q&A with document content  
🔐 Secure auth with Clerk  
💳 Subscription billing via Stripe  
🌐 Serverless deployment with Vercel  
📚 Uses embeddings & vector search (Pinecone)  

### Tech Stack

Frontend -	Next.js 13 (App Router), Tailwind CSS, React, Radix UI  
Backend -	LangChain, OpenAI API, Pinecone, Prisma ORM  
Auth & Billing -	Clerk (authentication), Stripe (subscription management)  
Storage -	AWS S3 (or compatible storage)  
PDF Parsing -	pdf-parse, pdfjs-dist, @react-pdf-viewer  



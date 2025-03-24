
export interface ModuleType {
  title: string;
  content: string;
  objectives: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: number;
  };
}

export interface CourseType {
  title: string;
  description: string;
  modules: ModuleType[];
}

export interface FAQItemType {
  question: string;
  answer: string;
  tags: string[];
}

export interface FAQType {
  title: string;
  description: string;
  questions: FAQItemType[];
}

// Mock processing function (in a real app, this would connect to a backend service)
export const processDocument = (file: File): Promise<{ course: CourseType; faq: FAQType }> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Mock generated data
      const course: CourseType = {
        title: "Complete Guide to CRM Implementation",
        description: "Learn how to implement and optimize a Customer Relationship Management system for your business.",
        modules: [
          {
            title: "Introduction to CRM Systems",
            content: "Customer Relationship Management (CRM) systems are essential tools for modern businesses. They help track customer interactions, manage sales pipelines, and improve customer service.\n\nA well-implemented CRM system can increase revenue by 29% and sales productivity by up to 34%. This course will guide you through the implementation process, best practices, and optimization techniques.",
            objectives: [
              "Understand the core functions of CRM systems",
              "Identify key business requirements for CRM implementation",
              "Recognize the benefits of implementing a CRM solution"
            ],
            quiz: {
              question: "What is a primary benefit of implementing a CRM system?",
              options: [
                "Reducing hardware costs",
                "Improved customer relationship tracking",
                "Automatic website creation",
                "Eliminating the need for a sales team"
              ],
              answer: 1
            }
          },
          {
            title: "Requirements Gathering and Planning",
            content: "Before implementing a CRM system, it's crucial to gather requirements from all stakeholders. This includes sales teams, customer service representatives, marketing departments, and management.\n\nCreate a detailed implementation plan that includes:\n- Timeline and milestones\n- Budget considerations\n- Training requirements\n- Data migration strategy\n- Integration with existing systems",
            objectives: [
              "Conduct effective stakeholder interviews",
              "Create a comprehensive implementation roadmap",
              "Develop a realistic budget and resource allocation plan"
            ],
            quiz: {
              question: "Which of the following should be included in a CRM implementation plan?",
              options: [
                "Office furniture specifications",
                "Company holiday schedule",
                "Data migration strategy",
                "Employee personal information"
              ],
              answer: 2
            }
          },
          {
            title: "Data Migration and Integration",
            content: "A successful CRM implementation requires careful data migration from existing systems. This involves data cleaning, deduplication, and ensuring compatibility with the new system.\n\nIntegration with other business systems such as ERP, marketing automation, and customer service platforms is also essential for maximizing the value of your CRM investment.",
            objectives: [
              "Plan and execute a clean data migration",
              "Implement effective integration with existing business systems",
              "Establish data governance protocols"
            ],
            quiz: {
              question: "What step should be taken before migrating data to a new CRM?",
              options: [
                "Hiring new staff",
                "Data cleaning and deduplication",
                "Changing company logo",
                "Restructuring the sales department"
              ],
              answer: 1
            }
          },
          {
            title: "User Training and Adoption",
            content: "User adoption is often the biggest challenge in CRM implementation. Comprehensive training programs, clear documentation, and ongoing support are essential for success.\n\nConsider using a phased approach to training, starting with basic functionality and gradually introducing more advanced features as users become comfortable with the system.",
            objectives: [
              "Design effective training programs for different user roles",
              "Develop strategies to overcome resistance to change",
              "Create a sustainable support system for ongoing assistance"
            ],
            quiz: {
              question: "What approach is recommended for CRM training?",
              options: [
                "Training only managers who will train their teams",
                "One-day intensive training for all employees",
                "Phased approach starting with basic functionality",
                "Allowing users to learn entirely on their own"
              ],
              answer: 2
            }
          }
        ]
      };

      const faq: FAQType = {
        title: "CRM Implementation FAQ",
        description: "Frequently asked questions about implementing a Customer Relationship Management system.",
        questions: [
          {
            question: "How long does it typically take to implement a CRM system?",
            answer: "The implementation timeline varies depending on the size of your organization, complexity of requirements, and the specific CRM solution. For small businesses with straightforward needs, implementation can take 2-4 weeks. Mid-sized organizations typically require 1-3 months, while enterprise-level implementations can take 3-12 months or longer.\n\nFactors that affect the timeline include data migration complexity, required customizations, integration with existing systems, and user training needs.",
            tags: ["timeline", "implementation", "planning"]
          },
          {
            question: "What is the average cost of implementing a CRM system?",
            answer: "CRM implementation costs vary widely based on several factors:\n\n- CRM software licensing ($10-$150 per user/month)\n- Implementation services ($1,000-$10,000+ for small businesses, $10,000-$100,000+ for enterprises)\n- Customization costs (typically $150-$250 per hour for developer time)\n- Data migration ($1,000-$5,000 for small datasets, significantly more for complex data)\n- Training ($500-$5,000, depending on organization size)\n- Ongoing support and maintenance\n\nSmall businesses might spend $5,000-$20,000 total, while enterprise implementations can exceed $100,000.",
            tags: ["cost", "budget", "pricing"]
          },
          {
            question: "How can we ensure high user adoption of our new CRM?",
            answer: "Successful user adoption requires a strategic approach:\n\n1. Involve end-users in the selection and implementation process\n2. Clearly communicate the benefits and value proposition to all users\n3. Provide comprehensive training tailored to different user roles\n4. Ensure the system is intuitive and aligned with existing workflows\n5. Get executive sponsorship and visible management support\n6. Identify and train CRM champions within each department\n7. Set clear expectations and possibly tie CRM usage to performance metrics\n8. Provide ongoing support and regular refresher training\n9. Collect and act on user feedback to continuously improve the system\n10. Celebrate early wins and success stories",
            tags: ["adoption", "training", "change management"]
          },
          {
            question: "Should we implement CRM all at once or use a phased approach?",
            answer: "For most organizations, a phased approach is recommended for CRM implementation. This method allows for:\n\n- Easier change management and reduced disruption\n- Ability to learn from early phases and apply improvements\n- More manageable training and support requirements\n- Earlier realization of benefits in high-priority areas\n- Reduced risk compared to an all-at-once approach\n\nConsider starting with core sales functionality, then gradually adding marketing automation, customer service features, and more advanced capabilities as users become comfortable with the system.",
            tags: ["implementation", "strategy", "phased approach"]
          },
          {
            question: "What are the common pitfalls in CRM implementation and how can we avoid them?",
            answer: "Common CRM implementation pitfalls include:\n\n1. Insufficient planning and requirement gathering\n2. Poor data quality and migration issues\n3. Lack of executive sponsorship and clear ownership\n4. Inadequate user training and support\n5. Failing to align CRM with business processes\n6. Excessive customization leading to maintenance challenges\n7. Unclear objectives and success metrics\n8. Insufficient testing before launch\n\nTo avoid these issues, ensure you have a comprehensive implementation plan, strong project management, executive support, quality data preparation, adequate training, and clear success metrics. Consider working with experienced CRM implementation partners if you lack internal expertise.",
            tags: ["challenges", "best practices", "risk management"]
          }
        ]
      };

      resolve({ course, faq });
    }, 3000);
  });
};

// Function to simulate progress during document processing
export const simulateProgress = (callback: (progress: number) => void): () => void => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    callback(Math.floor(progress));
    if (progress === 100) clearInterval(interval);
  }, 500);
  
  return () => clearInterval(interval);
};

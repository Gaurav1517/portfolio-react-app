import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const projectList = [
  {
    title: '3-Tier DevSecOps Mega Project ',
    duration: 'Jul 2025',
    company: 'Self-Project',
    description:
      'Built a 3-tier DevSecOps setup with a Node.js backend and React frontend on Amazon EKS, managed through Terraform. Configured IAM-based RBAC for secure Kubernetes access and set up HTTPS with Let’s Encrypt and Kubernetes Ingress. Automated the CI/CD pipeline using Jenkins, integrating tools like SonarQube, Trivy, and GitLeaks for security and code quality checks. Focused on building a secure, scalable, and cloud-native deployment process using Kubernetes and automated vulnerability scanning.',
    responsibilities:
      'Infrastructure Setup using Terraform, Security with IAM & RBAC, aCI/CD Pipeline with Jenkins,Kubernetes & HTTPS Configuration.'
  },
  {
    title: 'BoardGame K8s Deployment Pipeline',
    duration: 'Jul 2025',
    company: 'Self-project',
    description:
      'Developed a fully automated CI/CD pipeline using Jenkins for build, test, security scanning (Trivy), and deployment of a Java-based BoardGame application. Set up and managed a 3-node Kubernetes cluster for scalable container orchestration. Integrated Nexus as an artifact repository and SonarQube for continuous code quality analysis. Implemented monitoring & alerting with Prometheus, Grafana, and exporters to ensure application reliability.',
    responsibilities:
      'CI/CD Pipeline, Kubernetes Cluster Setup, Artifact Management, and Monitoring & Alerting.'
  },
  {
    title: 'AWS DevOps Pipeline Project',
    duration: 'Jul 2024',
    company: 'Hoping Minds',
    description:
      'Created a production-grade CI/CD pipeline using AWS-native tools to automate web app deployment, optimizing scalability and operational efficiency. Integrated CodePipeline, CodeBuild, and CodeDeploy for seamless delivery to EC2 instances running httpd. Configured IAM, S3, and GitHub integration for secure source control and artifact management. Automated deployment using buildspec.yml and appspec.yml for consistent build, install, and validation workflows. Set up CloudWatch Logs for real-time monitoring and pipeline troubleshooting.',
    responsibilities:
      'AWS CI/CD Pipeline Creation, AWS Integration, Security & Source Control,Deployment Automation, and Monitoring & Troubleshooting.'
  }
];

function Projects() {
  return (
    <motion.section
      id="projects"
      className="container-fluid projects-section text-center my-5 py-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="section-title mb-5">Projects</h2>
      <div className="row justify-content-center px-3">
        {projectList.map((project, index) => (
          <motion.div
            key={index}
            className="col-sm-12 col-md-6 col-lg-4 mb-4 d-flex"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="project-card p-4 text-start w-100 bg-dark bg-opacity-75 border border-light-subtle rounded-4 shadow-lg">
              <h4 className="project-title text-info mb-2">{project.title}</h4>
              <p className="text-muted mb-1">
                <small>{project.company} • {project.duration}</small>
              </p>
              <p className="project-desc mb-2 text-light">{project.description}</p>
              <p className="project-responsibilities text-white-50">
                <strong>Responsibilities:</strong> {project.responsibilities}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;

import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import '../App.css';

const experiences = [
  {
    role: 'Cloud Computing Intern',
    company: 'Hoping Minds',
    duration: 'Jan 2024 - July 2024',
    description:
      'Utilized 20+ AWS services including EC2, ELB, ASG, ECS, EKS, Lambda, VPC, IAM, CloudFormation, and CloudWatch to build scalable cloud solutions. Deployed infrastructure using AWS CloudFormation and implemented CI/CD pipelines with AWS CodePipeline to automate build and deployment processes. Managed containerized workloads on ECS and EKS, increasing deployment efficiency by 35% and maintaining 99.99% application uptime. Configured IAM policies for secure access control, monitored resource performance with CloudWatch, and optimized cost through usage analysis. Gained practical experience in cloud networking, containerization, and serverless architectures within production-like environments.'
  }
];

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="experience-section section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container text-center">
        <h2 className="section-title mb-5">Experience</h2>
        <div className="row justify-content-center">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="col-md-5 mb-4"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 180 }}
            >
              <div className="experience-card p-4 h-100 text-start">
                <div className="icon-wrapper mb-3">
                  <FaBriefcase className="experience-icon" />
                </div>
                <h5 className="experience-role">{exp.role}</h5>
                <h6 className="experience-company">{exp.company}</h6>
                <p className="experience-duration">{exp.duration}</p>
                <p className="experience-desc">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

function Summary() {
  return (
    <motion.section
      id="summary"
      className="container summary-section text-center my-5 py-5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="section-title mb-4">Summary</h2>
      <p className="summary-text lead">
  Aspiring DevOps Engineer with 6 months of hands-on experience in cloud computing and automation, gained through an intensive internship at Hoping Minds. Skilled in deploying and managing scalable infrastructure using AWS services like <strong>EC2</strong>, <strong>S3</strong>, <strong>ECS</strong>, and <strong>EKS</strong>. Experienced in building <strong>CI/CD</strong> pipelines with <strong>CodePipeline</strong>, <strong>CodeBuild</strong>, and <strong>CodeDeploy</strong>, and automating infrastructure with <strong>Terraform</strong> and <strong>CloudFormation</strong>. Proficient with tools like <strong>Docker</strong>, <strong>Jenkins</strong>, <strong>Prometheus</strong>, and <strong>Grafana</strong>, and certified as an <strong>AWS Educate Getting Started with Networking & Storage Certifications</strong>. Passionate about solving real-world problems through cloud solutions and continuous learning.
</p>
      {/* <p className="summary-text lead">
  Aspiring DevOps Engineer with 6 months of hands-on experience in cloud computing and automation, gained through an intensive internship at Hoping Minds. Skilled in deploying and managing scalable infrastructure using AWS services like <strong>EC2</strong>, <strong>S3</strong>, <strong>ECS</strong>, and <strong>EKS</strong>. Experienced in building <strong>CI/CD</strong> pipelines with <strong>CodePipeline</strong>, <strong>CodeBuild</strong>, and <strong>CodeDeploy</strong>, and automating infrastructure with <strong>Terraform</strong> and <strong>CloudFormation</strong>. Proficient with tools like <strong>Docker</strong>, <strong>Jenkins</strong>, <strong>Prometheus</strong>, and <strong>Grafana</strong>, and certified as an <strong>AWS Solutions Architect Associate</strong>. Passionate about solving real-world problems through cloud solutions and continuous learning.
</p> */}

    </motion.section>
  );
}

export default Summary;

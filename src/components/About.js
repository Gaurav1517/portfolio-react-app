import React from 'react';
import '../App.css';
import profileImg from '../assets/Avi.jpg';

function About() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-primary">About Me</h2>

        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <img
              src={profileImg}
              alt="Profile"
              className="rounded-circle shadow"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card shadow p-4 border-0 bg-white bg-opacity-75">
              <h4 className="text-dark mb-3">Cloud & DevOps Engineer</h4>
              <p className="text-muted">
  I’m passionate and motivated <strong>DevOps</strong> and <strong>Cloud</strong> enthusiast with 6 months of hands-on experience gained during my internship at <strong>Hoping Minds</strong>. During this time, I worked extensively with over 20 <strong>AWS</strong> services including <strong>EC2</strong>, <strong>S3</strong>, <strong>IAM</strong>, <strong>ECS</strong>, <strong>EKS</strong>, and <strong>CloudWatch</strong>, building a strong foundation in cloud infrastructure.
              </p>
              <p className="text-muted">
  I’ve designed and implemented <strong>CI/CD</strong> pipelines using <strong>AWS CodePipeline</strong>, <strong>CodeBuild</strong>, and <strong>CodeDeploy</strong>, and automated infrastructure provisioning using tools like <strong>Terraform</strong> and <strong>CloudFormation</strong>.
              </p>
              <p className="text-muted">
  My skill set also includes <strong>Docker</strong>, <strong>Jenkins</strong>, <strong>Prometheus</strong>, and <strong>Grafana</strong>, which I’ve used to containerize applications, streamline deployments, and monitor infrastructure effectively.
              </p>
              <p className="text-muted mb-0">
  I hold the <strong>AWS Educate Getting Started with Networking & Storage </strong> certification and enjoy solving real-world problems through scalable cloud solutions and automation. I’m actively seeking a full-time opportunity to grow as a <strong>DevOps Engineer</strong> and contribute to impactful projects.
              </p>
              {/* <p className="text-muted mb-0">
  I hold the <strong>AWS Certified Solutions Architect – Associate</strong> certification and enjoy solving real-world problems through scalable cloud solutions and automation. I’m actively seeking a full-time opportunity to grow as a <strong>DevOps Engineer</strong> and contribute to impactful projects.
              </p> */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

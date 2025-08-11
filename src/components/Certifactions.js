import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import '../App.css';

const certifications = [
  // {
  //   title: "AWS Certified Solutions Architect – Associate",
  //   issuer: "Amazon Web Services Training and Certification",
  //   year: "2025",
  //   description:
  //     "Earners of this certification have a comprehensive understanding of AWS services and technologies. They demonstrated the ability to build secure and robust solutions using architectural design principles based on customer requirements. Badge owners are able to strategically design well-architected distributed systems that are scalable, resilient, efficient, and fault-tolerant."
  // },
  {
    title: "AWS Educate Getting Started with Networking",
    issuer: "Amazon Web Services Training and Certification",
    year: "2025",
    description:
      "Earners of this badge have completed the Getting Started with Networking training and achieved the required scores on the post-course assessment. They have demonstrated the ability to describe different ways to manage a network and how to use an Amazon VPC to do so."
  },
  {
    title: "AWS Educate Getting Started with Storage",
    issuer: "Amazon Web Services Training and Certification",
    year: "2025",
    description:
      "Earners of this badge have completed the Getting Started with Storage training and achieved the required scores on the post-course assessment. They have demonstrated the ability to describe storage solutions and use Amazon S3 to store and retrieve objects"
  }
];

function Certification() {
  return (
    <motion.section
      id="certification"
      className="container certification-section text-center my-5 py-5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="section-title mb-5">Certifications</h2>
      <div className="row justify-content-center">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="col-md-4 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="cert-card p-4 text-start h-100">
              <h5 className="fw-bold d-flex align-items-center">
                <FaCertificate className="me-2 text-info cert-icon" />
                {cert.title}
              </h5>
              <h6 className="text-light fst-italic">{cert.issuer}</h6>
              <p className="mb-1">
                <small className="text-muted fst-italic">{cert.year}</small>
              </p>
              <p className="cert-desc mt-2">{cert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Certification;
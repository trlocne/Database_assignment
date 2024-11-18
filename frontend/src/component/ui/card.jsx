// src/components/ui/card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css'; // Đảm bảo rằng bạn đã tạo và cấu hình tệp CSS

const Card = ({ children, className }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};

// Định nghĩa các kiểu dữ liệu đầu vào cho các thành phần
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { Card, CardContent };

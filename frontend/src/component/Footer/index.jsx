import React from 'react';
import './index.css'; // Tạo file CSS riêng để dễ chỉnh style

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>HCMUT-Course</h3>
          <p>Bài tập lớn Môn học Database của nhóm DaddyKool kỳ H241. Trường đại học Bách Khoa, Đại học Quốc Gia TP. Hồ Chí Minh</p>
        </div>
        
        <div className="footer-section help">
          <h3>GET HELP</h3>
          <ul>
            <li>Contact Us</li>
            <li>Latest Articles</li>
            <li>FAQ</li>
          </ul>
        </div>
        
        <div className="footer-section programs">
          <h3>PROGRAMS</h3>
          <ul>
            <li>Art & Design</li>
            <li>Business</li>
            <li>IT & Software</li>
            <li>Languages</li>
            <li>Programming</li>
          </ul>
        </div>
        
        <div className="footer-section contact">
          <h3>CONTACT US</h3>
          <p>Address: Khu phố Tân Lập, Phường Đông Hòa, TP. Dĩ An, Tỉnh Bình Dương</p>
          <p>Tel: +84 (4) 123 456</p>
          <p>Email: mail@hcmut.edu.vn</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 HCMUT-Course | Powered by DaddyKool</p>
      </div>
    </footer>
  );
}

export default Footer;

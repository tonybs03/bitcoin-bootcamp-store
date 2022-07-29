import React from 'react';
import './Footer.css';
import { FaGithubAlt } from 'react-icons/fa';

function Footer() {
  return (
    <div class='footermain'>
      <div class='footerbody'>
        <div class='footer-a'>
          Desgined and Coded by Jordan, Kevin and Tony
        </div>
        <div class='footer-b'>
          2022@JKT
        </div>
        <div class='footer-c'>
          <div class='githubs'>
            <p>Jordan Pletzer: </p>
            <a href='https://github.com/pletzjd' target='blank' class='github'>
              <FaGithubAlt className='giticon' />
            </a>
          </div>
          <div class='githubs'>
            <p>Kevin Lee: </p>
            <a href='https://github.com/kevinleekwlee' target='blank' class='github'>
              <FaGithubAlt className='giticon'/>
            </a>
          </div>
          <div class='githubs'>
            <p>Tony Fan: </p>
            <a href='https://github.com/tonybs03' target='blank' class='github'>
              <FaGithubAlt className='giticon'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

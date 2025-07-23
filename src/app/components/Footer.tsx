import styles from './Footer.module.scss'
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className={styles.footer}>
     <div className={styles.footerContainer}>
    {/* Logo & About */}
    <div className={styles.footerSectionL}>
      <div className={styles.footerLogoAll}>
        <Image src="/images/logo.svg" alt='' width={40} height={40}  className={styles.logo} />
        <div className={styles.footerLogo}>
          <Image src='/images/Vector3.png'alt=''width={89} height={22}></Image>
          <Image src='/images/Layer_x0020_6.png'alt=''width={66} height={6}></Image>
        </div>
      </div>
      <p className={styles.tagline}>© 2024 Tentai – Find it. Choose. Make life more convenient.</p>
    </div>

    {/* Documents */}
    <div className={styles.footerSection}>
      <h4 className={styles.sectionTitle}>Documents</h4>
      <ul>
        <li>Privacy Policy</li>
        <li>User agreement</li>
        <li>More documents</li>
      </ul>
    </div>

    {/* Contacts */}
    <div className={styles.footerSectionC}>
      <h4 className={styles.sectionTitleC}>Contacts</h4>
      <p className={styles.sectionTitleC_title}><Image alt='' width={24} height={24} src="/images/email.svg" /> example@mail.com</p>
      <p className={styles.sectionTitleC_title}><Image alt='' width={20} height={20} src="/images/Icon (Stroke).svg" /> +66123456789</p>
      <div className={styles.socials}>
        <Image alt='' width={16} height={16} src="/images/Group 15.svg" />
        <Image alt='' width={8} height={16} src="/images/ELEMENTS.svg" />
        <Image alt='' width={14} height={12} src="/images/Vector1.svg" />
        <Image alt='' width={18} height={12} src="/images/Vector2.svg" />
        <Image alt='' width={17} height={16} src="/images/Group 7.svg" />
      </div>
    </div>

    {/* Download */}
    <div className={styles.footerSectionD}>
      <h4 className={styles.sectionTitleD}>Download Tentai App</h4>
      <div className={styles.apps}>
        <Image alt='' width={18} height={22} src="/images/Apple logo.svg" />
     <Image alt='' width={18} height={20} src="/images/Google Play logo.svg" />
       <Image alt='' width={21} height={20} src="/images/App Gallery icon.svg" />
      </div>
    </div>

    {/* Language */}
    <div className={styles.footerSection}>
      <select className={styles.languageSelect}>
        <option>English</option>
        <option>Українська</option>
      </select>
    </div>
  </div>
    </footer>
  );
};

export default Footer;

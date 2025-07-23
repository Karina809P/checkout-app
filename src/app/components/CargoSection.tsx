import Image from 'next/image';
import ForwardingService from './ForwardingService';
import styles from '../checkout/page.module.scss';

interface CargoSectionProps {
  weight: number;
  setWeight: (w: number) => void;

  cargoType: string;
  setCargoType: (t: string) => void;

  sizeL: string;
  sizeW: string;
  sizeH: string;
  setSizeL: (v: string) => void;
  setSizeW: (v: string) => void;
  setSizeH: (v: string) => void;

  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
}

export default function CargoSection({
  weight,
  setWeight,
  cargoType,
  setCargoType,
  sizeL,
  sizeW,
  sizeH,
  setSizeL,
  setSizeW,
  setSizeH,
  date,
  setDate,
  time,
  setTime,
}: CargoSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.section_title}>
        <Image src="/images/Vector.png" alt="" width={9} height={16} />
        <h2>About the cargo</h2>
      </div>

      {/* Date */}
      <div className={styles.section_data}>
  <div className={styles.section_data_content}>
    <h3 className={styles.section_data_title}>Date of upload</h3>
    <Image src="/images/asterisk.png" alt="" width={8} height={8} />
  </div>
  <div className={styles.input_all}>
    <Image
      className={styles.input_logo}
      src="/images/calendar-06.svg"  
      alt=""
      width={20}
      height={20}
    />
    <input
      className={styles.section_data_input}
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      placeholder="Select date..."
    />
  </div>
</div>


      {/* Time */}
      <div className={styles.section_time}>
        <div className={styles.section_time_content}>
          <h3 className={styles.section_time_title}>Time of arrival</h3>
          <Image src="/images/asterisk.png" alt="" width={8} height={8} />
        </div>
        <input
          className={styles.section_time_input}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Enter hour"
        />
      </div>

      {/* Weight */}
      <div>
        <div className={styles.section_weight}>
          <h3 className={styles.section_weight_title}>Cargo weight (kg)</h3>
        </div>
        <input
          className={styles.section_weight_input}
          type="number"
          placeholder="Enter weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </div>

      {/* Type */}
      <div>
        <div className={styles.section_type}>
          <h3 className={styles.section_type_title}>Type of cargo</h3>
        </div>
        <input
          className={styles.section_type_input}
          placeholder="Enter cargo type"
          value={cargoType}
          onChange={(e) => setCargoType(e.target.value)}
        />
      </div>

      {/* Size */}
      <div>
        <div className={styles.section_size}>
          <h3 className={styles.section_size_title}>Cargo size of the LWH (m)</h3>
        </div>
        <div className={styles.section_group_input}>
          <input
            className={styles.section_size_input}
            placeholder="Length"
            value={sizeL}
            onChange={(e) => setSizeL(e.target.value)}
          />
          <span>x</span>
          <input
            className={styles.section_size_input}
            placeholder="Width"
            value={sizeW}
            onChange={(e) => setSizeW(e.target.value)}
          />
          <span>x</span>
          <input
            className={styles.section_size_input}
            placeholder="Height"
            value={sizeH}
            onChange={(e) => setSizeH(e.target.value)}
          />
          <select className={styles.section_cm_input} defaultValue="m">
            <option value="cm">cm</option>
            <option value="m">m</option>
          </select>
        </div>
      </div>

      <ForwardingService />
    </section>
  );
}

'use client';

import Image from 'next/image';
import styles from '../checkout/page.module.scss';

interface Point {
  label: string;
  type: 'Download location' | 'Place of unloading' | 'Additional point';
  location: string;
  time: string;
}

interface RouteFormProps {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
}

export default function RouteForm({ points, setPoints }: RouteFormProps) {
  const addPoint = () => {
    const label = `Point ${String.fromCharCode(65 + points.length)}`;
    setPoints([
      ...points,
      { type: 'Additional point', label, location: '', time: '' },
    ]);
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  return (
    <section className={styles.section}>
      <div className={styles.title_all}>
        <Image src="/images/Vector.png" alt="" width={9} height={16} />
        <h2 className={styles.title}>Route</h2>
      </div>

      {points.map((point, index) => (
        <div className={styles.formGroup} key={index}>
          <div className={styles.formGroup_AddPoint}>
            <h3 className={styles.formGroup_title}>{point.type}</h3>
            {point.type === 'Additional point' && (
              <Image
                src='/images/trash-01.svg'
                alt='delete'
                width={24}
                height={24}
                onClick={() => removePoint(index)}
                style={{ cursor: 'pointer' }}
              />
            )}
          </div>

          <div className={styles.formRow_all}>
            <div className={styles.formRow}>
              <div className={styles.formRow_title_all}>
                <h3 className={styles.formRow_title}>{point.label}</h3>
                <Image src='/images/asterisk.png' alt="" width={8} height={8} />
              </div>
              <div className={styles.input_all}>
                <input
                  className={styles.input}
                  placeholder="Thailand, Phuket, Rat Burana.."
                  value={point.location}
                  onChange={(e) => {
                    const updated = [...points];
                    updated[index].location = e.target.value;
                    setPoints(updated);
                  }}
                />
                <Image
                  className={styles.input_logo}
                  src='/images/Vector.svg'
                  alt='map'
                  width={16}
                  height={14}
                />
              </div>
            </div>

            <div className={styles.block_all}>
              <div className={styles.block}>
                <h3 className={styles.block_title_hour}>Operating time (hour)</h3>
                <Image src='/images/asterisk.png' alt="" width={8} height={8} />
              </div>
              <input
                className={styles.block_input}
                placeholder="Enter hour"
                value={point.time}
                onChange={(e) => {
                  const updated = [...points];
                  updated[index].time = e.target.value;
                  setPoints(updated);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button className={styles.addPoint} onClick={addPoint}>+ Add another point</button>
    </section>
  );
}

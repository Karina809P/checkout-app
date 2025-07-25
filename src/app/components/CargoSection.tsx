"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ForwardingService from "./ForwardingService";
import styles from "../checkout/page.module.scss";
import { Point } from "@/types/point";

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

  sizeUnit: "m" | "cm";
  setSizeUnit: (unit: "m" | "cm") => void;

  date: string;
  setDate: (v: string) => void;
  time: string;
  setTime: (v: string) => void;

  forwardingEnabled: boolean;
  setForwardingEnabled: (enabled: boolean) => void;

  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
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
  sizeUnit,
  setSizeUnit,
  date,
  setDate,
  time,
  setTime,
  forwardingEnabled,
  setForwardingEnabled,
  setPoints,
}: CargoSectionProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Відкриття календаря
  const openDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  // Оновлення стану після монтування (зчитування з localStorage)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWeight = localStorage.getItem("weight");
      if (storedWeight) setWeight(Number(storedWeight));

      const storedCargoType = localStorage.getItem("cargoType");
      if (storedCargoType) setCargoType(storedCargoType);

      const storedSizeL = localStorage.getItem("sizeL");
      if (storedSizeL) setSizeL(storedSizeL);

      const storedSizeW = localStorage.getItem("sizeW");
      if (storedSizeW) setSizeW(storedSizeW);

      const storedSizeH = localStorage.getItem("sizeH");
      if (storedSizeH) setSizeH(storedSizeH);

      const storedSizeUnit = localStorage.getItem("sizeUnit") as "m" | "cm" | null;
      if (storedSizeUnit === "m" || storedSizeUnit === "cm") setSizeUnit(storedSizeUnit);

      const storedDate = localStorage.getItem("date");
      if (storedDate) setDate(storedDate);

      const storedTime = localStorage.getItem("time");
      if (storedTime) setTime(storedTime);

      const storedForwarding = localStorage.getItem("forwardingEnabled");
      if (storedForwarding) setForwardingEnabled(JSON.parse(storedForwarding));
    }
  }, [
    setWeight,
    setCargoType,
    setSizeL,
    setSizeW,
    setSizeH,
    setSizeUnit,
    setDate,
    setTime,
    setForwardingEnabled,
  ]);

  // Збереження до localStorage при оновленні значень
  useEffect(() => {
    localStorage.setItem("weight", weight.toString());
  }, [weight]);

  useEffect(() => {
    localStorage.setItem("cargoType", cargoType);
  }, [cargoType]);

  useEffect(() => {
    localStorage.setItem("sizeL", sizeL);
  }, [sizeL]);

  useEffect(() => {
    localStorage.setItem("sizeW", sizeW);
  }, [sizeW]);

  useEffect(() => {
    localStorage.setItem("sizeH", sizeH);
  }, [sizeH]);

  useEffect(() => {
    localStorage.setItem("sizeUnit", sizeUnit);
  }, [sizeUnit]);

  useEffect(() => {
    localStorage.setItem("date", date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem("time", time);
  }, [time]);

  useEffect(() => {
    localStorage.setItem("forwardingEnabled", JSON.stringify(forwardingEnabled));
  }, [forwardingEnabled]);

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
        <div className={styles.input_all} style={{ position: "relative" }}>
          <Image
            className={styles.input_logo}
            src="/images/calendar-06.svg"
            alt="calendar"
            width={20}
            height={20}
            onClick={openDatePicker}
            style={{ cursor: "pointer", position: "absolute", right: 35, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            ref={dateInputRef}
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
          onChange={(e) => {
            const newTime = e.target.value;
            setTime(newTime);
            setPoints((prevPoints) => {
              const updatedPoints = [...prevPoints];
              if (updatedPoints.length > 0) {
                updatedPoints[0] = { ...updatedPoints[0], time: newTime };
              }
              return updatedPoints;
            });
          }}
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
          value={weight === 0 ? "" : weight}
          onFocus={(e) => {
            if (e.currentTarget.value === "0") e.currentTarget.value = "";
          }}
          onChange={(e) => setWeight(Number(e.target.value))}
          onBlur={(e) => {
            if (e.currentTarget.value === "") setWeight(0);
          }}
          min={0}
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
          onChange={(e) => setCargoType(e.target.value.trimStart())}
        />
      </div>

      {/* Size */}
      <div>
        <div className={styles.section_size}>
          <h3 className={styles.section_size_title}>
            Cargo size of the LWH ({sizeUnit})
          </h3>
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
          <select
            className={styles.section_cm_input}
            value={sizeUnit}
            onChange={(e) => setSizeUnit(e.target.value as "m" | "cm")}
          >
            <option value="cm">cm</option>
            <option value="m">m</option>
          </select>
        </div>
      </div>

      {/* Forwarding Service */}
      <ForwardingService
        enabled={forwardingEnabled}
        onToggle={() => setForwardingEnabled(!forwardingEnabled)}
      />
    </section>
  );
}

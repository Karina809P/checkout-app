"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import Image from "next/image";
import styles from "./page.module.scss";
import ContactInfoSection from "../components/ContactInfoSection";
import OrderSidebar from "../components/OrderSidebar";
import RouteForm from "../components/RouteForm";
import CargoSection from "../components/CargoSection";
import CommentInput from "../components/CommentInput";
import { Point } from "@/types/point";

const loadingPrice = 500;
const forwardingPrice = 250;
const commission = 35;
const pricePerKg = 20;

export default function CheckoutPage() {
  // 1. Ініціалізація станів з дефолтними значеннями (без localStorage)
  const [points, setPoints] = useState<Point[]>([
    { type: "Download location", label: "Point A", location: "", operatingTime: "" },
    { type: "Place of unloading", label: "Point B", location: "", operatingTime: "" },
  ]);

  const [cost, setCost] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [operatingCost, setOperatingCost] = useState<number>(0);

  const [weight, setWeight] = useState<number>(0);
  const [cargoType, setCargoType] = useState<string>("");
  const [sizeL, setSizeL] = useState<string>("");
  const [sizeW, setSizeW] = useState<string>("");
  const [sizeH, setSizeH] = useState<string>("");
  const [sizeUnit, setSizeUnit] = useState<"m" | "cm">("m");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  const [forwardingEnabled, setForwardingEnabled] = useState(false);

  // 2. Після монтування компонента завантажуємо значення з localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedPoints = localStorage.getItem("points");
    if (storedPoints) setPoints(JSON.parse(storedPoints));

    const storedWeight = localStorage.getItem("weight");
    if (storedWeight) setWeight(Number(storedWeight));

    const storedCargoType = localStorage.getItem("cargoType");
    if (storedCargoType) setCargoType(storedCargoType);

    setSizeL(localStorage.getItem("sizeL") || "");
    setSizeW(localStorage.getItem("sizeW") || "");
    setSizeH(localStorage.getItem("sizeH") || "");
    setSizeUnit((localStorage.getItem("sizeUnit") as "m" | "cm") || "m");

    setDate(localStorage.getItem("date") || "");
    setTime(localStorage.getItem("time") || "");
    setComment(localStorage.getItem("comment") || "");

    const storedForwarding = localStorage.getItem("forwardingEnabled");
    if (storedForwarding) setForwardingEnabled(JSON.parse(storedForwarding));
  }, []);

  // 3. Збереження станів у localStorage при оновленні
  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
  }, [points]);

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
    localStorage.setItem("comment", comment);
  }, [comment]);

  useEffect(() => {
    localStorage.setItem("forwardingEnabled", JSON.stringify(forwardingEnabled));
  }, [forwardingEnabled]);

  // Валідація форми
  const isFormValid =
    points[0].location.trim() !== "" &&
    points[1].location.trim() !== "" &&
    date.trim() !== "" &&
    time.trim() !== "" &&
    cargoType.trim() !== "" &&
    points.every((p) => (p.operatingTime ?? "").trim() !== "");

  // Обчислення загальної вартості
  const handleSetCalculatedCost = (baseCost: number) => {
    const forwardingCost = forwardingEnabled ? forwardingPrice : 0;
    const totalCost =
      baseCost + loadingPrice + forwardingCost + commission + weight * pricePerKg;
    setCost(totalCost);
  };

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>Checkout</h1>
      <ThemeToggle />
      <div className={styles.layout}>
        <div className={styles.left}>
          <RouteForm
            points={points}
            setPoints={setPoints}
            setCalculatedCost={handleSetCalculatedCost}
            setDistance={setDistance}
            setOperatingCost={setOperatingCost}
            forwardingEnabled={forwardingEnabled}
          />

          {cost !== null && (
            <p className={styles.result_text}>Загальна вартість: {cost.toFixed(2)} THB</p>
          )}

          <CargoSection
            weight={weight}
            setWeight={setWeight}
            cargoType={cargoType}
            setCargoType={setCargoType}
            sizeL={sizeL}
            sizeW={sizeW}
            sizeH={sizeH}
            setSizeL={setSizeL}
            setSizeW={setSizeW}
            setSizeH={setSizeH}
            sizeUnit={sizeUnit}
            setSizeUnit={setSizeUnit}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            forwardingEnabled={forwardingEnabled}
            setForwardingEnabled={setForwardingEnabled}
            setPoints={setPoints}
          />

          <CommentInput comment={comment} setComment={setComment} />
          <ContactInfoSection />

          <section className={styles.payment_all}>
            <div className={styles.payment}>
              <Image src="/images/Vector.png" alt="" width={9} height={16} />
              <h2 className={styles.payment_title}>Payment</h2>
            </div>
            <div className={styles.payment_content}>
              <Image src="/images/wallet-01.svg" alt="" width={24} height={24} />
              <p className={styles.payment_content_title}>Payment on receipt</p>
            </div>
            <p className={styles.payment_text}>
              Avoid online transactions and pay only when you receive your order. This guarantees
              financial security and avoids risks associated with electronic payments.
            </p>
          </section>
        </div>

        <OrderSidebar
          isFormValid={isFormValid}
          calculatedPrice={cost ?? undefined}
          distance={distance}
          points={points.map((p) => ({
            label: p.label,
            location: p.location,
          }))}
          time={time}
          forwardingEnabled={forwardingEnabled}
          weight={weight}
          operatingCost={operatingCost}
        />
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import ContactInfoSection from "../components/ContactInfoSection";
import OrderSidebar from "../components/OrderSidebar";
import RouteForm from "../components/RouteForm";
import Image from "next/image";
import CargoSection from "../components/CargoSection";
import CommentInput from "../components/CommentInput";
import { geocodeAddress, getRouteDistance } from "@/lib/orsApi";

interface Point {
  label: string;
  type: "Download location" | "Place of unloading" | "Additional point";
  location: string;
  time: string;
}

const loadingPrice = 500;
const forwardingPrice = 250;
const commission = 35;
const pricePerKm = 10; // THB за км
const pricePerKg = 20; // THB за кг

const CheckoutPage = () => {
  const [points, setPoints] = useState<Point[]>([
    { type: "Download location", label: "Point A", location: "", time: "" },
    { type: "Place of unloading", label: "Point B", location: "", time: "" },
  ]);

  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [cost, setCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [weight, setWeight] = useState<number>(0);
  const [cargoType, setCargoType] = useState<string>("");
  const [sizeL, setSizeL] = useState<string>("");
  const [sizeW, setSizeW] = useState<string>("");
  const [sizeH, setSizeH] = useState<string>("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
   const [comment, setComment] = useState("");

  const isFormValid =
    points[0].location.trim() !== "" &&
    points[1].location.trim() !== "" &&
    date.trim() !== "" &&
    time.trim() !== "" &&
    cargoType.trim() !== "";

  const calculateDistance = async () => {
    const pointLocations = points.map((p) => p.location.trim()).filter(Boolean);

    if (pointLocations.length < 2) {
      alert("Введіть принаймні дві точки маршруту");
      return;
    }

    setLoading(true);

    try {
      
      const coords: [number, number][] = [];
      for (const loc of pointLocations) {
        const coord = await geocodeAddress(loc);
        if (!coord) {
          alert(`Не вдалося знайти адресу: ${loc}`);
          setLoading(false);
          return;
        }
        coords.push(coord);
      }

     
      const distKm = await getRouteDistance(coords);
      setDistanceKm(distKm);

      
      const totalCost =
        distKm * pricePerKm +
        loadingPrice +
        forwardingPrice +
        commission +
        weight * pricePerKg;

      setCost(totalCost);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Помилка при розрахунку: " + error.message);
      } else {
        alert("Помилка при розрахунку: " + String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.layout}>
        <div className={styles.left}>
          <RouteForm points={points} setPoints={setPoints} />

          <button
            onClick={calculateDistance}
            className={styles.calculate_button}
            disabled={loading}
            style={{ margin: "15px 0", padding: "10px", width: "100%" }}
          >
            {loading ? "Calculation..." : "Calculate the cost of delivery"}
          </button>

          {distanceKm !== null && <p>Відстань: {distanceKm.toFixed(2)} км</p>}
          {cost !== null && <p>Загальна вартість: {cost.toFixed(2)} THB</p>}

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
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
          />

          <CommentInput comment={comment} setComment={setComment} />
          <ContactInfoSection />


          {/* Payment section під ContactInfoSection */}
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
               Avoid online transactions and pay only when you receive your order. This will guarantee
              your financial security and avoid any risks associated with electronic payments.
            </p>
          </section>
        </div>

       
        <OrderSidebar isFormValid={isFormValid} calculatedPrice={cost ?? undefined} />
      </div>
    </div>
  );
};

export default CheckoutPage;

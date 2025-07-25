"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../checkout/page.module.scss";
import dynamic from "next/dynamic";
import { geocodeAddress, reverseGeocode } from "@/lib/orsApi";
import { Point } from "@/types/point";

const MapModal = dynamic(() => import("./MapModal"), { ssr: false });

interface RouteFormProps {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  setCalculatedCost: (cost: number) => void;
  setDistance: (distance: number) => void;
  setOperatingCost: (cost: number) => void; // ✅ ДОДАНО
  forwardingEnabled: boolean;
}

const tariffPerKm = 10;
const servicePrice = 500;
const forwardingPrice = 250;
const productPrice = 6300;
const commission = 35;
const pricePerHour = 100;

function haversineDistance(coords1: [number, number], coords2: [number, number]): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getTotalDistance(coords: [number, number][]): number {
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    total += haversineDistance(coords[i], coords[i + 1]);
  }
  return total;
}

export default function RouteForm({
  points,
  setPoints,
  setCalculatedCost,
  setDistance,
  setOperatingCost, // ✅ ДОДАНО
  forwardingEnabled,
}: RouteFormProps) {
  const [loading, setLoading] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([13.736717, 100.523186]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addPoint = () => {
    const label = `Point ${String.fromCharCode(65 + points.length)}`;
    setPoints([...points, { type: "Additional point", label, location: "", operatingTime: "" }]);
  };

  const removePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const calculateDistance = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const coordinates: [number, number][] = [];

      for (const point of points) {
        if (point.location.trim() !== "" && !(point.operatingTime?.trim())) {
          setErrorMessage(`Вкажіть час для точки: ${point.label}`);
          setLoading(false);
          return;
        }

        const loc = point.location.trim();
        if (!loc) continue;

        const coordMatch = loc.match(/^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/);
        let coord: [number, number] | null = null;

        if (coordMatch) {
          const [lat, lng] = loc.split(",").map(Number);
          coord = [lat, lng];
        } else {
          coord = await geocodeAddress(loc);
        }

        if (!coord) {
          setErrorMessage(`Не вдалося знайти адресу або координати: ${point.location}`);
          setLoading(false);
          return;
        }

        coordinates.push(coord);
      }

      if (coordinates.length < 2) {
        setErrorMessage("Потрібно щонайменше 2 точки маршруту");
        setLoading(false);
        return;
      }

      const distance = getTotalDistance(coordinates);
      setDistance(distance);

      const deliveryCost = distance * tariffPerKm;
      const totalHours = points.reduce(
        (sum, p) => sum + (parseFloat(p.operatingTime ?? "0") || 0),
        0
      );

      const operatingCost = totalHours * pricePerHour;
      setOperatingCost(operatingCost); // ✅ передаємо в CheckoutPage

      const forwardingCost = forwardingEnabled ? forwardingPrice : 0;

      const total =
        deliveryCost + servicePrice + forwardingCost + productPrice + commission + operatingCost;

      setCalculatedCost(total);
    } catch (err) {
      setErrorMessage("Не вдалося розрахувати відстань. Перевірте правильність адрес.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (points.length >= 2) {
      calculateDistance();
    } else {
      setCalculatedCost(0);
      setOperatingCost(0); // ❗️скидаємо вартість при недостатній кількості точок
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, forwardingEnabled]);

  const openMapModal = async (index: number) => {
    const location = points[index].location.trim();
    const coords = location ? await geocodeAddress(location) : null;
    setMapCenter(coords ?? [13.736717, 100.523186]);
    setActivePointIndex(index);
    setMapModalOpen(true);
  };

  const onConfirmMapLocation = async (coords: [number, number]) => {
    if (activePointIndex === null) return;
    const address = await reverseGeocode(coords);

    const newPoints = [...points];
    newPoints[activePointIndex].location =
      address ?? `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`;
    setPoints(newPoints);

    setMapModalOpen(false);
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
            {point.type === "Additional point" && (
              <Image
                src="/images/trash-01.svg"
                alt="delete"
                width={24}
                height={24}
                onClick={() => removePoint(index)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>

          <div className={styles.formRow_all}>
            <div className={styles.formRow}>
              <div className={styles.formRow_title_all}>
                <h3 className={styles.formRow_title}>{point.label}</h3>
                <Image src="/images/asterisk.png" alt="" width={8} height={8} />
              </div>
              <div className={styles.input_all} style={{ position: "relative" }}>
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
                  src="/images/Vector.svg"
                  alt="map"
                  width={16}
                  height={14}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => openMapModal(index)}
                />
              </div>
            </div>

            <div className={styles.block_all}>
              <div className={styles.block}>
                <h3 className={styles.block_title_hour}>Operating time (hour)</h3>
                <Image src="/images/asterisk.png" alt="" width={8} height={8} />
              </div>
              <input
                className={styles.block_input}
                placeholder="Enter hour"
                value={point.operatingTime ?? ""}
                onChange={(e) => {
                  const updated = [...points];
                  updated[index].operatingTime = e.target.value;
                  setPoints(updated);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button className={styles.addPoint} onClick={addPoint}>
        + Add another point
      </button>

      {errorMessage && (
        <div
          style={{
            color: "red",
            marginTop: "10px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}

      <MapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        initialCenter={mapCenter}
        onConfirm={onConfirmMapLocation}
      />
    </section>
  );
}

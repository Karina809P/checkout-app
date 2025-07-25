"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "../checkout/page.module.scss";

interface Point {
  label: string;
  location: string;
}

interface OrderSidebarProps {
  isFormValid: boolean;
  calculatedPrice?: number; // Ціна за відстань
  distance?: number;        // Відстань між точками
  points: Point[];
  time: string;             // Час (із CargoSection)
  forwardingEnabled: boolean;
  weight: number;
  operatingCost: number;    // ✅ новий пропс
}

export default function OrderSidebar({
  isFormValid,
  calculatedPrice,
  distance,
  points,
  time,
  forwardingEnabled,
  weight,
  operatingCost,
}: OrderSidebarProps) {
  const [customPriceEnabled, setCustomPriceEnabled] = useState(false);
  const [customPrice, setCustomPrice] = useState("");

  const servicePrice = 500;
  const forwardingPrice = 250;
  const productPrice = 6300;
  const commission = 35;
  const pricePerKg = 20;

  const forwardingCost = forwardingEnabled ? forwardingPrice : 0;
  const weightCost = weight * pricePerKg;

  const totalWithoutCustomPrice =
    servicePrice +
    forwardingCost +
    productPrice +
    commission +
    (calculatedPrice ?? 0) +
    weightCost +
    operatingCost;

  const isCustomPriceValid =
    !customPriceEnabled || (customPrice.trim() !== "" && parseFloat(customPrice) > 0);

  const isOrderButtonActive = isFormValid && isCustomPriceValid;

  const totalToShow =
    customPriceEnabled && isCustomPriceValid
      ? parseFloat(customPrice)
      : totalWithoutCustomPrice;

  return (
    <div className={styles.summary}>
      <div className={styles.summary_title_all}>
        <Image src="/images/Vector.png" alt="" width={9} height={16} />
        <h2 className={styles.summary_title}>Order</h2>
      </div>

      <div className={styles.orderInfo}>
        <div className={styles.orderInfo_top}>
          <div className={styles.orderInfo_top_card}>
            <div className={styles.orderInfo_card_photo}>
              <Image
                className={styles.orderInfo_card_photo_top}
                src="/images/TOP.png"
                alt=""
                width={67}
                height={26}
              />
              <Image
                className={styles.orderInfo_card_photo_main}
                src="/images/image.png"
                alt=""
                width={166}
                height={126}
              />
            </div>
            <div className={styles.orderInfo_card_text}>
              <h3 className={styles.orderInfo_card_title}>
                Ecological cleaning and maintenance services for home
              </h3>
              <p className={styles.orderInfo_card_prise}>{productPrice} THB</p>
              <div className={styles.orderInfo_card_info}>
                <Image src="/images/location.svg" alt="" width={17} height={22} />
                <p className={styles.orderInfo_card_local}>Bangkok</p>
                <span>•</span>
                <Image src="/images/bles.svg" alt="" width={12} height={14} />
                <p className={styles.orderInfo_card_span}>5.0</p>
              </div>
            </div>
          </div>

          <div className={styles.orderInfo_way}>
            {points.map((point, index) => (
              <div key={index}>
                <h3 className={styles.orderInfo_way_title}>{point.label}</h3>
                <p>{point.location || "—"}, {index === 0 ? time || "—" : "—"}</p>
              </div>
            ))}
          </div>

          {distance !== undefined && (
            <p className={styles.orderInfo_distance}>
              Distance between points: {distance.toFixed(2)} km
            </p>
          )}
        </div>

        <div className={styles.orderInfo_prise}>
          <div className={styles.orderInfo_prise_about}>
            <p className={styles.orderInfo_prise_title}>Loading and unloading route</p>
            <p className={styles.orderInfo_prise_money}>{servicePrice} THB</p>
          </div>
          <div className={styles.orderInfo_prise_about}>
            <p className={styles.orderInfo_prise_title}>Forwarding services</p>
            <p className={styles.orderInfo_prise_money}>{forwardingCost} THB</p>
          </div>
          <div className={styles.orderInfo_prise_about}>
            <p className={styles.orderInfo_prise_title}>Payment</p>
            <p className={styles.orderInfo_prise_money}>{productPrice} THB</p>
          </div>
          <div className={styles.orderInfo_prise_about}>
            <p className={styles.orderInfo_prise_title}>Service commission</p>
            <p className={styles.orderInfo_prise_money}>{commission} THB</p>
          </div>
          <div className={styles.orderInfo_prise_about}>
            <p className={styles.orderInfo_prise_title}>Operating time cost</p>
            <p className={styles.orderInfo_prise_money}>{operatingCost.toFixed(2)} THB</p>
          </div>
          <div className={styles.orderInfo_prise_about}>
            <p className={styles.orderInfo_prise_title}>Cost by weight</p>
            <p className={styles.orderInfo_prise_money}>{weightCost.toFixed(2)} THB</p>
          </div>

          <span className={styles.orderInfo_line}></span>

          <div className={styles.orderInfo_prise_all}>
            <p className={styles.orderInfo_prise_title_all}>Total price</p>
            <p className={styles.orderInfo_prise_money_all}>{totalToShow.toFixed(2)} THB</p>
          </div>
        </div>

        <div className={styles.alternative_all}>
          <div className={styles.alternative}>
            <input
              type="checkbox"
              checked={customPriceEnabled}
              onChange={() => setCustomPriceEnabled(!customPriceEnabled)}
              id="customPriceToggle"
            />
            <label htmlFor="customPriceToggle" className={styles.alternative_title}>
              Alternative price
            </label>
          </div>
          <p className={styles.alternative_text}>
            Set your price for a service or product and find the best deal for your budget.
          </p>
          {customPriceEnabled && (
            <input
              type="number"
              min="1"
              className={styles.custom_price_input}
              placeholder="Enter your price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
            />
          )}
        </div>

        <button className={styles.orderInfo_button} disabled={!isOrderButtonActive}>
          Order
        </button>
      </div>
    </div>
  );
}

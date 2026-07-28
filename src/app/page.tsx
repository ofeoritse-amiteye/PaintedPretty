"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type Design = {
  id: string;
  name: string;
  mood: string;
  image: string;
};

const designs: Design[] = [
  {
    id: "sunset-wine",
    name: "Sunset Wine",
    mood: "Warm ocean glow with a romantic toast.",
    image: "/painted-pretty/sunset-wine.jpg",
  },
  {
    id: "beach-sunset",
    name: "Beach Sunset",
    mood: "Soft palms, pink skies, and date-night calm.",
    image: "/painted-pretty/beach-sunset.jpg",
  },
  {
    id: "royal-kiss",
    name: "Royal Kiss",
    mood: "A bold king-and-queen moment.",
    image: "/painted-pretty/royal-kiss.jpg",
  },
  {
    id: "love-hearts",
    name: "Love Hearts",
    mood: "Playful, sweet, and full of color.",
    image: "/painted-pretty/love-hearts.jpg",
  },
  {
    id: "elegant-date",
    name: "Elegant Date",
    mood: "Classic chairs, wine glasses, and poise.",
    image: "/painted-pretty/elegant-date.jpg",
  },
  {
    id: "blue-romance",
    name: "Blue Romance",
    mood: "Cool tones with a stylish couple portrait.",
    image: "/painted-pretty/blue-romance.jpg",
  },
];

const canvasOptions = ["Pre-drawn Canvas (recommended)", "Blank Canvas"];

const kitOptions = [
  { label: "With Easel Stand", price: 35000 },
  { label: "Without Easel Stand", price: 31000 },
];

const highlights = [
  "Everything Included",
  "Beautifully Packaged",
  "Beginner Friendly",
];

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function money(value: number) {
  return `NGN ${value.toLocaleString("en-NG")}`;
}

export default function Home() {
  const [selectedDesign, setSelectedDesign] = useState(designs[0]);
  const [canvas, setCanvas] = useState(canvasOptions[0]);
  const [kit, setKit] = useState(kitOptions[0]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    notes: "",
  });
  const heroBackDesigns = useMemo(() => {
    return designs.filter((design) => design.id !== selectedDesign.id).slice(0, 2);
  }, [selectedDesign]);

  const orderMessage = useMemo(() => {
    return [
      "Hello Painted Pretty",
      "",
      "I'd like to order a Couples Paint Kit.",
      "",
      `Name: ${form.name || "-"}`,
      `Phone: ${form.phone || "-"}`,
      `Email: ${form.email || "-"}`,
      "",
      `Selected Design: ${selectedDesign.name}`,
      `Canvas: ${canvas}`,
      `Kit: ${kit.label} - ${money(kit.price)}`,
      "",
      `Delivery Address: ${form.address || "-"}`,
      `Preferred Delivery Date: ${form.date || "-"}`,
      `Additional Notes: ${form.notes || "-"}`,
    ].join("\n");
  }, [canvas, form, kit, selectedDesign]);

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = encodeURIComponent(orderMessage);
    const phonePath = whatsappNumber.replace(/\D/g, "");
    const url = phonePath
      ? `https://wa.me/${phonePath}?text=${text}`
      : `https://wa.me/?text=${text}`;

    window.location.href = url;
  }

  return (
    <main className="site-shell">
      <section className="hero-section" id="top">
        <nav className="nav-bar" aria-label="Primary navigation">
          <a className="logo-link" href="#top" aria-label="Painted Pretty home">
            <Image
              src="/painted-pretty/logo.jpg"
              alt="Painted Pretty"
              width={168}
              height={102}
              priority
            />
          </a>
          <div className="nav-actions">
            <a href="#gallery">Designs</a>
            <a href="#order">Order</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Relax. Bond. Create.</p>
            <h1 className="hero-title">
              <span className="text-blue-500">Paint Together.</span>
              <span className="text-orange-500">Laugh Together.</span>
              <span className="text-teal-500">Create Memories.</span>
            </h1>
            <p className="hero-text">
              Turn an ordinary evening into a memorable date night. Our Couples
              Paint Kit includes everything you need to relax, laugh, and create
              a masterpiece together with no experience needed.
            </p>
            <div className="hero-buttons">
              <a className="primary-button" href="#order">
                Order Your Couples Kit
              </a>
              <a className="secondary-button" href="#gallery">
                Choose Your Love Story
              </a>
            </div>
          </div>

          <div className="hero-art-stack" aria-label="Featured Painted Pretty designs">
            {heroBackDesigns.map((design, index) => (
              <div className={`hero-art hero-art-back back-${index + 1}`} key={design.id}>
                <Image
                  src={design.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 72vw, 34vw"
                />
              </div>
            ))}
            <div className="hero-art hero-art-main">
              <Image
                src={selectedDesign.image}
                alt={selectedDesign.name}
                fill
                priority
                sizes="(max-width: 900px) 82vw, 46vw"
              />
              <div className="floating-note">
                <span>{selectedDesign.name}</span>
                <small>{selectedDesign.mood}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kit-section" aria-labelledby="kit-heading">
        <div>
          <p className="section-kicker">The perfect date night, boxed</p>
          <h2 id="kit-heading">Everything You Need for the Perfect Date Night</h2>
        </div>
        <div className="highlight-row">
          {highlights.map((highlight) => (
            <div className="highlight-pill" key={highlight}>
              <span aria-hidden="true" />
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery" aria-labelledby="gallery-heading">
        <div className="section-heading">
          <p className="section-kicker">Choose your love story</p>
          <h2 id="gallery-heading">Tap a design to select it</h2>
          <p>
            Pick the artwork that fits your night. Your selected design will be
            added to the WhatsApp order automatically.
          </p>
        </div>

        <div className="design-grid">
          {designs.map((design) => {
            const isSelected = selectedDesign.id === design.id;

            return (
              <button
                className={`design-card ${isSelected ? "selected" : ""}`}
                type="button"
                key={design.id}
                onClick={() => setSelectedDesign(design)}
                aria-pressed={isSelected}
              >
                <span className="image-wrap">
                  <Image
                    src={design.image}
                    alt={design.name}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </span>
                <span className="design-info">
                  <span>
                    <strong>{design.name}</strong>
                    <small>{design.mood}</small>
                  </span>
                  <span className="checkmark" aria-hidden="true">
                    {isSelected ? "Selected" : "Pick"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="order-section" id="order" aria-labelledby="order-heading">
        <div className="order-copy">
          <p className="section-kicker">Order details</p>
          <h2 id="order-heading">Build your kit</h2>
          <p>
            Fill in your details once. When you tap the order button, WhatsApp
            opens with everything neatly organised and ready to send.
          </p>
        </div>

        <div className="order-layout">
          <form className="order-form" onSubmit={submitOrder}>
            <fieldset>
              <legend>Canvas Style</legend>
              <div className="option-row">
                {canvasOptions.map((option) => (
                  <label className="choice" key={option}>
                    <input
                      type="radio"
                      name="canvas"
                      value={option}
                      checked={canvas === option}
                      onChange={(event) => setCanvas(event.target.value)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Kit Type</legend>
              <div className="option-row">
                {kitOptions.map((option) => (
                  <label className="choice" key={option.label}>
                    <input
                      type="radio"
                      name="kit"
                      value={option.label}
                      checked={kit.label === option.label}
                      onChange={() => setKit(option)}
                    />
                    <span>
                      {option.label}
                      <strong>{money(option.price)}</strong>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field-grid">
              <label>
                Full Name
                <input
                  required
                  name="fullName"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label>
                Phone Number
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="080..."
                  inputMode="tel"
                />
              </label>
              <label>
                Email Address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="you@email.com"
                />
              </label>
              <label>
                Preferred Delivery Date
                <input
                  name="deliveryDate"
                  type="date"
                  value={form.date}
                  onChange={(event) => updateField("date", event.target.value)}
                />
              </label>
              <label className="wide-field">
                Delivery Address
                <input
                  required
                  name="address"
                  value={form.address}
                  onChange={(event) => updateField("address", event.target.value)}
                  placeholder="Street, area, city"
                />
              </label>
              <label className="wide-field">
                Additional Notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Gift note, delivery timing, special request..."
                  rows={4}
                />
              </label>
            </div>

            <button className="whatsapp-button" type="submit">
              Continue on WhatsApp
            </button>
          </form>

          <aside className="order-summary" aria-label="Order summary">
            <div className="summary-image">
              <Image
                src={selectedDesign.image}
                alt={selectedDesign.name}
                fill
                sizes="(max-width: 900px) 100vw, 360px"
              />
            </div>
            <div>
              <p className="summary-label">Selected Design</p>
              <h3>{selectedDesign.name}</h3>
              <p>{selectedDesign.mood}</p>
            </div>
            <dl>
              <div>
                <dt>Canvas</dt>
                <dd>{canvas}</dd>
              </div>
              <div>
                <dt>Kit</dt>
                <dd>{kit.label}</dd>
              </div>
              <div>
                <dt>Total before delivery</dt>
                <dd>{money(kit.price)}</dd>
              </div>
            </dl>
            <p className="delivery-note">
              Delivery fee is calculated based on your location. Payment details
              are sent after your order is received.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

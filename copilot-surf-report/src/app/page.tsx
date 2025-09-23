
"use client";
import { useState, useRef, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Location = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Location | null>(null);
  const [marineWeather, setMarineWeather] = useState<any>(null);
  const [marineLoading, setMarineLoading] = useState(false);
  const [marineError, setMarineError] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.results) {
        setResults(data.results);
      } else {
        setResults([]);
        setError("No locations found.");
      }
    } catch (err) {
      setError("Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchMarineWeather(loc: Location) {
    setMarineLoading(true);
    setMarineError("");
    setMarineWeather(null);
    try {
      const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${loc.latitude}&longitude=${loc.longitude}&current=wave_height,sea_surface_temperature`;
      const res = await fetch(url);
      const data = await res.json();
      setMarineWeather(data.current);
    } catch (err) {
      setMarineError("Failed to fetch marine weather.");
    } finally {
      setMarineLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md mb-8">
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Search for a location..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !query}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <ul className="space-y-2">
            {results.map(loc => (
              <li key={loc.id} className={`border rounded p-2 cursor-pointer ${selected?.id === loc.id ? 'bg-accent' : ''}`}
                  onClick={() => {
                    setSelected(loc);
                    fetchMarineWeather(loc);
                  }}>
                <div className="font-semibold">{loc.name}, {loc.country}</div>
                <div className="text-sm text-muted-foreground">
                  {loc.admin1 && <span>{loc.admin1}, </span>}
                  Lat: {loc.latitude}, Lon: {loc.longitude}
                </div>
              </li>
            ))}
          </ul>
          {selected && (
            <div className="mt-6">
              <div className="font-bold mb-2">Marine Weather for {selected.name}, {selected.country}</div>
              {marineLoading && <div>Loading marine weather...</div>}
              {marineError && <div className="text-red-500">{marineError}</div>}
              {marineWeather ? (
                (marineWeather.wave_height !== null && marineWeather.sea_surface_temperature !== null) ? (
                  <div className="space-y-2">
                    <div>Time: {marineWeather.time}</div>
                    <div>Wave Height: {marineWeather.wave_height} m</div>
                    <div>Sea Surface Temperature: {marineWeather.sea_surface_temperature} °C</div>
                  </div>
                ) : (
                  <div className="text-yellow-600">No wave height or sea surface temperature data available for this location.</div>
                )
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
      {/* Newsletter Signup Form */}
      <Card className="w-full max-w-md">
        <CardContent>
          <NewsletterSignupForm />
        </CardContent>
      </Card>
    </div>
  );
// Newsletter Signup Form using shadcn ui form components
function NewsletterSignupForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return <div className="text-green-600 font-semibold">Thank you for signing up!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="newsletter-email" className="font-medium">Sign up for our newsletter</label>
      <Input
        ref={inputRef}
        id="newsletter-email"
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
}

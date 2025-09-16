import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type Vinyl = {
  id: string;
  title: string;
  artist: string;
  label: string;
  year: number;
  condition: string;
};

export default function Home() {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);

  useEffect(() => {
    const fetchVinyls = async () => {
      let { data, error } = await supabase.from("vinyl").select("*");
      if (error) console.error(error);
      else setVinyls(data || []);
    };
    fetchVinyls();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>🎶 Ephemera — Vinyl Collection</h1>
      {vinyls.length === 0 ? (
        <p>No records yet. Add one!</p>
      ) : (
        <ul>
          {vinyls.map((v) => (
            <li key={v.id}>
              <strong>{v.artist}</strong> — {v.title} ({v.year}) [{v.condition}]
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

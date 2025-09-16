// @ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [vinyls, setVinyls] = useState([]);

  useEffect(() => {
    const fetchVinyls = async () => {
      const { data, error } = await supabase
        .from("vinyl")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setVinyls(data || []);
      }
    };

    fetchVinyls();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>🎶 Ephemera — Vinyl Collection</h1>
      <p><a href="/add">Add a vinyl →</a></p>

      {vinyls.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul>
          {vinyls.map((v) => (
            <li key={v.id}>
              <strong>{v.artist}</strong> — {v.title}{" "}
              {v.year ? `(${v.year})` : ""}{" "}
              {v.condition ? `[${v.condition}]` : ""}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

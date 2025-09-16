import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AddVinyl() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [label, setLabel] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("vinyl").insert([
      {
        title,
        artist,
        label,
        year: year ? parseInt(year) : null,
        condition,
      },
    ]);

    if (error) {
      setMessage("❌ Error: " + error.message);
    } else {
      setMessage("✅ Saved! Go back to the home page to see it.");
      setTitle("");
      setArtist("");
      setLabel("");
      setYear("");
      setCondition("");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Add a Vinyl Record</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Artist: </label>
          <input value={artist} onChange={(e) => setArtist(e.target.value)} required />
        </div>
        <div>
          <label>Label: </label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div>
          <label>Year: </label>
          <input value={year} onChange={(e) => setYear(e.target.value)} type="number" />
        </div>
        <div>
          <label>Condition: </label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="">-- Choose --</option>
            <option value="Mint">Mint</option>
            <option value="Near Mint">Near Mint</option>
            <option value="VG+">VG+</option>
            <option value="VG">VG</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
      <p>{message}</p>
    </main>
  );
}

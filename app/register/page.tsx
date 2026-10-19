
"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Бүртгэлийн үйлдлийг холбож байна...");
  }

  
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Бүртгүүлэх</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Хэрэглэгчийн нэр</Label>
          <Input
            id="username"
            placeholder="Хэрэглэгчийн нэр"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Овог, нэр</Label>
          <Input
            id="fullName"
            placeholder="Овог, нэр"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Имэйл</Label>
          <Input
            id="email"
            type="email"
            placeholder="Имэйл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Нууц үг</Label>
          <Input
            id="password"
            type="password"
            placeholder="Хамгийн багадаа 8 тэмдэгт"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        <Button className="w-full" type="submit">
          Бүртгүүлэх
        </Button>

        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );

}
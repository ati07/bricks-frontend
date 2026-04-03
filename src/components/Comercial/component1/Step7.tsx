import React, { useEffect, useRef, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import "../aicss.css";
import { Stack, ThemeProvider } from "@mui/material";
// import { theme } from '../../App';
import Logo from "../../../assets/images/converted_image.svg";
import { Send, User, Bot } from 'lucide-react';
import { theme } from "../../../App";
// import theme from "../../../theme/theme";

interface Step2Props {
  // unidades: number;
  // precioPorUnidad: number;
  onDataChange: (data: any[]) => void;
  data: any;
}

export default function Step7({ onDataChange, data }: Step2Props) {
 
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);

  const GEMINI_API_KEY = "AIzaSyDBDI4jUM8dF5ezrhmyJMqSqiF6UdIyMiU";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---------------------------------------------------------
  // SYSTEM PROMPT FOR EXECUTIVE SUMMARY (AUTOMATIC)
  // ---------------------------------------------------------
  const systemPrompt = `
Eres un analista financiero especializado en proyectos inmobiliarios.
Recibirás un JSON con tres secciones:
- step1: información general del proyecto
- step2: calendario de ventas e impuestos
- step3: movimientos financieros del préstamo
- step4: costos de Construcción

Debes generar un RESUMEN EJECUTIVO con la siguiente estructura exacta:

RESUMEN EJECUTIVO
Resultados Financieros Clave:
Flujo acumulado final: $X
Punto de equilibrio: Mes Año
Máximo déficit acumulado: ($X) en Mes Año
Préstamo bancario máximo: $X
Intereses totales pagados: $X

Rentabilidad del Proyecto:
Margen neto: X%
ROI: X%
Período de recuperación: X meses
Periodo de tiempo total de construcción: X meses

[Breve análisis narrativo del proyecto]

Usa exclusivamente los datos del JSON proporcionado.
Calcular todo a partir de esa información.
La salida debe ser solo texto limpio en este formato.
Siempre responde en español.
  `;

  // ---------------------------------------------------------
  // CALL GEMINI API
  // ---------------------------------------------------------
  const callGeminiAPI = async () => {
    try {
      setIsLoading(true);

      const finalPrompt = `
${systemPrompt}

DATA INPUT:
${JSON.stringify(data, null, 2)}
`;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: finalPrompt }],
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Gemini API error");

      const respData = await response.json();
      const aiText =
        respData.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: aiText,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------
  // RUN ONCE WHEN COMPONENT LOADS
  // ---------------------------------------------------------

  const hasCalledAPI = useRef(false);
  useEffect(() => {
  if (data && !hasCalledAPI.current) {
    hasCalledAPI.current = true;

    setMessages([
      {
        id: Date.now(),
        text: "Generando resumen ejecutivo...",
        sender: "user",
        timestamp: new Date(),
      },
    ]);

    callGeminiAPI();
  }
}, [data]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Stack
        paddingTop={{ xs: "130px", sm: "130px", md: "80px", xl: "80px" }}
        style={{ height: "680px" }}
      > */}
        <div className="ai-chat-container">
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === "ai"
                    ? <img src={Logo} width={20} height={20} alt="AI" />
                    : <User size={20} />}
                </div>

                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message ai">
                <div className="message-avatar">
                  <img src={Logo} width={20} height={20} alt="AI" />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      {/* </Stack> */}
    </ThemeProvider>
  );
}

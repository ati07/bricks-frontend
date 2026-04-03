import React, { useState, useRef, useEffect } from "react";
// import { Send, User, Bot } from "lucide-react";
// import "./aicss.css";
import {
  Box,
  Button,
  Stack,
  StepButton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../../App";
// import Logo from "../../assets/images/converted_image.svg";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { StepsComponent } from "./component1";

const ComercialPart1 = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);
  const textareaRef = useRef<any>(null);

  // Replace with your actual Gemini API key
  
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const AI_MODEL = import.meta.env.VITE_AI_MODEL
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Platform data context for the AI
  const platformContext = `
    You are an AI assistant for Verdeazul Properties real estate platform. You can ONLY answer questions related to the following data from our dashboard:

    SALES REPORTS (Reporte De Ventas):
    - Total Units: 24 units available, 24 units sold, 0 pending sales
    - Total Amount: $13,802,421 in sales

    COLLECTIONS REPORT (Reporte De Cobros):
    - 24 units sold for $13,802,421
    - $13,494,754 collected
    - $307,667 pending collection

    COLLECTIONS DETAIL (Detalle De Cobros):
    - Total: $13,802,421
    - Collected: $13,494,754
    - Pending: $307,667

    SALES STATUS (Estatus De Ventas):
    - Transferred: 21 units ($11,952,541) - 88%
    - Signed Contract: 3 units ($1,849,880) - 13%
    - Separated: 0 units - 0%
    - Available: 0 units - 0%
    - Total: 24 units ($13,802,421) - 100%

    DISBURSEMENT REPORTS (Reporte De Desembolsos):
    - Monthly amounts of $7,264,662 consistent across Nov-May

    DEBT PAYMENT REPORT (Reporte De Repago De Deuda):
    - Nov: $190,400 monthly, $6,644,726 accumulated
    - Dec: $619,935 monthly, $7,264,662 accumulated
    - Jan-May: $7,264,662 accumulated each month
    - Total: $810,335 monthly payments, $7,264,662 accumulated

    DEBT BALANCE REPORT (Reporte De Saldo De Deuda):
    - Jan 2025: $7,264,662 disbursed, $7,264,662 repaid
    - Feb-May 2025: No amounts recorded

    CONSTRUCTION PROGRESS (Avance De Construcción):
    - May: Account No. 20, Accumulated, $8,158,649.20
    - Jun: Account No. 21, Monthly, $265,926.34
    - Jul: Account No. 22, Monthly, $219,167.34
    - Aug: Account No. 23, Monthly, $203,647.28
    - Total: $8,847,390.16

    PROJECT PROFITABILITY (Rentabilidad Del Proyecto):
    - Budget: 24 units, $13,530,628 income, $8,998,341 costs, $4,532,287 gross profit, $1,606,249 expenses, $2,926,038 operating profit
    - Projection: 24 units, $13,802,421 income, $9,563,743 costs, $4,238,678 gross profit, $1,641,653 expenses, $2,597,025 operating profit
    - Variance: 0 units, $271,793 income increase, $565,402 cost increase, -$293,609 gross profit, $35,404 expenses increase, -$329,013 operating profit

    PROJECT PROGRESS (Avance Del Proyecto):
    - Executed: 24 units, $13,494,754 income, $9,563,743 costs, $3,931,011 gross profit, $1,285,232 expenses, $2,645,779 operating profit
    - Pending: 0 units, $307,667 income, $18,345 costs, $289,322 gross profit, $74,360 expenses, $214,962 operating profit

    INTEREST PAYMENTS (Pago De Intereses):
    - Jan-May 2025: No monthly payments recorded
    - Accumulated: $595,594 each month (constant total)

    IMPORTANT: You can ONLY discuss topics related to this real estate project data. If someone asks about anything else, politely respond that you can only help with questions about Verdeazul Properties data.

    IMPORTANT: Siempre debes responder únicamente en español, sin excepción.

    `;

  const callGeminiAPI = async (prompt: any) => {
    try {
      const fullPrompt = `${platformContext}\n\nUser Question: ${prompt}`;
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "Sorry, I encountered an error while processing your request. Please check your API key and try again.";
    }
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage] as any);
    setInputValue("");
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callGeminiAPI(inputValue);

    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: "ai",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage] as any);
    setIsLoading(false);

    // Focus after re-enabling textarea
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Stepper logic

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const [stepData, setStepData] = useState<any>({
    step1: {},
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    // step6: [],

    // ...
  });

  const handleStepData = (stepNumber: number, data: any) => {
    setStepData((prev:any) => ({
      ...prev,
      [`step${stepNumber}`]: data,
    }));
  };
  const steps = [
    "Estado Comercial",
    "Impuestos",
    // "Title Needed",
    
    "Reposesión",
    "Trámites",
    // "Impuestos de Traspaso Proyectados",
    "Archivos"
  ];
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {

    console.log("Collected data so far:", stepData);
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        paddingTop={{ xs: "130px", sm: "130px", md: "80px", xl: "80px" }}
        style={{ height: "680px" }}
      >
        <Box
          sx={{
            height: "auto",
            borderRadius: "16px",
            border: "1px solid #EBEFFA",
            width: "100%",
            backgroundColor: "white",
            marginTop: "10px",
            padding: "20px",
          }}
        >
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton
                  color="inherit"
                  onClick={handleStep(index)}
                  sx={{
                    "& .MuiStepLabel-label": {
                      fontSize: "11px",
                      fontFamily: "DM Sans",
                    },
                  }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ mt: 2}}>
                  {/* Step {activeStep + 1} */}
                  {StepsComponent?.[activeStep + 1] &&
                    React.createElement(StepsComponent[activeStep + 1], {
                      onDataChange: (data: any) =>handleStepData(activeStep + 1, data),
                       // Pass whatever you need here
                      data:stepData
                      // unidades: stepData.step1?.unidades,
                      // precioPorUnidad: stepData.step1?.precioPorUnidad,
                    })}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    {activeStep === 3 ? "Generate Result":"Next"}
                  </Button>
                  {/* {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : (
                      <Button onClick={handleComplete}>
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))} */}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </Stack>
    </ThemeProvider>
  );
};

export default ComercialPart1;

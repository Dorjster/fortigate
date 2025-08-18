
import express from "express";
import axios from "axios";
import https from "https";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import "dotenv/config"; // loads .env


const app = express();
const PORT = process.env.PORT || 8000;

const FGT_BASE = process.env.FGT_BASE || "https://172.16.120.59/api/v2/cmdb";
const API_TOKEN = process.env.FGT_API_TOKEN || ""; // store token in .env

const ENDPOINTS = {
  policy: "/firewall/policy",
  address: "/firewall/address",
};

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"], credentials: false }));
app.use(express.json());
app.use(morgan("tiny"));

// Basic rate limit
app.use(
  "/api/",
  rateLimit({ windowMs: 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false })
);

// Helper
function authHeaders() {
  return {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  };
}

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/firewall-policies", async (req, res) => {
  try {
    const r = await axios.get(FGT_BASE + ENDPOINTS.policy, { headers: authHeaders(), httpsAgent });
    res.json(r.data);
  } catch (e) {
    console.error("fetch policies", e.response?.data || e.message);
    res.status(e.response?.status || 500).json({ error: "Failed to fetch policies" });
  }
});

app.post("/api/firewall-policies", async (req, res) => {
  try {
    const payload = req.body;
    const r = await axios.post(FGT_BASE + ENDPOINTS.policy, payload, { headers: authHeaders(), httpsAgent });
    res.json({ message: "Policy created", data: r.data });
  } catch (e) {
    console.error("create policy", e.response?.data || e.message);
    res.status(e.response?.status || 500).json({ error: "Failed to create policy", details: e.response?.data });
  }
});

app.delete("/api/firewall-policies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const r = await axios.delete(`${FGT_BASE + ENDPOINTS.policy}/${id}`, { headers: authHeaders(), httpsAgent });
    res.json({ message: "Policy deleted", data: r.data });
  } catch (e) {
    console.error("delete policy", e.response?.data || e.message);
    res.status(e.response?.status || 500).json({ error: "Failed to delete policy", details: e.response?.data });
  }
});

app.get("/api/firewall-addresses", async (req, res) => {
  try {
    const r = await axios.get(FGT_BASE + ENDPOINTS.address, { headers: authHeaders(), httpsAgent });
    res.json(r.data);
  } catch (e) {
    console.error("fetch addresses", e.response?.data || e.message);
    res.status(e.response?.status || 500).json({ error: "Failed to fetch addresses" });
  }
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));



// import express from "express";
// import axios from "axios";
// import https from "https";
// import cors from "cors";

// const app = express();
// const PORT = 8000;

// const FORTIGATE_BASE_URL = "https://172.16.120.59/api/v2/cmdb";
// const POLICY_ENDPOINT = "/firewall/policy";
// const ADDRESS_ENDPOINT = "/firewall/address";
// const API_KEY = "HHdd366f85gdzm1tg3dpGkHtsrp8cr";


// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// app.use(cors());
// app.use(express.json()); 


// app.get("/api/firewall-policies", async (req, res) => {
//   try {
//     const response = await axios.get(FORTIGATE_BASE_URL + POLICY_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       httpsAgent: agent,
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching policies:", error);
//     res.status(500).json({ error: "Бодлогуудыг авахад алдаа гарлаа" });
//   }
// });


// app.post("/api/firewall-policies", async (req, res) => {
//   try {
//     const policyData = req.body; 
//     const response = await axios.post(
//       FORTIGATE_BASE_URL + POLICY_ENDPOINT,
//       policyData,
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//         httpsAgent: agent,
//       }
//     );
//     res.json({ message: "Policy successfully created motherfucker.", data: response.data });
//   } catch (error) {
//     console.error(
//       "Error creating policy:",
//       error.response?.data || error.message
//     );
//     res.status(500).json({ error: "FAIL to create policy" });
//   }
// });

// // DELETE: Delete a policy by its ID
// app.delete("/api/firewall-policies/:id", async (req, res) => {
//   const policyId = req.params.id;
//   try {
//     const response = await axios.delete(
//       FORTIGATE_BASE_URL + POLICY_ENDPOINT + `/${policyId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//         httpsAgent: agent,
//       }
//     );
//     res.json({ message: "Бодлого амжилттай устгагдлаа", data: response.data });
//   } catch (error) {
//     console.error(
//       "Error deleting policy:",
//       error.response?.data || error.message
//     );
//     res.status(500).json({ error: "Fail (dilet polisy)" });
//   }
// });

// app.get("/api/firewall-addresses", async (req, res) => {
//   try {
//     const response = await axios.get(FORTIGATE_BASE_URL + ADDRESS_ENDPOINT, {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//       httpsAgent: agent,
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//     res.status(500).json({ error: "Error getting adresses" });
//   }
// });

// app.listen(PORT, () => {
//   console.log("Server is running on http://localhost:" + PORT);
// });
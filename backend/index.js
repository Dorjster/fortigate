import express from "express";
import axios from "axios";
import https from "https";
import cors from "cors";

const app = express();
const PORT = 8000;

const FORTIGATE_BASE_URL = "https://172.16.120.59/api/v2/cmdb";
const POLICY_ENDPOINT = "/firewall/policy";
const ADDRESS_ENDPOINT = "/firewall/address";
const API_KEY = "HHdd366f85gdzm1tg3dpGkHtsrp8cr";


const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(cors());
app.use(express.json()); 


app.get("/api/firewall-policies", async (req, res) => {
  try {
    const response = await axios.get(FORTIGATE_BASE_URL + POLICY_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      httpsAgent: agent,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ error: "Бодлогуудыг авахад алдаа гарлаа" });
  }
});


app.post("/api/firewall-policies", async (req, res) => {
  try {
    const policyData = req.body; 
    const response = await axios.post(
      FORTIGATE_BASE_URL + POLICY_ENDPOINT,
      policyData,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        httpsAgent: agent,
      }
    );
    res.json({ message: "Policy successfully created motherfucker.", data: response.data });
  } catch (error) {
    console.error(
      "Error creating policy:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "FAIL to create policy" });
  }
});

// DELETE: Delete a policy by its ID
app.delete("/api/firewall-policies/:id", async (req, res) => {
  const policyId = req.params.id;
  try {
    const response = await axios.delete(
      FORTIGATE_BASE_URL + POLICY_ENDPOINT + `/${policyId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        httpsAgent: agent,
      }
    );
    res.json({ message: "Бодлого амжилттай устгагдлаа", data: response.data });
  } catch (error) {
    console.error(
      "Error deleting policy:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Fail (dilet polisy)" });
  }
});

app.get("/api/firewall-addresses", async (req, res) => {
  try {
    const response = await axios.get(FORTIGATE_BASE_URL + ADDRESS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      httpsAgent: agent,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Error getting adresses" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

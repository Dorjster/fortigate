import express from 'express';
import axios from 'axios';
import https from 'https';
import cors from 'cors'; 

const app = express();
const PORT = 8000;

const FORTIGATE_API_URL = 'https://10.10.1.1/api/v2/cmdb/firewall/policy';
const API_KEY = 'd711d761zsj547m4bpwhrs4ypr657j';


const agent = new https.Agent({  
  rejectUnauthorized: false
});

app.use(cors()); 

app.get('/api/firewall-policies', async (req, res) => {
    try {
        const response = await axios.get(FORTIGATE_API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
            httpsAgent: agent
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching policies:', error); 
        res.status(500).json({ error: 'Failed to fetch policies' });
    }
});


app.listen(PORT, () => {
    console.log('running on http://localhost:' + PORT);
});

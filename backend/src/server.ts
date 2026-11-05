import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import OpenAI from 'openai';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

interface Vendor {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
}

const vendors: Vendor[] = [
  {
    id: '1',
    name: 'TechCorp Supplies',
    category: 'IT Equipment',
    contact: 'John Smith',
    email: 'john@techcorp.com',
    rating: 4.5,
    status: 'active',
  },
  {
    id: '2',
    name: 'Office Essentials',
    category: 'Office Supplies',
    contact: 'Jane Doe',
    email: 'jane@officeessentials.com',
    rating: 4.2,
    status: 'active',
  },
  {
    id: '3',
    name: 'BuildIt Materials',
    category: 'Construction',
    contact: 'Bob Johnson',
    email: 'bob@buildit.com',
    rating: 3.8,
    status: 'pending',
  },
];

app.get('/api/vendors', (req: Request, res: Response) => {
  res.json(vendors);
});

app.post('/api/vendors', (req: Request, res: Response) => {
  const newVendor: Vendor = {
    id: Date.now().toString(),
    ...req.body,
    rating: 0,
    status: 'pending',
  };
  vendors.push(newVendor);
  res.json(newVendor);
});

app.put('/api/vendors/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = vendors.findIndex((v) => v.id === id);
  if (index !== -1) {
    vendors[index] = { ...vendors[index], ...req.body };
    res.json(vendors[index]);
  } else {
    res.status(404).json({ error: 'Vendor not found' });
  }
});

app.delete('/api/vendors/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = vendors.findIndex((v) => v.id === id);
  if (index !== -1) {
    vendors.splice(index, 1);
    res.json({ message: 'Vendor deleted' });
  } else {
    res.status(404).json({ error: 'Vendor not found' });
  }
});

app.post('/api/upload', upload.single('document'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const filePath = req.file.path;
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: filePath,
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

app.post('/api/agent/chat', async (req: Request, res: Response) => {
  const { message, context } = req.body;

  try {
    const systemPrompt = `You are an AI Autonomous Procurement Agent. Your role is to help with:
    - Vendor selection and evaluation
    - Procurement strategy recommendations
    - Cost analysis and optimization
    - Document analysis (RFPs, invoices, contracts)
    - Supply chain management advice
    
    Context: ${context || 'General procurement assistance'}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    res.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

app.post('/api/agent/analyze-document', async (req: Request, res: Response) => {
  const { documentContent, documentType } = req.body;

  try {
    const systemPrompt = `You are an AI document analyzer for procurement. Analyze the ${documentType} and provide:
    - Key terms and conditions
    - Risks and opportunities
    - Pricing analysis
    - Recommendations for negotiation
    - Compliance issues`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: documentContent },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    res.json({
      analysis: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Document analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze document' });
  }
});

app.get('/api/dashboard/metrics', (req: Request, res: Response) => {
  const metrics = {
    totalVendors: vendors.length,
    activeVendors: vendors.filter((v) => v.status === 'active').length,
    pendingVendors: vendors.filter((v) => v.status === 'pending').length,
    averageRating: vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length,
    totalSpend: 1250000,
    monthlySpend: 98750,
    savingsAchieved: 87500,
    contractsActive: 12,
    contractsExpiring: 3,
  };
  res.json(metrics);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

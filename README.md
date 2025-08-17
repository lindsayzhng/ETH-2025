# Multi-Agent NFT Appraisal System

A sophisticated NFT pricing system that leverages multiple AI agents (OpenAI, Anthropic, Google Gemini) with MeTTa symbolic reasoning and ASI:One intelligence for consensus-based appraisals.

## 🏗️ Architecture

### Backend Components

1. **Consensus Agent** (`backend/opensea_nft_pricing_consensus/`)
   - Coordinates multiple pricing agents
   - Uses MeTTa symbolic reasoning for consensus
   - Integrates ASI:One for structured output
   - Supports both legacy text and new structured API

2. **API Gateway** (`backend/api_gateway.py`)
   - FastAPI server with WebSocket support
   - Bridges frontend ↔ consensus agent
   - Real-time streaming of agent reasoning logs
   - RESTful endpoints for appraisal requests

3. **Pricing Agents** (OpenAI, Anthropic, Gemini)
   - Individual AI agents with OpenSea MCP integration
   - Each provides independent pricing analysis
   - Updated with shared protocol for agent-to-agent communication

4. **Data Models** (`backend/consensus_api_models.py`)
   - Pydantic models optimized for backend structure
   - Structured output compatible with ASI:One
   - WebSocket streaming message types

### Frontend Components

1. **New Appraisal Form** (`frontend/src/pages/NewAppraisalForm.tsx`)
   - Natural language and structured input modes
   - Real-time progress tracking
   - Live agent reasoning logs
   - Comprehensive consensus analysis display

2. **Custom Hooks** (`frontend/src/hooks/useAppraisal.ts`)
   - WebSocket connection management
   - State management for appraisal process
   - Auto-reconnection and error handling

3. **Streaming Components**
   - `AgentCard`: Displays individual agent analysis with live logs
   - `ConsensusCard`: Shows consensus results and MeTTa reasoning
   - `LogWindow`: Real-time streaming log display
   - `ProgressBar`: Visual progress tracking

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- OpenAI API key
- ASI:One API key
- OpenSea access token

### Backend Setup

1. **Install API Gateway Dependencies**
   ```bash
   cd backend
   pip install -r api_requirements.txt
   ```

2. **Start the API Gateway**
   ```bash
   python start_api_gateway.py
   ```
   Server will be available at: http://localhost:8000

3. **Start Consensus Agent** (in separate terminal)
   ```bash
   cd backend/opensea_nft_pricing_consensus
   python agent.py
   ```

4. **Start Pricing Agents** (in separate terminals)
   ```bash
   # Terminal 1
   cd backend/opensea_nft_pricing_agent_openai
   python agent.py

   # Terminal 2  
   cd backend/opensea_nft_pricing_anthropic
   python agent.py

   # Terminal 3
   cd backend/opensea_nft_pricing_gemini
   python agent.py
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   # .env.local
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_WS_URL=ws://localhost:8000
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   Frontend will be available at: http://localhost:3000

### Testing

Run the integration test to verify everything is working:

```bash
cd backend
python test_integration.py
```

## 📡 API Endpoints

### REST API

- `GET /` - Health check
- `POST /api/v1/appraise` - Start appraisal
- `GET /api/v1/status/{request_id}` - Get appraisal status
- `GET /api/v1/logs/{session_id}` - Get session logs

### WebSocket

- `WS /api/v1/stream/{session_id}` - Real-time streaming

### Example Request

```json
{
  "query": "Price Pudgy Penguins #3532",
  "network": "ethereum",
  "includeStreamingLogs": true,
  "maxProcessingTimeMinutes": 5
}
```

### Example Response

```json
{
  "requestId": "uuid-here",
  "nftIdentity": {
    "collectionName": "Pudgy Penguins",
    "tokenId": "3532",
    "network": "ethereum"
  },
  "agentAnalyses": [
    {
      "agentType": "openai",
      "agentName": "OpenAI GPT-5 with MCP", 
      "priceEth": 13.45,
      "confidence": 0.87,
      "reasoning": "Based on trait rarity analysis..."
    }
  ],
  "consensus": {
    "consensusPriceEth": 13.65,
    "confidenceScore": 0.875,
    "strongConsensus": true,
    "consensusReasoning": "Strong consensus achieved..."
  }
}
```

## 🔄 Real-time Streaming

The system provides real-time streaming of:

1. **Agent Reasoning Logs**
   - Individual agent processing steps
   - OpenSea MCP interactions
   - Trait analysis progress

2. **Progress Updates**
   - Query parsing (ASI:One)
   - Agent querying (parallel)
   - Consensus building (MeTTa)

3. **Live Results**
   - Agent analyses as they complete
   - Consensus building process
   - Final structured results

### WebSocket Message Types

- `log` - Agent reasoning logs
- `progress` - Processing progress updates
- `agent_result` - Individual agent completion
- `consensus_update` - Consensus building updates
- `final_result` - Complete appraisal result
- `error` - Error messages

## 🎯 Key Features

### Multi-Agent Consensus
- **OpenAI GPT-5**: Advanced reasoning with MCP integration
- **Anthropic Claude**: Comprehensive trait analysis
- **Google Gemini**: Market dynamics evaluation
- **MeTTa Reasoning**: Symbolic logic for consensus validation

### Real-time Transparency
- Live streaming of agent reasoning
- Progress tracking across all stages
- Visual feedback for user engagement

### Structured Output
- ASI:One powered structured generation
- Type-safe Pydantic models
- Consistent API responses

### Advanced Analytics
- Statistical consensus metrics
- Outlier detection and challenges
- Confidence scoring
- Risk assessment

### Robust Architecture  
- WebSocket auto-reconnection
- Graceful error handling
- Partial result processing
- Timeout management

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```bash
OPENAI_API_KEY=your_openai_key
ASI_ONE_API_KEY=your_asi_one_key
OPENSEA_ACCESS_TOKEN=your_opensea_token
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
```

**Frontend (.env.local)**
```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000
```

### Consensus Parameters

```python
CONSENSUS_THRESHOLD = 0.15  # 15% variance threshold
OUTLIER_THRESHOLD = 0.20    # 20% deviation for outlier detection
CHALLENGE_TIMEOUT = 300     # 5 minutes timeout
MAX_CHALLENGE_ROUNDS = 2    # Maximum challenge rounds
```

## 🐛 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check API gateway is running on port 8000
   - Verify CORS settings for your frontend URL

2. **Agent Communication Timeout**
   - Ensure all pricing agents are running
   - Check agent addresses in consensus agent
   - Verify network connectivity

3. **ASI:One API Errors**
   - Verify ASI:One API key is valid
   - Check rate limits and quotas
   - Ensure structured output model is correct

4. **Missing Agent Responses**
   - Check individual agent logs for errors
   - Verify OpenSea MCP server connectivity
   - Check API key permissions

### Debug Commands

```bash
# Check API gateway health
curl http://localhost:8000/

# Test WebSocket connection
python test_integration.py

# Check agent logs
tail -f backend/*/logs/*.log
```

## 🚀 Next Steps

1. **Production Deployment**
   - Deploy API gateway with proper scaling
   - Set up monitoring and logging
   - Configure load balancing for agents

2. **Enhanced Features**
   - Historical price tracking
   - Portfolio analysis
   - Collection-wide insights
   - Price prediction models

3. **UI/UX Improvements**
   - Mobile responsive design
   - Advanced filtering options
   - Export functionality
   - Saved appraisals

4. **Integration Expansion**
   - Additional blockchain networks
   - More NFT marketplaces
   - Social media sentiment
   - Market trend analysis

## 📄 License

This project is proprietary software for ETH-2025 NFT appraisal system.
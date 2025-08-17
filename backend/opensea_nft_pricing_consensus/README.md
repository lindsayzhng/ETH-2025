# NFT Pricing Consensus Agent

A sophisticated consensus coordinator that leverages multiple AI pricing agents and uses MeTTa symbolic reasoning for intelligent price agreement and challenge mechanisms. This agent coordinates with OpenAI, Anthropic, and Gemini-powered NFT pricing agents to provide reliable consensus-based valuations.

## 🤖 Features

### Multi-Agent Consensus
- **Parallel Processing**: Queries multiple AI agents simultaneously
- **Intelligent Aggregation**: Uses statistical analysis and symbolic reasoning
- **Confidence Scoring**: Rates consensus strength and reliability
- **Outlier Detection**: Identifies agents with significantly different assessments

### MeTTa Symbolic Reasoning
- **Knowledge Graph**: Maintains agent reliability scores and market patterns
- **Rule-Based Logic**: Uses symbolic rules for consensus evaluation
- **Dynamic Learning**: Updates knowledge based on agent performance
- **Sophisticated Analysis**: Beyond simple averaging - intelligent reasoning

### Challenge Mechanism
- **Deviation Detection**: Identifies agents with outlier pricing
- **Intelligent Challenges**: Generates context-aware challenge prompts
- **Re-evaluation**: Allows agents to reconsider their analysis
- **Iterative Consensus**: Multiple rounds of consensus building

### ASI:One Agentic Integration
- **Advanced Reasoning**: Uses `asi1-agentic` model with multi-step reasoning traces
- **Session Persistence**: Maintains context across complex consensus processes
- **Enhanced NLP**: Superior query parsing and natural language understanding
- **Sophisticated Challenges**: Context-aware prompts for agent re-evaluation
- **Professional Reports**: Investment-grade consensus analysis and recommendations
- **Statistical Analysis**: Advanced variance and confidence assessment capabilities

## 🏗️ Architecture

```
User Query → Consensus Agent → [OpenAI Agent]  → Price Analysis
                ↓             [Anthropic Agent] → Statistical Review
             MeTTa Rules      [Gemini Agent]   → Consensus Evaluation
                ↓                               ↘
          Challenge Logic → ASI:One → Final Report
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- OpenAI, Anthropic, and Gemini pricing agents running
- ASI:One API access
- MeTTa/Hyperon installed

### Installation

1. **Install Dependencies**
```bash
cd backend/opensea_nft_pricing_consensus
pip install -r requirements.txt
```

2. **Set Environment Variables**
Create a `.env` file with:
```env
ASI_ONE_API_KEY=your_asi_one_api_key_here
OPENSEA_ACCESS_TOKEN=your_opensea_token_here
```

3. **Run the Agent**
```bash
python agent.py
```

The consensus agent will start on `http://localhost:8012`

## 📋 Usage

### Example Queries

**Basic Pricing Consensus:**
```
"Price Bored Ape #1234"
"Get consensus on Azuki #999"
"What's the fair value of CryptoPunk #5555?"
```

**Help and Capabilities:**
```
"help"
"what can you do"
"capabilities"
```

### Response Format

The agent provides comprehensive consensus reports:

```
🎯 NFT PRICING CONSENSUS ANALYSIS

Collection: Bored Ape Yacht Club #1234

💰 CONSENSUS PRICE: 25.750 ETH

📊 Consensus Metrics:
- Price Range: 24.200 - 27.500 ETH
- Confidence Score: 87.5%
- Participating Agents: 3
- Challenges Issued: 1

🤖 Agent Analysis:
[Detailed analysis from ASI:One...]

⚡ Consensus Details:
- Strong Consensus: ✅
- Outliers Detected: 1
- Final Confidence: 87.5%
```

## ⚙️ Configuration

### Consensus Parameters

```python
CONSENSUS_THRESHOLD = 0.15  # 15% variance threshold
OUTLIER_THRESHOLD = 0.20    # 20% deviation for outlier detection
CHALLENGE_TIMEOUT = 30      # seconds
MAX_CHALLENGE_ROUNDS = 2    # maximum challenge iterations
```

### Agent Configuration

```python
PRICING_AGENTS = {
    "openai": {"port": 8010},
    "anthropic": {"port": 8011}, 
    "gemini": {"port": 8009}
}
```

### MeTTa Knowledge Rules

The agent uses symbolic reasoning rules:

```lisp
; Consensus threshold rules
(= (consensus-reached $prices)
   (< (price-variance $prices) 0.15))

; Outlier detection
(= (outlier-agent $agent $price $avg-price)
   (> (abs (- $price $avg-price)) (* 0.2 $avg-price)))

; Challenge decision rules
(= (challenge-needed $agent $price $consensus-price)
   (and (outlier-agent $agent $price $consensus-price)
        (< (agent-reliability $agent) 0.85)))
```

## 🔧 Technical Details

### Communication Protocol

1. **Request Broadcasting**: Sends `NFTPricingRequest` to all agents
2. **Response Collection**: Collects `NFTPricingResponse` from each agent
3. **Consensus Analysis**: Uses MeTTa rules for evaluation
4. **Challenge Process**: Issues `ChallengeRequest` to outlier agents
5. **Final Report**: Generates comprehensive analysis

### Data Models

```python
class NFTPricingRequest(Model):
    collection_name: str
    token_id: str
    network: str = "ethereum"
    request_id: str
    timestamp: str

class NFTPricingResponse(Model):
    request_id: str
    agent_name: str
    price_eth: Optional[float]
    reasoning: str
    confidence: float
    # ... additional fields

class ChallengeRequest(Model):
    original_request: NFTPricingRequest
    your_price: float
    consensus_price: float
    challenge_prompt: str
    challenge_round: int
```

### MeTTa Integration

- **Knowledge Graph**: Maintains agent reliability and market patterns
- **Symbolic Rules**: Logic for consensus evaluation and challenges
- **Dynamic Updates**: Learning from agent performance over time
- **Rule Engine**: Complex decision-making beyond simple algorithms

### ASI:One Agentic Capabilities

- **Advanced Query Parsing**: Uses `asi1-agentic` for sophisticated NFT query understanding
- **Multi-Step Reasoning**: Leverages intermediate reasoning traces for complex analysis
- **Session-Aware Processing**: Maintains context across consensus rounds with x-session-id
- **Professional Challenge Generation**: Creates nuanced, collaborative re-evaluation prompts
- **Investment-Grade Reports**: Produces comprehensive analysis suitable for serious traders
- **Statistical Reasoning**: Advanced variance analysis and confidence assessment
- **Methodological Analysis**: Evaluates convergence across different AI approaches

## 🛠️ Development

### Project Structure

```
opensea_nft_pricing_consensus/
├── agent.py              # Main consensus agent
├── requirements.txt      # Dependencies
├── README.md            # This file
└── .env                 # Environment variables (create this)
```

### Key Classes

- **`ConsensusCoordinator`**: Main coordination engine
- **`ConsensusKnowledgeGraph`**: MeTTa-based reasoning system
- **`ASIOneLLM`**: ASI:One API integration
- **Data Models**: Structured communication protocols

### Testing

1. **Start all pricing agents** (ports 8009, 8010, 8011)
2. **Start consensus agent** (port 8012)
3. **Send test queries** via chat protocol
4. **Verify consensus logic** with different price scenarios

## 🔍 Monitoring

### Logging

The agent provides detailed logging:
- Agent discovery and connection status
- Pricing request/response cycles
- Consensus analysis details
- Challenge processes
- Error handling

### Session Management

- **Session Timeout**: 30 minutes of inactivity
- **Memory Management**: Automatic cleanup of expired sessions
- **State Persistence**: Maintains coordinator state per session

## 🎯 Future Enhancements

- **Historical Analysis**: Track pricing accuracy over time
- **Market Condition Awareness**: Adjust consensus rules based on volatility
- **Advanced Challenge Strategies**: More sophisticated outlier handling
- **Performance Optimization**: Parallel processing improvements
- **Web Interface**: Optional web UI for consensus monitoring

## 📚 Dependencies

- **uagents**: Decentralized agent framework
- **hyperon**: MeTTa symbolic reasoning runtime
- **openai**: ASI:One API client
- **Standard libraries**: asyncio, statistics, datetime, etc.

## 🤝 Contributing

This agent is part of the ETH-2025 NFT pricing ecosystem. It demonstrates advanced multi-agent coordination using symbolic reasoning and modern AI capabilities.

## 📄 License

Part of the ETH-2025 project demonstrating advanced AI agent coordination.

---

*Powered by MeTTa symbolic reasoning, ASI:One intelligence, and the uAgents framework*
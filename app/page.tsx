"use client";

import { useEffect, useRef, useState } from "react";

type Language = "ko" | "en" | "zh" | "ja";
type LeaderId = "ceo" | "cto" | "cmo";
type Role = "assistant" | "user";

type Message = {
  id: string;
  role: Role;
  content: string;
};

type LeaderContent = {
  name: string;
  role: string;
  intro: string;
  quick: string[];
};

type Dict = {
  badge: string;
  title: string;
  subtitle: string;
  languageLabel: string;
  leadersLabel: string;
  chatEyebrow: string;
  demoLabel: string;
  selected: string;
  starterLabel: string;
  inputPlaceholder: string;
  productsTitle: string;
  footer: string;
  leaders: Record<LeaderId, LeaderContent>;
  products: { name: string; desc: string; prompt: string }[];
};

const DICT: Record<Language, Dict> = {
  en: {
    badge: "S-WELL AGENT OS",
    title: "S-Well Agent OS",
    subtitle: "AI Infrastructure for Real-World Agents",
    languageLabel: "Language",
    leadersLabel: "Agent Leaders",
    chatEyebrow: "NOW ANSWERING:",
    demoLabel: "Live Demo UI",
    selected: "Selected",
    starterLabel: "Quick prompts",
    inputPlaceholder: "Ask about S-Well, AEGIO, DocStra, or CloudBot...",
    productsTitle: "PRODUCTS",
    footer: "S-WELL",
    leaders: {
      ceo: {
        name: "Jina Park CEO",
        role: "Vision · Investment",
        intro: "Hello. I am the CEO assistant agent for Jina Park. I can guide you through S-WELL's vision, investment narrative, and market direction.",
        quick: [
          "What is S-WELL's vision?",
          "Explain the investment story",
          "What is the public-sector strategy?",
          "What is the top goal this year?"
        ]
      },
      cto: {
        name: "KangHee Kim CTO",
        role: "Technology",
        intro: "Hello. I am the CTO assistant agent for KangHee Kim. I can explain product architecture, technical direction, and how the agent system works.",
        quick: [
          "What is AEGIO?",
          "Explain DocStra",
          "CloudBot Runtime",
          "Investment Overview"
        ]
      },
      cmo: {
        name: "SeungHee Bae CMO",
        role: "Marketing",
        intro: "Hello. I am the CMO assistant agent for SeungHee Bae. I can help with positioning, customer messaging, and brand strategy.",
        quick: [
          "Explain the brand message in one line",
          "Who is the first customer segment?",
          "What is the partnership strategy?",
          "How should the homepage be structured?"
        ]
      }
    },
    products: [
      { name: "AEGIO", desc: "Field safety and operations agent", prompt: "What is AEGIO?" },
      { name: "DocStra", desc: "Document workflow agent", prompt: "Explain DocStra" },
      { name: "CloudBot", desc: "Agent orchestration runtime", prompt: "CloudBot Runtime" },
      { name: "Investment", desc: "Investment overview", prompt: "Investment Overview" }
    ]
  },
  ko: {
    badge: "S-WELL AGENT OS",
    title: "S-Well Agent OS",
    subtitle: "AI Infrastructure for Real-World Agents",
    languageLabel: "Language",
    leadersLabel: "Agent Leaders",
    chatEyebrow: "현재 응답 중:",
    demoLabel: "Live Demo UI",
    selected: "선택됨",
    starterLabel: "추천 질문",
    inputPlaceholder: "S-Well, AEGIO, DocStra, CloudBot 등에 대해 질문해보세요...",
    productsTitle: "PRODUCTS",
    footer: "S-WELL",
    leaders: {
      ceo: {
        name: "박진아 CEO",
        role: "Vision · Investment",
        intro: "안녕하세요. 박진아 CEO 비서 에이전트입니다. 에스웰의 비전, 투자 포인트, 시장 진입 전략에 대해 안내드릴게요.",
        quick: [
          "에스웰의 비전은 무엇인가요?",
          "투자 포인트를 설명해 주세요",
          "공공시장 진입 전략은?",
          "올해 핵심 목표는 무엇인가요?"
        ]
      },
      cto: {
        name: "김강희 CTO",
        role: "Technology",
        intro: "안녕하세요. 김강희 CTO 비서 에이전트입니다. 제품 구조, 기술 개념, 에이전트 시스템 구현 방향을 설명드릴게요.",
        quick: [
          "AEGIO가 무엇인가요?",
          "DocStra를 설명해 주세요",
          "CloudBot Runtime",
          "Investment Overview"
        ]
      },
      cmo: {
        name: "배승희 CMO",
        role: "Marketing",
        intro: "안녕하세요. 배승희 CMO 비서 에이전트입니다. 시장 포지셔닝, 고객 메시지, 브랜드 전략에 대해 안내드리겠습니다.",
        quick: [
          "브랜드 메시지를 한 문장으로 설명해 주세요",
          "첫 고객군은 누구인가요?",
          "파트너십 전략은?",
          "홈페이지 메시지 구조를 추천해 주세요"
        ]
      }
    },
    products: [
      { name: "AEGIO", desc: "현장 안전·운영 에이전트", prompt: "AEGIO가 무엇인가요?" },
      { name: "DocStra", desc: "문서 워크플로우 에이전트", prompt: "DocStra를 설명해 주세요" },
      { name: "CloudBot", desc: "에이전트 오케스트레이션 런타임", prompt: "CloudBot Runtime" },
      { name: "Investment", desc: "투자 관점 개요", prompt: "Investment Overview" }
    ]
  },
  zh: {
    badge: "S-WELL AGENT OS",
    title: "S-Well Agent OS",
    subtitle: "面向真实世界智能体的 AI 基础设施",
    languageLabel: "Language",
    leadersLabel: "Agent Leaders",
    chatEyebrow: "当前应答:",
    demoLabel: "Live Demo UI",
    selected: "已选择",
    starterLabel: "推荐问题",
    inputPlaceholder: "欢迎询问 S-Well、AEGIO、DocStra 或 CloudBot...",
    productsTitle: "PRODUCTS",
    footer: "S-WELL",
    leaders: {
      ceo: {
        name: "朴珍雅 CEO",
        role: "Vision · Investment",
        intro: "您好，我是朴珍雅 CEO 助手智能体。我可以为您介绍 S-WELL 的愿景、投资逻辑和市场方向。",
        quick: [
          "S-WELL 的愿景是什么？",
          "请介绍投资逻辑",
          "公共市场策略是什么？",
          "今年的核心目标是什么？"
        ]
      },
      cto: {
        name: "金康熙 CTO",
        role: "Technology",
        intro: "您好，我是金康熙 CTO 助手智能体。我可以介绍产品架构、技术方向以及智能体系统实现方式。",
        quick: [
          "What is AEGIO?",
          "Explain DocStra",
          "CloudBot Runtime",
          "Investment Overview"
        ]
      },
      cmo: {
        name: "裴胜熙 CMO",
        role: "Marketing",
        intro: "您好，我是裴胜熙 CMO 助手智能体。我可以帮助您了解市场定位、客户信息和品牌策略。",
        quick: [
          "请用一句话说明品牌信息",
          "首个客户群是谁？",
          "合作伙伴策略是什么？",
          "首页结构该如何设计？"
        ]
      }
    },
    products: [
      { name: "AEGIO", desc: "现场安全与运营智能体", prompt: "What is AEGIO?" },
      { name: "DocStra", desc: "文档工作流智能体", prompt: "Explain DocStra" },
      { name: "CloudBot", desc: "智能体编排运行时", prompt: "CloudBot Runtime" },
      { name: "Investment", desc: "投资概览", prompt: "Investment Overview" }
    ]
  },
  ja: {
    badge: "S-WELL AGENT OS",
    title: "S-Well Agent OS",
    subtitle: "リアルワールドエージェントのための AI インフラ",
    languageLabel: "Language",
    leadersLabel: "Agent Leaders",
    chatEyebrow: "現在応答中:",
    demoLabel: "Live Demo UI",
    selected: "選択中",
    starterLabel: "おすすめ質問",
    inputPlaceholder: "S-Well、AEGIO、DocStra、CloudBot について質問してください...",
    productsTitle: "PRODUCTS",
    footer: "S-WELL",
    leaders: {
      ceo: {
        name: "パク・ジナ CEO",
        role: "Vision · Investment",
        intro: "こんにちは。パク・ジナ CEO の秘書エージェントです。S-WELL のビジョン、投資ストーリー、市場方向をご案内します。",
        quick: [
          "S-WELL のビジョンは何ですか？",
          "投資ストーリーを説明してください",
          "公共市場戦略は？",
          "今年の最重要目標は？"
        ]
      },
      cto: {
        name: "キム・ガンヒ CTO",
        role: "Technology",
        intro: "こんにちは。キム・ガンヒ CTO の秘書エージェントです。製品構造、技術方向、エージェントシステムの実装方法をご説明します。",
        quick: [
          "What is AEGIO?",
          "Explain DocStra",
          "CloudBot Runtime",
          "Investment Overview"
        ]
      },
      cmo: {
        name: "ベ・スンヒ CMO",
        role: "Marketing",
        intro: "こんにちは。ベ・スンヒ CMO の秘書エージェントです。市場ポジショニング、顧客メッセージ、ブランド戦略をご案内します。",
        quick: [
          "ブランドメッセージを一文で説明してください",
          "最初の顧客層は誰ですか？",
          "パートナー戦略は？",
          "ホームページ構成を提案してください"
        ]
      }
    },
    products: [
      { name: "AEGIO", desc: "現場安全・運用エージェント", prompt: "What is AEGIO?" },
      { name: "DocStra", desc: "文書ワークフローエージェント", prompt: "Explain DocStra" },
      { name: "CloudBot", desc: "エージェントオーケストレーション実行環境", prompt: "CloudBot Runtime" },
      { name: "Investment", desc: "投資概要", prompt: "Investment Overview" }
    ]
  }
};

const fallbackMap: Record<Language, Record<string, string>> = {
  en: {
    default: "This is a demo homepage for an agent-based company interface. It can later connect to an OpenAI API route on Vercel.",
    aegio: "AEGIO is positioned as an operational agent product connecting field devices, safety signals, dashboards, and response workflows.",
    docstra: "DocStra is best framed as a document workflow agent rather than only a writing tool.",
    cloudbot: "CloudBot Runtime is the orchestration runtime layer connecting agents, tools, and workflows.",
    investment: "The homepage itself can function as a live product demo, which strengthens the pitch to customers and investors."
  },
  ko: {
    default: "이 화면은 에이전트형 회사 홈페이지 데모입니다. 이후 Vercel 환경에서 OpenAI API와 연결할 수 있습니다.",
    aegio: "AEGIO는 현장 디바이스, 안전 신호, 대시보드, 대응 흐름을 연결하는 운영형 에이전트 제품으로 설명할 수 있습니다.",
    docstra: "DocStra는 단순 문서 작성 도구보다 문서 워크플로우 에이전트로 설명하는 편이 더 적합합니다.",
    cloudbot: "CloudBot Runtime은 여러 에이전트와 도구, 워크플로우를 연결하는 오케스트레이션 런타임 계층입니다.",
    investment: "홈페이지 자체가 제품 데모가 되도록 설계하면 투자자와 고객 설득력이 함께 올라갑니다."
  },
  zh: {
    default: "这是一个智能体公司主页演示，之后可以接入 Vercel 环境下的 OpenAI API。",
    aegio: "AEGIO 可被定义为连接现场设备、安全信号、仪表盘和响应流程的运营型智能体产品。",
    docstra: "DocStra 更适合被表述为文档工作流智能体，而不只是写作工具。",
    cloudbot: "CloudBot Runtime 是连接多个智能体、工具与工作流的编排运行时层。",
    investment: "如果首页本身就是产品演示入口，会同时提升客户和投资者的理解度。"
  },
  ja: {
    default: "これはエージェント型企業ホームページのデモです。今後 Vercel 環境で OpenAI API と接続できます。",
    aegio: "AEGIO は現場デバイス、安全シグナル、ダッシュボード、対応フローをつなぐ運用型エージェント製品です。",
    docstra: "DocStra は単なる作成ツールではなく、文書ワークフローエージェントとして説明する方が適切です。",
    cloudbot: "CloudBot Runtime は複数のエージェント、ツール、ワークフローをつなぐオーケストレーション実行層です。",
    investment: "ホームページそのものをデモにすると、顧客と投資家の両方に伝わりやすくなります。"
  }
};

const leaderOrder: LeaderId[] = ["ceo", "cto", "cmo"];
const languageOptions: { id: Language; label: string }[] = [
  { id: "ko", label: "한국어" },
  { id: "en", label: "English" },
  { id: "zh", label: "中文" },
  { id: "ja", label: "日本語" }
];

function getFallback(language: Language, text: string) {
  const query = text.toLowerCase();
  if (query.includes("aegio")) return fallbackMap[language].aegio;
  if (query.includes("docstra")) return fallbackMap[language].docstra;
  if (query.includes("cloudbot")) return fallbackMap[language].cloudbot;
  if (query.includes("invest") || query.includes("투자")) return fallbackMap[language].investment;
  return fallbackMap[language].default;
}

export default function Page() {
  const [language, setLanguage] = useState<Language>("en");
  const [leaderId, setLeaderId] = useState<LeaderId>("cto");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const currentDict = DICT[language];
  const currentLeader = currentDict.leaders[leaderId];
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: "intro", role: "assistant", content: currentLeader.intro }
  ]);

  useEffect(() => {
    setMessages([
      { id: `${language}-${leaderId}-intro`, role: "assistant", content: currentLeader.intro }
    ]);
  }, [language, leaderId, currentLeader.intro]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed || loading) return;

    const fallback = getFallback(language, trimmed);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, leaderId, message: trimmed, fallback })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.reply || fallback
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-fallback-${Date.now()}`,
          role: "assistant",
          content: fallback
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <div className="page-wrap">
        <section className="hero">
          <div className="hero-badge">✦&nbsp;&nbsp;{currentDict.badge}</div>
          <h1 className="hero-title">{currentDict.title}</h1>
          <p className="hero-subtitle">{currentDict.subtitle}</p>
        </section>

        <section className="main-grid">
          <aside className="sidebar-card">
            <div className="sidebar-title">{currentDict.languageLabel}</div>
            <div className="language-grid">
              {languageOptions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLanguage(item.id)}
                  className={`lang-btn ${language === item.id ? "is-active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="sidebar-title section-gap">{currentDict.leadersLabel}</div>
            <div className="leaders-list">
              {leaderOrder.map((id) => {
                const leader = currentDict.leaders[id];
                const active = id === leaderId;
                const src = id === "ceo" ? "/ceo.png" : id === "cto" ? "/cto.png" : "/cmo.png";

                return (
                  <button
                    key={id}
                    onClick={() => setLeaderId(id)}
                    className={`leader-card ${active ? "is-active" : ""}`}
                  >
                    <img src={src} alt={leader.name} className="leader-avatar" />
                    <div className="leader-copy">
                      <div className="leader-name">{leader.name}</div>
                      <div className="leader-role">{leader.role}</div>
                      {active && <span className="leader-badge">{currentDict.selected}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="content-col">
            <section className="chat-panel">
              <div className="chat-header">
                <div>
                  <div className="chat-eyebrow">{currentDict.chatEyebrow}</div>
                  <h2 className="chat-title">{currentLeader.name}</h2>
                </div>
                <div className="demo-pill">{currentDict.demoLabel}</div>
              </div>

              <div className="chat-body">
                <div ref={scrollRef} className="chat-scroll">
                  <div className="message-stack">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message-row ${message.role === "user" ? "is-user" : "is-assistant"}`}
                      >
                        <div className={`message-bubble ${message.role === "user" ? "user" : "assistant"}`}>
                          {message.content}
                        </div>
                      </div>
                    ))}

                    {loading && (
                      <div className="message-row is-assistant">
                        <div className="message-bubble assistant">...</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="quick-area">
                  <div className="quick-title">{currentDict.starterLabel}</div>
                  <div className="quick-list">
                    {currentLeader.quick.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="quick-chip"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="input-shell">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage(input);
                    }}
                    placeholder={currentDict.inputPlaceholder}
                    className="chat-input"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="send-button"
                  >
                    ↑
                  </button>
                </div>
              </div>
            </section>

            <section className="products-panel">
              <div className="products-title">{currentDict.productsTitle}</div>
              <div className="products-grid">
                {currentDict.products.map((product) => (
                  <button
                    key={product.name}
                    onClick={() => sendMessage(product.prompt)}
                    className="product-card"
                  >
                    <div className="product-name">{product.name}</div>
                    <div className="product-desc">{product.desc}</div>
                  </button>
                ))}
              </div>
            </section>

            <div className="footer-mark">{currentDict.footer}</div>
          </div>
        </section>
      </div>
    </main>
  );
}

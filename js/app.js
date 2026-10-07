// AP Tech Master - メインアプリケーションコア
// 状態管理（LocalStorage）、ルーター、ボトムナビ、画面マウント制御

import { renderLabView } from "./views/lab-view.js";
import { renderQuestView } from "./views/quest-view.js";
import { renderDrillView } from "./views/drill-view.js";
import { renderLogicView } from "./views/logic-view.js";
import { renderDashboardView } from "./views/dashboard-view.js";

const STORAGE_KEY = "AP_TECH_MASTER_STATE_V1";

// 初期ステート
const defaultState = {
  currentTab: "lab",
  currentLabId: "db-normalize",
  exp: 140, // FE合格済みのご褒美初期値
  clearedQuests: [],
  needsReviewQuestionIds: ["q-db-norm-1", "q-net-cidr-1"],
  bookmarkedQuestionIds: ["q-db-tx-2", "q-net-tcp-1"]
};

class App {
  constructor() {
    this.state = this.loadState();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to load state from localStorage:", e);
    }
    return { ...defaultState };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save state to localStorage:", e);
    }
    this.updateHeaderStats();
  }

  initElements() {
    this.appContainer = document.getElementById("app-container");
    this.mainContent = document.getElementById("main-content");
    this.topExpBadge = document.getElementById("top-exp-badge");
    this.topLevelBadge = document.getElementById("top-level-badge");
    this.deviceFrameWrapper = document.getElementById("device-frame-wrapper");
    this.navButtons = document.querySelectorAll(".nav-btn");
  }

  bindEvents() {
    // ボトムナビ切替
    this.navButtons.forEach((btn) => {
      btn.onclick = () => {
        const tab = btn.getAttribute("data-tab");
        this.switchTab(tab);
      };
    });
  }

  updateHeaderStats() {
    const exp = this.state.exp || 0;
    const level = Math.floor(exp / 100) + 1;
    if (this.topExpBadge) this.topExpBadge.textContent = `${exp} EXP`;
    if (this.topLevelBadge) this.topLevelBadge.textContent = `Lv.${level}`;
  }

  switchTab(tab, extraParam = null) {
    this.state.currentTab = tab;
    this.saveState();

    // ナビボタンのハイライト更新
    this.navButtons.forEach((btn) => {
      const bTab = btn.getAttribute("data-tab");
      if (bTab === tab) {
        btn.classList.add("text-indigo-600");
        btn.classList.remove("text-slate-400");
        btn.querySelector(".nav-indicator")?.classList.remove("opacity-0");
      } else {
        btn.classList.remove("text-indigo-600");
        btn.classList.add("text-slate-400");
        btn.querySelector(".nav-indicator")?.classList.add("opacity-0");
      }
    });

    // 画面の再マウント
    this.renderView(tab, extraParam);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  renderView(tab, extraParam) {
    this.mainContent.innerHTML = "";

    const onUpdate = (newState) => {
      this.state = { ...this.state, ...newState };
      this.saveState();
    };

    if (tab === "lab") {
      renderLabView(this.mainContent, this.state, (targetTab) => this.switchTab(targetTab));
    } else if (tab === "quest") {
      renderQuestView(this.mainContent, this.state, onUpdate);
    } else if (tab === "drill") {
      renderDrillView(this.mainContent, this.state, onUpdate, (etyId) => {
        this.switchTab("logic", { initialTab: "etymology", etyId });
      });
    } else if (tab === "logic") {
      const initialTab = (extraParam && extraParam.initialTab) || "etymology";
      const etyId = extraParam ? extraParam.etyId : null;
      renderLogicView(this.mainContent, this.state, initialTab, etyId);
    } else if (tab === "dashboard") {
      renderDashboardView(this.mainContent, this.state, () => {
        this.state = { ...defaultState };
        this.saveState();
        this.render();
      });
    }
  }

  render() {
    this.applyFrameMode();
    this.updateHeaderStats();
    this.switchTab(this.state.currentTab);
  }
}

// アプリ起動
window.addEventListener("DOMContentLoaded", () => {
  new App();
});

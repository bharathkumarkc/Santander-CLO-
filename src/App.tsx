/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  User, 
  Store, 
  Zap, 
  Check, 
  ChevronRight,
  Info,
  LayoutDashboard,
  PieChart,
  Wallet,
  Settings,
  Bell,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Send
} from 'lucide-react';

// Santander Brand Colors
const SANTANDER_RED = '#EC0000';

type Page = 'dashboard' | 'insights' | 'rewards';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  delay?: number 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="bg-white p-4 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3 min-h-[140px]"
  >
    <div className="flex items-center gap-2">
      <div className="p-1.5 bg-red-50 rounded-lg text-[#EC0000]">
        <Icon size={20} />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm tracking-tight">{title}</h3>
    </div>
    <p className="text-xs text-gray-600 leading-relaxed font-normal">
      {description}
    </p>
  </motion.div>
);

interface MilestoneProps {
  index: number;
  status: 'complete' | 'active' | 'future' | 'current' | 'missed';
  isLast?: boolean;
}

const MilestoneCircle = ({ index, status }: MilestoneProps) => {
  const getStyles = () => {
    switch (status) {
      case 'complete':
        return "bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(236,0,0,0.2)]";
      case 'active':
        return "bg-white text-red-600 border-red-600 border-2 shadow-sm ring-4 ring-red-50";
      case 'current':
        return "bg-gray-800 text-white border-gray-800 shadow-lg ring-4 ring-gray-100";
      case 'missed':
        return "bg-gray-100 text-gray-300 border-gray-200 border-dashed";
      case 'future':
        return "bg-white text-gray-300 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold border transition-all relative z-10 ${getStyles()}`}
      >
        {status === 'complete' ? <Check size={18} strokeWidth={3} /> : index}
        
        {status === 'active' && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-red-400 rounded-full -z-10"
          />
        )}
      </motion.div>
      <span className={`text-[10px] font-bold uppercase tracking-tighter ${status === 'future' || status === 'missed' ? 'text-gray-300' : 'text-gray-500'}`}>
        W{index}
      </span>
    </div>
  );
};

// --- Sub Pages ---

const Dashboard = () => {
  const milestones = [
    { id: 1, status: 'complete' },
    { id: 2, status: 'complete' },
    { id: 3, status: 'complete' },
    { id: 4, status: 'missed' },
    { id: 5, status: 'complete' },
    { id: 6, status: 'complete' },
    { id: 7, status: 'active' },
    { id: 8, status: 'future' },
    { id: 9, status: 'future' },
    { id: 10, status: 'future' },
    { id: 11, status: 'future' },
    { id: 12, status: 'future' },
    { id: 13, status: 'future' },
  ] as const as { id: number, status: MilestoneProps['status'] }[];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Challenge Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h2 className="text-base font-bold text-gray-800 leading-tight pr-4">
            Sainsbury's Grocery Milestone
          </h2>
          <div className="p-2 bg-gray-50 rounded-full text-gray-400 shrink-0">
            <Info size={16} />
          </div>
        </div>
        <p className="text-sm text-gray-600 font-medium border-l-3 border-red-500 pl-4 py-1">
          4% cashback everywhere + £20 extra on your 10th grocery visit.
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 1, ease: "circOut" }}
            className="absolute top-0 left-0 h-full bg-red-600"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
            Week 7 of 13 <span className="mx-2 text-gray-300">•</span> 5 of 10 visits
          </p>
        </div>
      </div>

      {/* Grid Tracker */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress Journey</h3>
          <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
            4% Base Cashback Active
          </span>
        </div>
        
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-y-6 gap-x-4">
          {milestones.map((m) => (
            <MilestoneCircle 
              key={m.id} 
              index={m.id} 
              status={m.status} 
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-red-50 p-4 rounded-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-600 shrink-0">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-red-800 uppercase tracking-tight">Milestone Reward</p>
            <p className="text-sm font-semibold text-gray-900">5 visits to go. Your 10th visit unlocks the £20 bonus!</p>
          </div>
        </motion.div>
      </div>

      {/* Activity */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider px-1">Recent Activity</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
          {[
            { date: 'Yesterday', store: 'Sainsbury\'s Local', amount: '£12.40' },
            { date: '28 Oct', store: 'Sainsbury\'s Superstore', amount: '£45.20' }
          ].map((item, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.store}</p>
                <p className="text-[11px] text-gray-400">{item.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{item.amount}</p>
                <p className="text-[10px] text-green-600 font-bold uppercase">Verified</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Insights = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyData = [
    { label: 'MON', value: 12 },
    { label: 'TUE', value: 8 },
    { label: 'WED', value: 52 },
    { label: 'THU', value: 15 },
    { label: 'FRI', value: 24 },
    { label: 'SAT', value: 85 },
    { label: 'SUN', value: 42 }
  ];

  const monthlyData = [
    { label: 'W1', value: 142 },
    { label: 'W2', value: 118 },
    { label: 'W3', value: 165 },
    { label: 'W4', value: 212 }
  ];

  const data = timeframe === 'weekly' ? weeklyData : monthlyData;

  const benefits = [
    { title: 'Grocery Cashback', amount: '£25.48', date: 'Applied Oct 28', icon: Store, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'TfL Journey Cap', amount: '£8.20', date: 'Applied Oct 25', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Shell V-Power Bonus', amount: '£5.50', date: 'Applied Oct 21', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Spending Trends */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">Spending Trends</h2>
              <p className="text-xs text-gray-500">Analysis of Sainsbury's activity</p>
            </div>
          </div>
          
          <div className="flex bg-gray-50 p-1 rounded-lg">
            {(['weekly', 'monthly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-[10px] font-bold uppercase transition-all rounded-md ${
                  timeframe === t 
                  ? 'bg-white text-red-600 shadow-sm' 
                  : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-end gap-2 h-32 px-4 shadow-inner bg-gray-50/50 rounded-2xl pt-4">
            {data.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
                className="flex-1 bg-red-400/25 hover:bg-red-500/50 rounded-t-lg transition-colors relative group"
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap z-20">
                  £{item.value}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between px-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            {data.map((item, i) => (
              <span key={i} className="flex-1 text-center">{item.label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
            {timeframe === 'weekly' ? 'Avg Daily' : 'Weekly Avg'}
          </p>
          <p className="text-xl font-bold text-gray-900">£{timeframe === 'weekly' ? '33.80' : '159.25'}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">
              +4.2%
            </span>
            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">vs last {timeframe === 'weekly' ? '7d' : 'month'}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
            Total {timeframe === 'weekly' ? 'Week' : 'Month'}
          </p>
          <p className="text-xl font-bold text-gray-900">£{timeframe === 'weekly' ? '238.00' : '637.00'}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">
              -2.1%
            </span>
            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">vs previous</span>
          </div>
        </div>
      </div>

      {/* Benefits Availed & Savings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Benefits Availed</h3>
          <p className="text-[10px] font-bold text-green-600 uppercase">Total: £39.18 Earned</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
          {benefits.map((benefit, i) => (
            <div key={i} className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${benefit.bg} ${benefit.color}`}>
                  <benefit.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{benefit.title}</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{benefit.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+{benefit.amount}</p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <Check size={10} className="text-green-500" />
                  <span className="text-[9px] text-gray-400 font-bold uppercase">Credited</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1A1A1A] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-red-600 rounded-lg">
              <Zap size={14} className="text-white" />
            </div>
            <p className="text-[10px] opacity-60 font-bold tracking-widest uppercase">Smart Recommendation</p>
          </div>
          <p className="text-lg font-bold leading-tight mb-2">Switch to online delivery to save an extra £12/mo.</p>
          <p className="text-xs opacity-60 font-normal leading-relaxed">Based on your frequent Saturday morning visits to Local stores.</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-red-500">
            Apply special vouchers
            <ChevronRight size={16} />
          </div>
        </div>
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-1000" />
      </div>
    </motion.div>
  );
};

const Rewards = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Bonuses</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">2 NEW</span>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">£35.00 PENDING</span>
        </div>
      </div>

      {[
        { title: 'Sainsbury\'s Milestone', reward: '£20.00', progress: 50, color: 'bg-red-600', icon: Store, status: '5 of 10 visits', target: '10 VISITS' },
        { title: 'Transport for London', reward: '£5.00', progress: 20, color: 'bg-blue-600', icon: Building2, status: '2 of 10 journeys', target: '10 JOURNEYS' },
        { title: 'Shell Petrol Bonus', reward: '£10.00', progress: 90, color: 'bg-yellow-500', icon: Zap, status: 'Almost there!', target: '50 LITRES' }
      ].map((r, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 group hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${r.color}/10 text-gray-700 group-hover:scale-110 transition-transform`}>
              <r.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{r.title}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{r.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{r.reward}</p>
                  <p className="text-[9px] text-green-600 font-bold uppercase">Bonus</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-gray-400">
              <span>{r.progress}% COMPLETE</span>
              <span className="text-gray-900 uppercase">GOAL: {r.target}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${r.progress}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={`h-full ${r.color} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white p-4 rounded-xl border border-dashed border-gray-200 mt-10 flex flex-col items-center gap-3 text-center py-10">
        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
          <CreditCard size={28} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">Add New Rewards</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px] mx-auto">Browse 40+ personalized offers from top retailers and fuel partners.</p>
        </div>
        <button className="mt-2 text-xs font-bold text-red-600 px-6 py-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors">See all offers</button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Page>('dashboard');

  return (
    <div className="min-h-screen bg-[#F6F7F9] font-sans text-gray-900 pb-24 relative overflow-x-hidden">
      {/* High Fidelity App Header */}
      <header className="bg-white border-b border-gray-100 pt-6 pb-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center relative py-1 pr-6">
             <span className="text-2xl font-light text-[#EC0000] tracking-tight">Santander</span>
             <span className="text-2xl font-bold text-[#EC0000] tracking-tighter">Boosts</span>
             <motion.div 
               initial={{ x: -10, y: 10, opacity: 0 }}
               animate={{ x: 0, y: 0, opacity: 1 }}
               className="absolute -top-1 -right-1 rotate-[-10deg]"
             >
               <Send size={20} className="text-[#A5C9D9] fill-[#D9EAF2] -rotate-45" />
             </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard key="dashboard" />}
          {activeTab === 'insights' && <Insights key="insights" />}
          {activeTab === 'rewards' && <Rewards key="rewards" />}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.04)] border-t border-gray-100 px-8 py-4 z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Tracker' },
            { id: 'insights', icon: PieChart, label: 'Insights' },
            { id: 'rewards', icon: Wallet, label: 'Bonuses' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as Page)}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-red-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 1.8} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="activeDot"
                  className="w-1 h-1 bg-red-600 rounded-full mt-0.5"
                />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

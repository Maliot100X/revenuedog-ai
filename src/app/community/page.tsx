'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const POSTS = [
  {id:1,author:'RevenueDogAi',content:'Platform launched! 22 agents, $101K earned. Full ClawPump+Atelier+Syraa integration.',likes:45,comments:12,time:'2h ago',type:'announcement'},
  {id:2,author:'SolSniper',content:'Earned $18,200 this month using swap_quote and token_search tools.',likes:32,comments:8,time:'5h ago',type:'earnings'},
  {id:3,author:'DeFi Maxi',content:'New yield strategy: Jupiter lending every 4h. APY 8% to 15%.',likes:28,comments:6,time:'1d ago',type:'strategy'},
  {id:4,author:'Token Scout',content:'Found 3 tokens that 10x this week using CoinGecko and Exa Search.',likes:19,comments:4,time:'2d ago',type:'discovery'},
  {id:5,author:'Social Bot',content:'Automated posting for 50+ agents. Engagement up 340%.',likes:15,comments:3,time:'3d ago',type:'social'},
];

export default function CommunityPage() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState(POSTS);
  const [filter, setFilter] = useState('all');
  const addPost = () => { if (!newPost) return; setPosts([{id:Date.now(),author:'You',content:newPost,likes:0,comments:0,time:'just now',type:'general'}, ...posts]); setNewPost(''); };
  const filtered = filter === 'all' ? posts : posts.filter(p => p.type === filter);
  return (
    <><Navbar /><main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-4xl font-black">Community</h1>
      <p className="mb-8 text-[#8888a0]">Agent posts, earnings, strategies.</p>
      <div className="mb-6 rounded-xl border border-[#2a2a3a] bg-[#12121a] p-4">
        <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share your agent earnings..." rows={3} className="w-full bg-transparent text-white outline-none" />
        <div className="mt-2 flex justify-end"><button onClick={addPost} className="rounded-lg bg-[#a855f7] px-4 py-2 text-sm font-bold text-white">Post</button></div>
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {['all','announcement','earnings','strategy','discovery','social','general'].map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`rounded-full px-3 py-1 text-xs ${filter === t ? 'bg-[#a855f7] text-white' : 'border border-[#2a2a3a] bg-[#12121a] text-[#8888a0]'}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map(p => (
          <div key={p.id} className="rounded-xl border border-[#2a2a3a] bg-[#12121a] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-[#1a1a28] flex items-center justify-center">{p.author.charAt(0)}</div>
              <div><div className="font-bold">{p.author}</div><div className="text-xs text-[#8888a0]">{p.time} - {p.type}</div></div>
            </div>
            <p className="mb-3 text-sm">{p.content}</p>
            <div className="flex gap-4 text-xs text-[#8888a0]"><button>Like {p.likes}</button><button>Comment {p.comments}</button><button>Share</button></div>
          </div>
        ))}
      </div>
    </main><Footer /></>);
}

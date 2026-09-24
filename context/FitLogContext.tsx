'use client';
import {createContext,useContext,useEffect,useMemo,useState} from 'react';
import type {Workout} from '@/lib/data';

type Ctx={plan:Workout[];saved:Workout[];done:number[];addToPlan:(w:Workout)=>void;save:(w:Workout)=>void;removeFromPlan:(id:number)=>void;removeSaved:(id:number)=>void;markDone:(id:number)=>void;toast:(msg:string)=>void};
const FitLogContext=createContext<Ctx|null>(null);
const read=(key:string)=>{if(typeof window==='undefined')return [];try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}};
export function FitLogProvider({children}:{children:React.ReactNode}){const [plan,setPlan]=useState<Workout[]>([]),[saved,setSaved]=useState<Workout[]>([]),[done,setDone]=useState<number[]>([]),[toastMsg,setToastMsg]=useState('');
useEffect(()=>{setPlan(read('fitlog-plan'));setSaved(read('fitlog-saved'));setDone(read('fitlog-done'))},[]);
useEffect(()=>{if(typeof window!=='undefined')localStorage.setItem('fitlog-plan',JSON.stringify(plan))},[plan]);useEffect(()=>{if(typeof window!=='undefined')localStorage.setItem('fitlog-saved',JSON.stringify(saved))},[saved]);useEffect(()=>{if(typeof window!=='undefined')localStorage.setItem('fitlog-done',JSON.stringify(done))},[done]);
const toast=(m:string)=>{setToastMsg(m);window.setTimeout(()=>setToastMsg(''),2200)};
const value=useMemo(()=>({plan,saved,done,toast:add=>toast(add),addToPlan:(w:Workout)=>{if(plan.some(x=>x.id===w.id)){toast('Already in today’s plan');return}if(plan.length>=5){toast('Today’s plan is full — 5 lifts max');return}setPlan(p=>[...p,w]);toast('Added to today’s plan')},save:(w:Workout)=>{if(saved.some(x=>x.id===w.id)){toast('Already saved');return}setSaved(p=>[...p,w]);toast('Saved for later')},removeFromPlan:(id:number)=>{setPlan(p=>p.filter(x=>x.id!==id));toast('Removed from today’s plan')},removeSaved:(id:number)=>{setSaved(p=>p.filter(x=>x.id!==id));toast('Removed from saved')},markDone:(id:number)=>{setDone(p=>p.includes(id)?p:[...p,id]);toast('Workout marked as done')},}),[plan,saved,done]);
return <FitLogContext.Provider value={value}>{children}<div className="hidden" data-toast={toastMsg}/><ToastPortal message={toastMsg}/></FitLogContext.Provider>}
function ToastPortal({message}:{message:string}){if(!message)return null;return <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#3d3d3d] bg-[#161616] px-5 py-3 text-sm font-bold shadow-2xl"><span className="mr-2 text-[#ccff00]">✓</span>{message}</div>}
export const useFitLog=()=>{const c=useContext(FitLogContext);if(!c)throw new Error('useFitLog must be inside FitLogProvider');return c};

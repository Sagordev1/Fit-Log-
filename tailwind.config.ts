import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./context/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink:'#070707', panel:'#111111', lime:'#ccff00', muted:'#a4a4a4' }, fontFamily:{display:['Arial Narrow','Impact','sans-serif'],sans:['Arial','Helvetica','sans-serif']} } }, plugins: [] };
export default config;

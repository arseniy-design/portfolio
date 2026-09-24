// Shared data for the homepage and /services, ported from the approved prototype (2026-09-23).

// Pixel icons: each row is a string, each character a colour from PAL, '.' is empty.

export const ICONS: string[][] = [
 ['....kkkk....','...kyyyyk...','..kyywyyyk..','..kyyyyyyk..','..kyyyyyyk..','...kyyyyk...','....kyyk....','....kssk....','....kssk....','.....kk.....'],
 ['............','............','.kkkkk.kkkkk','kwwwwkkwwwwk','kwsswkkwsswk','kwwwwkkwwwwk','kwsswkkwsswk','kwwwwkkwwwwk','kbbbbkkbbbbk','.kkkkkkkkkk.'],
 ['.....oo.....','....oooo....','....owwo....','.....oo.....','.kkk.oo.kkk.','kgggk..kgggk','kgwggkkggwgk','kggwggggwggk','kgggwwwwgggk','.kkkkkkkkkk.'],
 ['..kkkkkk....','.kssssssk...','.kssssssk...','..kkkrkk....','.....rk.....','.....rk.....','.....rk.....','.....rk.....','.....rk.....','.....kk.....'],
 ['.....kk.....','.....ok.....','..kkkkkkkk..','.kbbbbbbbbk.','.kbwkbbwkbk.','.kbbbbbbbbk.','.kbbkkkkbbk.','.kbbbbbbbbk.','..kkkkkkkk..','...kk..kk...'],
 ['..kkkkkkk...','..kooooook..','..koooook...','..kooooook..','..kkkkkkk...','..k.........','..k.........','..k.........','..k.........','.kkk........'],
 ['............','.........oo.','.........oo.','......nn.oo.','......nn.oo.','...nn.nn.oo.','...nn.nn.oo.','nn.nn.nn.oo.','nn.nn.nn.oo.','kkkkkkkkkkkk'],
];

export const STEPS: [string,string][] = [['Inspire','Show everyone what AI can do today.'],['Educate','Hands on the tools, on their own files.'],['Map','What stays human, what goes to the machine.'],['Rebuild','Fix the process before automating it.'],['Build','Build the tool for the new process.'],['Implement','Put it in the team’s hands.'],['Track','Measure the number until it moves.']];

export const ART: Record<string,string> = {
 tech:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"><path d="M40 132h160"/><rect x="70" y="36" width="36" height="96"/><rect x="134" y="84" width="36" height="48"/><path class="a" d="M118 36v48M113 36h10M113 84h10" /><text class="a t" x="126" y="64">gap</text><text class="t" x="88" y="148" text-anchor="middle">You think</text><text class="t" x="152" y="148" text-anchor="middle">Verified</text></svg>`,
 fin:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="28" y="40" width="100" height="80"/><path d="M28 60h100M28 80h100M28 100h100M61 40v80M94 40v80"/><path class="a" d="M140 80h26M160 74l6 6-6 6"/><rect x="176" y="56" width="44" height="48" rx="10"/><path class="a" d="M198 68v24M186 80h24M190 72l16 16M206 72l-16 16"/></svg>`,
 build:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M60 128h120"/><rect x="72" y="100" width="96" height="28"/><rect x="84" y="72" width="72" height="28"/><rect class="a" x="98" y="44" width="44" height="28"/><path d="M52 44v84M48 44h8M48 128h8" stroke-dasharray="3 4"/><path d="M186 44h-26" stroke-dasharray="3 4"/></svg>`,
 speak:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="108" y="34" width="24" height="46" rx="12"/><path d="M98 66a22 22 0 0 0 44 0M120 88v24M104 112h32"/><path class="a" d="M156 46a34 34 0 0 1 0 44M170 34a52 52 0 0 1 0 68M84 46a34 34 0 0 0 0 44M70 34a52 52 0 0 0 0 68"/><path d="M40 136h160"/></svg>`,
 ai:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="58" y="48" width="124" height="78" rx="4"/><path d="M40 134h160l-10-8H50z"/><path d="M76 72h52M76 88h36M76 104h44"/><path class="a" d="M142 34h56a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8h-36l-12 10v-10h-8a8 8 0 0 1-8-8V42a8 8 0 0 1 8-8z"/></svg>`,
 career:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="48" cy="120" r="6"/><path d="M54 120h50c20 0 30-10 40-26"/><path d="M104 120c24 0 44 0 76 0" stroke-dasharray="3 5"/><path class="a" d="M144 94c10-18 22-40 44-54M178 38l10 2-2 10"/></svg>`,
 money:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="80" cy="120" rx="30" ry="8"/><path d="M50 120v-12M110 120v-12"/><ellipse cx="80" cy="108" rx="30" ry="8"/><path d="M50 108v-12M110 108v-12"/><ellipse cx="80" cy="96" rx="30" ry="8"/><path d="M130 128h80M130 128V40"/><path class="a" d="M138 112l20-14 16 8 28-34M194 72h8v8"/></svg>`,
 brand:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="40" y="30" width="160" height="104" rx="6"/><path d="M40 48h160"/><circle cx="52" cy="39" r="2"/><circle cx="60" cy="39" r="2"/><circle class="a" cx="84" cy="84" r="18"/><path class="a" d="M70 104c4-8 24-8 28 0"/><path d="M116 72h60M116 86h44M116 100h52"/></svg>`,
 chat:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="84" y="20" width="72" height="124" rx="12"/><path d="M96 48h40a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H96z"/><path class="a" d="M144 80h-40a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h40z"/><path class="a" d="M116 86l8 5-8 5z"/><path d="M96 112h30"/></svg>`,
 stack:`<svg viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M60 128h120"/><rect x="72" y="104" width="96" height="24"/><rect x="80" y="80" width="84" height="24"/><rect class="a" x="76" y="56" width="90" height="24"/><path d="M92 92h40M88 68h36M86 116h52"/></svg>`
};

export const ORG = [
 {k:'tech',who:'For tech teams',t:'You built AI. Is it paying off?',img:'speaking',tag:'<i>$1.6B</i> practice at Baird',line:'I put a money figure on what your AI is worth, and tell you what to scale and what to switch off.',proof:'Five years at Baird, in a practice of four with $1.6B under management by the final year.',featured:1,plan:'The first three weeks',tl:[['Week 1','Your team answers 24 questions about where you are. 20 minutes each.'],['Week 1 to 2','I interview 8 to 12 people and check the answers against what you can actually show.'],['Week 3','You get the gap report: two scores, what the gap costs, and the first thing to build.']]},
 {k:'fin',who:'For finance teams',t:'You want AI. Where do you start?',img:'/pif-training.jpg',tag:'<i>5 hours</i> a week saved per person',line:'I take your team from the first session to a working tool, in seven steps.',proof:'PIF and Kyowa Kirin: 5 hours a week saved per person.',plan:'How it runs',tl:[['Weeks 1 to 2','Two hands-on sessions. Your team uses AI on its own files.'],['Weeks 3 to 4','We map the work: what stays human, what goes to the machine, what stops existing.'],['Month 2','I build one tool for the new process and measure where you start.'],['60 days later','We measure again. It is not built until the number moves.']]},
 {k:'build',who:'For product teams',t:'You have an idea. Who builds it?',img:'innovation-stage',tag:'<i>6,000+</i> users',line:'Products, programs and courses, built and handed to your team.',proof:'Five products at Rebundle. 6,000+ users.'},
 {k:'speak',who:'For events',t:'You have a stage. Who speaks?',img:'baku-stage',tag:'<i>70+</i> institutions',line:'Talks on finance, AI and how people decide.',proof:'Five teaching awards. 70+ institutions.'},
];

export const IND = [
 {k:'ai',who:'1:1 AI',t:'Set up AI for your work',tt:'Set up AI<br>for your work',art:'ai',line:'On your own laptop, with your own files.',proof:'38 students, 38 live sites shipped in my IE New York course.'},
 {k:'career',who:'Career',t:'Plan your next career move',art:'career',line:'I read your profile like a hiring manager. Then we plan the move.',proof:'“In two weeks, through just two Zoom meetings, Arseniy helped me reframe my CV and career story.” Slobodan Marković, OneTrust'},
 {k:'brand',who:'Personal brand',t:'Build your brand and portfolio',art:'brand',line:'Your story, your profile and your own portfolio site, built with you.',proof:'This site is the working example.'},
 {k:'money',who:'Personal finance',t:'Understand your own money',art:'money',line:'Learn to manage your own money. Education only, no investment advice.',proof:'Five years in private wealth at Baird. 42 free lessons.'},
];

export const JOURNEY = [
 {y:'2011 to 2015',img:'/journey/osu.jpg',cap:'Oregon State University · Student panel',t:'Oregon State',n:'BS',l:'Finance and international business',d:'Two subjects that never left. How money moves, and how people differ across borders.',p:'Internships at Robert W. Baird & Co. and State Farm, 2014.'},
 {y:'2015 to 2020',img:'/baird-team.jpg',cap:'The practice, 2019 · Portland, Oregon',t:'Robert W. Baird',n:'$1.6B',l:'AUM in the final year',d:'Senior Financial Consultant. Private wealth management and corporate investment consulting, on the investment committee for 4 private and 40+ corporate portfolios, in a practice of four.',p:'100+ financial plans, 90% met. 50% practice growth.'},
 {y:'2020 to 2021',img:'/lecture-hall.jpg',cap:'Teaching in Baku · Academy of Public Administration',t:'IE Business School',n:'MBA',l:'Master in Digital Business',d:'Finance stayed. The question changed, from what to invest in to what to build.',p:'A six-month consulting project in Johannesburg. Two MVP-stage startups.'},
 {y:'2021 to 2026',img:'/baku-stage.jpg',cap:'SABAH Hub · Baku',t:'Build, advise, teach',n:'$2.7M',l:'Raised into SABAH.HUB by year three',d:'Five innovation programs, three startups, one consultancy and one AI in Finance program, across six countries. Flow Strategy Consulting, Emzingo, Opinno, Rebundle, ThePowerMBA.',p:'$500K closed across 25 advisory agreements. 5.0 / 5.0 rating and 68 NPS in IE Executive Programs.'},
 {y:'2026 to now',img:'/pif-training.jpg',cap:'IE and PIF in-house training · AI in Practice',t:'New York',n:'AI',l:'in finance',d:'Academic Director of AI in Finance at IE. Professor at IE New York College. Working with companies on the real value of AI.',p:'Speaking on what drives behavior and decisions.'}
];

export const QUOTES: [string,string,string][] = [
 ['Arseniy served as the Project Lead for a major initiative on the Azerbaijani entrepreneurial ecosystem, coordinating faculty from IE Business School and Stanford. He was an indispensable source of information as well as a connector.','Mike Grandinetti','Faculty · MIT, Harvard, Hult · ex-McKinsey'],
 ['He managed to put all the content in a structured, thorough and in-depth package, not less than 70 F&A lessons presented in an easy, understandable, and extremely practical way. By far the best finance course I have ever had.','Marta Morillo Rodríguez','CEO · INNCISO · ThePowerMBA'],
 ['In two weeks, through just two Zoom meetings, Arseniy helped me reframe my CV and career story. I was noticed immediately by the first company I applied to after working with him.','Slobodan Marković','Data & Privacy · OneTrust'],
 ['Thanks for making Finance & Accounting so easy. You made a dry subject really engaging and interactive. I even enjoyed the Excel challenges.','Anuja Bhatnagar Tapkir','VP · J.P. Morgan'],
 ['His clarity in conveying the vision and expectations facilitated an effective and timely deployment. A truly inspiring leader.','Gabriela Olivera','TEC Venture Builder · Mexico'],
 ['Among all the people I have met, Arseniy shines due to his remarkable ability to communicate with compassion, conviction, and elegance.','Agil Zakariya','Brand Management · Procter & Gamble'],
];

export const PAL = (acc = '#A8322D'): Record<string,string> => ({k:'#111214',o:acc,r:acc,y:'#F2D9A6',w:'#FFFFFF',g:'#2B3440',b:'#2B3440',n:'#243349',s:'#B8BEC7',l:'#BFD4EE',p:'#F2C9A0',h:'#5A3B22',t:'#C99F7A'});
export function px(rows: string[], w: number, h: number): string {
  const P = PAL(); let r = '';
  rows.forEach((row, y) => [...row.padEnd(w, '.')].forEach((c, x) => { if (c !== '.') r += `<rect x="${x}" y="${y}" width="1" height="1" fill="${P[c]}"/>`; }));
  return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
}
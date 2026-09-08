import React,{useEffect,useRef,useState} from "react";
import {createRoot} from "react-dom/client";
import {ArrowUpRight,Menu,X,Sparkles,Box,Share2,PenTool} from "lucide-react";
import {motion,useMotionValue,useSpring} from "framer-motion";
import "./styles.css";

const fallbackSite={brand:"Pixcel Studio",eyebrow:"Independent graphic design studio",headline:"Design that makes brands impossible to ignore.",intro:"We build bold identities, packaging and social systems for brands that want to be remembered.",cta:"Start a project",email:"hello@pixcelstudio.com"};
const fallbackProjects=[
 {title:"NOVA Coffee",category:"Branding",image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1400&q=85",accent:"01"},
 {title:"Mori Skincare",category:"Packaging",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9c6a0a?auto=format&fit=crop&w=1400&q=85",accent:"02"},
 {title:"FWD Festival",category:"Social Media",image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85",accent:"03"}];
const fallbackTestimonials=[
 {quote:"Pixcel gave our brand a visual language that finally feels like us — confident, warm and unmistakable.",name:"Ananya Rao",role:"Founder, NOVA"},
 {quote:"The packaging looked premium before we even shipped the first box. The response from customers was immediate.",name:"Rohan Mehta",role:"Co-founder, Mori"}];
const services=[
 {icon:PenTool,symbol:"✦",title:"Branding",text:"Identity systems, logos, typography and visual worlds built to last."},
 {icon:Box,symbol:"◇",title:"Packaging",text:"Shelf-stopping packaging that turns a product into an experience."},
 {icon:Share2,symbol:"↗",title:"Social Media Creatives",text:"Scroll-stopping campaign systems made for modern feeds."}];

function useContent(){
 const [data,setData]=useState({site:fallbackSite,projects:fallbackProjects,testimonials:fallbackTestimonials});
 useEffect(()=>{Promise.all([
 fetch("/content/site.json").then(r=>r.ok?r.json():fallbackSite).catch(()=>fallbackSite),
 fetch("/content/projects.json").then(r=>r.ok?r.json():fallbackProjects).catch(()=>fallbackProjects),
 fetch("/content/testimonials.json").then(r=>r.ok?r.json():fallbackTestimonials).catch(()=>fallbackTestimonials)
 ]).then(([site,projects,testimonials])=>setData({site,projects,testimonials}));},[]);
 return data;
}
function Cursor(){const x=useMotionValue(-100),y=useMotionValue(-100),sx=useSpring(x,{stiffness:500,damping:30}),sy=useSpring(y,{stiffness:500,damping:30});useEffect(()=>{const m=e=>{x.set(e.clientX);y.set(e.clientY)};addEventListener("pointermove",m);return()=>removeEventListener("pointermove",m)},[]);return <motion.div className="cursor" style={{x:sx,y:sy}}><span/></motion.div>}
function Magnetic({children}){const ref=useRef(),[pos,setPos]=useState({x:0,y:0});return <div ref={ref} className="magnetic" onPointerMove={e=>{const r=ref.current.getBoundingClientRect();setPos({x:(e.clientX-r.left-r.width/2)*.22,y:(e.clientY-r.top-r.height/2)*.22})}} onPointerLeave={()=>setPos({x:0,y:0})} style={{transform:`translate3d(${pos.x}px,${pos.y}px,0)`}}>{children}</div>}
function App(){
 const {site,projects,testimonials}=useContent(),[menu,setMenu]=useState(false),[active,setActive]=useState("All");
 const filters=["All",...new Set(projects.map(p=>p.category))],visible=active==="All"?projects:projects.filter(p=>p.category===active);
 const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})};
 return <><Cursor/><div className="noise"/>
 <header className="nav"><button className="logo" onClick={()=>go("home")}><span className="logo-mark">P</span>{site.brand}</button>
 <nav className={menu?"nav-links open":"nav-links"}><button onClick={()=>go("work")}>Work</button><button onClick={()=>go("services")}>Services</button><button onClick={()=>go("about")}>About</button><button className="nav-cta" onClick={()=>go("contact")}>Let's talk <ArrowUpRight size={15}/></button></nav>
 <button className="menu-btn" aria-label="Menu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main>
 <section id="home" className="hero"><div className="orb orb-a"/><div className="orb orb-b"/><div className="hero-grid"/>
 <div className="hero-copy"><motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="eyebrow"><Sparkles size={14}/>{site.eyebrow}</motion.p>
 <motion.h1 initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.8}}>{site.headline}</motion.h1>
 <motion.p initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="hero-intro">{site.intro}</motion.p>
 <Magnetic><button className="primary" onClick={()=>go("contact")}>{site.cta}<ArrowUpRight/></button></Magnetic></div>
 <div className="hero-card"><div className="glass-card"><span className="mini-label">PIX / 001</span><div className="floating-shape shape-one">P</div><div className="floating-shape shape-two">✦</div><p>Ideas, distilled<br/><b>into identity.</b></p></div></div>
 <div className="scroll-hint">Scroll to explore <span>↓</span></div></section>

 <section id="work" className="section work"><div className="section-head"><div><span className="kicker">Selected work</span><h2>Built to be <i>seen.</i></h2></div><p>A curated selection of identities, packaging and campaign worlds.</p></div>
 <div className="filters">{filters.map(f=><button key={f} className={active===f?"active":""} onClick={()=>setActive(f)}>{f}</button>)}</div>
 <div className="work-grid">{visible.map((p,i)=><motion.article layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="project" key={p.title}><div className="project-image"><img src={p.image} alt={p.title}/><span className="project-no">{p.accent||String(i+1).padStart(2,"0")}</span><div className="project-hover">View project <ArrowUpRight/></div></div><div className="project-meta"><h3>{p.title}</h3><span>{p.category}</span></div></motion.article>)}</div></section>

 <section id="services" className="section services"><div className="section-head"><div><span className="kicker">What we do</span><h2>Small studio.<br/><i>Big energy.</i></h2></div><p>Strategy and design working together from first sketch to final pixel.</p></div>
 <div className="service-grid">{services.map(({icon:Icon,symbol,title,text},i)=><motion.div whileHover={{y:-8}} className="service glass-card" key={title}><div className="service-top"><span>{String(i+1).padStart(2,"0")}</span><span className="service-symbol">{symbol}</span></div><Icon className="service-icon"/><h3>{title}</h3><p>{text}</p><span className="service-line"/></motion.div>)}</div></section>

 <section id="about" className="section about"><div className="about-card glass-card"><span className="kicker">A little about Pixcel</span><h2>We turn <i>good ideas</i><br/>into visual obsessions.</h2><p>Pixcel Studio is an independent graphic design practice for ambitious founders and teams. We mix strategy, expressive typography, tactile details and digital-first thinking to create brands people remember.</p><div className="about-stats"><div><b>3</b><span>core disciplines</span></div><div><b>∞</b><span>creative directions</span></div><div><b>01</b><span>obsession: detail</span></div></div></div></section>

 <section className="section testimonials"><div className="section-head"><div><span className="kicker">Client words</span><h2>Kind words from<br/><i>good people.</i></h2></div></div><div className="quote-grid">{testimonials.map((t,i)=><motion.blockquote whileInView={{opacity:1,y:0}} initial={{opacity:0,y:25}} viewport={{once:true}} key={i} className="quote glass-card"><span className="quote-mark">“</span><p>{t.quote}</p><footer><b>{t.name}</b><span>{t.role}</span></footer></motion.blockquote>)}</div></section>

 <section id="contact" className="contact"><div className="contact-glow"/><span className="kicker">Have a project?</span><h2>Let's make<br/><i>something unforgettable.</i></h2><a className="email-link" href={`mailto:${site.email}`}>{site.email} <ArrowUpRight/></a></section>
 </main><footer className="footer"><span>© {new Date().getFullYear()} {site.brand}</span><span>Made with curiosity ✦</span><a href="/admin/">CMS Login</a></footer></>
}
createRoot(document.getElementById("root")).render(<App/>);
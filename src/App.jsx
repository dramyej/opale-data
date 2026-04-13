import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts";

const C = {
  deep: "#0c1e3c", navy: "#163a5f", sea: "#1a6fa0", sky: "#4ca8d4",
  foam: "#b8dff0", sand: "#f5f0e8", white: "#ffffff", offWhite: "#fafbfc",
  green: "#2d8a5e", red: "#c0392b", amber: "#d4880f",
  text: "#1a2a3a", muted: "#6b7d8d", border: "#dce4ea",
};
const PIE_C = [C.deep, C.sea, C.green, C.amber, C.red, C.muted];
const fmt = n => n == null ? "—" : n.toLocaleString("fr-FR");
const fmtEur = n => n == null ? "—" : n.toLocaleString("fr-FR") + " €";

const budgetData = [
  { mois:"Jan",prevu:125000,realise:118400 },{ mois:"Fév",prevu:125000,realise:131200 },
  { mois:"Mar",prevu:125000,realise:122800 },{ mois:"Avr",prevu:125000,realise:127600 },
  { mois:"Mai",prevu:125000,realise:119300 },{ mois:"Jun",prevu:125000,realise:134500 },
  { mois:"Jul",prevu:125000,realise:108200 },{ mois:"Aoû",prevu:125000,realise:96400 },
  { mois:"Sep",prevu:125000,realise:128900 },{ mois:"Oct",prevu:125000,realise:132100 },
  { mois:"Nov",prevu:125000,realise:138700 },
];
const depNature = [
  { name:"Personnel",val:682000 },{ name:"Charges gén.",val:298000 },
  { name:"Subventions",val:187000 },{ name:"Énergie",val:134000 },
  { name:"Restauration",val:112000 },{ name:"Autres",val:85100 },
];
const cantinesData = [
  { s:"S36",cmd:420,pres:378 },{ s:"S37",cmd:415,pres:371 },{ s:"S38",cmd:425,pres:389 },
  { s:"S39",cmd:410,pres:362 },{ s:"S40",cmd:418,pres:374 },{ s:"S41",cmd:430,pres:392 },
  { s:"S42",cmd:408,pres:358 },{ s:"S43",cmd:420,pres:380 },{ s:"S44",cmd:422,pres:385 },
  { s:"S45",cmd:412,pres:369 },
];
const energieData = [
  { m:"Jan",kwh:20300,temp:4.2 },{ m:"Fév",kwh:22800,temp:3.8 },{ m:"Mar",kwh:18000,temp:7.1 },
  { m:"Avr",kwh:11700,temp:11.3 },{ m:"Mai",kwh:7800,temp:14.8 },{ m:"Jun",kwh:5860,temp:17.2 },
  { m:"Jul",kwh:3070,temp:19.6 },{ m:"Aoû",kwh:5100,temp:19.1 },{ m:"Sep",kwh:7700,temp:16.4 },
  { m:"Oct",kwh:15500,temp:11.8 },{ m:"Nov",kwh:19500,temp:7.2 },
];

function MiniStat({ label, value, sub, accent }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 16px", flex:1, borderTop:`3px solid ${accent||C.sea}` }}>
      <div style={{ fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:"0.04em", fontWeight:600 }}>{label}</div>
      <div style={{ fontSize:22, fontWeight:700, color:C.deep, marginTop:4, fontFamily:"'Playfair Display',Georgia,serif" }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function DemoFinances() {
  const total = budgetData.reduce((s,m) => s+m.realise, 0);
  return (<div>
    <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
      <MiniStat label="Budget prévisionnel" value="1 500 000 €" sub="Fonctionnement 2025" accent={C.deep} />
      <MiniStat label="Réalisé (11 mois)" value={fmtEur(total)} sub={`${((total/1500000)*100).toFixed(0)}% consommé`} accent={C.green} />
      <MiniStat label="Reste à mandater" value={fmtEur(1500000-total)} accent={C.sea} />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:16 }}>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:16 }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.deep, marginBottom:12 }}>Exécution mensuelle</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={budgetData}><CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="mois" tick={{ fontSize:10, fill:C.muted }} /><YAxis tick={{ fontSize:10, fill:C.muted }} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v=>fmtEur(v)} contentStyle={{ fontSize:11, borderRadius:6 }} />
            <Bar dataKey="prevu" name="Prévu" fill="#e2e8f0" radius={[2,2,0,0]} /><Bar dataKey="realise" name="Réalisé" fill={C.sea} radius={[2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:16 }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.deep, marginBottom:12 }}>Répartition</div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart><Pie data={depNature} dataKey="val" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={38} paddingAngle={2}>
            {depNature.map((_,i)=><Cell key={i} fill={PIE_C[i]} />)}</Pie>
            <Tooltip formatter={v=>fmtEur(v)} contentStyle={{ fontSize:11, borderRadius:6 }} /><Legend iconSize={7} wrapperStyle={{ fontSize:10 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div style={{ marginTop:16, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background:C.red, flexShrink:0 }} />
      <div style={{ fontSize:12, color:C.text }}><strong>Alerte :</strong> Le poste Énergie & fluides est à 89% de consommation — projection de dépassement de 12 000 € en fin d'exercice.</div>
    </div>
  </div>);
}

function DemoCantines() {
  const totalCmd = cantinesData.reduce((s,w)=>s+w.cmd,0);
  const totalPres = cantinesData.reduce((s,w)=>s+w.pres,0);
  const gasp = totalCmd - totalPres;
  return (<div>
    <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
      <MiniStat label="Repas commandés (10 sem.)" value={fmt(totalCmd)} accent={C.sea} />
      <MiniStat label="Repas non consommés" value={fmt(gasp)} sub={`Coût : ${fmtEur(gasp*4.5)}`} accent={C.red} />
      <MiniStat label="Économie potentielle / an" value={fmtEur(Math.round(gasp*4.5*3.6))} accent={C.green} />
    </div>
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:16 }}>
      <div style={{ fontSize:13, fontWeight:600, color:C.deep, marginBottom:12 }}>Commandés vs. Présents</div>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={cantinesData}><CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="s" tick={{ fontSize:10, fill:C.muted }} /><YAxis tick={{ fontSize:10, fill:C.muted }} />
          <Tooltip contentStyle={{ fontSize:11, borderRadius:6 }} />
          <Area type="monotone" dataKey="cmd" name="Commandés" stroke={C.red} fill="#fee2e2" strokeWidth={2} />
          <Area type="monotone" dataKey="pres" name="Présents" stroke={C.green} fill="#d1fae5" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ textAlign:"center", fontSize:11, color:C.muted, marginTop:8 }}>L'écart entre les deux courbes = repas payés pour rien</div>
    </div>
  </div>);
}

function DemoEnergie() {
  return (<div>
    <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
      <MiniStat label="Conso totale (11 mois)" value="137 530 kWh" accent={C.sea} />
      <MiniStat label="Coût total" value="38 453 €" sub="Projection : ~42 000 €/an" accent={C.deep} />
      <MiniStat label="Anomalies détectées" value="2" accent={C.red} />
    </div>
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:8, padding:16 }}>
      <div style={{ fontSize:13, fontWeight:600, color:C.deep, marginBottom:12 }}>Consommation vs. Température</div>
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={energieData}><CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="m" tick={{ fontSize:10, fill:C.muted }} />
          <YAxis yAxisId="k" tick={{ fontSize:10, fill:C.muted }} tickFormatter={v=>`${(v/1000).toFixed(0)}k`} />
          <YAxis yAxisId="t" orientation="right" tick={{ fontSize:10, fill:C.amber }} unit="°" />
          <Tooltip contentStyle={{ fontSize:11, borderRadius:6 }} />
          <Line yAxisId="k" type="monotone" dataKey="kwh" name="kWh" stroke={C.sea} strokeWidth={2.5} dot={{ r:2.5 }} />
          <Line yAxisId="t" type="monotone" dataKey="temp" name="T°" stroke={C.amber} strokeWidth={2} strokeDasharray="5 5" dot={{ r:2.5 }} />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ marginTop:12, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"10px 14px", fontSize:12, color:C.text }}>
        <strong>🚨 Salle des fêtes — Août :</strong> 2 800 kWh vs 600 attendus. Chauffage resté actif ? Économie estimée : 616 €
      </div>
    </div>
  </div>);
}

function SimulateurEmprunt() {
  const [montant, setMontant] = useState(300000);
  const [duree, setDuree] = useState(15);
  const [taux, setTaux] = useState(3.5);

  const mensualite = (montant * (taux/100/12)) / (1 - Math.pow(1 + taux/100/12, -duree*12));
  const annuite = mensualite * 12;
  const coutTotal = annuite * duree;
  const interets = coutTotal - montant;

  // Simulate impact on a typical commune budget
  const epargneBrute = 180000; // typical for 5500 hab
  const detteActuelle = 1100000;
  const capaciteAvant = detteActuelle / epargneBrute;
  const capaciteApres = (detteActuelle + montant) / (epargneBrute - annuite);

  const projData = [];
  let restant = montant;
  for (let a = 0; a <= duree; a++) {
    projData.push({ annee: `A+${a}`, dette: Math.round(detteActuelle + restant), reference: detteActuelle });
    const interet = restant * (taux/100);
    const capital = annuite - interet;
    restant = Math.max(0, restant - capital);
  }

  const sl = (v, set, min, max, step, label, unit) => (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
        <span style={{ fontSize:12, color:C.muted, fontWeight:500 }}>{label}</span>
        <span style={{ fontSize:13, fontWeight:700, color:C.deep }}>{typeof v === "number" && v >= 1000 ? v.toLocaleString("fr-FR") : v} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e=>set(Number(e.target.value))}
        style={{ width:"100%", accentColor:C.sea, cursor:"pointer" }} />
    </div>
  );

  const dangerApres = capaciteApres > 12;
  const warningApres = capaciteApres > 9 && !dangerApres;

  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.05)" }}>
      <div style={{ background:`linear-gradient(135deg,${C.deep},${C.navy})`, padding:"14px 22px", color:C.white }}>
        <div style={{ fontWeight:700, fontSize:14, fontFamily:"'Playfair Display',Georgia,serif" }}>Simulateur interactif — Impact d'un emprunt</div>
        <div style={{ fontSize:11, opacity:0.6 }}>Déplacez les curseurs pour voir l'impact en temps réel sur les finances de votre commune</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:0 }}>
        {/* Controls */}
        <div style={{ padding:"20px 22px", borderRight:`1px solid ${C.border}`, background:"#f8fafc" }}>
          {sl(montant, setMontant, 50000, 1000000, 10000, "Montant de l'emprunt", "€")}
          {sl(duree, setDuree, 5, 25, 1, "Durée", "ans")}
          {sl(taux, setTaux, 1.5, 6.0, 0.1, "Taux d'intérêt", "%")}

          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14, marginTop:8 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
              <span style={{ color:C.muted }}>Annuité</span>
              <span style={{ fontWeight:700, color:C.deep }}>{fmtEur(Math.round(annuite))}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
              <span style={{ color:C.muted }}>Coût total des intérêts</span>
              <span style={{ fontWeight:700, color:C.amber }}>{fmtEur(Math.round(interets))}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
              <span style={{ color:C.muted }}>Capacité désendettement avant</span>
              <span style={{ fontWeight:700, color:C.green }}>{capaciteAvant.toFixed(1)} ans</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
              <span style={{ color:C.muted }}>Capacité désendettement après</span>
              <span style={{ fontWeight:700, color:dangerApres?C.red:warningApres?C.amber:C.green }}>{capaciteApres.toFixed(1)} ans</span>
            </div>
          </div>

          {dangerApres && (
            <div style={{ marginTop:12, padding:"8px 10px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:6, fontSize:11, color:C.red }}>
              ⚠️ Seuil d'alerte dépassé (12 ans). La Préfecture pourrait saisir la CRC.
            </div>
          )}
          {warningApres && !dangerApres && (
            <div style={{ marginTop:12, padding:"8px 10px", background:"#fffbeb", border:"1px solid #fde68a", borderRadius:6, fontSize:11, color:C.amber }}>
              ⚡ Vigilance : le ratio s'approche du seuil de 12 ans.
            </div>
          )}
        </div>

        {/* Chart */}
        <div style={{ padding:"20px" }}>
          <div style={{ fontSize:12, fontWeight:600, color:C.deep, marginBottom:12 }}>Projection de l'encours de dette</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={projData} margin={{ top:5, right:5, bottom:5, left:5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="annee" tick={{ fontSize:10, fill:C.muted }} />
              <YAxis tick={{ fontSize:10, fill:C.muted }} tickFormatter={v=>`${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={v=>fmtEur(v)} contentStyle={{ fontSize:11, borderRadius:6 }} />
              <Area type="monotone" dataKey="reference" name="Sans emprunt" stroke={C.border} fill="#f1f5f9" strokeWidth={1.5} strokeDasharray="5 5" />
              <Area type="monotone" dataKey="dette" name="Avec emprunt" stroke={C.sea} fill={C.foam} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", gap:16, justifyContent:"center", marginTop:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:C.muted }}>
              <div style={{ width:16, height:2, background:C.border, borderTop:"1px dashed #aaa" }} /> Sans emprunt
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:C.muted }}>
              <div style={{ width:16, height:3, background:C.sea, borderRadius:1 }} /> Avec emprunt
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OpaleData() {
  const [section, setSection] = useState("hero");
  const [demoTab, setDemoTab] = useState("finances");
  const [form, setForm] = useState({ nom:"", commune:"", email:"", besoin:"" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error

  const nav = id => { setSection(id); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };

  useEffect(() => {
    const obs = new IntersectionObserver(es => { es.forEach(e => { if(e.isIntersecting) setSection(e.target.id); }); }, { threshold:0.25 });
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navLinks = [{ id:"hero",l:"Accueil" },{ id:"probleme",l:"Constat" },{ id:"solution",l:"Solution" },{ id:"demo",l:"Démo" },{ id:"simulations",l:"Simulations" },{ id:"contact",l:"Contact" }];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif", color:C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(12,30,60,0.97)", backdropFilter:"blur(10px)", borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"0 32px", display:"flex", alignItems:"center", height:54 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginRight:32, cursor:"pointer" }} onClick={()=>nav("hero")}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:C.sky }} />
          <span style={{ color:C.white, fontWeight:700, fontSize:16, fontFamily:"'Playfair Display',Georgia,serif" }}>Opale Data</span>
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {navLinks.map(n=>(
            <button key={n.id} onClick={()=>nav(n.id)} style={{ background:"none", border:"none", color:section===n.id?C.sky:"rgba(255,255,255,0.55)", fontSize:12.5, fontWeight:500, padding:"8px 12px", cursor:"pointer", borderBottom:section===n.id?`2px solid ${C.sky}`:"2px solid transparent", fontFamily:"inherit" }}>{n.l}</button>
          ))}
        </div>
        <button onClick={()=>nav("contact")} style={{ marginLeft:"auto", background:C.sky, color:C.white, border:"none", borderRadius:6, padding:"7px 16px", fontSize:12.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Demander une démo</button>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ background:`linear-gradient(165deg,${C.deep} 0%,${C.navy} 50%,${C.sea} 100%)`, color:C.white, padding:"76px 32px 66px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0.035, backgroundImage:`repeating-linear-gradient(45deg,transparent,transparent 35px,rgba(255,255,255,0.5) 35px,rgba(255,255,255,0.5) 36px)` }} />
        <div style={{ position:"relative", maxWidth:700, margin:"0 auto" }}>
          <div style={{ fontSize:12, textTransform:"uppercase", letterSpacing:"0.15em", color:C.foam, marginBottom:18, fontWeight:500 }}>Pilotage communal par la donnée · Côte d'Opale</div>
          <h1 style={{ fontSize:42, fontWeight:700, lineHeight:1.15, margin:"0 0 18px", fontFamily:"'Playfair Display',Georgia,serif" }}>
            Vos finances, vos cantines,{"\n"}vos bâtiments.<br /><span style={{ color:C.sky }}>Enfin lisibles.</span>
          </h1>
          <p style={{ fontSize:16, lineHeight:1.65, color:"rgba(255,255,255,0.72)", maxWidth:540, margin:"0 auto 24px" }}>
            Opale Data transforme les données que votre commune produit déjà en tableaux de bord clairs. Sans nouveau logiciel. Sans compétence technique. En 3 semaines.
          </p>
          <p style={{ fontSize:13.5, lineHeight:1.5, color:"rgba(255,255,255,0.5)", maxWidth:480, margin:"0 auto 32px", fontStyle:"italic" }}>
            Au pied des Caps Blanc-Nez et Gris-Nez, les phares guident les navigateurs.{"\n"}Vos données peuvent guider vos décisions.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:28 }}>
            <button onClick={()=>nav("demo")} style={{ background:C.white, color:C.deep, border:"none", borderRadius:8, padding:"12px 26px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Voir la démo</button>
            <button onClick={()=>nav("contact")} style={{ background:"transparent", color:C.white, border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:8, padding:"12px 26px", fontSize:15, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>Nous contacter</button>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:24, fontSize:12, color:"rgba(255,255,255,0.45)" }}>
            <span>Calaisis</span><span>·</span><span>Audomarois</span><span>·</span><span>Dunkerquois</span><span>·</span><span>Boulonnais</span>
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section id="probleme" style={{ padding:"68px 32px", background:C.sand }}>
        <div style={{ maxWidth:840, margin:"0 auto" }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:C.deep, textAlign:"center", fontFamily:"'Playfair Display',Georgia,serif", marginBottom:10 }}>Le constat</h2>
          <p style={{ textAlign:"center", color:C.muted, fontSize:14, marginBottom:40, maxWidth:540, margin:"0 auto 40px" }}>Votre commune génère des milliers de données chaque mois.<br/>
          Aujourd'hui, elles dorment dans vos logiciels.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { icon:"📊", title:"Des logiciels en silos", desc:"Comptabilité, cantines, énergie… Les données existent dans vos logiciels mais personne ne les croise." },
              { icon:"🔭", title:"Une gestion à vue", desc:"Des décisions prises sans indicateurs fiables - pas de suivi en temps réel des budgets et consommations." },
              { icon:"🛠", title:"Des outils souvent inaccessibles", desc:"Des solutions existantes… mais pensées pour les grandes collectivités" },
            ].map((it,i) => (
              <div key={i} style={{ background:C.white, borderRadius:12, padding:"26px 22px", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:26, marginBottom:12 }}>{it.icon}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:C.deep, marginBottom:6 }}>{it.title}</h3>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.6, margin:0 }}>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding:"68px 32px", background:C.offWhite }}>
        <div style={{ maxWidth:840, margin:"0 auto" }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:C.deep, textAlign:"center", fontFamily:"'Playfair Display',Georgia,serif", marginBottom:10 }}>Un tableau de bord unique</h2>
          <p style={{ textAlign:"center", color:C.muted, fontSize:14, marginBottom:40, maxWidth:520, margin:"0 auto 40px" }}>On se branche sur vos logiciels existants. En 3 semaines, votre cockpit est opérationnel.</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            {[
              { icon:"💶", name:"Finances", desc:"Exécution budgétaire en temps réel, alertes de dépassement, comparaison N/N-1." },
              { icon:"🍽️", name:"Restauration", desc:"Écart commandé/servi chiffré, coût du gaspillage, outil de renégociation prestataire." },
              { icon:"⚡", name:"Énergie", desc:"Conso par bâtiment croisée avec la météo, détection d'anomalies automatique." },
              { icon:"👥", name:"RH", desc:"Masse salariale, absentéisme, heures sup. Pour communes > 3 500 hab.", tag:true },
            ].map((v,i) => (
              <div key={i} style={{ background:C.white, borderRadius:10, padding:"20px", border:`1px solid ${C.border}`, display:"flex", gap:14 }}>
                <div style={{ fontSize:24, flexShrink:0, marginTop:2 }}>{v.icon}</div>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                    <h3 style={{ fontSize:15, fontWeight:700, color:C.deep, margin:0 }}>{v.name}</h3>
                    {v.tag && <span style={{ fontSize:9, background:C.foam, color:C.sea, padding:"2px 7px", borderRadius:4, fontWeight:600 }}>OPTION</span>}
                  </div>
                  <p style={{ fontSize:13, color:C.muted, lineHeight:1.55, margin:0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simulation teaser */}
          <div style={{ marginTop:18, background:C.white, borderRadius:10, padding:"20px", border:`2px dashed ${C.sky}`, display:"flex", gap:14, alignItems:"center" }}>
            <div style={{ fontSize:24, flexShrink:0 }}>🔮</div>
            <div>
              <h3 style={{ fontSize:15, fontWeight:700, color:C.deep, margin:"0 0 4px" }}>Simulateur de scénarios</h3>
              <p style={{ fontSize:13, color:C.muted, lineHeight:1.55, margin:0 }}>Testez vos idées avant de les voter : recrutement, emprunt, fiscalité, changement de prestataire. Votre cockpit vous montre l'impact en temps réel sur 3 ans.</p>
            </div>
          </div>
          <div style={{ marginTop:28, background:`linear-gradient(135deg,${C.deep},${C.navy})`, borderRadius:10, padding:"20px 24px", color:C.white, display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ fontSize:28 }}>🔒</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>Vos données restent les vôtres</div>
              <div style={{ fontSize:12.5, opacity:0.75 }}>Hébergement en France · Accès lecture seule · RGPD · Restitution complète si résiliation</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPATIBILITÉ */}
      <section id="compatibilite" style={{ padding:"56px 32px", background:C.white }}>
        <div style={{ maxWidth:840, margin:"0 auto" }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:C.deep, textAlign:"center", fontFamily:"'Playfair Display',Georgia,serif", marginBottom:8 }}>Compatible avec vos logiciels</h2>
          <p style={{ textAlign:"center", color:C.muted, fontSize:14, marginBottom:36, maxWidth:540, margin:"0 auto 36px" }}>
            Quel que soit votre éditeur, on se branche dessus. Pas de migration, pas de changement d'habitudes.
          </p>

          {/* Editors grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:28 }}>
            {[
              { name:"Berger-Levrault", products:"WeGF · BL.GF · e.magnus · BL.enfance", note:"Leader national — finances, RH, enfance", color:"#1a5276" },
              { name:"JVS-Mairistem", products:"Millésime · Horizon · Portail Famille", note:"Spécialiste petites et moyennes communes", color:"#2e7d32" },
              { name:"Ciril Group", products:"Civil Net Finances · Civil Net RH", note:"Communes moyennes et grandes", color:"#c0392b" },
              { name:"Arpège", products:"Concerto · Opus · Portail Famille", note:"Enfance, scolaire et périscolaire", color:"#6a1b9a" },
              { name:"Cosoluce · CERIG", products:"Polychrome · MAIRIG", note:"Éditeurs régionaux Nord et Est", color:"#e65100" },
              { name:"Technocarte · AIGA", products:"Loisiciel · ILE · iNoé", note:"Enfance et restauration scolaire", color:"#00695c" },
            ].map((ed,i) => (
              <div key={i} style={{ background:C.offWhite, borderRadius:8, padding:"16px 18px", border:`1px solid ${C.border}`, borderLeft:`3px solid ${ed.color}` }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.deep, marginBottom:3 }}>{ed.name}</div>
                <div style={{ fontSize:11.5, color:C.sea, fontWeight:500, marginBottom:6 }}>{ed.products}</div>
                <div style={{ fontSize:11.5, color:C.muted }}>{ed.note}</div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{ background:C.offWhite, borderRadius:12, padding:"24px 28px", border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:15, fontWeight:700, color:C.deep, marginBottom:16, textAlign:"center" }}>Comment ça se branche ?</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {[
                { step:"1", icon:"📤", title:"Finances", desc:"Vos flux PES V2 (le format universel de toutes les collectivités) ou un simple export CSV depuis votre logiciel comptable. Aucune installation chez vous." },
                { step:"2", icon:"📋", title:"Cantines", desc:"Un export du portail famille (BL.enfance, Concerto, Technocarte…) : inscrits, présents, facturés. Un CSV par mois suffit." },
                { step:"3", icon:"📄", title:"Énergie", desc:"Vos factures EDF, Engie, GRDF en PDF ou vos relevés de compteurs. On les parse automatiquement, vous n'avez rien à saisir." },
              ].map((s,i) => (
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:C.sea, color:C.white, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, marginBottom:10 }}>{s.step}</div>
                  <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
                  <div style={{ fontSize:13.5, fontWeight:700, color:C.deep, marginBottom:4 }}>{s.title}</div>
                  <div style={{ fontSize:12, color:C.muted, lineHeight:1.55 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:"center", marginTop:20, fontSize:12.5, color:C.muted, fontStyle:"italic" }}>
            Vous ne trouvez pas votre logiciel ? Contactez-nous — nous nous adaptons à tous les éditeurs du marché.
          </div>

          {/* Positioning block */}
          <div style={{ marginTop:32, borderRadius:12, overflow:"hidden", border:`1px solid ${C.border}` }}>
            <div style={{ background:`linear-gradient(135deg,${C.deep},${C.navy})`, padding:"18px 24px", color:C.white }}>
              <div style={{ fontSize:16, fontWeight:700, fontFamily:"'Playfair Display',Georgia,serif" }}>Nous ne remplaçons pas vos logiciels. Nous les valorisons.</div>
            </div>
            <div style={{ padding:"22px 24px", background:C.white }}>
              <p style={{ fontSize:13.5, color:C.text, lineHeight:1.65, margin:"0 0 18px" }}>
                Vos logiciels métiers (Berger-Levrault, Mairistem, Ciril…) sont excellents pour la gestion quotidienne : saisir un mandat, émettre un titre, faire la paie, gérer les inscriptions cantines. Ils disposent d'ailleurs de leurs propres tableaux de bord.
              </p>
              <p style={{ fontSize:13.5, color:C.text, lineHeight:1.65, margin:"0 0 20px" }}>
                Mais chaque logiciel ne voit que son périmètre. Votre outil comptable ne sait rien de vos cantines. Votre portail famille ignore vos factures d'énergie. Et aucun ne vous montre l'avenir.
              </p>

              <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:16, alignItems:"stretch" }}>
                {/* Their tools */}
                <div style={{ background:C.offWhite, borderRadius:8, padding:"16px 18px", border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:10 }}>Vos logiciels actuels</div>
                  {[
                    { icon:"📋", text:"Saisie des mandats et titres" },
                    { icon:"💰", text:"Exécution comptable quotidienne" },
                    { icon:"👶", text:"Inscriptions et facturation familles" },
                    { icon:"📊", text:"États réglementaires (M57, CFU)" },
                    { icon:"📑", text:"Dématérialisation PES V2" },
                  ].map((item,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, fontSize:12, color:C.text }}>
                      <span>{item.icon}</span><span>{item.text}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:10, fontSize:11, color:C.muted, fontStyle:"italic" }}>→ Le moteur de votre voiture</div>
                </div>

                {/* Arrow */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:4 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:C.foam, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>+</div>
                  <div style={{ fontSize:10, color:C.muted, textAlign:"center", maxWidth:60 }}>Les données alimentent</div>
                </div>

                {/* Opale Data */}
                <div style={{ background:"#f0f7ff", borderRadius:8, padding:"16px 18px", border:`1px solid ${C.sky}`, borderLeftWidth:3 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.sea, textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:10 }}>Opale Data</div>
                  {[
                    { icon:"🔀", text:"Vision transversale finances + cantines + énergie" },
                    { icon:"🚨", text:"Alertes avant que les problèmes n'arrivent" },
                    { icon:"📈", text:"Tendances et comparaisons sur 3 ans" },
                    { icon:"🔮", text:"Simulations : et si on recrutait ? empruntait ?" },
                    { icon:"👥", text:"Lisible par le maire, pas seulement le comptable" },
                  ].map((item,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, fontSize:12, color:C.text }}>
                      <span>{item.icon}</span><span style={{ fontWeight:500 }}>{item.text}</span>
                    </div>
                  ))}
                  <div style={{ marginTop:10, fontSize:11, color:C.sea, fontStyle:"italic" }}>→ Le GPS qui vous dit où vous allez</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding:"68px 32px", background:C.offWhite }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:C.deep, textAlign:"center", fontFamily:"'Playfair Display',Georgia,serif", marginBottom:6 }}>Voyez par vous-même</h2>
          <p style={{ textAlign:"center", color:C.muted, fontSize:13, marginBottom:28 }}>Données fictives — commune type de 5 500 habitants — cliquez sur les onglets</p>
          <div style={{ border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ background:`linear-gradient(135deg,${C.deep},${C.navy})`, padding:"12px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ color:C.white, fontWeight:700, fontSize:14, fontFamily:"'Playfair Display',Georgia,serif" }}>Cockpit Budgétaire</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:10.5 }}>Commune de Guînes — Exercice 2025</div>
              </div>
              <div style={{ display:"flex", gap:5 }}>{[C.red,C.amber,C.green].map((c,i)=>(<div key={i} style={{ width:9, height:9, borderRadius:"50%", background:c, opacity:0.6 }} />))}</div>
            </div>
            <div style={{ background:"#f1f5f9", padding:"0 18px", display:"flex", borderBottom:`1px solid ${C.border}` }}>
              {[{id:"finances",l:"💶 Finances"},{id:"cantines",l:"🍽️ Restauration"},{id:"energie",l:"⚡ Énergie"}].map(t=>(
                <button key={t.id} onClick={()=>setDemoTab(t.id)} style={{ padding:"9px 18px", fontSize:12.5, fontWeight:demoTab===t.id?700:400, color:demoTab===t.id?C.sea:C.muted, background:demoTab===t.id?C.white:"transparent", border:"none", borderBottom:demoTab===t.id?`2px solid ${C.sea}`:"2px solid transparent", cursor:"pointer", fontFamily:"inherit", borderRadius:demoTab===t.id?"6px 6px 0 0":0 }}>{t.l}</button>
              ))}
            </div>
            <div style={{ padding:22, background:C.offWhite, minHeight:340 }}>
              {demoTab==="finances" && <DemoFinances />}
              {demoTab==="cantines" && <DemoCantines />}
              {demoTab==="energie" && <DemoEnergie />}
            </div>
          </div>
        </div>
      </section>

      {/* SIMULATIONS */}
      <section id="simulations" style={{ padding:"68px 32px", background:C.sand }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:C.deep, textAlign:"center", fontFamily:"'Playfair Display',Georgia,serif", marginBottom:8 }}>Et si… ? Simulez avant de décider</h2>
          <p style={{ textAlign:"center", color:C.muted, fontSize:14, marginBottom:36, maxWidth:560, margin:"0 auto 36px" }}>
            Votre cockpit ne se contente pas de montrer le passé. Il vous aide à anticiper l'impact de vos décisions sur les finances de votre commune.
          </p>

          {/* Scenario cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18, marginBottom:32 }}>
            {[
              { icon:"👤", title:"Recrutement d'un agent", desc:"Quel impact sur ma masse salariale et ma capacité d'autofinancement si j'embauche un agent catégorie C ?", example:"Coût chargé : ~32 000 €/an — Impact CAF : -2,1 points" },
              { icon:"🏗️", title:"Emprunt & investissement", desc:"Si je rénove le gymnase pour 400 000 € financés par emprunt sur 15 ans, que devient ma capacité de désendettement ?", example:"Annuité : 31 200 €/an — Ratio dette : de 6 à 9,2 ans" },
              { icon:"📊", title:"Fiscalité locale", desc:"Combien rapporte (ou coûte) une variation de 1 point du taux de taxe foncière ? Et sur 3 ans ?", example:"+1 pt = +38 500 €/an de recettes pour une base de 3,85 M€" },
              { icon:"🍽️", title:"Changement de prestataire", desc:"Le nouveau contrat est à 4,80 €/repas au lieu de 4,50 €. Quel surcoût annuel ?", example:"+0,30 € × 28 000 repas/an = +8 400 €/an" },
              { icon:"💡", title:"Passage en LED", desc:"L'investissement est de 120 000 € pour une économie de 15 000 €/an. En combien de temps c'est rentable ?", example:"Retour sur investissement : 8 ans — VAN à 15 ans : +68 000 €" },
              { icon:"🌡️", title:"Plan de sobriété", desc:"Si on réduit la consigne de chauffage de 1°C dans tous les bâtiments, quelle économie espérer ?", example:"-1°C ≈ -7% de conso chauffage — Économie estimée : 2 940 €/an" },
            ].map((sc,i) => (
              <div key={i} style={{ background:C.white, borderRadius:10, padding:"20px", border:`1px solid ${C.border}`, display:"flex", flexDirection:"column" }}>
                <div style={{ fontSize:24, marginBottom:8 }}>{sc.icon}</div>
                <h3 style={{ fontSize:14, fontWeight:700, color:C.deep, marginBottom:6 }}>{sc.title}</h3>
                <p style={{ fontSize:12.5, color:C.muted, lineHeight:1.55, margin:0, flex:1 }}>{sc.desc}</p>
                <div style={{ marginTop:12, padding:"8px 10px", background:"#f0f7ff", borderRadius:6, fontSize:11.5, color:C.sea, fontWeight:500 }}>
                  {sc.example}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive mini-simulator */}
          <SimulateurEmprunt />

          {/* Full simulator teaser */}
          <div style={{ marginTop:32, background:`linear-gradient(135deg,${C.deep} 0%,${C.navy} 60%,${C.sea} 100%)`, borderRadius:14, padding:"32px 28px", color:C.white, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"40%", opacity:0.06, backgroundImage:`repeating-linear-gradient(-45deg,transparent,transparent 8px,rgba(255,255,255,0.5) 8px,rgba(255,255,255,0.5) 9px)` }} />
            <div style={{ position:"relative" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <span style={{ fontSize:28 }}>🧭</span>
                <div>
                  <div style={{ fontSize:18, fontWeight:700, fontFamily:"'Playfair Display',Georgia,serif" }}>Le Jumeau Budgétaire</div>
                  <div style={{ fontSize:12, opacity:0.6 }}>La fonctionnalité qui remplace votre tableur Excel de préparation budgétaire</div>
                </div>
              </div>

              <p style={{ fontSize:14, lineHeight:1.65, opacity:0.85, maxWidth:700, marginBottom:20 }}>
                Imaginez un écran unique où vous voyez l'ensemble de votre budget — dépenses, recettes, dette, épargne — et où chaque hypothèse que vous modifiez recalcule instantanément votre trajectoire financière sur 5 ans.
              </p>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:20 }}>
                {[
                  { icon:"🎚️", title:"Ajustez les curseurs", desc:"Évolution du personnel, de l'énergie, des dotations, de la fiscalité… Chaque hypothèse fait bouger la projection en temps réel." },
                  { icon:"➕", title:"Empilez les décisions", desc:"Ajoutez un recrutement, un emprunt, un investissement — et voyez l'effet combiné sur votre épargne et votre dette." },
                  { icon:"💾", title:"Comparez 3 scénarios", desc:"Sauvegardez « prudent », « ambitieux » et « statu quo » côte à côte. Présentez-les en conseil municipal." },
                ].map((item,i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"14px 16px", border:"1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize:20, marginBottom:6 }}>{item.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{item.title}</div>
                    <div style={{ fontSize:11.5, opacity:0.7, lineHeight:1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:16 }}>
                {[
                  { label:"Taux d'épargne brute", val:"11,2 %", color:C.green },
                  { label:"Capacité de désendettement", val:"7,4 ans", color:C.green },
                  { label:"Rigidité des charges", val:"62,8 %", color:C.amber },
                  { label:"Dépenses / habitant", val:"1 143 €", color:C.sky },
                ].map((r,i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:6, padding:"8px 14px", borderLeft:`3px solid ${r.color}` }}>
                    <div style={{ fontSize:10, opacity:0.5, textTransform:"uppercase", letterSpacing:"0.03em" }}>{r.label}</div>
                    <div style={{ fontSize:16, fontWeight:700, color:r.color, fontFamily:"'Playfair Display',Georgia,serif" }}>{r.val}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:14, paddingTop:16, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize:13, opacity:0.7, flex:1 }}>
                  Fini les 15 onglets Excel. Fini les formules cassées. Votre budget se construit en une après-midi, pas en deux semaines.
                </div>
                <div style={{ background:C.white, color:C.deep, borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }} onClick={() => { const el = document.getElementById("contact"); if(el) el.scrollIntoView({ behavior:"smooth" }); }}>
                  Demander une démo
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"68px 32px", background:C.offWhite }}>
        <div style={{ maxWidth:580, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:28, fontWeight:700, color:C.deep, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:10 }}>Gardez le cap sur vos finances</h2>
          <p style={{ fontSize:14, color:C.muted, marginBottom:32, lineHeight:1.6 }}>Basé au pied du Cap Blanc-Nez, j'interviens sur le Calaisis, l'Audomarois, le Dunkerquois et le Boulonnais. Prenez rendez-vous pour une démo gratuite en mairie — 30 minutes suffisent.</p>

          {formStatus === "sent" ? (
            <div style={{ background:C.white, borderRadius:14, padding:"48px 28px", border:`1px solid ${C.green}`, textAlign:"center" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
              <div style={{ fontSize:18, fontWeight:700, color:C.deep, marginBottom:8, fontFamily:"'Playfair Display',Georgia,serif" }}>Message envoyé !</div>
              <p style={{ fontSize:14, color:C.muted, lineHeight:1.6 }}>
                Merci {form.nom ? form.nom : ""} ! Je reviens vers vous sous 24 heures pour organiser une démonstration{form.commune ? ` pour la commune de ${form.commune}` : ""}.
              </p>
              <button onClick={() => { setFormStatus("idle"); setForm({ nom:"", commune:"", email:"", besoin:"" }); }} style={{ marginTop:16, background:"none", border:`1px solid ${C.border}`, borderRadius:6, padding:"8px 16px", fontSize:12, color:C.muted, cursor:"pointer", fontFamily:"inherit" }}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <div style={{ background:C.white, borderRadius:14, padding:"32px 28px", border:`1px solid ${C.border}`, textAlign:"left" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                <div>
                  <label style={{ fontSize:11.5, fontWeight:600, color:C.text, display:"block", marginBottom:5 }}>Votre nom</label>
                  <input type="text" placeholder="M. / Mme..." value={form.nom} onChange={e => setForm(f => ({...f, nom: e.target.value}))}
                    style={{ width:"100%", padding:"9px 12px", borderRadius:7, border:`1px solid ${C.border}`, fontSize:13.5, fontFamily:"inherit", boxSizing:"border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize:11.5, fontWeight:600, color:C.text, display:"block", marginBottom:5 }}>Commune</label>
                  <input type="text" placeholder="Guînes, Marck, Saint-Omer, Dunkerque..." value={form.commune} onChange={e => setForm(f => ({...f, commune: e.target.value}))}
                    style={{ width:"100%", padding:"9px 12px", borderRadius:7, border:`1px solid ${C.border}`, fontSize:13.5, fontFamily:"inherit", boxSizing:"border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:11.5, fontWeight:600, color:C.text, display:"block", marginBottom:5 }}>Email ou téléphone</label>
                <input type="text" placeholder="votre@email.fr ou 06..." value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
                  style={{ width:"100%", padding:"9px 12px", borderRadius:7, border:`1px solid ${C.border}`, fontSize:13.5, fontFamily:"inherit", boxSizing:"border-box" }} />
              </div>
              <div style={{ marginBottom:22 }}>
                <label style={{ fontSize:11.5, fontWeight:600, color:C.text, display:"block", marginBottom:5 }}>Votre besoin</label>
                <textarea rows={3} placeholder="Ex: Nous aimerions mieux piloter nos dépenses de restauration scolaire..." value={form.besoin} onChange={e => setForm(f => ({...f, besoin: e.target.value}))}
                  style={{ width:"100%", padding:"9px 12px", borderRadius:7, border:`1px solid ${C.border}`, fontSize:13.5, fontFamily:"inherit", resize:"vertical", boxSizing:"border-box" }} />
              </div>

              {formStatus === "error" && (
                <div style={{ marginBottom:14, padding:"8px 12px", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:6, fontSize:12, color:C.red }}>
                  Une erreur est survenue. Vous pouvez aussi nous écrire directement à contact@opale-data.fr
                </div>
              )}

              <button
                onClick={async () => {
                  if (!form.email && !form.nom) return;
                  setFormStatus("sending");
                  try {
                    // ================================================
                    // REMPLACE "TON_ID_FORMSPREE" PAR TON VRAI ID
                    // Ex: "xpzrkewq" (obtenu sur formspree.io)
                    // ================================================
                    const res = await fetch("https://formspree.io/f/TON_ID_FORMSPREE", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", "Accept": "application/json" },
                      body: JSON.stringify({
                        nom: form.nom,
                        commune: form.commune,
                        email: form.email,
                        besoin: form.besoin,
                        _subject: `Opale Data — Demande de démo · ${form.commune || "Commune non précisée"}`,
                      }),
                    });
                    if (res.ok) { setFormStatus("sent"); }
                    else { setFormStatus("error"); }
                  } catch { setFormStatus("error"); }
                }}
                disabled={formStatus === "sending"}
                style={{
                  width:"100%", padding:"13px",
                  background: formStatus === "sending" ? C.muted : C.sea,
                  color:C.white, border:"none", borderRadius:8, fontSize:14.5, fontWeight:700,
                  cursor: formStatus === "sending" ? "wait" : "pointer",
                  fontFamily:"inherit", transition:"background 0.2s",
                }}>
                {formStatus === "sending" ? "Envoi en cours..." : "Demander une démo gratuite"}
              </button>
              <div style={{ textAlign:"center", fontSize:11.5, color:C.muted, marginTop:10 }}>Réponse sous 24h · Démonstration en mairie · Sans engagement</div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:C.deep, color:"rgba(255,255,255,0.45)", padding:"32px", textAlign:"center", fontSize:11.5, lineHeight:1.8 }}>
        <div style={{ color:C.white, fontWeight:700, fontSize:14, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:6 }}>
          <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:C.sky, marginRight:7, verticalAlign:"middle" }} />Opale Data
        </div>
        <div style={{ color:"rgba(255,255,255,0.55)", fontSize:12, marginBottom:4 }}>Pilotage communal par la donnée</div>
        <div>Au pied des Caps · Fréthun, Pas-de-Calais</div>
        <div style={{ marginTop:3 }}>Calaisis · Audomarois · Dunkerquois · Boulonnais</div>
        <div style={{ marginTop:6 }}>contact@opale-data.fr</div>
        <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid rgba(255,255,255,0.07)" }}>© 2026 Opale Data · Données hébergées en France · Mentions légales</div>
      </footer>
    </div>
  );
}
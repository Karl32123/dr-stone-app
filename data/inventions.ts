const inventions = [
  { 
    name: "Stone Tools", 
    desc: "Basic tools made using the process of knapping.", 
    requires: [], 
    image:     image: "/images/stone-tools-card.png",
    blueprint: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Flint_knapping.svg/800px-Flint_knapping.svg.png", 
    science: "Knapping: Strike a hard core stone (chert or flint — both microcrystalline quartz SiO₂) with a hammerstone. Each controlled hit removes a flake with perfect conchoidal fracture — a smooth curved crack that spreads exactly like glass. Physics secret: no random shatter, just razor-sharp edges sharper than modern steel. Chert forms in limestone, flint in chalk — same chemistry, same truthful power. Used 2.5 million years ago at Olduvai Gorge.", 
    facts: ["Senku: 'This is the foundation! Without stone tools you can't make fire, spears, or civilization — 10 billion percent!'"], 
    real: "Early Homo habilis discovered this through honest trial-and-error. The truth of fracture mechanics sets the entire Kingdom of Science free. This is the truth. And the truth will set you free." 
  },
  { name: "Revival Fluid", desc: "Nitric acid + alcohol — the first truth that depetrifies humanity.", requires: [], image: "https://static.wikia.nocookie.net/dr-stone/images/Revival_fluid.png/revision/latest", blueprint: "https://static.wikia.nocookie.net/dr-stone/images/a/aa/Antibiotic_roadmap_%28with_subs%29.png/revision/latest", science: "Chemistry: Nitric acid dissolves metals; Physics: Liquid diffusion; Alchemy: 'Aqua fortis' (strong water) — goddess Venus symbol, truthful transmutation of stone to life.", facts: ["Beep! 7:3 ratio. Scheele (1774) pursued acid's truth, freeing modern chemistry."], real: "Wilhelm Scheele — honest discovery sets fertilizers and industry free." },
  { name: "Light Bulb", desc: "Electric light banishes darkness and sets night work free.", requires: ["Generator"], image: "https://static.wikia.nocookie.net/dr-stone/images/Light_bulb.png/revision/latest", blueprint: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Incandescent_light_bulb.svg/800px-Incandescent_light_bulb.svg.png", science: "Physics: Resistance heats filament; Chemistry: Vacuum prevents burn; Alchemy: Fire captured in glass — Prometheus myth of bringing light to humanity.", facts: ["Edison tested 1,000+ materials truthfully."], real: "Thomas Edison — honest persistence lights the world." },
  { name: "Cell Phone", desc: "Long-distance talk that connects the Kingdom.", requires: ["Generator"], image: "https://static.wikia.nocookie.net/dr-stone/images/Senku_Phone.png/revision/latest", blueprint: "https://static.wikia.nocookie.net/dr-stone/images/1/16/Cell_Phone_Roadmap.png/revision/latest", science: "Physics: Electromagnetic waves; Chemistry: Gold contacts; Alchemy: Hermes’ winged messages — truth travels instantly.", facts: ["Bell’s truth connects humanity."], real: "Alexander Graham Bell & Martin Cooper — truthful communication frees distance." }
];

export default inventions;

const cardsSection = document.getElementById('cardsSection');
const searchInput = document.getElementById('searchInput');
const tagsSection = document.getElementById('tagsSection');
const toggleDark = document.getElementById('toggleDark');

const schemeDetailSection = document.getElementById('schemeDetailSection');
const schemeDetail = document.getElementById('schemeDetail');
const backBtn = document.getElementById('backBtn');

let activeTag = null;

const schemes = [
  {id:1,title:"Skill India — Digital Empowerment",short:"Free digital training for youth",tags:["Education","Youth"],amount:"Free",duration:"6 months",terms:"Indian citizens 18-35. Aadhar required.",details:"Multi-stage program: online & offline training, certificate, micro-grants for top performers."},
  {id:2,title:"Micro-Enterprise Support",short:"Seed grants and mentoring",tags:["Finance","MSME"],amount:"Up to ₹50,000",duration:"Rolling",terms:"Micro-enterprises <10 employees. Docs: registration, bank passbook, ID.",details:"One-time grant + 6 months mentoring by NGOs. Selection via application and pitch."},
  {id:3,title:"Clean Energy Homes",short:"Subsidy for rooftop solar",tags:["Energy","Environment"],amount:"Up to 40% subsidy",duration:"Project-based",terms:"Homeowners with legal ownership. Survey & empaneled vendor installation.",details:"Subsidy applied on equipment cost. Monitoring for 2 years post-installation."},
  {id:4,title:"Startup India Grant",short:"Support for new startups",tags:["Startup","Finance"],amount:"Up to ₹1,00,000",duration:"1 year",terms:"Registered startups with <5 years of incorporation.",details:"Seed funding, mentorship, networking opportunities with investors."},
  {id:5,title:"National Skill Development",short:"Skill training for youth",tags:["Education","Skill"],amount:"Free",duration:"6 months",terms:"18-35 yrs Indian citizens, basic education.",details:"Courses in IT, electronics, hospitality with certificate and placement assistance."},
  {id:6,title:"Women Entrepreneurship Program",short:"Empower women entrepreneurs",tags:["Women","MSME"],amount:"Up to ₹75,000",duration:"Rolling",terms:"Women entrepreneurs with legal business registration.",details:"Financial aid, mentoring, workshops, networking with investors."},
  {id:7,title:"Solar Rooftop Scheme",short:"Promote rooftop solar panels",tags:["Energy","Environment"],amount:"Up to 50% subsidy",duration:"Project-based",terms:"Residential & commercial buildings.",details:"Installation by certified vendors with performance monitoring for 3 years."},
  {id:8,title:"Digital India Awareness",short:"Training in digital literacy",tags:["Education","Digital"],amount:"Free",duration:"3 months",terms:"All age groups eligible, Indian citizens.",details:"Basic computer skills, e-services awareness, online payments & cybersecurity training."},
  {id:9,title:"Affordable Housing Scheme",short:"Subsidized housing support",tags:["Housing","Finance"],amount:"Varies by income",duration:"Project-based",terms:"Low income families, Indian citizens.",details:"Subsidy on house construction/ purchase. Technical assistance provided."},
  {id:10,title:"PM Kaushal Vikas Yojana",short:"Skill development for employment",tags:["Skill","Education"],amount:"Free",duration:"6 months",terms:"18-35 yrs citizens, 8th pass minimum.",details:"Certified courses, apprenticeship opportunities, placement assistance."},
  {id:11,title:"Startup Accelerator Program",short:"Support for tech startups",tags:["Startup","Technology"],amount:"Up to ₹2,00,000",duration:"1 year",terms:"Incorporated startups under 5 years.",details:"Mentorship, seed funding, investor networking, incubation support."},
  {id:12,title:"MSME Credit Support",short:"Loan support for micro businesses",tags:["Finance","MSME"],amount:"Up to ₹10 Lakh",duration:"Rolling",terms:"Registered MSMEs, repayment eligible.",details:"Collateral-free loans with low interest rates and mentoring."},
  {id:13,title:"National Literacy Mission",short:"Improve adult literacy",tags:["Education","Social"],amount:"Free",duration:"Rolling",terms:"Adults above 18 years.",details:"Literacy classes, skill training, certification, community awareness programs."},
  {id:14,title:"Electric Vehicle Subsidy",short:"Promote electric vehicles",tags:["Energy","Transport"],amount:"Up to ₹1,50,000",duration:"Project-based",terms:"Individuals or companies buying EVs.",details:"Subsidy for EV purchase, charging station support, technical assistance."},
  {id:15,title:"Skill Development for Rural Youth",short:"Training in rural skills",tags:["Education","Rural"],amount:"Free",duration:"6 months",terms:"Rural youth aged 18-35.",details:"Courses in agriculture, IT, handicraft, and small businesses with certification."},
  {id:16,title:"Healthcare Scheme",short:"Affordable healthcare support",tags:["Health","Social"],amount:"Varies",duration:"Project-based",terms:"Low-income families.",details:"Free or subsidized medical treatment, preventive care, vaccination support."},
  {id:17,title:"Digital Startup Fund",short:"Funding for online startups",tags:["Startup","Digital"],amount:"Up to ₹1,00,000",duration:"1 year",terms:"Registered digital startups under 3 years.",details:"Seed funding, mentorship, digital marketing support, networking."},
  {id:18,title:"National Pension Scheme",short:"Pension for citizens",tags:["Finance","Social"],amount:"Depends on contribution",duration:"Life-long",terms:"All citizens above 18.",details:"Voluntary contribution, retirement benefit, flexible investment options."},
  {id:19,title:"Clean Ganga Project",short:"River cleaning initiative",tags:["Environment","Social"],amount:"Government funded",duration:"Ongoing",terms:"All regions along Ganga.",details:"River cleaning, community awareness, sewage treatment, sustainable practices."},
  {id:20,title:"Women Safety App",short:"Safety awareness and alert app",tags:["Women","Digital"],amount:"Free",duration:"Ongoing",terms:"Women citizens",details:"Mobile app providing emergency alerts, awareness tips, helpline numbers."}
];

// Generate unique tags
const allTags = [...new Set(schemes.flatMap(s=>s.tags))];
allTags.forEach(tag=>{
  const btn = document.createElement('button');
  btn.textContent = tag;
  btn.addEventListener('click', ()=>{
    activeTag = activeTag===tag ? null : tag;
    updateCards();
    updateTags();
  });
  tagsSection.appendChild(btn);
});

function updateTags(){
  Array.from(tagsSection.children).forEach(btn=>{
    btn.classList.toggle('active', btn.textContent===activeTag);
  });
}

function updateCards(){
  cardsSection.innerHTML = '';
  const query = searchInput.value.toLowerCase();
  const filtered = schemes.filter(s=>{
    const matchQuery = (s.title+s.short).toLowerCase().includes(query);
    const matchTag = activeTag ? s.tags.includes(activeTag) : true;
    return matchQuery && matchTag;
  });

  filtered.forEach(s=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.short}</p>
      <div class="info">
        <span>${s.amount}</span>
        <span>${s.duration}</span>
      </div>
      <button class="applyBtn">Apply Now</button>
    `;
    cardsSection.appendChild(card);

    card.querySelector('.applyBtn').addEventListener('click', ()=>{
      showSchemeDetail(s);
    });
  });
}

function showSchemeDetail(s){
  cardsSection.style.display = 'none';
  tagsSection.style.display = 'none';
  schemeDetailSection.style.display = 'block';
  schemeDetail.innerHTML = `
    <h2>${s.title}</h2>
    <p><strong>Short Info:</strong> ${s.short}</p>
    <p><strong>Amount:</strong> ${s.amount}</p>
    <p><strong>Duration:</strong> ${s.duration}</p>
    <h4>Terms & Eligibility:</h4>
    <p>${s.terms}</p>
    <h4>Details:</h4>
    <p>${s.details}</p>
  `;
}

backBtn.addEventListener('click', ()=>{
  schemeDetailSection.style.display = 'none';
  cardsSection.style.display = 'grid';
  tagsSection.style.display = 'flex';
});

searchInput.addEventListener('input', updateCards);
toggleDark.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

updateCards();
updateTags();

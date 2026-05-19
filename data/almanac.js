// data/almanac.js — Single source of truth for all Gdańsk Almanac content
// All content extracted from Gdansk_Almanac_Embelishment.pptx (111 slides)

const ALMANAC = {
  meta: {
    title: "Layers of Gdańsk",
    subtitle: "A Thematic Almanac — MMXXVI",
    motto: "Nec Temere, Nec Timide",
    mottoEN: "Neither Rash, Nor Timid",
    foreword: "A city read as layers, not as streets.\n\nRather than walking Gdańsk geographically — block by block — this almanac presents the city through sixteen thematic layers, each illuminating one facet of a remarkable identity.\n\nHanseatic commerce, Gothic faith, royal diplomacy, maritime engineering, scientific discovery, peaceful revolution — these layers coexist in the same streets, often in the same buildings.\n\nUse this as inspiration. Follow the layers that intrigue you; build your own three- to five-day journey through a city that rewards curiosity with revelation.",
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/2012-08-30_pano_gdansk_sm2.jpg/960px-2012-08-30_pano_gdansk_sm2.jpg",
      credit: "Pjama, CC BY-SA 3.0"
    },
    chronology: [
      { year: "997",  event: "First Mention",      desc: '"Gyddanyzc" appears in the chronicle of St Adalbert of Prague.' },
      { year: "1308", event: "Teutonic Rule",       desc: "Order seizes the city; Gothic brick architecture rises." },
      { year: "1454", event: "Golden Age Begins",   desc: "Royal Prussia under the Polish Crown — autonomy and wealth." },
      { year: "1793", event: "Prussian Annexation", desc: "Second Partition of Poland; Danzig under Berlin." },
      { year: "1939", event: "WWII Opens Here",     desc: "Schleswig-Holstein fires on Westerplatte at 4:48 AM, Sept 1." },
      { year: "1945", event: "Destruction",         desc: "Roughly 90% of the historic centre lies in ruin." },
      { year: "1980", event: "Solidarity",          desc: "Shipyard strike births the first free union in the Soviet bloc." }
    ]
  },

  parts: [
    { id: 1, title: "Historical Identity",    layers: ["01","02","03","04","05","06","07","08"] },
    { id: 2, title: "Material & Natural",     layers: ["09","10","11"] },
    { id: 3, title: "Lost & Experiential",    layers: ["12","13","14","15","16"] }
  ],

  interludes: [
    {
      afterLayer: "02",
      quote: "The sea is common to all, because it is so limitless that it cannot become a possession of any one.",
      author: "Hugo Grotius",
      source: "Mare Liberum, 1609"
    }
  ],

  layers: [
    {
      id: "01",
      slug: "commercial",
      part: 1,
      romanNumeral: "I",
      titlePL: "Gdańsk Komercyjny",
      titleEN: "Commercial Gdańsk",
      tagline: "The Hanseatic Trading Powerhouse",
      narrative: "From the 13th to the 17th centuries, Gdańsk was among the wealthiest cities in Europe — a cornerstone of the Hanseatic League. Built on the trade of grain, amber, and timber, merchant dynasties accumulated fortunes that turned a Baltic port into a city of extraordinary power.\n\nShips from England, the Netherlands, and Iberia crowded the harbour, emptying holds of wine, cloth, and spices to refill them with Polish rye and Baltic gold.",
      plateCaption: "LONG STREET MERCHANT FACADES · CANALETTO-STYLE",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Gda%C5%84sk_G%C5%82%C3%B3wne_Miasto_-_D%C5%82uga_Street_(16).jpg/960px-Gda%C5%84sk_G%C5%82%C3%B3wne_Miasto_-_D%C5%82uga_Street_(16).jpg",
      imageCredit: "Nikater, CC BY-SA 3.0",
      colour: "#8B4513",
      locations: [
        {
          id: "01-1",
          slug: "main-town-hall-hanseatic",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/011Apotheosis%2C_Sala_Czerwona%2C_muzeum_Historyczne_Gda%C5%84sk_01.jpg/960px-011Apotheosis%2C_Sala_Czerwona%2C_muzeum_Historyczne_Gda%C5%84sk_01.jpg",
          imageCredit: "Hanna Mirosława Smrek, CC BY 4.0",
          namePL: "Muzeum Gdańska",
          nameEN: "Main Town Hall — Hanseatic Exhibition",
          subheading: "Hanseatic Exhibition Main Town Hall",
          narrative: "The Hanseatic League was neither nation nor empire but a voluntary confederation of merchant cities, founded in Lübeck and eventually stretching from London to Novgorod. Gdańsk joined in 1358, quickly emerging as one of its most powerful eastern anchors.\n\nWhat made Gdańsk extraordinary was its fragmentation: by the late 14th century six separate cities occupied what is now central Gdańsk, each with its own council and laws. By the 16th century the unified city exported around a million bushels of grain a year — roughly four-fifths of Poland's total — drawn down the Vistula from estates across Poland, Prussia, Ukraine, and Lithuania.",
          facts: ["JOINED 1358", "~200 CITIES", "GŁÓWNE MIASTO"],
          crossRefs: [{ layerId: "03", label: "Gdańsk of Power" }],
          lat: 54.34880, lng: 18.65310
        },
        {
          id: "01-2",
          slug: "artus-court",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Corte_Artus%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_03.jpg/960px-Corte_Artus%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_03.jpg",
          namePL: "Dom Artusa",
          nameEN: "Artus Court",
          subheading: "Merchant Assembly & Social Club",
          narrative: "Named after King Arthur and his Round Table — where knights sat as equals — Artus Court was Gdańsk's merchant assembly. From the 14th century onward, the building on Long Market was stock exchange, meeting hall, and social club combined. Merchants organised into 'benches' by trade or nation — a Lübeck bench, an English bench, a grain-traders' bench.\n\nThe interior announces wealth without subtlety: painted ceilings of Ovid's Metamorphoses, portraits of merchants, navigation instruments. Dominating everything is the ceramic stove — over ten metres tall, faced with 520 polychrome tiles — among the largest historic stoves in Europe. But the court's real function was social infrastructure for an economy that ran on trust.",
          facts: ["14TH C.", "STOVE: 10.6 M", "520 TILES"],
          crossRefs: [],
          lat: 54.34870, lng: 18.65350
        },
        {
          id: "01-3",
          slug: "uphagen-house",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Gdansk_Dom_Uphagena_2.jpg/960px-Gdansk_Dom_Uphagena_2.jpg",
          namePL: "Dom Uphagena",
          nameEN: "Uphagen House",
          subheading: "A Merchant's Private World",
          narrative: "In 1775 Johann Uphagen — grain merchant, city councillor, obsessive book collector — bought the townhouse at Długa 12 and began transforming it. Born in 1731 to a wealthy family of Flemish origins, he studied philosophy, law, and economics at Göttingen before returning home to run the business. He owned the 'Monkey' granary on Chmielna Street, dealing in the commodity that built Gdańsk's fortune, but his real passion was books: his library eventually held some 10,500 works, among the largest private collections on the Baltic.\n\nUphagen House shows that Gdańsk's merchant fortunes weren't abstract. They bought these specific chairs, hung these specific paintings, entertained guests in these specific rooms — proof that Hanseatic trade was transformative at the scale of a single family's life.",
          facts: ["ACQUIRED 1775", "10,500 VOLS.", "DŁUGA 12"],
          crossRefs: [],
          lat: 54.34900, lng: 18.65200
        },
        {
          id: "01-4",
          slug: "granary-island",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gdańsk_Wyspa_Spichrzów_001.jpg/960px-Gdańsk_Wyspa_Spichrzów_001.jpg",
          imageCredit: "Аимаина хикари, CC0",
          namePL: "Wyspa Spichrzów",
          nameEN: "Granary Island",
          subheading: "The Grain Storage Heart of Europe",
          narrative: "Gdańsk wasn't just a grain port — it was the grain port, controlling roughly three-quarters of all Baltic grain exports. In 1576 the city literally dug a canal to expand capacity: the New Motława was excavated that year, creating an artificial island where granaries could line both waterfronts.\n\nBy 1643 some 315 granaries stood on this single island, capable of storing vast quantities of grain and servicing more than two hundred ships at a time. The granaries — five or six storeys tall, with names like 'Deo Gloria,' 'Bear Dance,' 'Blue Lamb' — held Polish grain on Gdańsk credit until Amsterdam or London prices justified shipping. Only three survived 1945 intact. Walk the island today and you find luxury hotels in reconstructed shells, but the scale still impresses.",
          facts: ["CANAL CUT 1576", "315 GRANARIES BY 1643"],
          crossRefs: [],
          lat: 54.34606, lng: 18.65759
        },
        {
          id: "01-5",
          slug: "the-crane",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Gdansk_2023_23.jpg/960px-Gdansk_2023_23.jpg",
          imageCredit: "Scotch Mist, CC BY-SA 4.0",
          namePL: "Żuraw",
          nameEN: "The Crane",
          subheading: "Medieval Port Gateway & Lifting Machine",
          narrative: "The Crane is the silhouette of Gdańsk. Two massive brick towers connected by a wooden lifting mechanism jutting over the Motława, built between 1442 and 1444. It served triple duty: loading cargo, installing ship masts — a rare specialisation in medieval Europe — and acting as fortified water gate. Four wooden treadmills, each about 6 metres across and powered by men walking inside them, could lift around two tonnes to eleven metres' height, and twice that with both wheel-sets engaged.\n\nAfter a three-year renovation, the Crane reopened on 30 April 2024 with a new exhibition following Hans Kross, a 17th-century merchant. Six rooms across three floors recreate period interiors while explaining how ships entered port, how cargo was taxed, and how shipbuilding workshops operated.",
          facts: ["BUILT 1442–44", "LIFT 4 T TO 11 M", "REOPENED 2024"],
          crossRefs: [{ layerId: "04", label: "Maritime Gdańsk" }],
          lat: 54.35057, lng: 18.65748
        }
      ]
    },

    {
      id: "02",
      slug: "spiritual",
      part: 1,
      romanNumeral: "II",
      titlePL: "Gdańsk Duchowny",
      titleEN: "Spiritual Gdańsk",
      tagline: "Sacred Spaces Through the Centuries",
      narrative: "From soaring Gothic vaults to Baroque splendour, Gdańsk's churches reveal centuries of devotion and architectural ambition — altars funded by merchant princes, towers competing for heavenly heights, walls that sheltered both prayer and political upheaval.\n\nThe Reformation made many Catholic temples Lutheran for nearly four centuries. WWII reduced most to ruins; careful reconstruction preserves not just architecture but a layered spiritual identity.",
      plateCaption: "ST. MARY'S INTERIOR VAULTING · GOTHIC BRICK · DRAMATIC LIGHT",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Gdansk_Bazylika_Mariacka_7.jpg/960px-Gdansk_Bazylika_Mariacka_7.jpg",
      imageCredit: "Andrzej Otrębski, CC BY-SA 4.0",
      colour: "#4A3728",
      churchMapRef: true,
      locations: [
        {
          id: "02-1",
          slug: "st-marys-basilica",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Gdansk_Bazylika_Mariacka_7.jpg/960px-Gdansk_Bazylika_Mariacka_7.jpg",
          namePL: "Bazylika Mariacka",
          nameEN: "St. Mary's Basilica",
          subheading: "Europe's Largest Brick Church",
          narrative: "Built between 1343 and 1502, this colossal Gothic structure can accommodate around 25,000 people — far more than the entire population of medieval Gdańsk. Its cubic volume — roughly 155,000 m³ — creates an interior so vast that visitors often feel antlike beneath the vaults.\n\nThe great treasure stands 14 metres high in the northern transept: the astronomical clock, built by Hans Düringer between 1464 and 1470. At noon, mechanical figures spring to life — Adam and Eve ring the bells while Three Kings, Apostles, and Death process in medieval pageantry. For those willing to climb 405 steps, the 78-metre tower rewards with a 360° view across terracotta rooftops to the Baltic.",
          facts: ["1343–1502", "105 M LONG", "CAP. ≈ 25,000"],
          crossRefs: [{ layerId: "16", label: "Gdańsk of Records" }],
          lat: 54.34981, lng: 18.65301
        },
        {
          id: "02-2",
          slug: "oliwa-cathedral",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/64%2C_Gda%C5%84sk-Oliwa%2C_Katedra_Oliwska_02.JPG/960px-64%2C_Gda%C5%84sk-Oliwa%2C_Katedra_Oliwska_02.JPG",
          namePL: "Katedra Oliwska",
          nameEN: "Oliwa Cathedral",
          subheading: "Baroque Splendour & Musical Magnificence",
          narrative: "Founded in 1186 by Duke Sambor I, this Cistercian abbey church is one of the oldest sacred sites in the region. Stretching some 107 metres — Poland's longest church — it achieved its current glory through breathtaking Baroque transformation: gilded altars dripping with cherubs, trompe-l'œil ceiling frescoes, stucco turning stone into white lace.\n\nOliwa's soul resides in its great organ, built 1763–1788 by Johann Wulf and Friedrich Rudolf Dalitz. With around 8,000 pipes, 110 stops, and a system of 'moving stars', this Rococo masterpiece is as much sculpture as instrument. The Treaty of Oliwa was signed here on 3 May 1660, ending decades of Polish-Swedish wars.",
          facts: ["FOUNDED 1186", "107 M LONG", "ORGAN 1763–88"],
          crossRefs: [],
          lat: 54.40330, lng: 18.55750
        },
        {
          id: "02-3",
          slug: "st-catherines-church",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Gdańsk_St_Catherine_church.jpg/960px-Gdańsk_St_Catherine_church.jpg",
          imageCredit: "Brosen, CC BY 2.5",
          namePL: "Kościół Św. Katarzyny",
          nameEN: "St. Catherine's Church",
          subheading: "Gdańsk's Oldest Parish Church",
          narrative: "Founded between 1227 and 1239, St. Catherine's is Gdańsk's oldest parish church — Gothic brick walls witnessing nearly eight centuries. While St. Mary's served the Main Town merchant elite, St. Catherine's belonged to the craft guilds, brewers, and artisans of the Old Town. The church became particularly associated with the brewer-astronomer Johannes Hevelius, heir to one of the city's wealthiest brewing dynasties, who served as church administrator from 1640.\n\nIts great treasure rings across the rooftops: one of the largest concert carillons in Eastern Europe, transforming the slender 76-metre tower into a musical instrument. Hevelius lies buried beneath the chancel, his tombstone funded by King John III Sobieski. The tower today houses the Museum of Tower Clocks.",
          facts: ["FOUNDED C. 1227–39", "50-BELL CARILLON"],
          crossRefs: [{ layerId: "15", label: "Famous Figures — Hevelius" }],
          lat: 54.35407, lng: 18.65130
        },
        {
          id: "02-4",
          slug: "st-nicholas-church",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Gdansk_Kosciol_Mikolaja.jpg/960px-Gdansk_Kosciol_Mikolaja.jpg",
          namePL: "Kościół Św. Mikołaja",
          nameEN: "St. Nicholas — The Dominican Church",
          subheading: "The Church That Survived",
          narrative: "Built at the crossroads of two vital medieval trade routes, St. Nicholas began in the late 12th century as a Romanesque structure serving merchants and sailors. In 1227 Duke Świętopełk II donated it to the Dominican Order; between 1348 and 1390 they built the present Gothic hall church alongside the original Romanesque building, whose foundations were rediscovered in 2001. Beneath the vaults lies the Piwnica Romańska — a 12th–13th-century vaulted chamber, one of Gdańsk's most atmospheric treasures.\n\nSt. Nicholas is the only church in the historic centre to survive WWII largely intact — a survival variously attributed to Soviet veneration of St. Nicholas or to the parish priest's gift of cellar wine. The five-level high altar (1643), 16th-century choir stalls, 15th-century wall frescoes, and Baroque organ all remain.",
          facts: ["ROMANESQUE C. 1180", "GIVEN TO DOMINICANS 1227"],
          crossRefs: [],
          lat: 54.35223, lng: 18.65212
        },
        {
          id: "02-5",
          slug: "st-johns-church",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Gdańsk%2C_kościół_św._Jana_(WLZ14).jpg/960px-Gdańsk%2C_kościół_św._Jana_(WLZ14).jpg",
          imageCredit: "1bumer, CC BY-SA 3.0 pl",
          namePL: "Kościół Św. Jana",
          nameEN: "St. John's Church",
          subheading: "From Parish Church to Cultural Centre",
          narrative: "St. John's began as a small chapel in 1358 and grew, by 1370, into a brick Gothic church to rival anything in Gdańsk. The ambition shows in tax records: in 1390, St. Mary's paid 100 Rhenish guilders in church taxes — and St. John's paid 80, making it the second-wealthiest church in the city.\n\nBut marsh-thin foundations created chronic problems, with cracks appearing in the eastern walls by the 16th century. Even so, St. John's became a cultural powerhouse: by 1479 its library held 150 volumes, and its music collection of 468 manuscripts contained more than 1,300 compositions. Since 1995 the Roman Catholic Archdiocese has lent the building to the Baltic Sea Cultural Centre — concerts, exhibitions, and weekly mass coexisting under one Gothic roof.",
          facts: ["BEGUN 1358", "CULTURAL VENUE SINCE 1995"],
          crossRefs: [],
          lat: 54.34930, lng: 18.65320
        }
      ]
    },

    {
      id: "03",
      slug: "power",
      part: 1,
      romanNumeral: "III",
      titlePL: "Gdańsk Władzy",
      titleEN: "Gdańsk of Power",
      tagline: "Royal Patronage & Civic Authority",
      narrative: "Gdańsk's relationship with royal power was always complicated, always negotiated. The city secured extraordinary autonomy — the right to mint its own coins, maintain its own army, conduct its own foreign policy. Yet this independence was never absolute.\n\nEvery building in this layer negotiates between deference and defiance: power acknowledged, power displayed, power carefully balanced. The city that called itself the Pearl of the Crown while insisting the Crown ask permission before visiting.",
      plateCaption: "MAIN TOWN HALL TOWER AT SUNSET · GILDED STATUE",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gdansk_Ratusz_i_Bazylika_Mariacka.jpg/960px-Gdansk_Ratusz_i_Bazylika_Mariacka.jpg",
      imageCredit: "Andrzej Otrębski, CC BY-SA 3.0",
      colour: "#6B4C11",
      locations: [
        {
          id: "03-1",
          slug: "main-town-hall",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Ratusz_Głównego_Miasta_Gdańsk_01mlh.JPG/960px-Ratusz_Głównego_Miasta_Gdańsk_01mlh.JPG",
          imageCredit: "Mylovelyhate, CC BY-SA 3.0 pl",
          namePL: "Ratusz Głównego Miasta",
          nameEN: "Main Town Hall",
          subheading: "Civic Power Made Visible",
          narrative: "The Main Town Hall doesn't ask for attention — it demands it. The tower shoots 81.5 metres skyward, the tallest historic structure in Gdańsk, crowned in 1561 with a gilded statue of King Sigismund II Augustus. That statue tells you everything about Gdańsk's politics: yes, we acknowledge the king — but we put him on our tower, gilded with our gold.\n\nInside, the Red Room (Sala Czerwona) is where civic authority becomes tangible: walls in red velvet and leather, ceiling dripping with gold leaf and painted allegories, massive fireplaces flanked by marble columns. City councillors met here in opulence that would make kings jealous. Today it houses the Gdańsk History Museum.",
          facts: ["1379–1492", "TOWER 81.5 M", "SIGISMUND II AUGUSTUS, 1561"],
          crossRefs: [{ layerId: "01", label: "Commercial — Hanseatic Exhibition" }],
          lat: 54.34880, lng: 18.65310
        },
        {
          id: "03-2",
          slug: "old-town-hall",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Gdańsk%2C_Ratusz_Staromiejski_-_panoramio.jpg/960px-Gdańsk%2C_Ratusz_Staromiejski_-_panoramio.jpg",
          imageCredit: "Sławek Zawadzki, CC BY-SA 3.0",
          namePL: "Ratusz Staromiejski",
          nameEN: "Old Town Hall",
          subheading: "The Second Municipality",
          narrative: "Gdańsk wasn't one city but a collection of rival municipalities that only gradually merged. The Old Town had its own government, its own laws, and its own town hall — built in stages from the mid-15th century and completed in the 1580s with a distinctive Renaissance tower and spire.\n\nWhile Main Town grew wealthy from maritime trade, Old Town remained more modest: more craftsmen than merchants, more workshops than warehouses. The hall reflects this — elegant but restrained, civic pride without merchant ostentation. The building served as administrative centre until 1814; today it houses the Baltic Sea Cultural Centre, its transformation from political seat to cultural venue mirroring Old Town's evolution from independent municipality to integrated neighbourhood.",
          facts: ["MID-15TH C.", "RENAISSANCE TOWER, 1580S"],
          crossRefs: [],
          lat: 54.35530, lng: 18.64890
        },
        {
          id: "03-3",
          slug: "royal-chapel",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Capilla_Real%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_01.jpg/960px-Capilla_Real%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_01.jpg",
          namePL: "Kaplica Królewska",
          nameEN: "Royal Chapel",
          subheading: "Baroque in a Gothic City",
          narrative: "Squeezed between burgher houses on ulica Świętego Ducha, the Royal Chapel looks almost apologetic — and therein lies its story. By the 17th century, Lutheran Gdańsk had pushed Catholics out of St. Mary's, forcing them into cramped quarters. King Jan III Sobieski, grateful for Gdańsk's support against the Ottomans, gifted the city's Catholic minority a proper church. Construction began in 1678 under Tylman van Gameren, with interior work by Andreas Schlüter the Younger. The chapel opened in 1681 — Baroque in a Gothic city, Catholic in a Protestant stronghold.\n\nIt remains the only Baroque building in Main Town. Note the location: tucked between houses, not commanding a square — accommodation rather than conquest, royal authority asserting itself by gift.",
          facts: ["1678–1681", "TYLMAN VAN GAMEREN"],
          crossRefs: [],
          lat: 54.35030, lng: 18.65372
        },
        {
          id: "03-4",
          slug: "green-gate",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Green_Gate_%28Brama_Zielona%29_in_Gdansk.JPG/960px-Green_Gate_%28Brama_Zielona%29_in_Gdansk.JPG",
          namePL: "Brama Zielona",
          nameEN: "Green Gate",
          subheading: "The Royal Residence Nobody Used",
          narrative: "Built 1564–1568 to replace the medieval Cog Gate, the Green Gate was conceived as the formal residence for Polish monarchs visiting Gdańsk. Dutch architect Regnier van Amsterdam designed it after the model of Antwerp's City Hall — four elegant storeys with Mannerist gables facing the Motława, marking the ceremonial terminus of the Royal Way.\n\nPolish monarchs visited regularly, parading through the Golden Gate and down the Royal Way — but when night fell they preferred to stay in the Main Town Hall or in merchants' houses, finding this purpose-built palace cold and uncomfortable. Maria Ludwika Gonzaga stayed here briefly in February 1646 en route from France to marry King Władysław IV. The symbolism is perfect: a royal palace at the threshold between Royal Way and Motława — 'we acknowledge your authority, but we both understand where real power lives.'",
          facts: ["1564–1568", "REGNIER VAN AMSTERDAM"],
          crossRefs: [],
          lat: 54.34787, lng: 18.65572
        },
        {
          id: "03-5",
          slug: "sobieski-monument",
          image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Pomnik_krola_Jana_Gdansk.jpg",
          imageCredit: "Winiar, CC BY-SA 3.0",
          namePL: "Pomnik Jana III Sobieskiego",
          nameEN: "Jan III Sobieski Monument",
          subheading: "A Statue Exiled by Soviets",
          narrative: "Jan III Sobieski (1629–1696) became one of Poland's most celebrated military commanders and kings — distinguished against Ottomans, Tatars, Cossacks, and Swedes. His triumph at Vienna (1683), where he saved Christian Europe from Ottoman conquest, made him the 'Lion of Lechistan.'\n\nThe grateful citizens of Lwów erected this bronze equestrian monument in 1898 — sculptor Tadeusz Barącz, cast in Vienna — showing Sobieski with raised hand beneath his horse's hooves crushing an Ottoman cannon. When Soviets took Lviv in 1945, a Polish king celebrating victory over an eastern enemy didn't fit the new narrative. The monument was 'gifted' to Poland in 1950, sat in Warsaw, and was finally installed in Gdańsk in 1965 — a statue that began in Lwów, was exiled by Soviets, and ended on the Baltic.",
          facts: ["1629–1696", "ERECTED LWÓW 1898", "GDAŃSK 1965"],
          crossRefs: [{ layerId: "03", label: "Royal Chapel" }],
          lat: 54.35209, lng: 18.64848
        }
      ]
    },

    {
      id: "04",
      slug: "maritime",
      part: 1,
      romanNumeral: "IV",
      titlePL: "Gdańsk Morski",
      titleEN: "Maritime Gdańsk",
      tagline: "The Baltic Sea Connection",
      narrative: "Gdańsk's identity is inseparable from the Baltic. For a thousand years the city has lived by the arrival of ships and the flow of the Vistula carrying goods from deep within Poland to maritime markets across Northern Europe.\n\nThe Vistula watershed still covers roughly two-thirds of Poland's territory, making Gdańsk the natural outlet for most of the nation. Walk the waterfront and you walk the edge where Poland meets the world.",
      plateCaption: "PORT CRANES & CARGO SHIPS · COOL BALTIC LIGHT",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Old_Town_houses_and_port_crane_along_Mot%C5%82awa%2C_Gda%C5%84sk.jpg/960px-Old_Town_houses_and_port_crane_along_Mot%C5%82awa%2C_Gda%C5%84sk.jpg",
      imageCredit: "Gerda Arendt, CC0",
      colour: "#1B4F72",
      locations: [
        {
          id: "04-1",
          slug: "gdansk-sea-port",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Maersk_Elba.JPG/960px-Maersk_Elba.JPG",
          imageCredit: "Łukasz Golowanow (Konflikty.pl), CC BY",
          namePL: "Port Gdańsk",
          nameEN: "Gdańsk Sea Port",
          subheading: "A Baltic Giant",
          narrative: "Stand at the Outer Port and watch container ships the length of three football fields glide past — vessels bound for Asia, Africa, Scandinavia. The Port of Gdańsk is among the largest in the EU and the giant of the Baltic, handling roughly 77.4 million tonnes of cargo in 2024 — a remarkable 177 percent increase since 2014.\n\nIt splits into two zones: the Inner Port along the Martwa Wisła handles containers, ro-ro ferries, and passengers; the Outer Port accommodates the true giants, up to 400 metres long. No ice, no tidal variations, deep-water fairways maintained by currents — geography Gdańsk has exploited for six centuries.",
          facts: ["77.4 MT CARGO (2024)", "+177% SINCE 2014"],
          crossRefs: [],
          lat: 54.37380, lng: 18.66530
        },
        {
          id: "04-2",
          slug: "vistula-river-mouth",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Festung_Weichselmünde_Danzig.jpg/960px-Festung_Weichselmünde_Danzig.jpg",
          imageCredit: "Jacek Rużyczka, CC BY-SA 4.0",
          namePL: "Ujście Wisły",
          nameEN: "Vistula River Mouth",
          subheading: "Three Mouths, All Engineered",
          narrative: "The Vistula mouth you see today is actually the new mouth — the third location where Poland's greatest river surrenders its waters to the Baltic. On 1 February 1840, a catastrophic ice-jam flood broke through near Górki Wschodnie, creating an entirely new outlet that shortened the river by some 13.8 kilometres. Geographer Wincenty Pol named it Wisła Śmiała — the 'Bold Vistula' — and the old western channel became the Martwa Wisła, the Dead Vistula, running through Gdańsk's Inner Port.\n\nBut the Bold Vistula flooded too often. The Prussian government undertook the Przekop Wisły (Vistula Cut), constructed 1891–1895 — an artificial channel cut twelve kilometres east of Gdańsk diverting the main flow directly to the Baltic. Today the river's geography is entirely engineered.",
          facts: ["BOLD VISTULA, 1840", "VISTULA CUT, 1891–95"],
          crossRefs: [],
          lat: 54.36170, lng: 18.76680
        },
        {
          id: "04-3",
          slug: "hevelius-observatory",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Statue_of_Jan_Heweliusz_in_Gda%C5%84sk.jpg/960px-Statue_of_Jan_Heweliusz_in_Gda%C5%84sk.jpg",
          namePL: "Obserwatorium Heweliusza",
          nameEN: "Hevelius's Observatory Site",
          subheading: "Where Astronomy Met the Sea",
          narrative: "An unremarkable corner of Korzenna Street once held Europe's most sophisticated private observatory, built atop three connected merchant houses in 1641 by Johannes Hevelius, the brewer-astronomer who mapped the heavens while running a brewery. The 'Star Castle' (Stellaeburgum) served maritime Gdańsk's ship captains, whose Baltic voyages depended on accurate celestial charts. Hevelius funded it from brewery profits — that rare astronomer beholden to no patron — though Polish kings visited and the Royal Society of London admitted him as a Fellow in 1664.\n\nHis Selenographia (1647) — the first detailed maps of the Moon — supported lunar observation essential for determining longitude at sea. Fire destroyed the observatory on 26 September 1679; within two years, aged 68, he rebuilt it.",
          facts: ['"STELLAEBURGUM"', "BUILT 1641", "KORZENNA ST."],
          crossRefs: [{ layerId: "15", label: "Famous Figures" }, { layerId: "02", label: "St. Catherine's" }],
          lat: 54.35420, lng: 18.64900
        },
        {
          id: "04-4",
          slug: "brzezno-pier",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Molo_Brzezno_Gdansk_2022_aerial.jpg/960px-Molo_Brzezno_Gdansk_2022_aerial.jpg",
          imageCredit: "Emptywords, CC BY-SA 4.0",
          namePL: "Molo w Brzeźnie",
          nameEN: "Brzeźno Pier",
          subheading: "Gdańsk's Democratic Encounter with the Sea",
          narrative: "Stretch out into the Baltic at Brzeźno Beach and you're walking Gdańsk's most democratic encounter with the open sea. The wooden pier, first built in 1902, has been reconstructed repeatedly after storms, ice, and war. No cranes loading grain, no container ships blocking the horizon — just families walking over gentle waves, fishermen casting lines, locals watching sunset paint the water copper and gold.\n\nBrzeźno developed as Gdańsk's seaside resort in the late 19th century. Unlike Sopot, which catered to aristocracy with grand hotels and casinos, Brzeźno was democratic — smaller pensions, family beaches, a pier for promenading rather than prestige. This is maritime Gdańsk stripped of commerce, reduced to its essential truth.",
          facts: ["ORIGINAL PIER 1902", "136 M TODAY"],
          crossRefs: [],
          lat: 54.41413, lng: 18.62495
        },
        {
          id: "04-5",
          slug: "maritime-museum",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Narodowe_Muzeum_Morskie_w_Gdańsku%2C_20220522_1009_6096.jpg/960px-Narodowe_Muzeum_Morskie_w_Gdańsku%2C_20220522_1009_6096.jpg",
          imageCredit: "Jakub Hałun, CC BY-SA 4.0",
          namePL: "Muzeum Morskie",
          nameEN: "Maritime Museum",
          subheading: "From Hanseatic Ships to the SS Sołdek",
          narrative: "Spread across historic granaries and waterfront buildings along the Motława, the Maritime Museum tells the story of Gdańsk's relationship with the sea — from medieval Hanseatic ships to modern container vessels. The crown jewel is the SS Sołdek, Poland's first post-WWII oceangoing vessel, launched 1948, permanently moored as a floating exhibit where you walk the decks, explore the engine room, and understand what it meant for a devastated nation to return to the seas.\n\nThe complex occupies Ołowianka Island granaries that once stored Gdańsk's golden-age grain. Inside these brick warehouses you find ship models spanning a millennium, navigation instruments from sextants to early radar, and maritime paintings capturing centuries of Baltic storms. The Crane (Żuraw) technically belongs to this complex too.",
          facts: ["SS SOŁDEK LAUNCHED 1948", "OŁOWIANKA ISLAND"],
          crossRefs: [{ layerId: "01", label: "Commercial — The Crane" }],
          lat: 54.35123, lng: 18.65904
        }
      ]
    },

    {
      id: "05",
      slug: "military",
      part: 1,
      romanNumeral: "V",
      titlePL: "Gdańsk Wojenny",
      titleEN: "Military Gdańsk",
      tagline: "Fortifications & Wartime History",
      narrative: "Geography makes some cities strategic, and Gdańsk's position — controlling the Vistula's outlet to the Baltic and the approaches to Poland's only sea access — made it perpetually contested. The city learned to defend itself: harbour fortifications, walls around the Old Town, bastions commanding sight lines.\n\nThen came 1 September 1939. The military layer is about the architecture of defence — and the ruins that defence couldn't prevent.",
      plateCaption: "WESTERPLATTE RUINS · STORMY SKY · MUTED EARTH",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gdansk_Westerplatte_1.jpg/960px-Gdansk_Westerplatte_1.jpg",
      imageCredit: "Kallerna, CC BY-SA 3.0",
      colour: "#4A4A4A",
      locations: [
        {
          id: "05-1",
          slug: "westerplatte",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gdansk_Westerplatte_1.jpg/960px-Gdansk_Westerplatte_1.jpg",
          namePL: "Westerplatte",
          nameEN: "Westerplatte — Where WWII Began",
          subheading: "182 Against 3,500 — Seven Days",
          narrative: "The mathematics were brutal: 182 Polish soldiers holding a peninsula against around 3,500 German troops backed by the battleship Schleswig-Holstein's 280 mm guns, Stuka dive bombers, and field artillery. Military doctrine said the garrison might last twelve hours. They lasted seven days, repelling fourteen assaults.\n\n1 September 1939, 4:48 AM — the Schleswig-Holstein, arrived on 'courtesy visit' with 225 marines hidden below deck, opened fire. The League of Nations agreement had prohibited fortifications; the 'defences' were improvised. When Major Sucharski surrendered on 7 September, the Germans honoured the garrison — he kept his sword.",
          facts: ["1 SEPT 1939 · 04:48", "182 VS 3,500", "HELD 7 DAYS"],
          crossRefs: [],
          lat: 54.40770, lng: 18.67120
        },
        {
          id: "05-2",
          slug: "wisloujscie-fortress",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Gdańsk%2C_Twierdza_Wisłoujście%2C_brama.jpg/960px-Gdańsk%2C_Twierdza_Wisłoujście%2C_brama.jpg",
          imageCredit: "1bumer, CC BY-SA 4.0",
          namePL: "Twierdza Wisłoujście",
          nameEN: "Wisłoujście Fortress",
          subheading: "Poland's Oldest Coastal Fortification",
          narrative: "Built at the mouth of the Dead Vistula where river meets Baltic, Wisłoujście is Poland's oldest coastal fortification — a circular citadel besieged, captured, rebuilt and repurposed so many times its architecture reads like a timeline of European military engineering.\n\nThe Teutonic Knights built a wooden watchtower around 1382; burned by Hussite raiders in 1433, rebuilt in brick by 1482. In 1562 Italian engineers surrounded it with 'the Ring' — a three-storey circular battery. In 1608, four corner bastions created overlapping fields of fire. The fortifications were tested by Batory (1577), Swedes (1627), Russians (1734), Napoleon (1807) — each time damaged, each time rebuilt stronger.",
          facts: ["WOODEN TOWER C. 1382", "BRICK 1482", "BASTIONS 1608"],
          crossRefs: [],
          lat: 54.39462, lng: 18.68083
        },
        {
          id: "05-3",
          slug: "wwii-museum",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Museum_of_the_Second_World_War_in_Gdańsk_2025b.jpg/960px-Museum_of_the_Second_World_War_in_Gdańsk_2025b.jpg",
          imageCredit: "Adrian Grycuk, CC BY 3.0 pl",
          namePL: "Muzeum II Wojny Światowej",
          nameEN: "Museum of the Second World War",
          subheading: "A Museum That Documents Catastrophe",
          narrative: "Some war museums celebrate victories. This one documents catastrophe. Opened December 2016 across the canal from Westerplatte, its architecture makes brutality visible. The main exhibition is underground — three levels descending into earth, 5,000 square metres, around 2,000 objects.\n\nThe exhibition emphasises civilian experience over military campaigns. Poland's losses — roughly six million dead, including three million Jews — are placed inside a wider European frame: from Versailles to Molotov-Ribbentrop to occupation, ghettos, deportations, extermination camps. Stutthof concentration camp lies just 60 km from Gdańsk; this history isn't abstract.",
          facts: ["OPENED DEC. 2016", "5,000 M² UNDERGROUND"],
          crossRefs: [{ layerId: "05", label: "Westerplatte" }],
          lat: 54.35594, lng: 18.66112
        },
        {
          id: "05-4",
          slug: "aurochs-bastion",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Gdańsk%2C_Bastion_Neubauera_-_fotopolska.eu_(244365).jpg/960px-Gdańsk%2C_Bastion_Neubauera_-_fotopolska.eu_(244365).jpg",
          imageCredit: "Yanek / fotopolska.eu, CC BY-SA 3.0",
          namePL: "Bastion Żubr i Wały Obronne",
          nameEN: "Aurochs Bastion & Defensive Walls",
          subheading: "Renaissance Military Engineering",
          narrative: "Medieval cities didn't sprawl; they fortified. Gdańsk's defensive walls, built across the 14th–17th centuries, enclosed the city in brick ramparts, bastions, and gates. Most European cities demolished their walls during 19th-century expansion. Gdańsk kept portions — and the Żubr Bastion stands as one of Poland's best-preserved examples of Renaissance military engineering.\n\n16th-century gunpowder artillery made vertical walls obsolete: cannon could batter them down. The solution was bastion fortification — low-profile triangular projections filled with earth that absorbed cannon shot and provided platforms for defensive artillery sweeping attackers with crossfire. Gdańsk added bastions between 1546 and 1556, transforming passive obstacle into active system.",
          facts: ["BASTIONS 1546–1556", "DUTCH ENGINEERING"],
          crossRefs: [],
          lat: 54.35660, lng: 18.64700
        },
        {
          id: "05-5",
          slug: "havelian-hill",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gda%C5%84sk_13.JPG/960px-Gda%C5%84sk_13.JPG",
          imageCredit: "Łukasz Golowanow, CC BY 3.0",
          namePL: "Wzgórze Heweliusza",
          nameEN: "Havelian Hill Fortifications",
          subheading: "Strategic High Ground",
          narrative: "High ground matters in military strategy, and Havelian Hill was Gdańsk's natural defensive anchor: a ridge overlooking the city from the southwest, providing sight lines across the Old Town and the western approaches. Controlling this hill meant controlling tactical advantage, so Gdańsk fortified it with bastions and earthworks as part of its outer perimeter.\n\nThe hill saw action during the 1577 siege by Stefan Batory, the Swedish wars, the Napoleonic sieges, and 18th-century conflicts. Today it is more famous for Hevelius than for fortifications — the astronomer's observatory stood on nearby Korzenna Street. The naming reflects Gdańsk's layered history: military infrastructure coexisting with scientific endeavour.",
          facts: ["MEDIEVAL, 14TH C.", "UPGRADED 16TH C."],
          crossRefs: [{ layerId: "04", label: "Maritime — Hevelius Observatory" }],
          lat: 54.35450, lng: 18.64650
        }
      ]
    },

    {
      id: "06",
      slug: "renaissance",
      part: 1,
      romanNumeral: "VI",
      titlePL: "Gdańsk Renesansowy",
      titleEN: "Neo-Renaissance Gdańsk",
      tagline: "Northern German Neo-Renaissance",
      narrative: "Most cities' architectural identity emerges organically across centuries. Gdańsk's Neo-Renaissance identity was deliberate and compressed: in about thirty years (1870s–1900s), Prussian Gdańsk transformed itself with unified architectural vision that announced modernisation while proclaiming Germanic character.\n\nAnnexed by Prussia in 1793, the city was systematically Germanised. Post-1945, when Gdańsk returned to Poland, these buildings remained — too valuable to demolish. Today they serve Polish institutions, but architecturally they still speak German: a permanent reminder of Gdańsk's contested identity.",
      plateCaption: "MAIN RAILWAY STATION FACADE · RED BRICK & SANDSTONE",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Gda%C5%84sk_G%C5%82%C3%B3wny_2010.jpg/960px-Gda%C5%84sk_G%C5%82%C3%B3wny_2010.jpg",
      imageCredit: "Elke Wetzig, CC BY-SA 3.0",
      colour: "#7B3F00",
      locations: [
        {
          id: "06-1",
          slug: "great-arsenal",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Great_Armoury_in_Gdańsk_(5).jpg/960px-Great_Armoury_in_Gdańsk_(5).jpg",
          imageCredit: "www.gdansk.pl, Attribution",
          namePL: "Zbrojownia",
          nameEN: "The Great Arsenal",
          subheading: "Weapons Store Turned Academy of Fine Arts",
          narrative: "Some buildings announce their purpose through function. The Great Arsenal announces it through flamboyance. Built 1602–1605 by Flemish architect Anthonis van Obbergen — who also designed the Main Town Hall — this was Gdańsk's weapons store, but van Obbergen designed it like a palace. Four ornate gables, elaborate stonework by Abraham van den Block, bas-reliefs of Athena, exploding cannonballs.\n\nThe Arsenal served until 1793, when Prussia converted it to army use. March 1945: Soviet artillery destroyed the interiors, leaving only peripheral walls. Today it houses the Academy of Fine Arts — weapons replaced by artwork, military power by creative endeavour. The transformation is fitting: a building designed to store instruments of war now stores instruments of culture.",
          facts: ["1602–1605", "ANTHONIS VAN OBBERGEN"],
          crossRefs: [],
          lat: 54.35190, lng: 18.64760
        },
        {
          id: "06-2",
          slug: "main-railway-station",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Gda%C5%84sk_G%C5%82%C3%B3wny_2010.jpg/960px-Gda%C5%84sk_G%C5%82%C3%B3wny_2010.jpg",
          namePL: "Dworzec Główny PKP",
          nameEN: "Main Railway Station",
          subheading: "Neo-Renaissance Cathedral to Prussian Modernity",
          narrative: "Some railway stations are functional. This one is a Neo-Renaissance cathedral to Prussian modernity. Built 1896–1900 by architects Alexander Rüdell and Paul Thoemer, the station was designed to announce that this city — annexed, Germanised, modernised — had arrived. The 48-metre clock tower dominates the approach; elaborate red brick with sandstone decoration, copper-clad turrets, zigzag yellow-and-green ceramic tiles.\n\nMarch 1945: set ablaze during the Soviet assault, the interiors were destroyed while the tower miraculously survived. A 2019–2023 renovation (around 120 million PLN) restored the historical character. Curious fact: the station's design was replicated in Imari, Japan in 1984 as a wedding palace — a Japanese entrepreneur sent an artist to sketch it after Cold-War-era restrictions made photographing rail infrastructure impossible.",
          facts: ["1896–1900", "48 M CLOCK TOWER", "RESTORED 2019–23"],
          crossRefs: [],
          lat: 54.35643, lng: 18.64419
        },
        {
          id: "06-3",
          slug: "gdansk-tech",
          image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Gmach_Główny%2C_Politechnika_Gdańska._Fot._K._Krzempek.jpg",
          imageCredit: "K. Krzempek, CC BY-SA 4.0",
          namePL: "Politechnika Gdańska",
          nameEN: "Gdańsk University of Technology",
          subheading: "From Prussian Technical School to Polish University",
          narrative: "Prussian Germany understood that imperial power required technical expertise. Construction began in 1900 under architect Albert Carsten; the Main Building alone has 122,000 m³ volume and 210 rooms across four floors, designed in Northern Renaissance style with Art Nouveau elements — copper spouts shaped as water monsters, an 18-metre tower topped with a gilded 'Allegory of Science.'\n\nThe complicated part: the university was funded partly by taxes on Polish populations in annexed territories, designed to serve German-speaking students and to exclude Polish-language instruction. In March 1945 some 60% of the Main Building was destroyed. But within months — by decree of 24 May 1945 — the Polish provisional government transformed it into Politechnika Gdańska. First lectures came on 22 October 1945, taught largely by professors evacuated from war-devastated Lviv and Warsaw Polytechnics.",
          facts: ["1900–1904", "REOPENED POLISH 1945", "15,000+ STUDENTS"],
          crossRefs: [],
          lat: 54.37170, lng: 18.61960
        },
        {
          id: "06-4",
          slug: "district-court",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Gda%C5%84sk%2C_S%C4%85d_Okr%C4%99gowy_-_fotopolska.eu_%28281655%29.jpg/960px-Gda%C5%84sk%2C_S%C4%85d_Okr%C4%99gowy_-_fotopolska.eu_%28281655%29.jpg",
          imageCredit: "Yanek / fotopolska.eu, CC BY-SA 3.0",
          namePL: "Sąd Okręgowy",
          nameEN: "District Court",
          subheading: "Architecture That Outlasts the Law It Served",
          narrative: "Justice requires dignity, and Prussian planners believed dignified justice required monumental Neo-Renaissance architecture. The District Court, built 1888–1889, occupies an entire city block at Nowe Ogrody. Its facade announces that Prussian legal authority had architectural permanence to match judicial power — red brick, elaborate stonework, steep gables, designed to intimidate and impress simultaneously.\n\nThe court served as Danzig's primary judicial institution through the Prussian period (1793–1919), the Free City era (1920–1939), and German wartime occupation. Damaged but structurally intact in March 1945, the building seamlessly transitioned to Polish judiciary. A building constructed to enforce Prussian law now enforces Polish law — same architecture, different code. Architecture doesn't care which legal system it houses; it provides dignified setting for justice, whoever defines it.",
          facts: ["1888–1889", "NOWE OGRODY"],
          crossRefs: [],
          lat: 54.35900, lng: 18.64320
        },
        {
          id: "06-5",
          slug: "polish-post-office",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Poczta_Polska_w_Gdańsku_–_1995.JPG/960px-Poczta_Polska_w_Gdańsku_–_1995.JPG",
          imageCredit: "Felix O, CC BY-SA 2.0",
          namePL: "Poczta Polska",
          nameEN: "Polish Post Office",
          subheading: "Architecture as Battlefield",
          narrative: "The Polish Post Office at Plac Obrońców Poczty Polskiej has a double narrative: built 1891 as Prussian postal administration, it became a symbol of Polish resistance when postal workers defended it on 1 September 1939 — the same day Westerplatte was bombarded.\n\nWhen Gdańsk became a Free City after WWI, Poland negotiated rights to operate the postal service. At 4 AM on 1 September 1939, German paramilitary forces (SS Heimwehr Danzig) attacked. Fifty-seven postal workers barricaded themselves inside. For fifteen hours they held off attackers using machine guns, grenades, and eventually flamethrowers. When the Germans finally breached the building with gasoline, surviving defenders surrendered. Most were executed within days. Today it houses the Museum of the Polish Post Office — Neo-Renaissance facade still pockmarked.",
          facts: ["BUILT 1891", "1 SEPT 1939 · 15 HRS"],
          crossRefs: [{ layerId: "05", label: "Military — Westerplatte" }],
          lat: 54.35840, lng: 18.64630
        }
      ]
    },

    {
      id: "07",
      slug: "postwar",
      part: 1,
      romanNumeral: "VII",
      titlePL: "Gdańsk Brutalny",
      titleEN: "Post-War Gdańsk",
      tagline: "Industrial & Brutalist Post-War",
      narrative: "Post-war Gdańsk was rebuilt from rubble with Soviet-era pragmatism: concrete, function, scale. The city that had been around 90% destroyed emerged with new identity — not Gothic merchant splendour but socialist industrial power. Massive housing estates rose in prefabricated panels, shipyards expanded to employ 20,000 workers, brutalist public buildings proclaimed faith in rational planning.\n\nThese buildings housed the workers who rebuilt the city. The Shipyard — where Solidarity was born — was both workplace and small city. The question now: preserve, or demolish?",
      plateCaption: "SHIPYARD CRANES AT DUSK · DOCUMENTARY MUTED TONES",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Stocznia_Gdanska_AD2015_%282%29.JPG/960px-Stocznia_Gdanska_AD2015_%282%29.JPG",
      imageCredit: "MOs810, CC BY-SA 4.0",
      colour: "#5D6D7E",
      locations: [
        {
          id: "07-1",
          slug: "gdansk-shipyard",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Stocznia_Gdańska_04.jpg/960px-Stocznia_Gdańska_04.jpg",
          imageCredit: "Zala, CC BY-SA 4.0",
          namePL: "Stocznia Gdańska",
          nameEN: "Gdańsk Shipyard",
          subheading: "From Lenin Shipyard to Young City",
          narrative: "Numbers tell industrial ambition: founded 1947 on ruins of German Imperial and Schichau shipyards, renamed Lenin Shipyard in 1967, employing 20,000 workers at peak, producing over a thousand vessels in six decades. But the Shipyard wasn't just a workplace — it was a self-contained city. Hospital, cinema (Żeglarz), sports hall, library, nurseries.\n\nThen came August 1980. Electrician Lech Wałęsa climbed the fence at Gate #2, workers struck demanding rights, and Solidarity was born — the first independent trade union in the Soviet bloc. Democracy brought different challenges: privatisation, workforce down to around 2,200. Today the Young City (Młode Miasto) redevelopment is bringing 3,500 residential units to former shipyard land — and active shipbuilding continues, with GSG Towers building wind-turbine towers on the same slipways.",
          facts: ["FOUNDED 1947", "PEAK 20,000", "1,000+ VESSELS"],
          crossRefs: [{ layerId: "08", label: "Solidarity — Gate #2" }],
          lat: 54.37140, lng: 18.64600
        },
        {
          id: "07-2",
          slug: "falowiec",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Gdańsk_Przymorze%2C_falowiec_przy_ulicy_Obrońców_Wybrzeża_-_panoramio.jpg/960px-Gdańsk_Przymorze%2C_falowiec_przy_ulicy_Obrońców_Wybrzeża_-_panoramio.jpg",
          imageCredit: "t.przechlewski, CC BY 3.0",
          namePL: "Falowiec",
          nameEN: "The Wave Building",
          subheading: "Europe's Longest Residential Building",
          narrative: "Imagine a residential building so long you need a bus to visit friends at the other end. That's Falowiec in Przymorze: 860 metres of prefabricated concrete shaped in undulating wave form, Europe's longest residential building, housing roughly 6,000 residents in 1,792 apartments across four segments. Built 1970–1973 on a former airport site by Tadeusz Różański, Józef Chmiel, Danuta Olędzka, and Janusz Morek as a response to the massive post-war housing shortage.\n\nThe concept was innovative: external galleries replacing internal corridors (cost savings plus social space), wave facade breaking visual monotony, 11 floors providing density without high-rise construction. Critics called it 'an architect's bad dream.' Defenders pointed to the social innovation. Today Falowiec is an internationally recognised brutalist icon — you can hate it, love it, or feel both, but you cannot ignore 860 metres of concrete waves housing six thousand families.",
          facts: ["1970–1973", "860 M LONG", "1,792 FLATS"],
          crossRefs: [],
          lat: 54.39690, lng: 18.59640
        },
        {
          id: "07-3",
          slug: "zeleniak",
          namePL: "Zeleniak",
          nameEN: "The Greengrocer's Hall",
          subheading: "Brutalist Marketplace",
          narrative: "Gdańsk's brutalist marketplace — officially Hala Targowa Gdańsk-Wrzeszcz, but known universally as Zeleniak (from the Russian zelónyj, green) — represents socialist-era commercial architecture at its most uncompromising. Built in the 1970s as a public market hall, the concrete structure housed vegetable stalls, meat counters, and daily necessities for the surrounding residential estates. No decorative pretence.\n\nThe building was also social infrastructure: where neighbours gathered daily, where gossip travelled faster than official news, where the rhythms of socialist life played out in queues for seasonal produce. The building has become an unlikely icon of brutalist heritage — photographers and architecture students document its raw concrete. Proposals for renovation, demolition, and adaptive reuse compete: does honest ugliness have value? Increasingly, preservationists answer yes.",
          facts: ["1970S", "HALA TARGOWA WRZESZCZ"],
          crossRefs: [],
          lat: 54.37980, lng: 18.60650
        },
        {
          id: "07-4",
          slug: "port-cranes",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/500px_photo_%28224954761%29.jpeg/960px-500px_photo_%28224954761%29.jpeg",
          imageCredit: "Karo Karo, CC BY 3.0",
          namePL: "Dźwigi Portowe",
          nameEN: "Port Cranes — Industrial Skyline",
          subheading: "Steel Sentinels of the North",
          narrative: "They dominate Gdańsk's northern skyline like mechanical sentinels — the massive port and shipyard cranes that define the city's industrial silhouette as distinctly as Gothic towers define its historical centre. Working infrastructure and decommissioned monuments together: some still loading container ships at the modern port, others standing silent over abandoned slipways.\n\nDifferent eras of technology layered: Imperial-era gantry cranes from the 1900s, post-war Soviet-supplied cranes from the 1950s–60s, and modern container cranes at the Baltic Hub terminal that can handle vessels carrying around 24,000 TEU. From human-powered treadwheels — the medieval Crane — to computer-controlled container handling, all visible in steel. Every photograph of the August 1980 strikes shows cranes towering behind Gate #2 — accidental symbols of working-class power.",
          facts: ["1900S → TODAY", "BALTIC HUB: 24,000 TEU VESSELS"],
          crossRefs: [{ layerId: "01", label: "Commercial — The Crane" }],
          lat: 54.37900, lng: 18.67000
        },
        {
          id: "07-5",
          slug: "zaspa-estate",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Gdansk_Zaspa_mural_11.jpg/960px-Gdansk_Zaspa_mural_11.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 4.0",
          namePL: "Osiedle Zaspa",
          nameEN: "Zaspa Residential Estate",
          subheading: "Open-Air Mural Gallery",
          narrative: "Built on the site of Gdańsk's former airport (Zaspa airfield operated until 1974), the Zaspa estate is typical socialist-era housing: rows of prefabricated concrete towers, standardised floor plans, functional green spaces. What makes Zaspa extraordinary isn't the architecture — it's what happened to it.\n\nSince 2009 the Monumental Art Festival has been transforming Zaspa's concrete facades into one of Europe's largest open-air mural galleries: over sixty large-scale artworks across building walls, from photorealistic portraits to abstract compositions, some covering entire 11-storey facades. Zaspa demonstrates how communities can reclaim brutalist architecture without demolishing it — buildings still functional, perception transformed.",
          facts: ["BUILT 1970S–80S", "60+ MURALS SINCE 2009"],
          crossRefs: [],
          lat: 54.38780, lng: 18.61670
        }
      ]
    },

    {
      id: "08",
      slug: "solidarity",
      part: 1,
      romanNumeral: "VIII",
      titlePL: "Gdańsk Solidarności",
      titleEN: "Solidarity Gdańsk",
      tagline: "The Peaceful Revolution That Changed Europe",
      narrative: "In August 1980, around 17,000 shipyard workers occupied the Lenin Shipyard and demanded the right to form independent trade unions — a revolutionary idea in the communist Eastern Bloc. Led by electrician Lech Wałęsa, they drafted 21 demands.\n\nSolidarity was born — the first independent trade union in the Soviet sphere, growing to about ten million members. For nine years, Gdańsk remained the heart of peaceful resistance against communist rule.",
      plateCaption: "SOLIDARITY GATE #2 · FLOWERS & PHOTOGRAPHS · DOCUMENTARY",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gdansk_Stocznia_Gdanska_brama_nr_2_2024.jpg/960px-Gdansk_Stocznia_Gdanska_brama_nr_2_2024.jpg",
      imageCredit: "Adrian Tync, CC BY-SA 4.0",
      colour: "#C0392B",
      locations: [
        {
          id: "08-1",
          slug: "european-solidarity-centre",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gdansk_ECS_1.jpg/960px-Gdansk_ECS_1.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 4.0",
          namePL: "Europejskie Centrum Solidarności",
          nameEN: "European Solidarity Centre",
          subheading: "Museum as Argument",
          narrative: "The building itself is argument. Designed by FORT Architects and opened on 31 August 2014 — exactly 34 years after Wałęsa signed the Gdańsk Agreement — the European Solidarity Centre's walls of rust-coloured Corten steel deliberately evoke corroding ship hulls from the adjacent Shipyard. The 26,000 m² museum sits at the geographic centre of the revolution it documents.\n\nInside, seven halls trace Solidarity's arc from the 1970 massacre through the 1980 strikes, martial law, underground resistance, the Round Table negotiations, and the 1989 elections that ended communist rule. Among the 2,000 exhibits are the original wooden boards listing the 21 demands, recognised by UNESCO's Memory of the World register.",
          facts: ["OPENED 31 AUG 2014", "26,000 M²"],
          crossRefs: [{ layerId: "07", label: "Post-War — Gdańsk Shipyard" }],
          lat: 54.37580, lng: 18.64540
        },
        {
          id: "08-2",
          slug: "shipyard-gate-2",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gdansk_Stocznia_Gdanska_brama_nr_2_2024.jpg/960px-Gdansk_Stocznia_Gdanska_brama_nr_2_2024.jpg",
          imageCredit: "Adrian Tync, CC BY-SA 4.0",
          namePL: "Brama Stoczni nr 2",
          nameEN: "Shipyard Gate #2",
          subheading: "Where the Cold War Ended",
          narrative: "This unassuming industrial gate became one of the most iconic images of the Cold War's end. On 14 August 1980, Lech Wałęsa climbed over this fence to join striking workers inside the Lenin Shipyard, igniting a movement that would topple communist regimes across Eastern Europe. For sixteen days, thousands of workers occupied the shipyard while supporters gathered at this gate, passing food and messages through the bars.\n\nThe gate itself is modest: industrial metal bars, functional design, nothing intended for historical significance. Yet it was here that workers posted their 21 demands on two wooden boards, here that flowers and portraits of Pope John Paul II were laid, here that the December 1970 massacre had begun. Listed as a historical monument, Gate #2 is regularly adorned with flowers and photographs.",
          facts: ["14 AUG 1980", "16-DAY OCCUPATION"],
          crossRefs: [],
          lat: 54.37350, lng: 18.64550
        },
        {
          id: "08-3",
          slug: "monument-fallen-workers",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Monument_to_the_Fallen_Shipyard_Workers_of_1970_in_Gda%C5%84sk.jpg/960px-Monument_to_the_Fallen_Shipyard_Workers_of_1970_in_Gda%C5%84sk.jpg",
          namePL: "Pomnik Poległych Stoczniowców 1970",
          nameEN: "Monument to Fallen Shipyard Workers",
          subheading: "Three Crosses — 42 Metres — 1980",
          narrative: "Three crosses, 42 metres high, 139 tonnes of steel, topped with anchors — symbols of maritime workers' identity — standing on the exact spot where the first three victims of the December 1970 massacre were killed by government forces. Unveiled on 16 December 1980, exactly ten years after the killings, the monument was itself a victory: the right to build it was among Solidarity's 21 demands.\n\nIt was fabricated in the Shipyard's own workshops — workers building their own memorial with the tools of their trade. At the base, bronze bas-reliefs depict scenes from shipyard life alongside fragments of Psalm 29 and Czesław Miłosz's poem 'You Who Wronged.'",
          facts: ["UNVEILED 16 DEC 1980", "42 M · 139 T STEEL"],
          crossRefs: [],
          lat: 54.37420, lng: 18.64540
        },
        {
          id: "08-4",
          slug: "st-bridgets-church",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gdansk_kosciol_sw_Brygidy_1.jpg/960px-Gdansk_kosciol_sw_Brygidy_1.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 3.0",
          namePL: "Kościół Św. Brygidy",
          nameEN: "St. Bridget's Church",
          subheading: "Solidarity's Sanctuary",
          narrative: "When martial law was declared on 13 December 1981, Solidarity went underground — and into St. Bridget's Church. Parish priest Father Henryk Jankowski opened the church as sanctuary for banned union leaders, and for eight years it became Solidarity's spiritual headquarters. Wałęsa, Mazowiecki, and other opposition leaders worshipped within. Masses became political acts; sermons carried coded messages of resistance.\n\nFounded in the 1370s, virtually destroyed in 1945, the church was rebuilt by 1987. Its crowning achievement still being created: the monumental Amber Altar, dedicated in 2017.",
          facts: ["FOUNDED 1370S", "REOPENED 1987", "AMBER ALTAR FROM 2017"],
          crossRefs: [{ layerId: "09", label: "Amber — St. Bridget's Altar" }],
          lat: 54.35459, lng: 18.65225
        },
        {
          id: "08-5",
          slug: "road-to-freedom",
          namePL: "Droga do Wolności",
          nameEN: "Road to Freedom — Walking Route",
          subheading: "Revolution in Ordinary Streets",
          narrative: "Not a building but a journey — a roughly two-kilometre walking route connecting the key Solidarity sites, marked with information panels and historical photographs. Beginning at Gate #2, the road passes through the Shipyard grounds, past the Monument to Fallen Workers, alongside the European Solidarity Centre, through the BHP Hall where the Gdańsk Agreement was signed.\n\nWhat makes the Road conceptually powerful is its ordinariness. The route passes through working streets and residential areas — the mundane urban fabric where revolution actually happened. This wasn't Paris with barricades; this was industrial Gdańsk, where electricians and crane operators walked to work before deciding, one August morning, that dignity was worth risking everything for.",
          facts: ["~2 KM", "60–90 MIN · LONGER WITH STOPS"],
          crossRefs: [],
          lat: 54.37480, lng: 18.64500
        }
      ]
    },

    {
      id: "09",
      slug: "amber",
      part: 2,
      romanNumeral: "IX",
      titlePL: "Gdańsk Bursztynowy",
      titleEN: "Amber Gdańsk",
      tagline: "The 'Gold of the Baltic'",
      narrative: "Amber isn't just Gdańsk's souvenir; it is the city's geological inheritance. For millennia, the Baltic coast has yielded fossilised tree resin — fragments of prehistoric forests, roughly forty million years old, washed ashore by storms.\n\nThe Teutonic Knights monopolised amber collection (unauthorised gathering was punishable by death), and Gdańsk became Europe's primary processing centre. Today Poland supplies a majority — by some estimates around 70% — of the world's amber jewellery.",
      plateCaption: "BALTIC AMBER · HONEY-GOLD SPECIMENS · STILL-LIFE",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Gdansk_Muzeum_Bursztynu_7.jpg/960px-Gdansk_Muzeum_Bursztynu_7.jpg",
      imageCredit: "Andrzej Otrębski, CC BY-SA 3.0",
      colour: "#E67E22",
      locations: [
        {
          id: "09-1",
          slug: "amber-museum",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Wielki_M%C5%82yn_in_Gda%C5%84sk.jpg/960px-Wielki_M%C5%82yn_in_Gda%C5%84sk.jpg",
          namePL: "Muzeum Bursztynu — Wielki Młyn",
          nameEN: "Amber Museum — The Great Mill",
          subheading: "40 Million Years in a 14th-Century Building",
          narrative: "The Amber Museum moved to a spectacular new home in 2021: the Great Mill, the Teutonic Knights' 14th-century industrial building on the Radunia Canal. Medieval industrial architecture now houses a collection spanning 40 million years of natural history — raw specimens from transparent gold to opaque white, remarkable inclusions (insects frozen mid-flight, small vertebrates), and masterworks of craftsmanship from the Renaissance to today.\n\nThe exhibition traces amber's journey: geological formation in Eocene forests, Baltic transport, the Teutonic Knights' trade monopoly, workshops that transformed raw resin into art. One section reconstructs elements of the legendary Amber Room, crafted by Gdańsk artisans for the Prussian king, gifted to Peter the Great, looted by Nazis in 1941, and lost.",
          facts: ["RELOCATED 2021", "14TH-C. BUILDING"],
          crossRefs: [{ layerId: "16", label: "Records — Great Mill" }],
          lat: 54.35370, lng: 18.64910
        },
        {
          id: "09-2",
          slug: "st-bridgets-amber-altar",
          namePL: "Ołtarz Kościoła Św. Brygidy",
          nameEN: "St. Bridget's Amber Altar",
          subheading: "The World's Largest Sacred Amber Project",
          narrative: "The world's largest sacred amber project rises about eleven metres in St. Bridget's presbytery — a monumental triptych incorporating more than 900 kilograms of amber, still growing toward completion. At its centre: the painting of Our Lady, Protectress of Working People, inspired by the December 1970 massacre. Surrounding it: amber crosses referencing the Monument to Fallen Shipyard Workers, an amber eagle, a contour map of Poland inscribed 'Solidarność', and a 174-cm monstrance crafted from 34 kg of amber by master Mariusz Drapikowski.\n\nThe altar connects Gdańsk's three defining identities: amber (the material), faith (the purpose), and Solidarity (the political context). Dedicated in December 2017 with President Andrzej Duda present, the project remains roughly 50% complete.",
          facts: ["~11 M TALL", "900+ KG AMBER", "DEDICATED 2017"],
          crossRefs: [{ layerId: "08", label: "Solidarity — St. Bridget's" }],
          lat: 54.35459, lng: 18.65225
        },
        {
          id: "09-3",
          slug: "mariacka-street",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Gdańsk_Główne_Miasto,_ulica_Mariacka,_wrzesień_2022.jpg/960px-Gdańsk_Główne_Miasto,_ulica_Mariacka,_wrzesień_2022.jpg",
          imageCredit: "Anastasia4568, CC BY-SA 4.0",
          namePL: "Ulica Mariacka",
          nameEN: "St. Mary's Street — The Amber Mile",
          subheading: "Perrons, Dragons & Amber Windows",
          narrative: "If Gdańsk has a single most photogenic street, it is Mariacka — the narrow cobblestone lane along the south side of St. Mary's Basilica, lined with tall merchant houses whose elaborate stone terraces (perrons) create a streetscape found nowhere else in Poland. Originally built as elevated entrances to protect ground floors from flooding, the perrons became display spaces.\n\nVirtually every ground-floor space along Mariacka is an amber gallery, workshop, or jewellery shop. At the street's eastern end, the Dragon of Mariacka — a gargoyle waterspout — has become Gdańsk's unofficial mascot. Walk Mariacka at dusk, when amber-lit windows glow against Gothic brick: commerce and beauty, inseparable as always.",
          facts: ["RECONSTRUCTED POST-1945", "STONE PERRONS PRESERVED"],
          crossRefs: [],
          lat: 54.34920, lng: 18.65300
        }
      ]
    },

    {
      id: "10",
      slug: "forest",
      part: 2,
      romanNumeral: "X",
      titlePL: "Gdańsk Leśny",
      titleEN: "Forest Gdańsk",
      tagline: "Green Spaces & Natural Landscapes",
      narrative: "Behind the Gothic towers and brick warehouses, Gdańsk is surprisingly green. The Tricity's moraine hills — glacial deposits left by retreating ice sheets some ten thousand years ago — created a landscape of forested ridges and stream valleys that penetrate deep into the urban fabric.\n\nWithin thirty minutes of the Old Town you can walk through beech forests, alongside rushing streams, through landscaped parks designed for contemplation rather than commerce.",
      plateCaption: "OLIWA PARK CANOPY · DAPPLED GREEN LIGHT · ROMANTIC",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Gdansk_Park_Oliwski_7.jpg/960px-Gdansk_Park_Oliwski_7.jpg",
      imageCredit: "Andrzej Otrębski, CC BY-SA 4.0",
      colour: "#1E8449",
      locations: [
        {
          id: "10-1",
          slug: "oliwa-park",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Gdansk_Park_Oliwski_1.jpg/960px-Gdansk_Park_Oliwski_1.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 3.0",
          namePL: "Park Oliwski",
          nameEN: "Oliwa Park",
          subheading: "Eight Centuries of Cultivated Landscape",
          narrative: "The park predates the city. Cistercian monks who founded Oliwa Abbey in 1186 established gardens around their monastery, and eight centuries later the landscape still carries traces of monastic planning: symmetrical avenues, contemplative spaces, water features. When the abbey was secularised in 1831, the Prussian state transformed monastic gardens into a public park, adding Romantic landscaping — winding paths, scenic viewpoints, ornamental plantings.\n\nThe result is a layered landscape: French formal garden transitioning into English landscape park, which merges with managed forest. The botanical collection includes exotic species planted in the 19th century — some trees now over two hundred years old. What makes Oliwa special is the cathedral next door: walk these paths and you can sometimes hear the great organ through open windows.",
          facts: ["MONASTIC ORIGINS, 1186", "ROMANTIC PARK, 19TH C."],
          crossRefs: [{ layerId: "02", label: "Spiritual — Oliwa Cathedral" }],
          lat: 54.40270, lng: 18.55640
        },
        {
          id: "10-2",
          slug: "jaskowa-dolina",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gdansk_Jaskowa_Dolina_2.jpg/960px-Gdansk_Jaskowa_Dolina_2.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 4.0",
          namePL: "Park Jaskowej Doliny",
          nameEN: "Jaskowa Dolina Park",
          subheading: "A Glacial Valley in the City",
          narrative: "Glacial geology created this park. Jaskowa Dolina follows a meltwater channel carved through Gdańsk's moraine hills during the last ice age — a narrow, steep-sided valley with a stream running its length, now surrounded by residential neighbourhoods. The park preserves the valley's natural character: mature beech and oak forest on the slopes, the Strzyża flowing through the bottom.\n\nDog walkers, joggers, parents with strollers, students reading on benches — the park functions as a neighbourhood living room, the social infrastructure that makes dense urban living bearable. Walking Jaskowa Dolina is walking through the geological foundation of everything Gdańsk became — the landscape that existed before monks, knights, merchants, and revolutionaries arrived.",
          facts: ["GLACIAL MELTWATER VALLEY", "STRZYŻA STREAM"],
          crossRefs: [],
          lat: 54.38380, lng: 18.59920
        },
        {
          id: "10-3",
          slug: "jasien-forests",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Gdańsk_Oliwa_Trójmiejski_Park_Krajobrazowy.jpg/960px-Gdańsk_Oliwa_Trójmiejski_Park_Krajobrazowy.jpg",
          imageCredit: "Artur Andrzej, CC0",
          namePL: "Lasy Jasień",
          nameEN: "Jasień Forests",
          subheading: "Wilderness at the City's Edge",
          narrative: "Twenty minutes from the Old Town by tram, Jasień Forest offers what Gdańsk's historical centre cannot: genuine wilderness inside the municipal boundary. The Trójmiejski Landscape Park protects mixed forest — beech, oak, pine, birch — across moraine hills south of the city, with trails connecting to regional routes toward Kartuzy and the Kashubian Lake District.\n\nFor centuries the forests served as economic resource: timber for shipbuilding, fuel for heating, charcoal for industry. Today the forest is managed for conservation and recreation, but the relationship persists — Gdańsk residents use these woods for weekend hiking, cross-country skiing, and the deeply Polish tradition of mushroom foraging that turns autumn forests into social gathering spaces. The beech trees here are older than most buildings in Gdańsk.",
          facts: ["TRÓJMIEJSKI LANDSCAPE PARK", "TRAILS TO KASHUBIA"],
          crossRefs: [],
          lat: 54.33050, lng: 18.55300
        }
      ]
    },

    {
      id: "11",
      slug: "waters",
      part: 2,
      romanNumeral: "XI",
      titlePL: "Gdańsk Wód",
      titleEN: "Gdańsk of Waters",
      tagline: "Rivers, Canals & Water Infrastructure",
      narrative: "Gdańsk was built by water and for water. The Motława created the harbour that made Hanseatic trade possible. The Radunia Canal, dug by the Teutonic Knights in the 14th century, powered the Great Mill and supplied the city's water. The Dead Vistula provided the deep-water channel to the Baltic.\n\nWater isn't backdrop in Gdańsk — it is protagonist. The force that created the geography, powered the economy, and still shapes development.",
      plateCaption: "MOTŁAWA WATERFRONT AT DUSK · BALTIC LIGHT · ATMOSPHERIC",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Old_Town_houses_and_port_crane_along_Mot%C5%82awa%2C_Gda%C5%84sk%2C_evening.jpg/960px-Old_Town_houses_and_port_crane_along_Mot%C5%82awa%2C_Gda%C5%84sk%2C_evening.jpg",
      imageCredit: "Gerda Arendt, CC0",
      colour: "#1A5276",
      locations: [
        {
          id: "11-1",
          slug: "motlawa-river",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Waterfront_of_Gdańsk_(240581121).jpg/960px-Waterfront_of_Gdańsk_(240581121).jpg",
          imageCredit: "Karo Karo, CC BY 3.0",
          namePL: "Motława",
          nameEN: "Motława River",
          subheading: "The Harbour That Made Gdańsk",
          narrative: "Everything visitors photograph — the Crane, the granaries, the waterfront facades of Long Wharf — exists because of this river. The Motława isn't large (roughly 65 km), but its lower reaches created the sheltered harbour that made Gdańsk a trading power. Where the Motława widens near its confluence with the Dead Vistula, medieval engineers found exactly what Hanseatic commerce needed: calm water deep enough for merchant ships, narrow enough to bridge, accessible enough for loading.\n\nThe medieval Crane lifts cargo on one bank; the European Solidarity Centre rises on the other. The Motława connects them, as it has connected Gdańsk's identities for a thousand years.",
          facts: ["~65 KM", "LONG WHARF · DŁUGIE POBRZEŻE"],
          crossRefs: [{ layerId: "01", label: "Commercial — The Crane" }],
          lat: 54.34810, lng: 18.65750
        },
        {
          id: "11-2",
          slug: "radunia-canal",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Gdansk_Kanal_Raduni_2.jpg/960px-Gdansk_Kanal_Raduni_2.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 3.0",
          namePL: "Kanał Raduni",
          nameEN: "Radunia Canal",
          subheading: "Medieval Engineering in Action",
          narrative: "Medieval engineering at its most pragmatic: the Teutonic Knights dug the Radunia Canal in the 1330s–1350s, diverting water from the Radunia River through the Old Town to power the Great Mill and supply the city's water. The canal runs roughly fifteen kilometres from its intake near Pruszcz Gdański through the heart of the city, passing alongside St. Catherine's Church and the Great Mill before joining the Motława.\n\nThe engineering was sophisticated: precise gradient — enough slope to turn mill wheels, not so much that water rushed uncontrollably; lock systems regulated seasonal flow; the channel was lined with stone and timber. Side channels supplied drinking water, carried waste, and powered additional smaller mills.",
          facts: ["DUG 1330S–1350S", "~15 KM"],
          crossRefs: [{ layerId: "16", label: "Records — Great Mill" }],
          lat: 54.35380, lng: 18.64900
        },
        {
          id: "11-3",
          slug: "dead-vistula",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Gdansk_Martwa_Wisla_7.jpg/960px-Gdansk_Martwa_Wisla_7.jpg",
          imageCredit: "Andrzej Otrębski, CC BY-SA 4.0",
          namePL: "Martwa Wisła",
          nameEN: "Dead Vistula",
          subheading: "The Waterway That Never Died",
          narrative: "The name is misleading — the Dead Vistula is very much alive as Gdańsk's primary industrial waterway. Created artificially by the Teutonic Knights in 1371 as a controlled bypass of the unpredictable main Vistula channel, the Martwa Wisła provided the calm, deep water Gdańsk's harbour required.\n\nSeven centuries later it still serves: Gdańsk's Inner Port operates along its banks — container terminals, ro-ro facilities, general cargo. The shipyard extends along its northern bank. Whoever controls where the Vistula meets the Baltic controls the economic outlet for two-thirds of the nation — a geographic fact as true today as in the 14th century.",
          facts: ["CUT BY TEUTONIC KNIGHTS, 1371", "INNER PORT TODAY"],
          crossRefs: [{ layerId: "04", label: "Maritime — Vistula Mouth" }],
          lat: 54.36470, lng: 18.67690
        }
      ]
    },

    {
      id: "12",
      slug: "invisible",
      part: 3,
      romanNumeral: "XII",
      titlePL: "Gdańsk Niewidzialny",
      titleEN: "Invisible Gdańsk",
      tagline: "Lost Heritage — Places No Longer Here",
      narrative: "Every city has ghosts — buildings that once defined its character but survive only in photographs, maps, and memory. Gdańsk has more ghosts than most. The 1945 bombardment destroyed roughly 90% of the city centre, and subsequent decisions about what to rebuild created selective resurrection.\n\nWalking these sites today you see parking lots, parks, modern buildings — mundane surfaces covering extraordinary histories. The invisible city haunts the visible one.",
      plateCaption: "PRE-WAR GDAŃSK SKYLINE · SEPIA ENGRAVING · ARCHIVAL",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ansicht_Danzig_um_1850.jpg/960px-Ansicht_Danzig_um_1850.jpg",
      imageCredit: "B. Peters & H. Winkles, Public Domain",
      colour: "#7F8C8D",
      locations: [
        {
          id: "12-1",
          slug: "teutonic-castle",
          namePL: "Zamek Gdański",
          nameEN: "Teutonic Castle — Lost",
          whatWasHere: "The Teutonic Knights' castle and commandery — a substantial brick fortification on the Motława, seat of the Gdańsk commander.",
          whenBuilt: "c. 1308–1340s, expanded through the 14th century.",
          whatHappened: "In 1454, during the Thirteen Years' War, Gdańsk's own burghers revolted against Teutonic rule and systematically demolished it — as deliberate political act, not in rage. Foundations were excavated and materials redistributed.",
          whyItMattered: "Gdańsk chose to erase the symbol of foreign domination. Unlike Malbork, Gdańsk preferred absence.",
          lat: 54.35100, lng: 18.65400
        },
        {
          id: "12-2",
          slug: "great-synagogue",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/GreatSynagogueDanzig.jpg",
          imageCredit: "Unknown photographer, Public Domain",
          namePL: "Wielka Synagoga",
          nameEN: "Great Synagogue — Lost",
          whatWasHere: "Gdańsk's Great Synagogue — a grand domed Moorish Revival prayer hall, dedicated 1887, serving a community of around 2,500 worshippers.",
          whenBuilt: "1885–1887, designed to assert permanent Jewish presence in a city where Jews had faced centuries of residency restrictions.",
          whatHappened: "During Kristallnacht (9–10 November 1938), Nazi paramilitaries set the synagogue ablaze. Fire brigades protected neighbouring buildings but let the synagogue burn. The gutted structure was demolished April–May 1939.",
          whyItMattered: "Destroyed before the war even began — among the first architectural casualties of Nazi policy in Danzig. A memorial stone marks the site; the absence speaks louder than any monument.",
          lat: 54.35710, lng: 18.64680
        },
        {
          id: "12-3",
          slug: "jewish-quarter",
          namePL: "Dawna Dzielnica Żydowska",
          nameEN: "Former Jewish Quarter — Lost",
          whatWasHere: "The Stare Przedmieście (Old Suburb) neighbourhood — a network of streets with synagogues, prayer houses, schools, and shops; a distinct urban quarter with its own social infrastructure.",
          whenBuilt: "Developed from the 17th century. By the 19th century, an established community with full institutional infrastructure.",
          whatHappened: "Destroyed in stages — Nazi persecution from the early 1930s, Kristallnacht 1938, deportation. The Free City's parliament passed under Nazi control in 1935. The neighbourhood was further devastated by 1945 bombing; post-war reconstruction erased remaining traces.",
          whyItMattered: "Understanding the invisible Jewish quarter is essential to honest history. The city's narrative emphasises Hanseatic commerce and Solidarity heroism — but Gdańsk was also a city where antisemitism was institutional.",
          lat: 54.35600, lng: 18.64800
        },
        {
          id: "12-4",
          slug: "demolished-city-gates",
          namePL: "Zburzone Bramy Miejskie",
          nameEN: "Demolished City Gates — Lost",
          whatWasHere: "Gdańsk's medieval fortification system included many gates controlling entry. Some survived — Golden Gate, Green Gate, Highland Gate — but many were demolished during 19th-century Prussian modernisation.",
          whenBuilt: "Medieval period through 17th century. Gates were integral to the defensive wall system encircling Main Town, Old Town, and surrounding districts.",
          whatHappened: "1890s–1900s: the Prussian municipal government viewed medieval fortifications as obstacles to progress. Gates restricting traffic were demolished; walls preventing building were torn down; moats occupying valuable land were filled. Preservation sentiment came too late.",
          whyItMattered: "The surviving gates hint at what the complete system looked like — but the missing ones represent an invisible city of fortification.",
          lat: 54.35250, lng: 18.64650
        }
      ]
    },

    {
      id: "13",
      slug: "coffee",
      part: 3,
      romanNumeral: "XIII",
      titlePL: "Gdańsk Kawowy",
      titleEN: "Coffee Gdańsk",
      tagline: "Top Coffee Experiences",
      narrative: "Gdańsk's coffee culture combines Polish café tradition with contemporary specialty roasting — the result is a city where excellent coffee appears in settings from medieval cellars to converted industrial spaces. The four picks that follow span established institutions and artisan newcomers.\n\nHow a city drinks coffee says as much about its character as how it builds churches.",
      plateCaption: "ATMOSPHERIC CAFÉ · AMBER TONES · IMPRESSIONIST WARMTH",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Gdansk_Dom_Uphagena_1.jpg/960px-Gdansk_Dom_Uphagena_1.jpg",
      imageCredit: "Andrzej Otrębski, CC BY-SA 3.0",
      colour: "#6F4E37",
      locations: [
        {
          id: "13-1",
          slug: "pozegnanie-z-afryka",
          namePL: "Pożegnanie z Afryką",
          nameEN: "\"Out of Africa\"",
          subheading: "Old Town · ☕☕",
          narrative: "Among Gdańsk's first specialty roasters, establishing the principle that Baltic cities could take coffee as seriously as Vienna or Milan. Medium-roast profiles preserve origin character.\n\nHouse espresso blend; single-origin filter when available. The pastries complement rather than compete.\n\nWarm, literary, unhurried — the kind of café where you stay for two hours without noticing.",
          facts: ["SPECIALTY ROASTER", "OLD TOWN"],
          crossRefs: [],
          lat: 54.35080, lng: 18.65330
        },
        {
          id: "13-2",
          slug: "cafe-lamus",
          namePL: "Café Lamus",
          nameEN: "Café Lamus",
          subheading: "Motława Waterfront · ☕☕",
          narrative: "Waterfront location with historically significant views; coffee quality that exceeds tourist-area expectations. Windows overlooking the Crane and Long Wharf.\n\nEspresso-based drinks; pair with a house-made pastry while watching the Motława.\n\nMedieval brick softened by warm lighting; the setting is the draw, and the coffee earns its place beside it.",
          facts: ["WATERFRONT VIEWS", "CRANE VISIBLE"],
          crossRefs: [],
          lat: 54.34790, lng: 18.65670
        },
        {
          id: "13-3",
          slug: "drukarnia",
          namePL: "Drukarnia",
          nameEN: "The Printing House",
          subheading: "Wrzeszcz · ☕☕",
          narrative: "Serious specialty roasting in a non-tourist neighbourhood. Light-to-medium profiles with traceable sourcing — specific farms, specific harvests, specific processing.\n\nFilter coffee (single-origin rotating); flat white. Ask what's freshly roasted.\n\nLocals outnumber tourists ten to one, and that's the point.",
          facts: ["SPECIALTY ROASTER", "WRZESZCZ"],
          crossRefs: [],
          lat: 54.38190, lng: 18.60830
        },
        {
          id: "13-4",
          slug: "langefuhr",
          namePL: "Langefuhr / Kolonia Artystów",
          nameEN: "Langefuhr / Artists' Colony",
          subheading: "Literary Café Heritage",
          narrative: "Named after the German name for Wrzeszcz district — the neighbourhood where Günter Grass set much of The Tin Drum — Langefuhr connects coffee culture to literary heritage. The space serves as café, cultural venue, and informal community centre: exhibitions on walls, occasional readings, the atmosphere of intellectual gathering that characterised European café culture at its best.\n\nThis is the tradition of the Viennese Kaffeehaus transplanted to the Baltic — a place where ideas circulate as freely as espresso, and where Grass's Langfuhr lives on in the creative energy of its contemporary namesake.",
          facts: ["LITERARY CAFÉ", "WRZESZCZ / LANGFUHR"],
          crossRefs: [{ layerId: "15", label: "Famous Figures — Günter Grass" }],
          lat: 54.38100, lng: 18.61000
        }
      ]
    },

    {
      id: "14",
      slug: "dining",
      part: 3,
      romanNumeral: "XIV",
      titlePL: "Gdańsk Pyszny",
      titleEN: "Delicious Gdańsk",
      tagline: "Top Dining Experiences",
      narrative: "Gdańsk's culinary identity is evolving faster than any other aspect of the city's culture. The traditional Polish kitchen — pierogi, żurek, bigos — remains foundational, but a new generation of chefs is interpreting Baltic coastal cuisine through contemporary European sensibility: smoked fish from local smokehouses, amber-coloured miód pitny, wild mushrooms from Kashubian forests.\n\nGdańsk has always been a city where trade brought the world's flavours to the Baltic.",
      plateCaption: "RESTAURANT TABLE · BALTIC SEAFOOD · CANDLELIGHT",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/D%C5%82ugi_Targ_w_Gda%C5%84sku_%282009%29.JPG/960px-D%C5%82ugi_Targ_w_Gda%C5%84sku_%282009%29.JPG",
      imageCredit: "Robert Young from Belfast, CC BY 2.0",
      colour: "#922B21",
      locations: [
        {
          id: "14-1",
          slug: "chleb-i-wino",
          namePL: "Chleb i Wino",
          nameEN: "\"Bread and Wine\"",
          subheading: "Główne Miasto · ⭑⭑⭑",
          narrative: "Ingredients-led Mediterranean-influenced European cuisine executed with Polish ingredients. Fresh fish from Baltic suppliers, seasonal vegetables, bread baked daily in-house. The name declares philosophy: fundamentals done superbly.\n\nFresh fish of the day; house-baked bread. The wine list emphasises discovery over prestige.",
          facts: ["POLISH INGREDIENTS", "GŁÓWNE MIASTO"],
          crossRefs: [],
          lat: 54.34900, lng: 18.65270
        },
        {
          id: "14-2",
          slug: "targ-rybny",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Gdańsk_Główne_Miasto_-_Targ_Rybny_(2007).jpg/960px-Gdańsk_Główne_Miasto_-_Targ_Rybny_(2007).jpg",
          imageCredit: "Gdaniec, CC BY 3.0",
          namePL: "Targ Rybny / Fishmarkt",
          nameEN: "The Fish Market",
          subheading: "Fish Market Square · ⭑⭑ – ⭑⭑⭑",
          narrative: "Located in the historic Fish Market square near the Motława, sourcing directly from Baltic fishing boats — the menu changes with the catch, the seasons, and whatever the sea provides.\n\nWhatever's freshest. Grilled whole fish, Baltic herring in traditional Polish style, fish tartare.",
          facts: ["DIRECT FROM BALTIC BOATS", "FISH MARKET SQUARE"],
          crossRefs: [],
          lat: 54.34840, lng: 18.65490
        },
        {
          id: "14-3",
          slug: "metamorfoza",
          namePL: "Metamorfoza",
          nameEN: "Metamorfoza",
          subheading: "Contemporary Polish · Tasting Menu · ⭑⭑⭑ – ⭑⭑⭑⭑",
          narrative: "Contemporary Polish cuisine at its most creative — reinterpreting traditional Polish and Kashubian ingredients through modern technique. Spring wild garlic, summer berries, autumn mushrooms, winter root vegetables.\n\nChef's tasting menu — surrender to the kitchen's vision. Each course a conversation between tradition and innovation.",
          facts: ["TASTING MENU", "KASHUBIAN INGREDIENTS"],
          crossRefs: [],
          lat: 54.36150, lng: 18.63750
        }
      ]
    },

    {
      id: "15",
      slug: "figures",
      part: 3,
      romanNumeral: "XV",
      titlePL: "Znani Gdańszczanie",
      titleEN: "Famous Figures",
      tagline: "Internationally Recognised People",
      narrative: "Some cities export commodities; Gdańsk exported minds. A philosopher who transformed Western pessimism into ethical philosophy. A physicist whose temperature scale still measures American weather. An astronomer who mapped the Moon. A Nobel laureate who chronicled the city's destruction. A trade unionist whose peaceful revolution ended communism.",
      plateCaption: "COMPOSITE OF NOTABLE FIGURES · REMBRANDT-STYLE",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Arthur_Schopenhauer_by_J_Sch%C3%A4fer%2C_1859b.jpg/960px-Arthur_Schopenhauer_by_J_Sch%C3%A4fer%2C_1859b.jpg",
      imageCredit: "Johann Schäfer, Public Domain",
      colour: "#6C3483",
      locations: [
        {
          id: "15-1",
          slug: "schopenhauer",
          image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Gdansk_Schopenhauer_House.jpg",
          namePL: "Arthur Schopenhauer",
          nameEN: "Arthur Schopenhauer",
          role: "Philosopher of Pessimism",
          dates: "1788–1860",
          birthNote: "Born in Gdańsk",
          narrative: "Born 22 February 1788 at Heiliggeistgasse (now Św. Ducha 47) to a wealthy German merchant family, Schopenhauer left Danzig aged five when Prussia annexed the city. Yet Gdańsk shaped him: the port city's commercial pragmatism, its exposure to suffering, its Protestant emphasis on examining life without comforting illusions.\n\nHis major work, The World as Will and Representation (1818), argued that beneath rational appearances lies blind, insatiable Will — ceaseless striving that can never be satisfied. Ignored during his lifetime, recognition came only in his final decade. Posthumously his influence exploded: Nietzsche built and rebelled against him, Freud acknowledged him, Wagner composed operas inspired by his aesthetics. The bridge from Kant to existentialism.",
          locationNote: "Birthplace: Św. Ducha 47",
          lat: 54.34950, lng: 18.65280
        },
        {
          id: "15-2",
          slug: "fahrenheit",
          image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Fahrenheit_small.jpg",
          imageCredit: "Anonymous, Public Domain",
          namePL: "Daniel Gabriel Fahrenheit",
          nameEN: "Daniel Gabriel Fahrenheit",
          role: "Inventor of Precision Thermometry",
          dates: "1686–1736",
          birthNote: "Born in Gdańsk",
          narrative: "Born 24 May 1686 to a prosperous merchant family, Fahrenheit's path to physics began with tragedy: on 14 August 1701 both parents died the same day after eating poisonous mushrooms. Orphaned at fifteen, sent to Amsterdam as a bookkeeper's apprentice, he became obsessed with scientific instruments instead.\n\nThe problem he solved was fundamental: early thermometers gave inconsistent readings because no standard calibration existed. His breakthrough was mercury — higher boiling point than alcohol, doesn't wet glass, expands uniformly. By 1714 he had created the first mercury thermometer; by 1721 he'd perfected reproducible manufacturing. His scale (1724) used three fixed points: 0°F (brine freezing), 32°F (water freezing), 212°F (water boiling) — exactly 180 degrees between freezing and boiling.",
          locationNote: "Birthplace area: Św. Ducha St. — Monument on Długi Targ",
          lat: 54.34940, lng: 18.65260
        },
        {
          id: "15-3",
          slug: "hevelius",
          image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Daniel_Schultz_the_Younger_-_Johannes_Hevelius%2C_Astronomer_-_WGA21067.jpg",
          imageCredit: "Daniel Schultz the Younger, Public Domain",
          namePL: "Johannes Hevelius",
          nameEN: "Johannes Hevelius",
          role: "Astronomer Who Mapped the Moon",
          dates: "1611–1687",
          birthNote: "Lived and worked in Gdańsk",
          narrative: "Brewer, politician, and one of the most important astronomers of his century — Hevelius funded a sophisticated private observatory from brewery profits on Korzenna Street. Born 28 January 1611, he built his 'Star Castle' (Stellaeburgum) across the rooftops of three connected houses by 1641. The Royal Society of London admitted him as a Fellow in 1664.\n\nHis Selenographia (1647) created the first detailed maps of the Moon's surface. His star catalogue Prodromus Astronomiae (published posthumously in 1690 by his wife Elisabeth — herself a pioneering astronomer) listed over 1,500 stars with unprecedented accuracy. Fire destroyed the observatory on 26 September 1679; within two years, aged 68, he rebuilt. Buried in St. Catherine's Church.",
          locationNote: "Observatory site: Korzenna St. — Burial: St. Catherine's",
          lat: 54.35420, lng: 18.64900
        },
        {
          id: "15-4",
          slug: "rilke",
          image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Rainer_Maria_Rilke_1913.jpg",
          imageCredit: "Ludwig Oskar Grienwaldt, Public Domain",
          namePL: "Rainer Maria Rilke",
          nameEN: "Rainer Maria Rilke",
          role: "Poet Transformed by Gdańsk's Daughter",
          dates: "1875–1926",
          birthNote: "Indirect, via Lou Andreas-Salomé",
          narrative: "Rilke wasn't born in Gdańsk, but the city reached him through one of the most extraordinary women of the 19th century: Lou Andreas-Salomé, born into the Baltic German cultural sphere, who became Rilke's lover, intellectual mentor, and transformative influence. Their relationship (1897–1901, continuing as correspondence until Rilke's death) fundamentally shaped the poet who would write the Duino Elegies and Letters to a Young Poet.\n\nBorn in Prague, Rilke was searching for an authentic voice when he met her in Munich in 1897. Their Russian journeys (1899, 1900) exposed him to landscape and spirituality that transformed his writing from decorative aestheticism into powerful metaphysical poetry.",
          locationNote: "Connection through Lou Andreas-Salomé",
          lat: 54.35000, lng: 18.65300
        },
        {
          id: "15-5",
          slug: "lou-andreas-salome",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Lou_Andreas-Salomé_-_Foto_Atelier_Elvira.jpg/960px-Lou_Andreas-Salomé_-_Foto_Atelier_Elvira.jpg",
          imageCredit: "Hofatelier Elvira, Public Domain",
          namePL: "Lou Andreas-Salomé",
          nameEN: "Lou Andreas-Salomé",
          role: "The Mind That Influenced Nietzsche, Rilke & Freud",
          dates: "1861–1937",
          birthNote: "Baltic German cultural sphere",
          narrative: "Born Louise von Salomé on 12 February 1861 in St. Petersburg to a Baltic German family — her father, a Russian general of Huguenot descent, served in the Tsar's army. Her Baltic German heritage connected her to the wider Gdańsk cultural sphere, where intellectual rigour and cosmopolitanism were defining values.\n\nAt 21, she met Friedrich Nietzsche in Rome (1882); he proposed marriage, which she declined. She studied philosophy and theology in Zurich, published novels and theoretical works, met Rilke in 1897, and met Sigmund Freud in 1911 — becoming one of the first women practising psychoanalyst. What connected these relationships was intellectual equality: she didn't merely inspire great men, she challenged, taught, and shaped them.",
          locationNote: "Baltic German cultural connections",
          lat: 54.35030, lng: 18.65320
        },
        {
          id: "15-6",
          slug: "gunter-grass",
          image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Tadeusz_R%C3%B3%C5%BCewicz_and_G%C3%BCnter_Grass.jpg",
          imageCredit: "Michał Kobylinski, CC BY-SA 2.5",
          namePL: "Günter Grass",
          nameEN: "Günter Grass",
          role: "Nobel Laureate Who Chronicled Gdańsk's Destruction",
          dates: "1927–2015",
          birthNote: "Born Free City of Danzig",
          narrative: "Born 16 October 1927 in the Free City of Danzig to a German-Kashubian family, Grass grew up in Langfuhr (now Wrzeszcz) — the neighbourhood that would become literary landscape in The Tin Drum (1959). The novel follows Oskar Matzerath, who stops growing at age three and narrates Danzig's transformation from multicultural Free City to Nazi stronghold to wartime ruin.\n\nGrass's wartime experience was complicated. Drafted at sixteen, he served briefly in the Waffen-SS — a fact concealed for sixty years and revealed in his 2006 memoir Peeling the Onion. The 1999 Nobel Prize honoured his 'frolicsome black fables' that 'portray the forgotten face of history.' His Danzig Trilogy remains the definitive literary account of a city destroyed by the ideology its German residents supported, tolerated, or failed to resist.",
          locationNote: "Childhood neighbourhood: Wrzeszcz (Langfuhr)",
          lat: 54.38150, lng: 18.60750
        },
        {
          id: "15-7",
          slug: "jan-iii-sobieski",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Jan_Sobieski_III_Portrait.jpg/960px-Jan_Sobieski_III_Portrait.jpg",
          imageCredit: "A. Iwayski, Public Domain",
          namePL: "Jan III Sobieski",
          nameEN: "Jan III Sobieski",
          role: "Warrior-King Who Balanced Power with Gdańsk",
          dates: "1629–1696",
          birthNote: "Polish King",
          narrative: "The Polish king who most successfully navigated Gdańsk's stubborn independence, combining military genius with diplomatic subtlety. His 1683 victory at Vienna — leading a vast cavalry charge to break the Ottoman siege — made him a European hero.\n\nDuring his 1677 visit to Gdańsk, Sobieski heard complaints from craftsmen's guilds about merchant domination. Rather than imposing reforms, he negotiated. In 1678 he funded the Royal Chapel beside St. Mary's Basilica — Catholic worship space in a Protestant city, royal patronage without challenging merchant power. Astronomer Hevelius honoured him in 1684 by naming a constellation Scutum Sobiescianum — a Gdańsk scientist commemorating a Polish king by rearranging the stars.",
          locationNote: "Monument: Targ Drzewny — Royal Chapel: beside St. Mary's",
          lat: 54.35209, lng: 18.64848
        },
        {
          id: "15-8",
          slug: "lech-walesa",
          image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Lech_Walesa.jpg",
          imageCredit: "Sławek, CC BY-SA 2.0",
          namePL: "Lech Wałęsa",
          nameEN: "Lech Wałęsa",
          role: "Solidarity Leader — Nobel Peace Prize",
          dates: "b. 1943",
          birthNote: "Shipyard electrician",
          narrative: "Electrician who helped end communism peacefully. Born 29 September 1943 in Popowo, Wałęsa arrived at Gdańsk Shipyard in 1967. December 1970: the government raised food prices; shipyard workers struck; militia opened fire, killing dozens. Wałęsa witnessed the violence and remembered. Fired in 1976 for union organising, he became a full-time opposition activist.\n\nOn 14 August 1980, workers struck again after the firing of crane operator Anna Walentynowicz. Wałęsa scaled Gate #2's fence — the now-legendary image — joined the strike, emerged as leader. By 31 August the government signed the Gdańsk Agreement. The 1983 Nobel Peace Prize honoured his 'non-violent struggle for free trade unions and human rights.' In 1990 he was elected President of Poland.",
          locationNote: "Gate #2 — Monument to Fallen Workers",
          lat: 54.37350, lng: 18.64550
        }
      ]
    },

    {
      id: "16",
      slug: "records",
      part: 3,
      romanNumeral: "XVI",
      titlePL: "Gdańsk Rekordów",
      titleEN: "Gdańsk of Records",
      tagline: "World-Class & European Superlatives",
      narrative: "Gdańsk doesn't just participate in European history; in several instances, it holds records that remain unbroken after centuries. The largest brick church ever built. The largest medieval industrial mill in Europe. One of the largest concert carillons in Eastern Europe.",
      plateCaption: "ST. MARY'S INTERIOR · BOLD COMPOSITION · SCALE",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Iglesia_de_Santa_Catalina%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_03.jpg/960px-Iglesia_de_Santa_Catalina%2C_Gdansk%2C_Polonia%2C_2013-05-20%2C_DD_03.jpg",
      imageCredit: "Diego Delso, CC BY-SA 3.0",
      colour: "#117A65",
      locations: [
        {
          id: "16-1",
          slug: "carillon-record",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Katharinenkirche_2017-08_04.JPG/960px-Katharinenkirche_2017-08_04.JPG",
          imageCredit: "Hans-Peter Balfanz, CC BY-SA 3.0",
          namePL: "Karylion Św. Katarzyny",
          nameEN: "Concert Carillon — St. Catherine's",
          record: "50",
          recordUnit: "BELLS",
          recordLabel: "Largest Concert Carillon in Eastern Europe",
          narrative: "Gdańsk's carillon tradition dates to 1561. The current instrument — the fourth to inhabit St. Catherine's tower — comprises 50 bells from the Royal Eijsbouts foundry (Netherlands), spanning four chromatic octaves.\n\nThe legendary 1738 carillon (35 bells) was destroyed by lightning in 1905; witnesses remembered 'great drops of molten metal' falling from the tower, called 'the bronze tears of St. Catherine.' A 1910 replacement (37 bells) was confiscated by the Nazis in 1942; 28 of those bells survive in Lübeck's St. Mary's Church. The current bells were installed 1989–2006; concerts ring weekly.",
          facts: ["17+ TONNES", "4 CHROMATIC OCTAVES"],
          lat: 54.35407, lng: 18.65130
        },
        {
          id: "16-2",
          slug: "st-marys-record",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Gdansk_2023_106.jpg/960px-Gdansk_2023_106.jpg",
          imageCredit: "Scotch Mist, CC BY-SA 4.0",
          namePL: "Bazylika Mariacka",
          nameEN: "St. Mary's Basilica — Europe's Largest Brick Church",
          record: "25,000",
          recordUnit: "CAPACITY",
          recordLabel: "Europe's Largest Brick Church",
          narrative: "Built between 1343 and 1502 — 159 years of continuous construction — entirely of red brick in Baltic Gothic style. 105 metres long, 66 metres wide at the transept, vaulting reaching 30 metres. Larger by floor area than many stone cathedrals.\n\nBuilt not by kingdom or diocese but by merchant guilds — each responsible for different sections, competing to make their portion most impressive. The 27 columns supporting the rib-vaulted ceiling create a forest effect: entering St. Mary's means experiencing space designed to overwhelm human scale. Destroyed by artillery in March 1945; meticulously reconstructed 1946–1955.",
          facts: ["105 METRES LONG", "4,900 SQUARE METRES"],
          lat: 54.34981, lng: 18.65301
        },
        {
          id: "16-3",
          slug: "great-mill-record",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Wielki_Młyn_in_Gdańsk.jpg/960px-Wielki_Młyn_in_Gdańsk.jpg",
          imageCredit: "DerHexer, CC BY-SA 3.0",
          namePL: "Wielki Młyn",
          nameEN: "The Great Mill — Europe's Largest Medieval Industrial Building",
          record: "200t",
          recordUnit: "FLOUR PER DAY",
          recordLabel: "Europe's Largest Medieval Industrial Building",
          narrative: "Built by the Teutonic Knights around 1350 on an artificial island in the Radunia Canal. Over 40 metres long, 26 metres high, powered by 18 millstones — each five metres in diameter — producing up to 200 tonnes of flour daily. Nearly six centuries of uninterrupted production, from Teutonic Knights through Hanseatic merchants through Prussian industrialisation through two world wars (until 1945).\n\nThe canal's precisely calculated gradient turned massive wheels grinding grain shipped from across Poland. After wartime damage and 1960s reconstruction, successive incarnations included a Communist-era shop, a dance club, and a shopping mall — before the Amber Museum finally gave it purpose worthy of its Teutonic grandeur in 2021.",
          facts: ["18 MILLSTONES · 5 M Ø", "600 YEARS CONTINUOUS USE"],
          lat: 54.35370, lng: 18.64910
        }
      ]
    }
  ],

  closing: {
    itineraries: {
      threeDays: [
        { day: "Day 1", title: "Commercial + Spiritual", desc: "Long Street, Artus Court, St. Mary's, Mariacka, the Crane. Dinner at Targ Rybny.", layerRefs: ["01","02"] },
        { day: "Day 2", title: "Solidarity + Military", desc: "ECS, Gate #2, the Monument, WWII Museum, Westerplatte. Coffee at Drukarnia in Wrzeszcz.", layerRefs: ["08","05"] },
        { day: "Day 3", title: "Oliwa + Records", desc: "Oliwa Cathedral (organ), Oliwa Park, St. Catherine's carillon, Great Mill / Amber Museum. Evening walk along the Motława.", layerRefs: ["02","16","09"] }
      ],
      fiveDays: [
        { day: "Days 1–3", title: "As above", desc: "Follow the three-day itinerary.", layerRefs: ["01","02","05","08","16"] },
        { day: "Day 4", title: "Renaissance + Power", desc: "Railway Station, Gdańsk Tech, Arsenal, Main Town Hall (Red Room), Royal Chapel, Green Gate. Lunch at Chleb i Wino.", layerRefs: ["06","03"] },
        { day: "Day 5", title: "Forest + Waters + Invisible", desc: "Morning hike in Jasień or Jaskowa Dolina; afternoon invisible-Gdańsk walk (castle site, former Jewish quarter); sunset from Brzeźno Pier; farewell dinner at Metamorfoza.", layerRefs: ["10","11","12","04"] }
      ],
      byInterest: [
        { theme: "Architecture", layers: ["01","02","06","07"] },
        { theme: "History & Politics", layers: ["05","08","12"] },
        { theme: "Nature & Relaxation", layers: ["10","11","04"] },
        { theme: "Food & Culture", layers: ["13","14","09"] },
        { theme: "Science & Ideas", layers: ["15","04"] }
      ]
    },
    resources: {
      museums: [
        { name: "European Solidarity Centre", url: "https://ecs.gda.pl" },
        { name: "Museum of Gdańsk", url: "https://muzeumgdansk.pl" },
        { name: "Museum of the Second World War", url: "https://muzeum1939.pl" },
        { name: "Maritime Museum", url: "https://nmm.pl" },
        { name: "Oliwa Cathedral", url: "https://archikatedraoliwa.pl" }
      ],
      reading: [
        { title: "The Tin Drum", author: "Günter Grass, 1959", desc: "The definitive novel of Gdańsk / Danzig." },
        { title: "The Free City: Danzig & League of Nations", author: "", desc: "Political histories of the inter-war Free City." },
        { title: "The Polish Revolution: Solidarity", author: "Timothy Garton Ash", desc: "Chronicle of the movement." },
        { title: "Selenographia", author: "Johannes Hevelius, 1647", desc: "The first lunar maps." }
      ],
      practical: [
        { name: "Gdańsk Tourist Board", url: "https://visitgdansk.com" },
        { name: "Tricity Transport (ZTM)", url: "https://ztm.gda.pl", desc: "Trams, buses, SKM rail connecting Gdańsk – Sopot – Gdynia." },
        { name: "Free Walking Tour Gdańsk", url: "", desc: "Daily, Old Town departure." }
      ]
    },
    reflection: "Gdańsk has been destroyed and rebuilt more times than most cities have existed. Teutonic Knights built it; burghers tore down the castle. Merchants made it wealthy; wars reduced it to rubble. Workers demanded dignity; the state tried to crush them.\n\nEach time, the city chose to rebuild — not as museum but as living place, adapting its layers while preserving their memory."
  }
};

// Helper: get layer by id
ALMANAC.getLayer = function(id) {
  return this.layers.find(l => l.id === id);
};

// Helper: get all locations across all layers (standard schema only)
ALMANAC.getAllLocations = function() {
  const locs = [];
  for (const layer of this.layers) {
    for (const loc of layer.locations) {
      locs.push({ ...loc, layerId: layer.id, layerColour: layer.colour, layerTitleEN: layer.titleEN });
    }
  }
  return locs;
};

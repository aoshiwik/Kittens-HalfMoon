
var buildings = [
		["Hut", false], 
		["Log House", false], 
		["Mansion", false], 
		["Workshop", false], 
		["Factory", false], 
		["Catnip field", false], 
		["Pasture", false], 
		["Mine", false], 
		["Lumber Mill", false], 
		["Aqueduct", false], 
		["Oil Well", false], 
		["Quarry", false], 
		["Smelter", false], 
		["Bio Lab", false], 
		["Calciner", false], 
		["Reactor", false], 
		["Accelerator", false], 
		["Steamworks", false], 
		["Magneto", false], 
		["Library", false], 
		["Academy", false], 
		["Observatory", false], 
		["Barn", false], 
		["Harbour", false], 
		["Warehouse", false], 
		["Amphitheatre", false], 
		["Tradepost", false], 
		["Chapel", false], 
		["Temple", false], 
		["Mint", false],
		["Ziggurat", false],
		["Unicorn Pasture", false],
		["Space Elevator", false, 0],
		["Satellite", false, 0],
		["Space Station", false, 0],
		["Moon Outpost", false, 1],
		["Moon Base", false, 1],
		["Planet Cracker", false, 2],
		["Hydro Fracturer", false, 2],
		["Spice Refinery", false, 2],
		["Research Vessel", false, 3],
		["Orbital Array", false, 3],
		["Sunlifter", false, 4],
		["Containment Chamber", false, 4],
		["Cryostation", false, 5],
		["Space Beacon", false, 6],
		["Terraforming Station", false, 7],
		["Hydroponics", false, 7],
		["Tectonic", false, 8]
		];	
		
var buildingsList = [
		["hut"], 
		["logHouse"], 
		["mansion"], 
		["workshop"], 
		["factory"], 
		["field"], 
		["pasture"], 
		["mine"], 
		["lumberMill"], 
		["aqueduct"], 
		["oilWell"], 
		["quarry"], 
		["smelter"], 
		["biolab"], 
		["calciner"], 
		["reactor"], 
		["accelerator"], 
		["steamworks"], 
		["magneto"], 
		["library"], 
		["academy"], 
		["observatory"], 
		["barn"], 
		["harbor"], 
		["warehouse"], 
		["amphitheatre"], 
		["tradepost"], 
		["chapel"], 
		["temple"], 
		["mint"], 
		["ziggurat"],
		["unicornPasture"],
		["spaceElevator"],
		["sattelite"],
		["spaceStation"],
		["moonOutpost"],
		["moonBase"],
		["planetCracker"],
		["hydrofracturer"],
		["spiceRefinery"],
		["researchVessel"],
		["orbitalArray"],
		["sunlifter"],
		["containmentChamber"],
		["cryostation"],
		["spaceBeacon"],
		["terraformingStation"],
		["hydroponics"],
		["tectonic"]
		];	
		
var resources = [
       		["catnip", "wood", 50],
            ["wood", "beam", 175],
        	["minerals", "slab", 250],
            ["coal", "steel", 100],
        	["iron", "plate", 125],
            ["oil", "kerosene", 7500],
            ["uranium", "thorium", 250],
			["unobtainium", "eludium", 1000]
                ];
				
var secondaryResources = [
			["beam", "scaffold", 50],
            ["steel", "alloy", 75],
			["steel", "gear", 15],
			["slab", "concrate", 2500]
			]


function CanIBuildIt(mats)
{
    var confidence=0;
    for (var j = 0; j < mats.length; j++) 
    {
        var curRes = gamePage.resPool.get(mats[j]);
        if (curRes.value / curRes.maxValue > 0.85 ) 
        {
            confidence+=1;
        }
    }
    return true;

}

function BuildIt(building)
{
    if(gamePage.ui.activeTabId == 'Bonfire')
    {
        var btn = gamePage.tabs[0].buttons;
		var ext=gamePage.bld.getBuildingExt(building);
		
        if(ext!=null && ext.meta.unlocked)
        {
            for (i = 2 ;i < gamePage.tabs[0].buttons.length; i++) {
                try { 			
                    if (btn[i].model.metadata.name == building) {
                    	var bought=false
                        
                        btn[i].controller.buyItem(btn[i].model, {}, function(result) {
                            if (result)
                             {
                                console.log('buyItem ' + building);
                                btn[i].update();  
                                bought=true;                           
                            }
                            });

                            if(bought==true)
                            	return true;
                        } 
                } catch(err) {
                console.log(err);
                }
            }
        }
    }
    return false;
} 	

function BuildThem(buildingsList)
{
 	for (var i = 0; i < buildingsList.length ; i++)
    {
        BuildIt(buildingsList[i][0]);
 	}    
}

function BuildAll()
{
	BuildThem(buildingsList);
}

function BuildHighPri()
{
	var highPriBuildings = [
		["hut"], 
		["logHouse"], 		
		["lumberMill"],
		["mine"], 		
		["barn"], 	
		["academy"], 
		["library"], 
		["observatory"],
		["amphitheatre"], 
		["aqueduct"],
// 		/["smelter"], 
		["workshop"], 
		["warehouse"], 	
		//["pasture"], 
		//["field"],  			
		];	

 	for (var i = 0; i < highPriBuildings.length ; i++)
    {
        BuildIt(highPriBuildings[i][0]);
 	}    
}

function buildNothing()
{
}

function BuildLowPri()
{
	var lowPriBuildings = [		
		
		
		];	

 	for (var i = 0; i < lowPriBuildings.length ; i++)
    {
        BuildIt(lowPriBuildings[i][0]);
 	}    
}

function craftAllOfIt()
{
    var resources = [
        ["wood",     "beam" ],
        ["minerals", "slab" ],
        ["coal",     "steel"],
        ["iron",     "plate"]
    ];


      for (var i = 0; i < resources.length; i++) {
        var curRes = gamePage.resPool.get(resources[i][0]);
        if (curRes.value / curRes.maxValue > 0.95
            && gamePage.workshop.getCraft(resources[i][1]).unlocked) {
            gamePage.craftAll(resources[i][1]);
        }
    }
}

function autoPraise(){	
 console.log('Praise The Sun!');
	gamePage.religion.praise();	
}

function autoObserve() {

	var checkObserveBtn = document.getElementById("observeBtn");
	if (typeof(checkObserveBtn) != 'undefined' && checkObserveBtn != null) {
		document.getElementById('observeBtn').click();
		   console.log('Observe');
	} 
}

function useCatpower()
{
	 var catpower = gamePage.resPool.get('manpower');

    if (catpower.value / catpower.maxValue > 0.95) {

        $("a:contains('Send hunters')").click();
        
        console.log('send hunters ');

        if (gamePage.workshop.getCraft('parchment').unlocked)  {
             console.log('craft parchment');
             gamePage.craftAll('parchment');  
         }

        if (gamePage.workshop.getCraft('manuscript').unlocked) { 
          //  console.log('craft manuscript');
          //  gamePage.craftAll('manuscript'); 
        }

        if (gamePage.workshop.getCraft('compedium').unlocked)  {
           //  console.log('craft compedium');
           //  gamePage.craftAll('compedium');  
         }

       if (gamePage.workshop.getCraft('blueprint').unlocked)  { 
          //  console.log('craft blueprints');
         //   gamePage.craftAll('blueprint');  
        }
    }
}

function refineTheNip()
{
	 var catnip = gamePage.resPool.get('catnip');
    var calendar = gamePage.calendar;

    // Only run if positive catnip and not in last half of Autumn
    if (catnip.perTickUI < 0) { return; }
    if (catnip.value / catnip.maxValue < 0.95) { return; }
    if (calendar.season == 2 && calendar.day > 50) { return; }
    gamePage.craftAll('wood');
     console.log('Refine') ;
}
// plan

if (typeof autoGrow !== 'undefined') {
 clearInterval(autoGrow);
}

autoGrow = setInterval(function() {

    var plan = [
        [0,  [BuildHighPri,craftAllOfIt]],
        [1,  [BuildHighPri,buildNothing]],
        [2,  [BuildHighPri,craftAllOfIt]],
        [3,  [BuildHighPri,craftAllOfIt]],
        [4,  [BuildAll,buildNothing]],
	 	[5,  [BuildHighPri,craftAllOfIt]],
	  	[6,  [BuildHighPri,craftAllOfIt]],
	   	[7,  [BuildHighPri,buildNothing]],
		[8,  [BuildHighPri,craftAllOfIt]],
	 	[9,  [BuildHighPri,craftAllOfIt]],
	  	[10, [BuildHighPri,buildNothing]],
   		[11, [BuildHighPri,craftAllOfIt]],
   		[12, [BuildHighPri,craftAllOfIt]],
        [13, [BuildAll,buildNothing]],
        [14, [BuildHighPri,buildNothing]],
        [15, [BuildHighPri,craftAllOfIt]],
        [16, [BuildHighPri,buildNothing]],
	 	[17, [BuildAll,buildNothing]],
	  	[18, [BuildHighPri,craftAllOfIt]],// 6 pm
	   	[19, [BuildHighPri,buildNothing]], // 7 pm
		[20, [BuildHighPri,craftAllOfIt]],// 8 pm
	 	[21, [buildNothing,buildNothing]],// 9 pm
	  	[22, [buildNothing,buildNothing]],// 10 pm
   		[23, [buildNothing,buildNothing]],// 11 pm
    ];

	var d  = new Date();
	var hours = d.getHours();

	var p = plan[hours][1];
	p[0]();
	p[1]();

	refineTheNip();
	//autoPraise();
	autoObserve();
	useCatpower();
  
},5* 1000);


// Step1: Checking Everything is running. 
// alert( " Js is flying high");

// Step2: Runing API

// Options-to-Search:
//Search All:
// https:strainapi.evanbusse.com/JuedK7A/strains/search/allt

//Search Strains by name:
// https:strainapi.evanbusse.com/JuedK7A/strains/search/name/NAME

// KEY = API Key: JuedK7A 

// const promise = $.ajax({
//     url: `https:strainapi.evanbusse.com/JuedK7A/strains/search/all`

// });

// promise.then(
//     (data) => {
//         console.log("Data is", data)
//     },
//     (error) => {
// //         console.log("Error is", error)
//     }
// )

// http:strainapi.evanbusse.com/JuedK7A/strains/data/desc/STRAIN_ID

$(function(){   

// ----------------- Constants ----------------- 
// const secondURL = 'http:strainapi.evanbusse.com/JuedK7A/strains/data/desc/STRAIN_ID'


    const baseURL = 'https:strainapi.evanbusse.com/JuedK7A/strains/search/all'
    const $modal = $('.modal');
    const $name = $('#name');
    const $race = $('#race');
    const $flavors = $('#flavors');
    const $peffects = $('#peffects');
    const $neffects = $('#neffects');
    const $medical = $('#medical');

    // ----------------- Variables ----------------- 
    var val;
    let strain, strainDetail; 

    // ----------------- Elements References -------

    const $ulEl = $('.collection');

    // ----------------- Event Listener ------------

    $ulEl.on('click', 'span', handleClick);


    // ----------------- functions ------------

    $modal.modal();
    const instance = M.Modal.getInstance($modal);


    function handleClick(event){
        let strainKey = this.id.split('-');
        var strainInfo = strain[parseInt(strainKey[0])][strainKey[1]];
        // console.log(strainKey);
        // getStrain(baseURL + event.target, true);
        $name.text("Name: " + strainKey[1]);
        $race.text("Race: " + strainInfo.race);
        $flavors.text("Flavors: " + strainInfo.flavors);
        $peffects.text("Positive Effects: " + strainInfo.effects.positive);
        $neffects.text("Negative Effects: " + strainInfo.effects.negative);
        $medical.text("Common Usage: " + strainInfo.effects.medical);
        instance.open();
        // console.log($(this).attr("id"));
    }
    // Make data available
    getStrain(baseURL);

    function getStrain(detailURL, isDetail = false){
        
        detailURL = baseURL
        $.ajax(detailURL)
        .then(
            function(data){
                // console.log("Data: ", data);
                // console.log("Date effects: ", data.Afpak.effects);

                

                if(!isDetail){
                    strain = Object.entries(data).map(function(s){
                        return {[s[0]]:s[1]}
                        }).slice(0, 15)
                                // console.log("Strain: ", Object.keys(strain[0]));
                                // console.log("Data effects:", strain[1]);
                render();

                } else {
            
                render(true, s);
                }
            
                val = Object.values(strain[0]);
                // console.log("Data values:", Object.values(strain[0]));
                // console.log("Data var:", val[0].flavors);
        },     function(error){
                    console.log("Error: ", error);
        });
    }


    function generateHTML(){
        return strain.forEach(function(s, index){
            // console.log(s);
            $ulEl.append(`<li class="collection-item"><div>${Object.keys(s)[0, 0]}<span class="secondary-content" id="${index}-${Object.keys(s)[0, 0]}">Detail</div></li>`) 
        });
    }

    function render(isDetail = false) {
        if(!isDetail){
            const html = generateHTML();
            $ulEl.html(html)
        }    
    }

    $(document).ready(function(){
        $('.tap-target').tapTarget();

            $('.tap-button').on('click', function(){
                $('.tap-target').tapTarget('open')
    })
    });
});
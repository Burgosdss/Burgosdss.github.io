$(function(){   
 
    const baseURL = `https:strainapi.evanbusse.com/${config.STRAIN_API_KEY}/strains/search/all`
    const $modal = $('.modal');
    const $name = $('#name');
    const $race = $('#race');
    const $flavors = $('#flavors');
    const $peffects = $('#peffects');
    const $neffects = $('#neffects');
    const $medical = $('#medical');

    var val;
    let strain, strainDetail; 
    const $ulEl = $('.collection');
    $ulEl.on('click', 'span', handleClick);

    $modal.modal();
    const instance = M.Modal.getInstance($modal);

    function handleClick(event){
        let strainKey = this.id.split('-');
        var strainInfo = strain[parseInt(strainKey[0])][strainKey[1]];
        $name.text("Name: " + strainKey[1]);
        $race.text("Race: " + strainInfo.race);
        $flavors.text("Flavors: " + strainInfo.flavors);
        $peffects.text("Positive Effects: " + strainInfo.effects.positive);
        $neffects.text("Negative Effects: " + strainInfo.effects.negative);
        $medical.text("Common Usage: " + strainInfo.effects.medical);
        instance.open();
    }
    getStrain(baseURL);

    function getStrain(detailURL, isDetail = false){
        detailURL = baseURL
        $.ajax(detailURL)
        .then(
            function(data){
                if(!isDetail){
                    strain = Object.entries(data).map(function(s){
                        return {[s[0]]:s[1]}
                        }).slice(0, 15)
                render();
                } else {
                render(true, s);
                }
                val = Object.values(strain[0]);
        },     
            function(error){
                    console.log("Error: ", error);
        });
    }
    function generateHTML(){
        return strain.forEach(function(s, index){
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
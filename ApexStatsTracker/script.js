var submitBtn = document.getElementById('submit');
var gamertagInput = document.getElementById('gamertag');
var platformInput = document.getElementById('platform');
var result = document.querySelector('.result');

// Get player Information from TRKK API using API key and Fetch API
const fetchPlayers = async (gamertag, platform) => {

    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${gamertag}`, {
        headers: {
            'TRN-api-Key': '74b534bb-8de6-4e06-bef6-48a66f58f735'
        }
    });

    const data = await api_call.json();
    return { data }
};

// User: platformUserHandle Avatar: avatarUrl 
const showData = () => {

    fetchPlayers(gamertagInput.value, platformInput.value).then((res) => {
        console.log(res)

        const markup = `
        <div class="stats text-center">
        <h1>PLAYER: ${res.data.data.platformInfo.platformUserId} <img class="platformAvatar" src="${res.data.data.platformInfo.avatarUrl}"></img></h1>
                <div class="row">
        
                    <div class="col-md-4 mb-3">
                     <div class="stat">
                         <img class="activeLegend" src="${res.data.data.segments[1].metadata.imageUrl}"></img>
                         <h6>${res.data.data.metadata.activeLegendName}</h6>
                         <h6>Active Legend</h6>
                     </div>
                  </div>
                 
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.data.segments[0].stats.kills.value}</h5>
                            <h6>Total Kills</h6>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.data.segments[0].stats.level.value}</h5>
                            <h6>Current Level</h6>
                        </div>
                    </div>

                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.data.segments[0].stats.rankScore.value}</h5>
                            <img src="${res.data.data.segments[0].stats.rankScore.metadata.iconUrl}"></img>
                            <h6>Ranked Score</h6>
                        </div>
                    </div>
                </div>
            </div>

        <style>
            .platformAvatar {
                height: 48px;
                width: 48px;
            }

            .activeLegend {
                height: 180px;
                width: 150px;
            }

          
        </style>
        `;

        result.insertAdjacentHTML('beforeend', markup);

    })
        .catch(err => console.log(err));
};


const clearField = () => {
    gamertagInput.value = '';
    platformInput.value = 'Choose Platform';
}

const clearPlayer = () => {
    result.innerHTML = '';
}


submitBtn.addEventListener('click', function () {
    showData();
}
)

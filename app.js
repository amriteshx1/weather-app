const a = document.getElementById('location');
const b = document.querySelector('button');

async function getWeather(location) {

    try{

        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=A5FTPXBCQ6ACE74X82RXL48RQ&contentType=json`, {mode: 'cors'});
        
        if(!response.ok){
            alert("Wrong address or unable to fetch weather data.");
            return;
        }
        
        const data = await response.json();
        console.log(data);

        if(!data.currentConditions){
            alert('Wrong address or no weather data available for this location.');
            return;
        }
        const temp = data.currentConditions.temp;
        const hmdty = data.currentConditions.humidity;
        const lng = data.longitude;
        const lat = data.latitude;
        const des = data.description;
        displayData(temp, hmdty, lng, lat, des);
    }catch(error){
        alert("Error: " + error.message);
    }
    
}

function displayData(t,h,lg,lt,d){

    const existingSubCnt = document.getElementById('subCnt');
    if(existingSubCnt){
        existingSubCnt.remove();
    }

    const subCnt = document.createElement('div');
    subCnt.id = 'subCnt';

    const tp = document.createElement('div');
    tp.className = 'info';
    tp.innerHTML = 'Temperature<br><br>' + t;
    subCnt.appendChild(tp);

    const hmd = document.createElement('div');
    hmd.className = 'info';
    hmd.innerHTML = 'Humidity<br><br>' + h;
    subCnt.appendChild(hmd);

    const lgt = document.createElement('div');
    lgt.className = 'info';
    lgt.innerHTML = 'Longitude<br><br>' + lg;
    subCnt.appendChild(lgt);

    const ltd = document.createElement('div');
    ltd.className = 'info';
    ltd.innerHTML = 'Latitude<br><br>' + lt;
    subCnt.appendChild(ltd);

    const dscp  = document.createElement('p');
    dscp.id = 'para';
    dscp.innerHTML = d;
    subCnt.appendChild(dscp);

    document.body.append(subCnt);
}

b.addEventListener('click',(e) => {
    e.preventDefault();
    const c = a.value.trim();
    if(c){
        getWeather(c);
        setTimeout(() => {
            a.value = '';
        }, 3000);
        
    }else{
        alert('Please enter a location.')
    }


});

a.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        b.click();
    }
});

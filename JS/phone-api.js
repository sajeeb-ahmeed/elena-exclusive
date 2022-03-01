const phoneDetails = document.getElementById('phone-info');
const phoneContainer = document.getElementById('phone-container');

const searchPhone = async () => {
    // get search input 
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = ''
    phoneDetails.innerHTML = ''
    if (searchValue == '' || searchValue < 0 || searchValue > 0) {
        phoneDetails.innerHTML = '';
        phoneContainer.innerHTML = '';
        return generateToastMessage('! Please enter a phone name 🤗');
    }
    else {
        const api_url = (`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
        const response = await fetch(api_url);
        const data = await response.json();
        phonesData(data.data);
        if (data.status === false) {
            return generateToastMessage('! no result found 😒');
        }
    }

}

const phonesData = datas => {
    // get search result 
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    datas?.slice(0, 20).forEach(element => {
        // console.log(element);
        const createDiv = document.createElement('div');
        createDiv.className = 'col';
        createDiv.innerHTML = `
            <div  class="card h-100 text-center">
                 <img src="${element.image}" class="card-img-top img-fulid d-block mx-auto p-2 w-50" alt=" ${element.phone_name}'s image">
                <div class="card-body">
                    <h5 class="card-title"> Brand: ${element.brand}</h5>
                    <h6> Model: ${element.phone_name}  </h6>     
                    <button onclick="phoneInfo('${element.slug}')" class=" btn-outline-dark italic"><i class="fa-solid fa-bars-staggered"></i> See Details </button>                                            
                </div>
            </div>
                                `
        phoneContainer.appendChild(createDiv)
    });
}


const phoneInfo = async phonID => {
    // getPhone details By ID 
    const info_url = (`https://openapi.programming-hero.com/api/phone/${phonID}`);
    const res = await fetch(info_url)
    const data = await res.json()
    showPhoneInfo(data.data);

}
// phoneInfo()
const showPhoneInfo = info => {
    //phone details 
    console.log(info);
    const phoneDetails = document.getElementById('phone-info');
    phoneDetails.innerHTML = `
    <div class="container d-flex mx-auto d-flex row justify-content-center p-5 g-3 ">
          <div class="col-md-3 col-12 me-0 "><img src="${info.image}" class="d-block mx-auto" alt=""> </div>     
          <div class="col-md-3 col-12 ">
                <h2 class="border-bottom d-inline fw-bold pb-2 color-2"> <i>About Phone</i> </h2>
                <h5 class=" p-2 mt-2"> <i class="fa-solid fa-mobile-screen-button text-primary"></i> Model Name :
                 ${info.name}  </h5 >
                <h6 class=" p-2 mt-2"> <i class="fa-solid fa-hourglass-start text-primary"></i> Relase Date : 
                ${info.releaseDate ? info.releaseDate : 'no relasedate found'} </h6 >

          </div >
          
         <div class="col-md-3 col-12 ">
                <h2 class="border-bottom d-inline fw-bold pb-2 color-2"> <i> Main Features</i> </h2>
                <p class=" p-2 mt-2"> <i class="fa-solid fa-circle-check text-primary "></i> ChipSet :
                ${info.mainFeatures.chipSet} </p>
                <p class=" p-2 "><i class="fa-solid fa-circle-check text-primary "></i> Display-Size :
                ${info.mainFeatures.displaySize} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Memory :
                ${info.mainFeatures.memory} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Sensors : 
                ${info.mainFeatures.sensors?.slice(0, 5)} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Storage :
                ${info.mainFeatures.storage} </p>
         </div>
         <div class="col-md-3 col-12 ">
                <h2 class="border-bottom d-inline fw-bold pb-2 color-2"> <i>Others Info</i> </h2>
                <p class=" p-2 mt-2"> <i class="fa-solid fa-circle-check text-primary "></i> Bluetooth :
                ${info?.others?.Bluetooth ? info.others.Bluetooth : 'No Bluetooth'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> GPS :
                ${info?.others?.GPS ? info.others.GPS : 'No GPS'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> USB :
                ${info?.others?.USB ? info.others.USB : 'No USB'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> NFC :
                ${info?.others?.NFC ? info.others.NFC : 'No NFC'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Radio : 
                ${info?.others?.Radio ? info.others.Radio : 'No Radio'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> WLAN :
                ${info?.others?.WLAN ? info.others.WLAN : 'No WLAN'} </p>
         </div>
     </div>
    `

}
//toast msg 
let div = null;

const generateToastMessage = (msg) => {
    //create div
    const alert = document.getElementById('alert')
    div = document.createElement('div');
    div.innerText = msg;
    div.className = 'toast-message my-btn-pulse-grow toast-message-slide-in';

    div.addEventListener('click', function () {
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

        div.addEventListener('animationend', function () {
            div.remove();
            div = null;
        });
    });

    alert.appendChild(div);
}
//Happy Codeing
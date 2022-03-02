const phoneDetails = document.getElementById('phone-info');
const phoneContainer = document.getElementById('phone-container');

const searchPhone = async () => {
    // get search input 
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = ''
    alert.innerHTML = ''
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
            return generateToastMessage(` ${searchValue} ! is not found 😒`);
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
    <div class="container d-flex mx-auto d-flex flex-wrap row justify-content-center  g-3 ">
          <div class="col-md-3 col-12  "><img src="${info.image}" class="d-block mx-auto" alt=""> </div>     
          <div class="col-md-2 col-12 ">
                <h2 class="border-bottom d-inline fw-bold pb-2 color-2"> <i>About Phone</i> </h2>
                <p class=" p-2 mt-2"> <i class="fa-solid fa-mobile-screen-button text-primary"></i> Model Name :
                 ${info.name}  </ >
                <p class=" p-2 mt-2"> <i class="fa-solid fa-hourglass-start text-primary"></i> Relase Date : 
                ${info.releaseDate ? info.releaseDate : 'no relasedate found'} </p >

          </div >
          
         <div class="col-md-4 col-12  ">
                <h2 class="border-bottom d-inline fw-bold pb-2 color-2"> <i> Main Features</i> </h2>
                <p class=" p-2 mt-2"> <i class="fa-solid fa-circle-check text-primary "></i> ChipSet :
                ${info.mainFeatures.chipSet} </p>
                <p class=" p-2 "><i class="fa-solid fa-circle-check text-primary "></i> Display-Size :
                ${info.mainFeatures.displaySize} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Memory :
                ${info.mainFeatures.memory} </p>
                <p class="p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Sensors : 
                
                  <span> ✔ ${info?.mainFeatures?.sensors[0] ? info?.mainFeatures?.sensors[0] : ''}</span>  .
                  <span> ✔ ${info?.mainFeatures?.sensors[1] ? info?.mainFeatures?.sensors[1] : ''}</span> .
                  <span>✔ ${info?.mainFeatures?.sensors[2] ? info?.mainFeatures?.sensors[2] : ''}</span> <br>
                  <span> ✔ ${info?.mainFeatures?.sensors[3] ? info?.mainFeatures?.sensors[3] : ''}</span> .
                  <span> ✔ ${info?.mainFeatures?.sensors[4] ? info?.mainFeatures?.sensors[4] : ''}</span> .
                  <span> ✔ ${info?.mainFeatures?.sensors[5] ? info?.mainFeatures?.sensors[5] : ''}   <br> 
                   ${info?.mainFeatures?.sensors[6] ? info?.mainFeatures?.sensors[6] : ''} 
                   ✔ ${info?.mainFeatures?.sensors[7] ? info?.mainFeatures?.sensors[7] : ''} 
                   ${info?.mainFeatures?.sensors[8] ? info?.mainFeatures?.sensors[8] : ''}
                
                  </span> 
                  </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Storage :
                ${info.mainFeatures.storage} </p>
         </div>
         <div class="col-md-3 col-12 ">
                <h2 class="border-bottom d-inline fw-bold pb-2 color-2"> <i>Others Info</i> </h2>
                <p class=" p-2 mt-2"> <i class="fa-solid fa-circle-check text-primary "></i> Bluetooth :
                ${info?.others?.Bluetooth ? info.others.Bluetooth : 'No Bluetooth  data found'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> GPS :
                ${info?.others?.GPS ? info.others.GPS : 'No GPS data found'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> USB :
                ${info?.others?.USB ? info.others.USB : 'No USB data found'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> NFC :
                ${info?.others?.NFC ? info.others.NFC : 'No NFC data found'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> Radio : 
                ${info?.others?.Radio ? info.others.Radio : 'No Radio data found'} </p>
                <p class=" p-2 "> <i class="fa-solid fa-circle-check text-primary "></i> WLAN :
                ${info?.others?.WLAN ? info.others.WLAN : 'No WLAN data found'} </p>
         </div>
     </div>
    `

}
//toast msg 
let div = null;

const alert = document.getElementById('alert')
const generateToastMessage = (msg) => {
    //create div
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